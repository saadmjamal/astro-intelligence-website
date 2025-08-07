/**
 * OpenAI Integration Service
 * Handles GPT-4 chat completions and streaming responses
 */

import { OpenAI } from 'openai';
import { streamText, generateText } from 'ai';
import { openai as aiSdkOpenAI } from '@ai-sdk/openai';
import type { ChatMessage, UserProfile } from '@/types/ai';

export class OpenAIService {
  private static instance: OpenAIService;
  private openai!: OpenAI;
  
  private constructor() {
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not configured. Service will run in fallback mode.');
      // Don't throw error, allow graceful degradation
    } else {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        timeout: 30000, // 30 second timeout
        maxRetries: 2,
      });
    }
  }
  
  public static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  /**
   * Check if OpenAI service is available
   */
  private isAvailable(): boolean {
    return !!this.openai && !!process.env.OPENAI_API_KEY;
  }

  /**
   * Generate fallback response when AI is unavailable
   */
  private generateFallbackResponse(messages: ChatMessage[], userProfile?: UserProfile): string {
    const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || '';
    
    let response = "Thank you for reaching out to AstroIntelligence! ";
    
    if (lastMessage.includes('ai') || lastMessage.includes('artificial intelligence')) {
      response += "We specialize in AI & ML consulting, helping organizations implement ethical AI solutions. ";
    } else if (lastMessage.includes('cloud')) {
      response += "Our cloud architecture services help design and implement scalable cloud infrastructures on AWS, Azure, and GCP. ";
    } else if (lastMessage.includes('price') || lastMessage.includes('cost')) {
      response += "Our pricing varies based on project scope and requirements. ";
    } else {
      response += "We offer comprehensive cloud engineering and AI consulting services. ";
    }
    
    if (userProfile?.companySize === 'startup') {
      response += "For startups like yours, we have specialized packages designed for growing companies. ";
    } else if (userProfile?.companySize === 'enterprise') {
      response += "For enterprise clients, we offer comprehensive transformation services. ";
    }
    
    response += "I'd recommend scheduling a consultation with our team to discuss your specific needs in detail. Would you like me to help you get in touch with our experts?";
    
    return response;
  }

  /**
   * Generate AI response using GPT-4 with fallback
   */
  async generateResponse(
    messages: ChatMessage[], 
    userProfile?: UserProfile,
    options?: {
      stream?: boolean;
      maxTokens?: number;
      temperature?: number;
    }
  ): Promise<string> {
    // Return fallback response if OpenAI is not available
    if (!this.isAvailable()) {
      console.warn('OpenAI service unavailable, using fallback response');
      return this.generateFallbackResponse(messages, userProfile);
    }

    const systemPrompt = this.buildSystemPrompt(userProfile);
    
    const openaiMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }))
    ];

    if (options?.stream) {
      return this.generateStreamingResponse(openaiMessages, options);
    }

    try {
      const { text } = await generateText({
        model: aiSdkOpenAI('gpt-4o-mini'), // Use more cost-effective model
        messages: openaiMessages,
        temperature: options?.temperature || 0.7,
      });

      return text;
    } catch (error) {
      console.error('OpenAI API error:', error);
      console.warn('Falling back to static response due to API error');
      return this.generateFallbackResponse(messages, userProfile);
    }
  }

  /**
   * Generate streaming response
   */
  private async generateStreamingResponse(
    messages: Array<{role: 'system' | 'user' | 'assistant', content: string}>,
    options: { maxTokens?: number; temperature?: number }
  ): Promise<string> {
    try {
      const { textStream } = await streamText({
        model: aiSdkOpenAI('gpt-4o-mini'), // Use more cost-effective model
        messages,
        temperature: options.temperature || 0.7,
      });

      let fullResponse = '';
      for await (const chunk of textStream) {
        fullResponse += chunk;
      }
      
      return fullResponse;
    } catch (error) {
      console.error('OpenAI streaming error:', error);
      console.warn('Falling back to static response due to streaming error');
      // Return fallback response for streaming errors
      const chatMessages = messages
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .map(m => ({ id: Date.now().toString(), content: m.content, role: m.role as 'user' | 'assistant', timestamp: new Date() }));
      return this.generateFallbackResponse(chatMessages);
    }
  }

  /**
   * Build system prompt based on user profile
   */
  private buildSystemPrompt(userProfile?: UserProfile): string {
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

    if (userProfile) {
      let profileContext = '\n\nUSER CONTEXT:\n';
      
      if (userProfile.companySize) {
        profileContext += `- Company Size: ${userProfile.companySize}\n`;
      }
      
      if (userProfile.industry) {
        profileContext += `- Industry: ${userProfile.industry}\n`;
      }
      
      if (userProfile.currentChallenges?.length) {
        profileContext += `- Current Challenges: ${userProfile.currentChallenges.join(', ')}\n`;
      }
      
      if (userProfile.techStack?.length) {
        profileContext += `- Technology Stack: ${userProfile.techStack.join(', ')}\n`;
      }
      
      if (userProfile.interests?.length) {
        profileContext += `- Interests: ${userProfile.interests.join(', ')}\n`;
      }
      
      profileContext += '\nTailor your responses to this context when relevant.';
      
      return basePrompt + profileContext;
    }

    return basePrompt;
  }

  /**
   * Analyze user intent using GPT-4
   */
  async analyzeIntent(message: string): Promise<{
    intent: string;
    confidence: number;
    entities: Record<string, any>;
  }> {
    try {
      const { text } = await generateText({
        model: aiSdkOpenAI('gpt-4'),
        messages: [{
          role: 'system',
          content: `You are an intent classification system. Analyze the user's message and respond with JSON containing:
          - intent: one of [greeting, service_inquiry, pricing, technical_question, timeline, portfolio, contact, general]
          - confidence: number between 0 and 1
          - entities: extracted entities like services mentioned, company size, industry, etc.
          
          Be precise and only extract clear entities.`
        }, {
          role: 'user',
          content: message
        }],
        temperature: 0.1,
      });

      return JSON.parse(text);
    } catch (error) {
      console.error('Intent analysis error:', error);
      return {
        intent: 'general',
        confidence: 0.5,
        entities: {}
      };
    }
  }

  /**
   * Generate embeddings for vector search
   */
  async generateEmbedding(text: string): Promise<number[]> {
    if (!this.isAvailable()) {
      console.warn('OpenAI service unavailable, cannot generate embeddings');
      // Return a dummy embedding array for fallback
      return new Array(1536).fill(0).map(() => Math.random() * 0.1 - 0.05);
    }

    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-3-small', // More cost-effective embedding model
        input: text,
      });

      return response.data[0]?.embedding || [];
    } catch (error) {
      console.error('Embedding generation error:', error);
      console.warn('Generating fallback embedding');
      // Return a dummy embedding array for fallback
      return new Array(1536).fill(0).map(() => Math.random() * 0.1 - 0.05);
    }
  }

  /**
   * Generate multiple embeddings in batch
   */
  async generateEmbeddings(texts: string[]): Promise<number[][]> {
    if (!this.isAvailable()) {
      console.warn('OpenAI service unavailable, cannot generate embeddings');
      // Return dummy embedding arrays for fallback
      return texts.map(() => new Array(1536).fill(0).map(() => Math.random() * 0.1 - 0.05));
    }

    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-3-small', // More cost-effective embedding model
        input: texts,
      });

      return response.data.map(item => item.embedding);
    } catch (error) {
      console.error('Batch embedding generation error:', error);
      console.warn('Generating fallback embeddings');
      // Return dummy embedding arrays for fallback
      return texts.map(() => new Array(1536).fill(0).map(() => Math.random() * 0.1 - 0.05));
    }
  }
}

// Export singleton instance
export const openaiService = OpenAIService.getInstance();