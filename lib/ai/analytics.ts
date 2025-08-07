import { AIAnalytics, ChatSession } from '@/types/ai';

// Define ChatIntent locally since it's not exported from types/ai
type ChatIntent = 'question' | 'feature_request' | 'bug_report' | 'general';

export class AIAnalyticsService {
  private sessions: ChatSession[] = [];

  addSession(session: ChatSession) {
    this.sessions.push(session);
  }

  generateAnalytics(): AIAnalytics {
    const totalChats = this.sessions.length;
    const totalMessages = this.sessions.reduce((sum, session) => sum + session.messages.length, 0);
    
    // Calculate average session length
    const avgSessionLength = totalChats > 0 
      ? this.sessions.reduce((sum, session) => sum + session.messages.length, 0) / totalChats 
      : 0;

    // Analyze common intents
    const intentCounts = new Map<ChatIntent, number>();
    this.sessions.forEach(session => {
      session.messages
        .filter(message => message.role === 'user')
        .forEach(_message => {
          const intent: ChatIntent = 'general';
          intentCounts.set(intent, (intentCounts.get(intent) || 0) + 1);
        });
    });

    const commonIntents = Array.from(intentCounts.entries()).map(([intent, count]) => ({
      intent,
      count,
      percentage: totalMessages > 0 ? (count / totalMessages) * 100 : 0,
    }));

    // Calculate user satisfaction (mock - would be based on feedback in real implementation)
    const userSatisfaction = 4.2; // Out of 5

    // Calculate conversion rate (mock - would be based on actual conversions)
    const conversionRate = 0.15; // 15%

    // Generate top questions - removed as it's not used in the return statement
    // const topQuestions = this.generateTopQuestions();

    // Generate service recommendation analytics
    const serviceRecommendations = this.generateServiceRecommendationAnalytics();

    return {
      sessions: {
        total: totalChats,
        active: Math.floor(totalChats * 0.3), // Mock active sessions
        averageDuration: avgSessionLength,
        satisfactionRating: userSatisfaction,
      },
      interactions: {
        totalMessages,
        averageResponseTime: 1.2, // Mock average response time in seconds
        successRate: 0.92, // Mock 92% success rate
        topIntents: commonIntents.map(item => ({ intent: item.intent.toString(), count: item.count })),
      },
      recommendations: {
        totalGenerated: serviceRecommendations.reduce((sum, rec) => sum + rec.recommendationCount, 0),
        clickThroughRate: 0.35, // Mock 35% CTR
        conversionRate,
        topServices: serviceRecommendations.map(rec => ({ service: rec.serviceId, requests: rec.recommendationCount })),
      },
      content: {
        totalGenerated: Math.floor(Math.random() * 100) + 50,
        averageQualityScore: 4.5,
        topTypes: [
          { type: 'blog_post', count: 45 },
          { type: 'case-study', count: 32 },
          { type: 'technical-doc', count: 28 },
        ],
      },
      performance: {
        averageLatency: 0.8, // Mock 800ms average latency
        errorRate: 0.02, // Mock 2% error rate
        uptime: 0.995, // Mock 99.5% uptime
        tokenUsage: Math.floor(Math.random() * 10000) + 5000,
      },
    };
  }

  private generateTopQuestions(): Array<{ question: string; frequency: number }> {
    // Mock implementation - in real scenario, would analyze actual message content
    return [
      { question: "What services do you offer?", frequency: 45 },
      { question: "How much does cloud optimization cost?", frequency: 38 },
      { question: "Can you help with AI implementation?", frequency: 32 },
      { question: "What's your experience with DevOps?", frequency: 28 },
      { question: "Do you offer ongoing support?", frequency: 25 },
    ];
  }

  private generateServiceRecommendationAnalytics(): Array<{
    serviceId: string;
    recommendationCount: number;
    conversionRate: number;
  }> {
    // Mock implementation - in real scenario, would track actual recommendations and outcomes
    return [
      {
        serviceId: 'cloud-cost-optimization',
        recommendationCount: 123,
        conversionRate: 0.22,
      },
      {
        serviceId: 'ai-ml-implementation',
        recommendationCount: 98,
        conversionRate: 0.18,
      },
      {
        serviceId: 'devops-automation',
        recommendationCount: 87,
        conversionRate: 0.16,
      },
      {
        serviceId: 'vdi-solutions',
        recommendationCount: 45,
        conversionRate: 0.13,
      },
      {
        serviceId: 'ethical-ai',
        recommendationCount: 34,
        conversionRate: 0.12,
      },
    ];
  }

  // Get analytics for a specific time period
  getAnalyticsForPeriod(startDate: Date, endDate: Date): AIAnalytics {
    const filteredSessions = this.sessions.filter(session => 
      session.createdAt >= startDate && session.createdAt <= endDate
    );

    // Temporarily store original sessions
    const originalSessions = this.sessions;
    this.sessions = filteredSessions;

    const analytics = this.generateAnalytics();

    // Restore original sessions
    this.sessions = originalSessions;

    return analytics;
  }

  // Export analytics data for reporting
  exportAnalytics(format: 'json' | 'csv' = 'json'): string {
    const analytics = this.generateAnalytics();

    if (format === 'csv') {
      return this.convertToCSV(analytics);
    }

    return JSON.stringify(analytics, null, 2);
  }

  private convertToCSV(analytics: AIAnalytics): string {
    const lines = [
      'Metric,Value',
      `Total Sessions,${analytics.sessions.total}`,
      `Active Sessions,${analytics.sessions.active}`,
      `Average Session Duration,${analytics.sessions.averageDuration.toFixed(2)}`,
      `Satisfaction Rating,${analytics.sessions.satisfactionRating}`,
      `Conversion Rate,${(analytics.recommendations.conversionRate * 100).toFixed(2)}%`,
      '',
      'Intent,Count,Percentage',
      ...analytics.interactions.topIntents.map(intent => 
        `${intent.intent},${intent.count},${((intent.count / analytics.interactions.totalMessages) * 100).toFixed(2)}%`
      ),
      '',
      'Question,Frequency',
      // Top questions data would be added here if available
      '',
      'Service,Recommendations,Conversion Rate',
      // Service recommendations data would be added here from analytics.recommendations
      // ...analytics.recommendations.topServices.map(service => 
      //   `${service.service},${service.requests},'N/A'`
      // ),
    ];

    return lines.join('\n');
  }
}

export const aiAnalyticsService = new AIAnalyticsService();