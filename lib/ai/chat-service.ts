/**
 * AI Chat Service
 * Handles chat sessions, message processing, and AI response generation
 */

import type { 
  ChatMessage, 
  ChatSession, 
  UserProfile, 
  AIResponse,
  // AIError
} from '@/types/ai';
// import { openaiService } from './openai-service';
// import { vectorStore } from './vector-store';
import { 
  generateId, 
  sanitizeInput, 
  extractUserProfile, 
  handleApiError,
  PerformanceMonitor,
  TTLCache
} from './utils';
import { 
  INTENT_PATTERNS, 
  RESPONSE_TEMPLATES, 
  DEFAULT_USER_PROFILE,
  MODEL_SETTINGS
} from './config';

// Session storage with TTL
const sessionCache = new TTLCache<string, ChatSession>(30 * 60 * 1000); // 30 minutes
const rateLimitCache = new TTLCache<string, number>(60 * 60 * 1000); // 1 hour

export class ChatService {
  private static instance: ChatService;
  
  private constructor() {}
  
  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  /**
   * Create a new chat session
   */
  async createSession(userProfile?: Partial<UserProfile>): Promise<AIResponse<ChatSession>> {
    return PerformanceMonitor.measure('chat.createSession', async () => {
      try {
        const sessionId = generateId();
        const session: ChatSession = {
          id: sessionId,
          messages: [],
          context: { ...DEFAULT_USER_PROFILE, ...userProfile },
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'active',
          metadata: {
            totalTokens: 0,
            avgResponseTime: 0,
            satisfactionRating: 0
          }
        };

        // Add welcome message
        const welcomeMessage = await this.generateWelcomeMessage(session.context);
        session.messages.push(welcomeMessage);

        sessionCache.set(sessionId, session);

        return {
          success: true,
          data: session,
          metadata: {
            requestId: generateId(),
            timestamp: new Date(),
            processingTime: 0,
            tokensUsed: welcomeMessage.metadata?.tokens || 0
          }
        };
      } catch (error) {
        const aiError = handleApiError(error);
        return {
          success: false,
          error: {
            code: aiError.type.toUpperCase(),
            message: aiError.message,
            details: aiError.metadata
          },
          metadata: {
            requestId: generateId(),
            timestamp: new Date(),
            processingTime: 0
          }
        };
      }
    });
  }

