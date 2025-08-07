import { NextRequest, NextResponse } from 'next/server';
import { generateServiceRecommendations } from '@/lib/ai/recommendation-engine';
import { rateLimit } from '@/lib/rate-limit';
import { z } from 'zod';

// Rate limiting - 30 requests per hour per IP
const limiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500,
});

const recommendationRequestSchema = z.object({
  query: z.string().min(1).max(500),
  userProfile: z.object({
    industry: z.string().optional(),
    companySize: z.enum(['startup', 'small', 'medium', 'enterprise']).optional(),
    currentChallenges: z.array(z.string()).optional(),
    interests: z.array(z.string()).optional(),
    techStack: z.array(z.string()).optional(),
  }).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') ?? 'anonymous';
    const { success } = await limiter.check(ip as string, 30);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request
    const body = await request.json();
    const validationResult = recommendationRequestSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { query, userProfile } = validationResult.data;

    // Generate recommendations
    const recommendations = await generateServiceRecommendations(query, userProfile);

    return NextResponse.json({
      query,
      recommendations,
      totalCount: recommendations.length,
      generatedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Recommendations API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}