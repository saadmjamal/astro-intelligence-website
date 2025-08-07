import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
// import { contactFormSchema } from '@/lib/schemas/contact.schema';
import { rateLimit } from '@/lib/rate-limit';
import { secureInputSchemas, sanitizeText, sanitizeHtml, SecureRateLimiter } from '@/lib/utils/security';
import { secureDb } from '@/lib/db-secure';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Enhanced rate limiting for contact form
const limiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500,
});

// Additional security rate limiter with stricter limits for contact form
const secureRateLimiter = new SecureRateLimiter(3, 15 * 60 * 1000, 2 * 60 * 60 * 1000);

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let ip: string = 'unknown';
  let userAgent: string = 'unknown';
  
  try {
    // Enhanced IP detection and security logging
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfConnectingIp = request.headers.get('cf-connecting-ip');
    
    ip = cfConnectingIp || (forwarded ? forwarded.split(',')[0]?.trim() : realIp) || 'anonymous';
    userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Enhanced rate limiting with multiple layers
    const { success } = await limiter.check(ip, 5);
    const secureLimit = secureRateLimiter.isAllowed(ip);
    
    if (!success || !secureLimit) {
      // Log potential spam or abuse
      await secureDb.logSecurityEvent(
        'CONTACT_FORM_RATE_LIMIT',
        ip,
        userAgent,
        undefined,
        { endpoint: '/api/contact', method: 'POST' }
      );
      
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '7200' } }
      );
    }

    // Parse and validate request body with size limits
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 5120) { // 5KB limit for contact form
      await secureDb.logSecurityEvent(
        'CONTACT_FORM_SIZE_EXCEEDED',
        ip,
        userAgent,
        undefined,
        { contentLength, endpoint: '/api/contact' }
      );
      
      return NextResponse.json(
        { error: 'Request too large' },
        { status: 413 }
      );
    }
    
    const body = await request.json();
    
    // Use secure validation schema
    const validationResult = secureInputSchemas.contactForm.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, company, budget, message, honeypot } = validationResult.data;
    
    // Check honeypot field (should be empty)
    if (honeypot && honeypot.length > 0) {
      await secureDb.logSecurityEvent(
        'CONTACT_FORM_BOT_DETECTED',
        ip,
        userAgent,
        undefined,
        { honeypot: honeypot.substring(0, 100) }
      );
      
      // Return success to not reveal bot detection
      return NextResponse.json({
        success: true,
        message: 'Thank you for your message. We\'ll be in touch soon!',
      });
    }
    
    // Sanitize all text inputs
    const sanitizedData = {
      name: sanitizeText(name),
      email: email.toLowerCase().trim(), // Email doesn't need HTML sanitization but normalize
      company: company ? sanitizeText(company) : undefined,
      budget,
      message: sanitizeText(message),
    };

    // Log all contact form submissions for security monitoring
    await secureDb.logSecurityEvent(
      'CONTACT_FORM_SUBMISSION',
      ip,
      userAgent,
      undefined,
      { 
        name: sanitizedData.name.substring(0, 50), // Log partial data for security
        email: sanitizedData.email,
        company: sanitizedData.company?.substring(0, 50),
        budget: sanitizedData.budget,
        messageLength: sanitizedData.message.length,
        hasCompany: !!sanitizedData.company,
        hasBudget: !!sanitizedData.budget
      }
    );
    
    // If Resend is not configured, still process securely
    if (!resend) {
      console.log('Contact form submission (email disabled):', {
        name: sanitizedData.name,
        email: sanitizedData.email,
        company: sanitizedData.company,
        budget: sanitizedData.budget,
        messagePreview: sanitizedData.message.substring(0, 100),
        ip,
        timestamp: new Date().toISOString()
      });
      
      return NextResponse.json({
        success: true,
        message: 'Thank you for your message. We\'ll be in touch soon!',
      });
    }

    // Send email via Resend with sanitized content
    const { error } = await resend.emails.send({
      from: 'Contact Form <contact@astrointelligence.com>',
      to: ['saad@astrointelligence.com'],
      replyTo: sanitizedData.email,
      subject: `New Contact Form Submission from ${sanitizedData.name}`,
      html: await sanitizeHtml(`
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedData.name}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        ${sanitizedData.company ? `<p><strong>Company:</strong> ${sanitizedData.company}</p>` : ''}
        ${sanitizedData.budget ? `<p><strong>Budget:</strong> ${sanitizedData.budget.replace('-', ' - ').toUpperCase()}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Sent from ${ip} at ${new Date().toISOString()}</small></p>
      `),
      text: `
        New Contact Form Submission
        
        Name: ${sanitizedData.name}
        Email: ${sanitizedData.email}
        ${sanitizedData.company ? `Company: ${sanitizedData.company}` : ''}
        ${sanitizedData.budget ? `Budget: ${sanitizedData.budget.replace('-', ' - ').toUpperCase()}` : ''}
        
        Message:
        ${sanitizedData.message}
        
        ---
        Sent from ${ip} at ${new Date().toISOString()}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      );
    }

    // Send auto-reply to user with sanitized content
    await resend.emails.send({
      from: 'Saad Jamal <noreply@astrointelligence.com>',
      to: [sanitizedData.email],
      subject: 'Thank you for contacting Astro Intelligence',
      html: await sanitizeHtml(`
        <h2>Thank you for reaching out, ${sanitizedData.name}!</h2>
        <p>I've received your message and will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to:</p>
        <ul>
          <li><a href="https://astrointelligence.com/portfolio">View our case studies</a></li>
          <li><a href="https://astrointelligence.com/services">Explore our services</a></li>
          <li><a href="https://astrointelligence.com/blog">Read our latest insights</a></li>
        </ul>
        <p>Best regards,<br>Saad Jamal<br>Founder, Astro Intelligence</p>
      `),
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We\'ll be in touch soon!',
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    // Log contact form errors for security monitoring
    await secureDb.logSecurityEvent(
      'CONTACT_FORM_ERROR',
      ip,
      userAgent,
      undefined,
      { 
        error: error instanceof Error ? error.message : 'Unknown error',
        endpoint: '/api/contact',
        responseTime: Date.now() - startTime
      }
    );
    
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}