  /**
   * Get existing chat session
   */
  async getSession(sessionId: string): Promise<AIResponse<ChatSession>> {
    try {
      const session = sessionCache.get(sessionId);
      
      if (!session) {
        return {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Chat session not found or expired.'
          },
          metadata: {
            requestId: generateId(),
            timestamp: new Date(),
            processingTime: 0
          }
        };
      }

      return {
        success: true,
        data: session,
        metadata: {
          requestId: generateId(),
          timestamp: new Date(),
          processingTime: 0
        }
      };
    } catch (error) {
      const aiError = handleApiError(error);
      return {
        success: false,
        error: {
          code: aiError.type.toUpperCase(),
          message: aiError.message
        },
        metadata: {
          requestId: generateId(),
          timestamp: new Date(),
          processingTime: 0
        }
      };
    }
  }

  /**
   * Send message and get AI response
   */
  async sendMessage(
    sessionId: string, 
    content: string, 
    userId?: string
  ): Promise<AIResponse<{ session: ChatSession; response: ChatMessage }>> {
    return PerformanceMonitor.measure('chat.sendMessage', async () => {
      try {
        // Rate limiting check
        const rateLimitKey = userId || sessionId;
        const requestCount = rateLimitCache.get(rateLimitKey) || 0;
        
        if (requestCount >= 20) { // 20 messages per hour
          return {
            success: false,
            error: {
              code: 'RATE_LIMIT',
              message: 'Too many messages. Please try again later.'
            },
            metadata: {
              requestId: generateId(),
              timestamp: new Date(),
              processingTime: 0
            }
          };
        }

        // Get session
        const sessionResponse = await this.getSession(sessionId);
        if (!sessionResponse.success || !sessionResponse.data) {
          return sessionResponse as any;
        }

        const session = sessionResponse.data;
        
        // Sanitize and validate input
        const sanitizedContent = sanitizeInput(content);
        if (!sanitizedContent.trim()) {
          return {
            success: false,
            error: {
              code: 'VALIDATION',
              message: 'Message content cannot be empty.'
            },
            metadata: {
              requestId: generateId(),
              timestamp: new Date(),
              processingTime: 0
            }
          };
        }

        // Create user message
        const userMessage: ChatMessage = {
          id: generateId(),
          content: sanitizedContent,
          role: 'user',
          timestamp: new Date(),
          metadata: {
            tokens: Math.ceil(sanitizedContent.length / 4) // Rough token estimate
          }
        };

        // Add user message to session
        session.messages.push(userMessage);

        // Update user profile based on conversation
        const profileUpdate = extractUserProfile(session.messages);
        session.context = { ...session.context, ...profileUpdate };

        // Generate AI response
        const aiMessage = await this.generateResponse(session, sanitizedContent);
        session.messages.push(aiMessage);

        // Update session metadata
        session.updatedAt = new Date();
        session.metadata!.totalTokens = (session.metadata!.totalTokens || 0) + 
          (userMessage.metadata?.tokens || 0) + (aiMessage.metadata?.tokens || 0);

        // Update rate limiting
        rateLimitCache.set(rateLimitKey, requestCount + 1);

        // Save updated session
        sessionCache.set(sessionId, session);

        return {
          success: true,
          data: {
            session,
            response: aiMessage
          },
          metadata: {
            requestId: generateId(),
            timestamp: new Date(),
            processingTime: 0,
            tokensUsed: (userMessage.metadata?.tokens || 0) + (aiMessage.metadata?.tokens || 0)
          }
        };

      } catch (error) {
        const aiError = handleApiError(error);
        return {
          success: false,
          error: {
            code: aiError.type.toUpperCase(),
            message: aiError.message,
            details: aiError.metadata
          },
          metadata: {
            requestId: generateId(),
            timestamp: new Date(),
            processingTime: 0
          }
        };
      }
    });
  }

  /**
   * Close chat session
   */
  async closeSession(sessionId: string): Promise<AIResponse<void>> {
    try {
      const session = sessionCache.get(sessionId);
      
      if (session) {
        session.status = 'closed';
        session.updatedAt = new Date();
        sessionCache.set(sessionId, session);
      }

      return {
        success: true,
        metadata: {
          requestId: generateId(),
          timestamp: new Date(),
          processingTime: 0
        }
      };
    } catch (error) {
      const aiError = handleApiError(error);
      return {
        success: false,
        error: {
          code: aiError.type.toUpperCase(),
          message: aiError.message
        },
        metadata: {
          requestId: generateId(),
          timestamp: new Date(),
          processingTime: 0
        }
      };
    }
  }

  /**
   * Generate welcome message based on user profile
   */
  private async generateWelcomeMessage(_userProfile: UserProfile): Promise<ChatMessage> {
    const templates = RESPONSE_TEMPLATES.greeting;
    const template = templates.length > 0 
      ? templates[Math.floor(Math.random() * templates.length)] as string
      : "Hello! Welcome to Astro Intelligence. How can I help you today?"; // fallback greeting
    
    return {
      id: generateId(),
      content: template,
      role: 'assistant',
      timestamp: new Date(),
      metadata: {
        tokens: Math.ceil(template.length / 4),
        model: MODEL_SETTINGS.chat.toString(),
        context: 'welcome',
        confidence: 0.9
      }
    };
  }

  /**
   * Generate AI response based on user input and session context
   */
  private async generateResponse(session: ChatSession, userInput: string): Promise<ChatMessage> {
    // Classify user intent
    const intent = this.classifyIntent(userInput);
    
    // Generate contextual response
    let responseContent: string;
    
    switch (intent) {
      case 'greeting':
        responseContent = this.generateGreetingResponse(session.context);
        break;
      case 'service_inquiry':
        responseContent = this.generateServiceResponse(session.context, userInput);
        break;
      case 'pricing':
        responseContent = this.generatePricingResponse(session.context);
        break;
      case 'technical':
        responseContent = this.generateTechnicalResponse(userInput);
        break;
      case 'timeline':
        responseContent = this.generateTimelineResponse(session.context);
        break;
      case 'portfolio':
        responseContent = this.generatePortfolioResponse();
        break;
      default:
        responseContent = this.generateDefaultResponse(userInput, session.context);
    }

    return {
      id: generateId(),
      content: responseContent,
      role: 'assistant',
      timestamp: new Date(),
      metadata: {
        tokens: Math.ceil(responseContent.length / 4),
        model: MODEL_SETTINGS.chat.toString(),
        context: intent,
        confidence: 0.8
      }
    };
  }

  /**
   * Classify user intent based on input patterns
   */
  private classifyIntent(input: string): string {
    const lowercaseInput = input.toLowerCase();
    
    for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
      if (patterns.some(pattern => pattern.test(lowercaseInput))) {
        return intent;
      }
    }
    
    return 'general';
  }

  /**
   * Generate response based on specific intents
   */
  private generateGreetingResponse(_userProfile: UserProfile): string {
    const templates = RESPONSE_TEMPLATES.greeting;
    return templates.length > 0
      ? templates[Math.floor(Math.random() * templates.length)] as string
      : "Hello! How can I assist you today?"; // fallback greeting
  }

  private generateServiceResponse(userProfile: UserProfile, input: string): string {
    const serviceKeywords = input.toLowerCase();
    let response = (RESPONSE_TEMPLATES.service_overview[0] as string) + "\n\n";
    
    if (serviceKeywords.includes('ai') || serviceKeywords.includes('artificial intelligence')) {
      response += "Based on your interest in AI, I'd particularly recommend our AI Consulting services. We help organizations develop AI strategies, implement machine learning solutions, and ensure ethical AI practices.";
    } else if (serviceKeywords.includes('cloud')) {
      response += "Since you mentioned cloud, our Cloud Architecture services might be perfect for you. We design scalable, secure cloud infrastructures on AWS, Azure, and GCP.";
    } else if (serviceKeywords.includes('ml') || serviceKeywords.includes('machine learning')) {
      response += "Our ML Engineering services could be exactly what you need. We build production-ready machine learning systems, from data pipelines to model deployment and monitoring.";
    } else {
      response += "Based on your needs, I can recommend the most suitable service combination. What specific challenges are you looking to solve?";
    }
    
    return response;
  }

  private generatePricingResponse(userProfile: UserProfile): string {
    const sizeMultiplier = {
      startup: "Our startup-friendly packages start at $5,000 for focused consulting engagements.",
      small: "For small businesses, our typical projects range from $10,000 to $50,000.",
      medium: "Mid-size companies usually invest $25,000 to $100,000 for comprehensive solutions.",
      enterprise: "Enterprise engagements typically range from $75,000 to $500,000+ depending on scope."
    };
    
    const baseResponse = sizeMultiplier[userProfile.companySize || 'medium'];
    return baseResponse + " Each project is customized based on your specific requirements. Would you like to schedule a consultation to discuss your needs and get a detailed quote?";
  }

  private generateTechnicalResponse(_input: string): string {
    return (RESPONSE_TEMPLATES.technical_expertise[0] as string) + " What specific technical challenges are you facing? I can provide more detailed information about our capabilities in those areas.";
  }

  private generateTimelineResponse(_userProfile: UserProfile): string {
    return "Project timelines vary based on scope and complexity. Typical ranges are:\n\n" +
           "• AI Strategy Consulting: 2-4 weeks\n" +
           "• Cloud Architecture Design: 3-6 weeks\n" +
           "• ML Model Development: 6-12 weeks\n" +
           "• Full Implementation Projects: 3-9 months\n\n" +
           "We can provide a detailed timeline once we understand your specific requirements. What's your target timeline?";
  }

  private generatePortfolioResponse(): string {
    return "We've successfully delivered projects across various industries:\n\n" +
           "• **Fintech Transformation**: AI-powered trading platform (reduced processing time by 75%)\n" +
           "• **Healthcare ML**: Predictive analytics for patient outcomes (92% accuracy)\n" +
           "• **E-commerce AI**: Recommendation engine (increased conversions by 45%)\n" +
           "• **Enterprise Cloud**: Multi-cloud architecture (achieved 99.9% uptime)\n\n" +
           "Would you like detailed case studies in your industry or similar to your use case?";
  }

  private generateDefaultResponse(_input: string, _userProfile: UserProfile): string {
    return "I understand you're interested in learning more about our services. " + 
           (RESPONSE_TEMPLATES.service_overview[1] as string) + " " +
           (RESPONSE_TEMPLATES.next_steps[0] as string);
  }
}

// Export singleton instance
export const chatService = ChatService.getInstance();