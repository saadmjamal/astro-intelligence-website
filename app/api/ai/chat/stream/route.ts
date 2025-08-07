import { NextRequest } from 'next/server';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';

// Rate limiting - 30 messages per hour per IP
const limiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500,
});

const chatStreamSchema = z.object({
  message: z.string().min(1).max(1000),
  sessionId: z.string().optional(),
  userProfile: z.object({
    industry: z.string().optional(),
    companySize: z.enum(['startup', 'small', 'medium', 'enterprise']).optional(),
    currentChallenges: z.array(z.string()).optional(),
    interests: z.array(z.string()).optional(),
    techStack: z.array(z.string()).optional(),
  }).optional(),
  context: z.object({
    page: z.string().optional(),
    userIntent: z.enum(['support', 'sales', 'technical', 'general']).optional(),
  }).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') ?? 'anonymous';
    const { success } = await limiter.check(ip as string, 30);
    
    if (!success) {
      return new Response('Rate limit exceeded', { status: 429 });
    }

    // Parse and validate request
    const body = await request.json();
    const validationResult = chatStreamSchema.safeParse(body);
    
    if (!validationResult.success) {
      return new Response('Invalid request data', { status: 400 });
    }

    const { message, userProfile, context } = validationResult.data;

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not configured, falling back to mock response');
      const mockResponse = await generateMockStreamingResponse(message, userProfile);
      return new Response(
        JSON.stringify({
          success: true,
          message: mockResponse,
          streaming: false,
          fallback: true,
          metadata: {
            requestId: `req_${Date.now()}`,
            timestamp: new Date(),
            processingTime: 100
          }
        }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Build system prompt based on user profile and context
    const systemPrompt = buildSystemPrompt(userProfile, context);

    try {
      // Use AI SDK for streaming response
      const result = await streamText({
        model: openai('gpt-4o-mini'), // More cost-effective model
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
      });

      // Return streaming response
      return result.toTextStreamResponse();
      
    } catch (error) {
      console.error('OpenAI streaming error:', error);
      
      // Fallback to mock response if AI fails
      const mockResponse = await generateMockStreamingResponse(message, userProfile);
      return new Response(
        JSON.stringify({
          success: true,
          message: mockResponse,
          streaming: false,
          fallback: true,
          error: 'AI service temporarily unavailable',
          metadata: {
            requestId: `req_${Date.now()}`,
            timestamp: new Date(),
            processingTime: 200
          }
        }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

  } catch (error) {
    console.error('Chat streaming error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

function buildSystemPrompt(userProfile?: any, context?: any): string {
  const basePrompt = `You are AstroAI, an intelligent assistant for AstroIntelligence, a leading cloud engineering and AI consulting company.

COMPANY OVERVIEW:
- Specializes in cloud architecture, AI/ML solutions, and digital transformation
- Serves startups to enterprise clients across various industries
- Focus on ethical AI, scalable cloud solutions, and cutting-edge technology

YOUR ROLE:
- Help users understand our services and capabilities
- Provide technical insights and recommendations
- Guide users toward appropriate solutions for their needs
- Be knowledgeable, professional, and helpful

SERVICES:
1. **AI & ML Consulting**: Strategy, implementation, ethical AI practices
2. **Cloud Architecture**: AWS, Azure, GCP design and migration
3. **Platform Engineering**: DevOps, infrastructure automation, monitoring
4. **Data Engineering**: Pipelines, analytics, real-time processing
5. **Digital Transformation**: Modernization, process optimization

COMMUNICATION STYLE:
- Professional yet approachable
- Technical when appropriate, accessible when needed
- Solution-focused and action-oriented
- Honest about capabilities and limitations`;

  let contextPrompt = '';
  
  if (userProfile) {
    contextPrompt += '\n\nUSER CONTEXT:\n';
    
    if (userProfile.companySize) {
      contextPrompt += `- Company Size: ${userProfile.companySize}\n`;
    }
    
    if (userProfile.industry) {
      contextPrompt += `- Industry: ${userProfile.industry}\n`;
    }
    
    if (userProfile.currentChallenges?.length) {
      contextPrompt += `- Current Challenges: ${userProfile.currentChallenges.join(', ')}\n`;
    }
    
    if (userProfile.techStack?.length) {
      contextPrompt += `- Technology Stack: ${userProfile.techStack.join(', ')}\n`;
    }
    
    if (userProfile.interests?.length) {
      contextPrompt += `- Interests: ${userProfile.interests.join(', ')}\n`;
    }
  }
  
  if (context) {
    contextPrompt += '\n\nSESSION CONTEXT:\n';
    
    if (context.page) {
      contextPrompt += `- Current Page: ${context.page}\n`;
    }
    
    if (context.userIntent) {
      contextPrompt += `- User Intent: ${context.userIntent}\n`;
    }
  }
  
  if (contextPrompt) {
    contextPrompt += '\nTailor your responses to this context when relevant.';
  }

  return basePrompt + contextPrompt;
}

async function generateMockStreamingResponse(message: string, userProfile?: any): Promise<string> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const responses = [
    "Thank you for your interest in AstroIntelligence! I'd be happy to help you learn about our AI and cloud engineering services.",
    "That's a great question about our AI consulting capabilities. We specialize in helping organizations implement ethical AI solutions.",
    "Our cloud architecture services can definitely help with scalability challenges. Let me share some insights about our approach.",
    "Based on your inquiry, I think our platform engineering services might be particularly relevant to your needs."
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)] as string;
  
  // Add context-specific information if available
  let contextualResponse: string = randomResponse;
  
  if (userProfile?.companySize === 'startup') {
    contextualResponse += " Since you're working with a startup, we have specialized packages designed for growing companies.";
  } else if (userProfile?.companySize === 'enterprise') {
    contextualResponse += " For enterprise clients like yourself, we offer comprehensive transformation services.";
  }
  
  if (message.toLowerCase().includes('ai')) {
    contextualResponse += " Our AI consulting team has worked with companies across various industries to implement machine learning solutions.";
  }
  
  if (message.toLowerCase().includes('cloud')) {
    contextualResponse += " We're certified partners with AWS, Azure, and Google Cloud Platform.";
  }
  
  contextualResponse += "\n\nWould you like to schedule a consultation to discuss your specific needs?";
  
  return contextualResponse;
}