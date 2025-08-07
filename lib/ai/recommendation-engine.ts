import { ServiceRecommendation, UserProfile } from '@/types/ai';
import { services } from '@/lib/config/services.config';
import { SERVICE_KEYWORDS } from './config';

export async function generateServiceRecommendations(
  query: string,
  userProfile?: UserProfile
): Promise<ServiceRecommendation[]> {
  const lowerQuery = query.toLowerCase();
  const recommendations: ServiceRecommendation[] = [];

  // Score each service based on keyword matching and user profile
  for (const service of services) {
    const relevanceScore = calculateRelevanceScore(lowerQuery, service.slug, userProfile);
    
    if (relevanceScore > 30) { // Only include if relevance > 30%
      const recommendation: ServiceRecommendation = {
        id: service.id,
        title: service.title,
        description: service.description,
        relevanceScore,
        reasoning: [generateReasoning(lowerQuery, service.slug, relevanceScore)],
        estimatedCost: getEstimatedBudget(service.slug, userProfile?.companySize),
        timeline: getEstimatedTimeframe(service.slug),
        tags: generateServiceTags(service.slug),
        priority: relevanceScore > 70 ? 'high' : relevanceScore > 50 ? 'medium' : 'low',
        nextSteps: generateBenefits(service.slug)
      };
      
      recommendations.push(recommendation);
    }
  }

  // Sort by relevance score (highest first)
  return recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 3);
}

function generateServiceTags(serviceSlug: string): string[] {
  const tagMap = {
    'cloud-cost-optimization': ['cloud', 'cost-reduction', 'optimization', 'aws', 'azure'],
    'ai-ml-implementation': ['ai', 'machine-learning', 'automation', 'innovation'],
    'devops-automation': ['devops', 'ci-cd', 'automation', 'infrastructure'],
    'vdi-solutions': ['virtual-desktop', 'remote-work', 'security', 'productivity'],
    'ethical-ai': ['ethics', 'ai', 'compliance', 'responsible-ai']
  };
  
  return tagMap[serviceSlug as keyof typeof tagMap] || ['consulting', 'technology'];
}

function calculateRelevanceScore(
  query: string,
  serviceSlug: string,
  userProfile?: UserProfile
): number {
  let score = 0;
  
  // Keyword matching
  const keywords = SERVICE_KEYWORDS[serviceSlug as keyof typeof SERVICE_KEYWORDS] || [];
  for (const keyword of keywords) {
    if (query.includes(keyword)) {
      score += 20;
    }
  }

  // User profile boost
  if (userProfile) {
    // Industry-specific boosts
    if (userProfile.industry) {
      if (serviceSlug === 'cloud-cost-optimization' && 
          ['technology', 'fintech', 'saas'].includes(userProfile.industry)) {
        score += 15;
      }
      if (serviceSlug === 'ai-ml-implementation' && 
          ['healthcare', 'fintech', 'retail'].includes(userProfile.industry)) {
        score += 15;
      }
    }

    // Company size considerations
    if (userProfile.companySize) {
      if (serviceSlug === 'devops-automation' && 
          ['medium', 'enterprise'].includes(userProfile.companySize)) {
        score += 10;
      }
      if (serviceSlug === 'vdi-solutions' && 
          userProfile.companySize === 'enterprise') {
        score += 10;
      }
    }

    // Challenge-based matching
    if (userProfile.currentChallenges) {
      const challenges = userProfile.currentChallenges.join(' ').toLowerCase();
      if (challenges.includes('cost') && serviceSlug === 'cloud-cost-optimization') {
        score += 20;
      }
      if (challenges.includes('automation') && serviceSlug === 'devops-automation') {
        score += 20;
      }
      if (challenges.includes('remote') && serviceSlug === 'vdi-solutions') {
        score += 20;
      }
    }
  }

  // Service title/slug direct matching
  if (query.includes(serviceSlug.replace('-', ' '))) {
    score += 30;
  }

  return Math.min(score, 100); // Cap at 100%
}

