/**
 * AI Configuration and Constants
 * Central configuration for AI services, intents, and behavior patterns
 */

import type { AIConfig, UserProfile } from '@/types/ai';

// AI Service Configuration
export const AI_CONFIG: AIConfig = {
  models: {
    chat: 'gpt-4',
    recommendations: 'gpt-4',
    content: 'gpt-4',
  },
  limits: {
    messagesPerHour: 20,
    recommendationsPerHour: 30,
    contentGenerationsPerHour: 10,
    maxTokensPerRequest: 2000,
  },
  features: {
    chatEnabled: true,
    recommendationsEnabled: true,
    contentGenerationEnabled: true,
    analyticsEnabled: true,
  },
};

// Service Keywords and Categories
export const SERVICE_KEYWORDS = {
  'AI Consulting': [
    'artificial intelligence', 'machine learning', 'ai strategy', 'ai implementation',
    'ml models', 'deep learning', 'neural networks', 'ai transformation', 'automation',
    'intelligent systems', 'ai ethics', 'responsible ai', 'ai governance'
  ],
  'Cloud Architecture': [
    'cloud migration', 'aws', 'azure', 'gcp', 'kubernetes', 'docker', 'microservices',
    'serverless', 'cloud native', 'infrastructure', 'devops', 'scalability',
    'cloud optimization', 'multi-cloud', 'hybrid cloud'
  ],
  'ML Engineering': [
    'mlops', 'model deployment', 'data pipeline', 'feature engineering', 'model training',
    'data science', 'analytics', 'big data', 'data platform', 'ml infrastructure',
    'model monitoring', 'a/b testing', 'experimentation'
  ],
  'Strategic Partnerships': [
    'technology partnerships', 'vendor selection', 'integration strategy',
    'enterprise solutions', 'digital transformation', 'technology roadmap',
    'innovation strategy', 'competitive analysis', 'market research'
  ],
};

// Intent Patterns for Chat Classification
export const INTENT_PATTERNS = {
  greeting: [
    /^(hi|hello|hey|good morning|good afternoon|good evening)/i,
    /^(greetings|salutations|howdy)/i,
  ],
  service_inquiry: [
    /\b(service|consulting|help|solution|expertise|project)\b/i,
    /\b(need|want|looking for|interested in|require)\b/i,
  ],
  pricing: [
    /\b(price|cost|fee|budget|quote|estimate|pricing)\b/i,
    /\b(how much|what does it cost|affordable)\b/i,
  ],
  technical: [
    /\b(technical|architecture|implementation|integration|development)\b/i,
    /\b(api|database|infrastructure|deployment|security)\b/i,
  ],
  timeline: [
    /\b(when|timeline|schedule|delivery|duration|how long)\b/i,
    /\b(urgent|asap|immediate|quickly)\b/i,
  ],
  portfolio: [
    /\b(portfolio|case study|examples|previous work|experience)\b/i,
    /\b(clients|projects|success stories)\b/i,
  ],
};

// AI Response Templates
export const RESPONSE_TEMPLATES = {
  greeting: [
    "Hello! I'm your AI assistant for Astro Intelligence. I'm here to help you explore our AI and cloud services. What brings you here today?",
    "Hi there! Welcome to Astro Intelligence. I can help you learn about our consulting services, discuss your technology challenges, or answer any questions you have.",
    "Greetings! I'm here to assist you with information about our AI consulting, cloud architecture, and ML engineering services. How can I help?",
  ],
  service_overview: [
    "Astro Intelligence specializes in four key areas: AI Consulting (strategy and implementation), Cloud Architecture (scalable infrastructure), ML Engineering (production-ready models), and Strategic Partnerships (technology vendor relationships).",
    "We offer comprehensive technology consulting across AI strategy, cloud infrastructure design, machine learning implementation, and strategic technology partnerships.",
  ],
  technical_expertise: [
    "Our technical expertise spans modern cloud platforms (AWS, Azure, GCP), AI/ML frameworks (TensorFlow, PyTorch, LangChain), and enterprise architectures (microservices, Kubernetes, serverless).",
    "We work with cutting-edge technologies including large language models, vector databases, cloud-native architectures, and production ML systems.",
  ],
  next_steps: [
    "Would you like to schedule a consultation to discuss your specific needs? I can also provide more details about any of our services.",
    "I'd be happy to connect you with our team for a detailed discussion about your project. What's the best way to move forward?",
  ],
};

// User Profile Defaults and Classifications
export const DEFAULT_USER_PROFILE: UserProfile = {
  industry: 'technology',
  companySize: 'medium',
  technicalLevel: 'intermediate',
  challenges: [],
  interests: [],
};

export const INDUSTRY_CLASSIFICATIONS = {
  technology: ['tech', 'software', 'saas', 'startup', 'fintech'],
  healthcare: ['health', 'medical', 'pharma', 'biotech', 'hospital'],
  finance: ['finance', 'banking', 'insurance', 'investment', 'trading'],
  retail: ['retail', 'ecommerce', 'consumer', 'marketplace', 'fashion'],
  manufacturing: ['manufacturing', 'industrial', 'automotive', 'aerospace'],
  education: ['education', 'university', 'school', 'learning', 'training'],
  government: ['government', 'public', 'federal', 'state', 'municipal'],
  nonprofit: ['nonprofit', 'ngo', 'charity', 'foundation', 'social'],
};

export const COMPANY_SIZE_INDICATORS = {
  startup: ['startup', 'early stage', 'seed', 'series a', 'small team'],
  small: ['small business', 'sme', '10-50', 'growing', 'local'],
  medium: ['mid-size', '50-500', 'established', 'regional', 'expanding'],
  enterprise: ['enterprise', 'large', '500+', 'multinational', 'fortune'],
};

// AI Model Settings
export const MODEL_SETTINGS = {
  chat: {
    temperature: 0.7,
    maxTokens: 500,
    topP: 0.9,
    presencePenalty: 0.1,
    frequencyPenalty: 0.1,
  },
  recommendations: {
    temperature: 0.3,
    maxTokens: 800,
    topP: 0.8,
    presencePenalty: 0.0,
    frequencyPenalty: 0.0,
  },
  content: {
    temperature: 0.8,
    maxTokens: 1500,
    topP: 0.9,
    presencePenalty: 0.2,
    frequencyPenalty: 0.1,
  },
};

// Rate Limiting Configuration
export const RATE_LIMITS = {
  chat: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // 20 messages per hour
    message: 'Too many chat messages. Please try again later.',
  },
  recommendations: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 30, // 30 requests per hour
    message: 'Too many recommendation requests. Please try again later.',
  },
  content: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // 10 generations per hour
    message: 'Content generation limit reached. Please try again later.',
  },
};

// Analytics Configuration
export const ANALYTICS_CONFIG = {
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
  trackingEnabled: true,
  metricsRetention: 90, // days
  aggregationInterval: 5 * 60 * 1000, // 5 minutes
};