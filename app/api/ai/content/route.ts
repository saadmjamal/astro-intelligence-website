import { NextRequest, NextResponse } from 'next/server';
import { contentGenerator } from '@/lib/ai/content-generator';
import { rateLimit } from '@/lib/rate-limit';
import { z } from 'zod';

// Rate limiting - 10 content generations per hour per IP
const limiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500,
});

const contentRequestSchema = z.object({
  type: z.enum(['blog-post', 'case-study', 'technical-doc', 'email', 'proposal']),
  topic: z.string().min(1).max(200),
  audience: z.enum(['technical', 'business', 'general']).optional().default('business'),
  tone: z.enum(['professional', 'casual', 'persuasive', 'educational']).optional().default('professional'),
  length: z.enum(['short', 'medium', 'long']).optional().default('medium'),
  keywords: z.array(z.string()).max(10).optional(),
  context: z.string().max(1000).optional(),
  format: z.enum(['markdown', 'html', 'plain']).optional().default('markdown'),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') ?? 'anonymous';
    const { success } = await limiter.check(ip as string, 10);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Content generation limit reached. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request
    const body = await request.json();
    const validationResult = contentRequestSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const contentRequest = validationResult.data;

    // Generate content
    const result = await contentGenerator.generateContent(contentRequest);

    return NextResponse.json(result);

  } catch (error) {
    console.error('Content generation API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during content generation.' },
      { status: 500 }
    );
  }
}