function generateReasoning(query: string, serviceSlug: string, score: number): string {
  const reasoningMap = {
    'cloud-cost-optimization': 'Your query indicates interest in reducing cloud expenses. Our cost optimization service typically achieves 30% savings.',
    'ai-ml-implementation': 'Based on your inquiry about AI solutions, our ML implementation service can deploy models 5x faster than traditional approaches.',
    'devops-automation': 'Your interest in automation aligns with our DevOps services that streamline deployment and infrastructure management.',
    'vdi-solutions': 'Virtual desktop solutions can address remote work challenges while maintaining security and performance.',
    'ethical-ai': 'Our ethical AI consulting ensures responsible implementation while maximizing business value.',
  };

  const baseReasoning = reasoningMap[serviceSlug as keyof typeof reasoningMap] || 
                      'This service aligns with your stated requirements and objectives.';
  
  if (score > 80) {
    return `${baseReasoning} This is a highly recommended match for your needs.`;
  } else if (score > 60) {
    return `${baseReasoning} This service should provide significant value for your organization.`;
  } else {
    return `${baseReasoning} This could be a good fit depending on your specific requirements.`;
  }
}

function generateBenefits(serviceSlug: string): string[] {
  const benefitsMap = {
    'cloud-cost-optimization': [
      'Average 30% reduction in cloud costs',
      'Improved resource utilization',
      'Automated cost monitoring',
      'Performance optimization included'
    ],
    'ai-ml-implementation': [
      '5x faster deployment than traditional methods',
      'Custom ML models for your use case',
      'Scalable cloud infrastructure',
      'Ongoing model optimization'
    ],
    'devops-automation': [
      'Automated CI/CD pipelines',
      'Reduced deployment time by 80%',
      'Infrastructure as Code',
      'Enhanced security and compliance'
    ],
    'vdi-solutions': [
      'Secure remote access',
      '99.9% uptime guarantee',
      'Scalable user management',
      'Cost-effective licensing'
    ],
    'ethical-ai': [
      'Responsible AI implementation',
      'Bias detection and mitigation',
      'Regulatory compliance',
      'Transparent decision-making'
    ]
  };

  return benefitsMap[serviceSlug as keyof typeof benefitsMap] || [
    'Proven results and ROI',
    'Expert consultation included',
    'Ongoing support and maintenance'
  ];
}

function getEstimatedTimeframe(serviceSlug: string): string {
  const timeframeMap = {
    'cloud-cost-optimization': '2-4 weeks initial optimization, ongoing monitoring',
    'ai-ml-implementation': '6-12 weeks depending on complexity',
    'devops-automation': '4-8 weeks for full pipeline setup',
    'vdi-solutions': '3-6 weeks for complete deployment',
    'ethical-ai': '4-8 weeks for assessment and implementation'
  };

  return timeframeMap[serviceSlug as keyof typeof timeframeMap] || '4-8 weeks typical project timeline';
}

function getEstimatedBudget(serviceSlug: string, companySize?: string): string {
  const budgetRanges = {
    'cloud-cost-optimization': {
      startup: '$5K-$15K',
      small: '$10K-$25K', 
      medium: '$20K-$50K',
      enterprise: '$40K-$100K+'
    },
    'ai-ml-implementation': {
      startup: '$15K-$50K',
      small: '$25K-$75K',
      medium: '$50K-$150K',
      enterprise: '$100K-$500K+'
    },
    'devops-automation': {
      startup: '$10K-$30K',
      small: '$20K-$50K',
      medium: '$40K-$100K',
      enterprise: '$75K-$200K+'
    },
    'vdi-solutions': {
      startup: '$8K-$25K',
      small: '$15K-$40K',
      medium: '$30K-$80K',
      enterprise: '$60K-$150K+'
    },
    'ethical-ai': {
      startup: '$5K-$20K',
      small: '$10K-$35K',
      medium: '$25K-$75K',
      enterprise: '$50K-$150K+'
    }
  };

  const serviceRanges = budgetRanges[serviceSlug as keyof typeof budgetRanges];
  if (!serviceRanges || !companySize) {
    return 'Custom pricing based on requirements';
  }

  return serviceRanges[companySize as keyof typeof serviceRanges] || 'Custom pricing based on requirements';
}