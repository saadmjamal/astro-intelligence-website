import type { 
  ContentGenerationRequest,
  GeneratedContent,
  AIResponse 
} from '@/types/ai';
import { 
  generateId,
  sanitizeInput,
  handleApiError,
  PerformanceMonitor
} from './utils';

export class ContentGenerator {
  private static instance: ContentGenerator;
  
  private constructor() {}
  
  public static getInstance(): ContentGenerator {
    if (!ContentGenerator.instance) {
      ContentGenerator.instance = new ContentGenerator();
    }
    return ContentGenerator.instance;
  }

  async generateContent(request: ContentGenerationRequest): Promise<AIResponse<GeneratedContent>> {
    return PerformanceMonitor.measure('content.generation', async () => {
      try {
        // Sanitize inputs
        const sanitizedRequest = {
          ...request,
          topic: sanitizeInput(request.topic),
          context: request.context ? sanitizeInput(request.context) : undefined,
          keywords: request.keywords?.map(k => sanitizeInput(k)) || []
        };

        const content = await this.generateContentByType(sanitizedRequest);
        const wordCount = this.countWords(content);
        
        const generatedContent: GeneratedContent = {
          id: generateId(),
          content,
          title: this.generateTitle(sanitizedRequest),
          summary: this.generateSummary(content),
          metadata: {
            wordCount,
            readingTime: Math.ceil(wordCount / 200), // Assuming 200 words per minute
            seoScore: this.calculateSEOScore(content, sanitizedRequest.keywords),
            topics: this.extractTopics(content),
            keywordDensity: this.calculateKeywordDensity(content, sanitizedRequest.keywords || []),
            generatedAt: new Date(),
            model: 'gpt-4-mock'
          }
        };

        return {
          success: true,
          data: generatedContent,
          metadata: {
            requestId: generateId(),
            timestamp: new Date(),
            processingTime: 2000, // Mock processing time
            tokensUsed: this.estimateTokens(content)
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

  private async generateContentByType(request: ContentGenerationRequest): Promise<string> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    switch (request.type) {
      case 'blog-post':
        return this.generateBlogPost(request);
      case 'case-study':
        return this.generateCaseStudy(request);
      case 'technical-doc':
        return this.generateTechnicalDoc(request);
      case 'email':
        return this.generateEmail(request);
      case 'proposal':
        return this.generateProposal(request);
      default:
        throw new Error(`Unsupported content type: ${request.type}`);
    }
  }

  private async generateBlogPost(request: ContentGenerationRequest): Promise<string> {
    const { topic, audience = 'general', tone = 'professional', length = 'medium', keywords = [], context } = request;
    
    // This is a mock implementation - replace with actual AI generation
    const lengthMap = {
      short: { words: '500-800', sections: 3 },
      medium: { words: '1200-1800', sections: 5 },
      long: { words: '2000-3000', sections: 7 }
    } as const;

    const _targetLength = lengthMap[length];

    return `# ${topic}: A Comprehensive Guide for ${audience}

## Introduction

In today's rapidly evolving technology landscape, ${topic.toLowerCase()} has become increasingly important for ${audience.toLowerCase()}. This comprehensive guide will explore the key concepts, best practices, and implementation strategies that can help you achieve success.

${context ? `\n**Context**: ${context}\n` : ''}

## Understanding ${topic}

${this.generateSection(topic, 'overview', tone, audience)}

## Key Benefits and Advantages

${this.generateSection(topic, 'benefits', tone, audience)}

## Implementation Strategy

${this.generateSection(topic, 'implementation', tone, audience)}

## Best Practices

${this.generateSection(topic, 'best-practices', tone, audience)}

${length !== 'short' ? `
## Common Challenges and Solutions

${this.generateSection(topic, 'challenges', tone, audience)}

## Case Studies and Examples

${this.generateSection(topic, 'examples', tone, audience)}
` : ''}

${length === 'long' ? `
## Advanced Considerations

${this.generateSection(topic, 'advanced', tone, audience)}

## Future Trends and Predictions

${this.generateSection(topic, 'future', tone, audience)}
` : ''}

## Conclusion

Implementing ${topic.toLowerCase()} successfully requires careful planning, the right expertise, and a strategic approach. At Astro Intelligence, we've helped numerous organizations achieve their goals through our proven methodologies and hands-on experience.

${keywords.length > 0 ? `\n**Keywords**: ${keywords.join(', ')}` : ''}

---

*Ready to get started with ${topic.toLowerCase()}? [Schedule a consultation](https://saadjamal.com/contact) to discuss your specific requirements and learn how we can help you achieve measurable results.*`;
  }

  private generateCaseStudy(request: ContentGenerationRequest): Promise<string> {
    const { topic, audience: _audience, tone: _tone, context } = request;

    return Promise.resolve(`# Case Study: ${topic}

## Executive Summary

This case study examines how our client successfully implemented ${topic.toLowerCase()} to achieve significant business outcomes. Through strategic planning and expert execution, we delivered measurable results that exceeded expectations.

## Client Background

${context || 'Our client is a leading organization in their industry, facing challenges with scalability, cost optimization, and operational efficiency.'}

## Challenge

The client was experiencing several critical issues:
- Increasing operational costs without proportional value
- Scalability limitations affecting growth potential
- Manual processes leading to inefficiencies
- Need for modern, future-proof solutions

## Solution

Our approach involved a comprehensive strategy:

### Phase 1: Assessment and Planning
- Detailed analysis of current state
- Identification of optimization opportunities
- Development of implementation roadmap
- Stakeholder alignment and buy-in

### Phase 2: Implementation
- Deployment of optimized solutions
- Integration with existing systems
- Team training and knowledge transfer
- Continuous monitoring and adjustment

### Phase 3: Optimization and Scale
- Performance monitoring and tuning
- Scaling successful implementations
- Ongoing support and maintenance
- Continuous improvement processes

## Results

The implementation delivered exceptional outcomes:
- **30% reduction** in operational costs
- **5x improvement** in deployment speed
- **99.9% uptime** reliability achieved
- **ROI of 300%** within the first year

## Key Learnings

This project highlighted several important factors for success:
1. Thorough planning and stakeholder engagement
2. Phased approach to minimize risk
3. Continuous monitoring and optimization
4. Strong partnership between teams

## Conclusion

This case study demonstrates the tangible benefits of implementing ${topic.toLowerCase()} with the right expertise and approach. The results speak for themselves, and the client continues to see ongoing value from our solutions.

---

*Interested in similar results for your organization? [Contact us](https://saadjamal.com/contact) to discuss how we can help you achieve your goals.*`);
  }

  private generateTechnicalDoc(request: ContentGenerationRequest): Promise<string> {
    const { topic, context, keywords = [] } = request;

    return Promise.resolve(`# ${topic} - Technical Documentation

## Overview

This document provides comprehensive technical guidance for implementing and managing ${topic.toLowerCase()}. It covers architecture, implementation details, best practices, and troubleshooting procedures.

## Prerequisites

Before beginning implementation, ensure you have:
- Appropriate system access and permissions
- Required software and tools installed
- Understanding of core concepts and terminology
- Backup and rollback procedures in place

## Architecture Overview

${this.generateTechnicalSection('architecture', topic)}

## Implementation Guide

### Step 1: Environment Preparation
${this.generateTechnicalSection('preparation', topic)}

### Step 2: Configuration
${this.generateTechnicalSection('configuration', topic)}

### Step 3: Deployment
${this.generateTechnicalSection('deployment', topic)}

### Step 4: Validation
${this.generateTechnicalSection('validation', topic)}

## Configuration Reference

### Core Settings
\`\`\`yaml
# Example configuration for ${topic}
${this.generateConfigExample(topic)}
\`\`\`

### Advanced Options
${this.generateTechnicalSection('advanced-config', topic)}

## Monitoring and Maintenance

### Health Checks
${this.generateTechnicalSection('monitoring', topic)}

### Performance Optimization
${this.generateTechnicalSection('optimization', topic)}

## Troubleshooting

### Common Issues
${this.generateTechnicalSection('troubleshooting', topic)}

### Diagnostic Commands
\`\`\`bash
# Diagnostic commands for ${topic}
${this.generateDiagnosticCommands(topic)}
\`\`\`

## Security Considerations

${this.generateTechnicalSection('security', topic)}

## API Reference

${this.generateAPIReference(topic)}

---

${context ? `**Context**: ${context}` : ''}
${keywords.length > 0 ? `**Keywords**: ${keywords.join(', ')}` : ''}

*For additional support or questions, contact our technical team at [support@astrointelligence.com](mailto:support@astrointelligence.com)*`);
  }

  private generateEmail(request: ContentGenerationRequest): Promise<string> {
    const { topic, audience = 'general', tone = 'professional', context } = request;

    const subjects = {
      professional: `${topic}: Strategic Implementation for ${audience}`,
      casual: `Let's talk about ${topic}`,
      persuasive: `Transform Your Business with ${topic}`,
      educational: `Understanding ${topic}: A Guide for ${audience}`
    } as const;

    return Promise.resolve(`Subject: ${subjects[tone] || subjects.professional}

Dear [Name],

I hope this email finds you well. I'm reaching out regarding ${topic.toLowerCase()} and how it could benefit your organization.

${context ? `Based on our previous conversation about ${context}, ` : ''}I believe there's a significant opportunity to help you achieve your goals through strategic implementation of ${topic.toLowerCase()}.

**Key Benefits for Your Organization:**
• Reduce operational costs by up to 30%
• Improve efficiency and scalability
• Implement best practices and industry standards
• Achieve measurable ROI within 6-12 months

**Next Steps:**
I'd love to schedule a brief consultation to discuss your specific requirements and explore how we can help. Our initial consultations are complimentary and typically last 30-45 minutes.

Would you be available for a call next week? I have openings on:
• Tuesday at 2:00 PM EST
• Wednesday at 10:00 AM EST  
• Thursday at 3:00 PM EST

Please let me know what works best for your schedule, or feel free to suggest an alternative time.

Best regards,

Saad Jamal
Founder & Cloud Engineer
Astro Intelligence
📧 saad@astrointelligence.com
📞 [Phone Number]
🌐 https://saadjamal.com

P.S. You can also book a consultation directly at saadjamal.com/contact if that's more convenient.`);
  }

  private generateProposal(request: ContentGenerationRequest): Promise<string> {
    const { topic, audience: _audience, context, keywords = [] } = request;

    return Promise.resolve(`# Proposal: ${topic} Implementation

**Prepared for**: [Client Name]
**Prepared by**: Astro Intelligence
**Date**: ${new Date().toLocaleDateString()}
**Valid until**: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}

## Executive Summary

Astro Intelligence proposes to implement ${topic.toLowerCase()} for your organization, delivering measurable results and significant return on investment. Our proven methodology and expertise will help you achieve your strategic objectives while minimizing risk and disruption.

${context ? `\n**Project Context**: ${context}\n` : ''}

## Proposed Solution

### Approach
Our implementation follows a proven three-phase methodology:

**Phase 1: Discovery & Planning (2-3 weeks)**
- Comprehensive assessment of current state
- Requirements gathering and analysis
- Solution architecture and design
- Project planning and timeline development

**Phase 2: Implementation (4-8 weeks)**
- Solution deployment and configuration
- Integration with existing systems
- Testing and quality assurance
- Team training and knowledge transfer

**Phase 3: Optimization & Support (Ongoing)**
- Performance monitoring and tuning
- Continuous optimization
- Ongoing support and maintenance
- Regular review and improvement

### Deliverables
- Detailed implementation plan
- Configured and tested solution
- Documentation and training materials
- Ongoing support and maintenance
- Regular progress reports and metrics

## Expected Outcomes

Based on our experience with similar implementations:
- **30% reduction** in operational costs
- **5x improvement** in efficiency metrics
- **99.9% reliability** and uptime
- **ROI of 250-400%** within 12 months

## Investment & Timeline

### Project Investment
- **Discovery & Planning**: $[Amount]
- **Implementation**: $[Amount]
- **Ongoing Support**: $[Amount]/month

**Total Project Investment**: $[Total Amount]

### Timeline
- Project start: [Start Date]
- Phase 1 completion: [Date]
- Phase 2 completion: [Date]
- Go-live: [Date]

## Why Choose Astro Intelligence

- **Proven Track Record**: Successfully delivered 50+ similar projects
- **Expert Team**: Certified cloud engineers and AI specialists
- **Methodology**: Proven approach that minimizes risk and maximizes value
- **Support**: Comprehensive ongoing support and optimization
- **Results**: Measurable outcomes and guaranteed ROI

## Next Steps

1. **Review and Approval**: Review this proposal and provide feedback
2. **Contract Execution**: Sign service agreement and SOW
3. **Project Kickoff**: Begin discovery phase within 1 week
4. **Regular Updates**: Weekly progress reports and milestone reviews

## Terms & Conditions

- Payment terms: 50% upfront, 50% upon completion
- Project timeline contingent on client resource availability
- Change requests will be managed through formal change control process
- All work covered by our standard service level agreement

---

${keywords.length > 0 ? `**Keywords**: ${keywords.join(', ')}` : ''}

**Contact Information**:
Saad Jamal, Founder & Cloud Engineer
📧 saad@astrointelligence.com
📞 [Phone Number]
🌐 https://saadjamal.com

*This proposal is confidential and proprietary to Astro Intelligence.*`);
  }

  private generateSection(topic: string, sectionType: string, tone: string, audience: string): string {
    // Mock section generation - replace with actual AI generation
    const sections = {
      overview: `Understanding ${topic} is crucial for ${audience.toLowerCase()} looking to stay competitive in today's market. This technology offers significant advantages in terms of efficiency, cost reduction, and scalability.`,
      benefits: `The key benefits of implementing ${topic.toLowerCase()} include reduced operational costs, improved performance, enhanced security, and better scalability. Organizations typically see ROI within 6-12 months.`,
      implementation: `Successful implementation requires careful planning, proper resource allocation, and expert guidance. Our proven methodology ensures smooth deployment with minimal disruption to operations.`,
      'best-practices': `Following industry best practices is essential for success. This includes proper planning, stakeholder engagement, phased rollout, continuous monitoring, and ongoing optimization.`,
      challenges: `Common challenges include legacy system integration, change management, resource constraints, and technical complexity. With proper planning and expertise, these challenges can be effectively addressed.`,
      examples: `We've successfully implemented similar solutions for clients across various industries, consistently delivering 30% cost reductions and 5x performance improvements.`,
      advanced: `Advanced implementations can include custom integrations, multi-region deployments, advanced analytics, and automated optimization capabilities.`,
      future: `Future trends indicate increasing adoption of AI-driven optimization, enhanced automation capabilities, and deeper integration with emerging technologies.`
    };

    return (sections as Record<string, string>)[sectionType] || `This section covers important aspects of ${topic} for ${audience.toLowerCase()}.`;
  }

  private generateTechnicalSection(sectionType: string, topic: string): string {
    const sections = {
      architecture: `The architecture for ${topic} follows a distributed, scalable design with the following components:\n- Core processing layer\n- Data storage and caching\n- API gateway and routing\n- Monitoring and logging\n- Security and access control`,
      preparation: `Prepare the environment by:\n1. Installing required dependencies\n2. Configuring network and security settings\n3. Setting up monitoring and logging\n4. Preparing backup and recovery procedures`,
      configuration: `Configure the system by:\n1. Setting up core configuration files\n2. Configuring database connections\n3. Setting up authentication and authorization\n4. Configuring monitoring and alerting`,
      deployment: `Deploy using the following steps:\n1. Deploy core services\n2. Configure load balancing and routing\n3. Set up monitoring and health checks\n4. Perform smoke tests and validation`,
      validation: `Validate the deployment by:\n1. Running functional tests\n2. Performing load testing\n3. Validating security configurations\n4. Confirming monitoring and alerting`,
      'advanced-config': `Advanced configuration options include:\n- Custom routing rules\n- Advanced security settings\n- Performance optimization parameters\n- Integration with external systems`,
      monitoring: `Monitor system health using:\n- Application performance metrics\n- Infrastructure monitoring\n- Log analysis and alerting\n- User experience monitoring`,
      optimization: `Optimize performance through:\n- Resource allocation tuning\n- Cache configuration optimization\n- Database query optimization\n- Network and connection pooling`,
      troubleshooting: `Common issues and solutions:\n- Connection timeouts: Check network configuration\n- Performance issues: Review resource allocation\n- Authentication failures: Verify credentials and permissions\n- Configuration errors: Validate configuration syntax`,
      security: `Security considerations include:\n- Network security and firewall rules\n- Authentication and authorization\n- Data encryption in transit and at rest\n- Regular security updates and patches`
    };

    return (sections as Record<string, string>)[sectionType] || `Technical details for ${topic} ${sectionType}.`;
  }

  private generateConfigExample(topic: string): string {
    return `# ${topic} Configuration
name: ${topic.toLowerCase().replace(/\s+/g, '-')}
version: "1.0"
environment: production

services:
  api:
    port: 8080
    timeout: 30s
  database:
    host: localhost
    port: 5432
    ssl: true
  
monitoring:
  enabled: true
  interval: 60s
  
security:
  tls:
    enabled: true
    cert_file: /path/to/cert.pem
    key_file: /path/to/key.pem`;
  }

  private generateDiagnosticCommands(topic: string): string {
    return `# Check service status
systemctl status ${topic.toLowerCase().replace(/\s+/g, '-')}

# View logs
journalctl -u ${topic.toLowerCase().replace(/\s+/g, '-')} -f

# Check configuration
config validate /etc/${topic.toLowerCase().replace(/\s+/g, '-')}/config.yaml

# Performance metrics
curl -s http://localhost:8080/metrics | grep -E "(cpu|memory|requests)"

# Network connectivity
netstat -tulpn | grep :8080`;
  }

  private generateAPIReference(_topic: string): string {
    return `### Endpoints

#### GET /api/v1/status
Returns system status and health information.

**Response:**
\`\`\`json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2024-01-01T00:00:00Z"
}
\`\`\`

#### POST /api/v1/configure
Updates system configuration.

**Request:**
\`\`\`json
{
  "key": "value",
  "settings": {}
}
\`\`\`

#### GET /api/v1/metrics
Returns performance metrics and statistics.`;
  }

  private countWords(text: string): number {
    return text.trim().split(/\s+/).length;
  }

  private calculateSEOScore(content: string, keywords?: string[]): number {
    if (!keywords || keywords.length === 0) return 0;

    const lowerContent = content.toLowerCase();
    const keywordCount = keywords.reduce((count, keyword) => {
      return count + (lowerContent.match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
    }, 0);

    // Simple SEO score based on keyword density (aim for 1-3%)
    const wordCount = this.countWords(content);
    const density = (keywordCount / wordCount) * 100;
    
    if (density >= 1 && density <= 3) return 90;
    if (density >= 0.5 && density < 1) return 70;
    if (density > 3 && density <= 5) return 60;
    return 40;
  }

  private generateTitle(request: ContentGenerationRequest): string {
    const { type, topic, audience } = request;
    
    switch (type) {
      case 'blog-post':
        return `${topic}: A Comprehensive Guide${audience ? ` for ${audience}` : ''}`;
      case 'case-study':
        return `Case Study: ${topic} Transformation Success`;
      case 'technical-doc':
        return `Technical Documentation: ${topic}`;
      case 'email':
        return `Re: ${topic}`;
      case 'proposal':
        return `Proposal: ${topic} Implementation`;
      default:
        return topic;
    }
  }

  private generateSummary(content: string): string {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
    const maxSentences = Math.min(3, sentences.length);
    const firstSentences = sentences.slice(0, maxSentences).join('. ');
    return firstSentences + (firstSentences.endsWith('.') ? '' : '.');
  }

  private extractTopics(content: string): string[] {
    const commonTopics = [
      'AI', 'Machine Learning', 'Cloud Computing', 'Data Analytics',
      'Digital Transformation', 'Automation', 'Security', 'Performance',
      'Scalability', 'Innovation', 'Technology', 'Strategy'
    ];
    
    const contentLower = content.toLowerCase();
    return commonTopics.filter(topic => 
      contentLower.includes(topic.toLowerCase())
    );
  }

  private calculateKeywordDensity(content: string, keywords: string[]): Record<string, number> {
    const words = content.toLowerCase().split(/\s+/);
    const density: Record<string, number> = {};
    
    keywords.forEach(keyword => {
      const keywordLower = keyword.toLowerCase();
      const count = words.filter(word => word.includes(keywordLower)).length;
      density[keyword] = (count / words.length) * 100;
    });
    
    return density;
  }

  private estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }

  private generateSuggestions(request: ContentGenerationRequest, content: string): string[] {
    const suggestions: string[] = [];
    
    if (request.keywords && request.keywords.length > 0) {
      const lowerContent = content.toLowerCase();
      const missingKeywords = request.keywords.filter(
        keyword => !lowerContent.includes(keyword.toLowerCase())
      );
      
      if (missingKeywords.length > 0) {
        suggestions.push(`Consider including these keywords: ${missingKeywords.join(', ')}`);
      }
    }

    const wordCount = this.countWords(content);
    if (wordCount < 300) {
      suggestions.push('Consider expanding the content for better SEO and reader engagement');
    }

    if (!content.includes('[') && request.type !== 'email') {
      suggestions.push('Add internal links to other relevant pages or resources');
    }

    if (request.type === 'blog-post' && !content.includes('##')) {
      suggestions.push('Add more subheadings to improve readability and structure');
    }

    return suggestions;
  }
}

export const contentGenerator = ContentGenerator.getInstance();