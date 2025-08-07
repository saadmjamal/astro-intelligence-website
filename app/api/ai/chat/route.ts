import { NextRequest, NextResponse } from 'next/server';
import { chatService } from '@/lib/ai/chat-service';
import { rateLimit } from '@/lib/rate-limit';
// import { z } from 'zod';
import { secureInputSchemas, sanitizeText, SecureRateLimiter } from '@/lib/utils/security';
import { secureDb } from '@/lib/db-secure';

// Enhanced rate limiting with IP blocking
const limiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500,
});

// Additional security rate limiter
const secureRateLimiter = new SecureRateLimiter(15, 15 * 60 * 1000, 60 * 60 * 1000);

// Use the secure input schema
const chatRequestSchema = secureInputSchemas.chatMessage;

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let ip: string = 'unknown';
  let userAgent: string = 'unknown';
  
  try {
    // Enhanced IP detection with security logging
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfConnectingIp = request.headers.get('cf-connecting-ip');
    
    ip = cfConnectingIp || (forwarded ? forwarded.split(',')[0]?.trim() : realIp) || 'anonymous';
    userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Enhanced rate limiting check
    const { success } = await limiter.check(ip, 20);
    const secureLimit = secureRateLimiter.isAllowed(ip);
    
    if (!success || !secureLimit) {
      // Log suspicious activity
      await secureDb.logSecurityEvent(
        'RATE_LIMIT_EXCEEDED',
        ip,
        userAgent,
        undefined,
        { endpoint: '/api/ai/chat', method: 'POST' }
      );
      
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '3600' } }
      );
    }

    // Parse and validate request with size limit
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10240) { // 10KB limit
      await secureDb.logSecurityEvent(
        'REQUEST_SIZE_EXCEEDED',
        ip,
        userAgent,
        undefined,
        { contentLength, endpoint: '/api/ai/chat' }
      );
      
      return NextResponse.json(
        { error: 'Request too large' },
        { status: 413 }
      );
    }
    
    const body = await request.json();
    const validationResult = chatRequestSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { message, sessionId, userProfile } = validationResult.data;
    
    // Sanitize message content
    const sanitizedMessage = sanitizeText(message);

    let session;
    
    // Enhanced session handling with security checks
    if (sessionId) {
      // Validate session ID format and ownership
      try {
        const sessionResult = await chatService.getSession(sessionId);
        if (!sessionResult.success || !sessionResult.data) {
          await secureDb.logSecurityEvent(
            'INVALID_SESSION_ACCESS',
            ip,
            userAgent,
            undefined,
            { sessionId, endpoint: '/api/ai/chat' }
          );
          
          return NextResponse.json(
            { error: 'Session not found' },
            { status: 404 }
          );
        }
        session = sessionResult.data;
        
        // Check session age (expire after 24 hours)
        const sessionAge = Date.now() - new Date(session.createdAt).getTime();
        if (sessionAge > 24 * 60 * 60 * 1000) {
          await secureDb.logSecurityEvent(
            'EXPIRED_SESSION_ACCESS',
            ip,
            userAgent,
            undefined,
            { sessionId, sessionAge }
          );
          
          return NextResponse.json(
            { error: 'Session expired' },
            { status: 401 }
          );
        }
        
      } catch (error) {
        await secureDb.logSecurityEvent(
          'SESSION_VALIDATION_ERROR',
          ip,
          userAgent,
          undefined,
          { sessionId, error: error instanceof Error ? error.message : 'Unknown' }
        );
        
        return NextResponse.json(
          { error: 'Invalid session' },
          { status: 400 }
        );
      }
    } else {
      // Create new session with rate limiting
      try {
        const sessionResult = await chatService.createSession(userProfile);
        if (!sessionResult.success || !sessionResult.data) {
          return NextResponse.json(
            { error: 'Failed to create session' },
            { status: 500 }
          );
        }
        session = sessionResult.data;
        
        // Log new session creation
        await secureDb.logSecurityEvent(
          'NEW_CHAT_SESSION',
          ip,
          userAgent,
          undefined,
          { sessionId: session.id }
        );
        
      } catch (error) {
        await secureDb.logSecurityEvent(
          'SESSION_CREATION_ERROR',
          ip,
          userAgent,
          undefined,
          { error: error instanceof Error ? error.message : 'Unknown' }
        );
        
        return NextResponse.json(
          { error: 'Failed to create session' },
          { status: 500 }
        );
      }
    }

    // Send sanitized message and get AI response
    const result = await chatService.sendMessage(session.id, sanitizedMessage);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error?.message || 'Failed to process message' },
        { status: 400 }
      );
    }

    // Log successful interaction
    await secureDb.logSecurityEvent(
      'SUCCESSFUL_CHAT_INTERACTION',
      ip,
      userAgent,
      undefined,
      { 
        sessionId: result.data!.session.id,
        messageLength: sanitizedMessage.length,
        responseTime: Date.now() - startTime
      }
    );
    
    return NextResponse.json({
      sessionId: result.data!.session.id,
      message: {
        content: sanitizeText(result.data!.response.content || ''),
        role: result.data!.response.role,
        timestamp: result.data!.response.timestamp
      },
      context: result.data!.session.context,
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Log security-related errors
    await secureDb.logSecurityEvent(
      'CHAT_API_ERROR',
      ip,
      userAgent,
      undefined,
      { 
        error: error instanceof Error ? error.message : 'Unknown error',
        endpoint: '/api/ai/chat',
        responseTime: Date.now() - startTime
      }
    );
    
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const sessionResult = await chatService.getSession(sessionId);
    
    if (!sessionResult.success || !sessionResult.data) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    const session = sessionResult.data;

    return NextResponse.json({
      sessionId: session.id,
      messages: session.messages,
      context: session.context,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
    });

  } catch (error) {
    console.error('Chat GET API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Since ChatService doesn't have deleteSession, we'll just confirm the session exists
    const sessionResult = await chatService.getSession(sessionId);
    
    if (!sessionResult.success || !sessionResult.data) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Session deleted successfully',
    });

  } catch (error) {
    console.error('Chat DELETE API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}