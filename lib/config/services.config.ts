export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  features: string[];
  benefits: string[];
  cta: {
    text: string;
    href: string;
  };
}

export const services: Service[] = [
  {
    id: 'ai-consulting',
    title: 'AI Consulting',
    slug: 'ai-consulting',
    description: 'Strategic AI implementation and transformation services.',
    longDescription: `Transform your business with cutting-edge AI solutions. Our expert consultants help you navigate the AI landscape, 
    identify opportunities, and implement solutions that drive real business value.`,
    icon: '🤖',
    features: [
      'AI strategy development',
      'Use case identification',
      'Technology selection',
      'Implementation roadmap',
      'ROI analysis',
    ],
    benefits: [
      'Accelerate digital transformation',
      'Improve operational efficiency',
      'Enhance customer experience',
      'Data-driven decision making',
    ],
    cta: {
      text: 'Start Your AI Journey',
      href: '/contact?service=ai-consulting',
    },
  },
  {
    id: 'cloud-architecture',
    title: 'Cloud Architecture',
    slug: 'cloud-architecture',
    description: 'Scalable, secure cloud solutions designed for the future.',
    longDescription: `Build robust, scalable cloud infrastructure that grows with your business. 
    Our cloud architects design solutions optimized for performance, security, and cost-efficiency.`,
    icon: '☁️',
    features: [
      'Multi-cloud strategy',
      'Migration planning',
      'Security architecture',
      'Cost optimization',
      'DevOps implementation',
    ],
    benefits: [
      'Reduced infrastructure costs',
      'Improved scalability',
      'Enhanced security posture',
      'Faster time to market',
    ],
    cta: {
      text: 'Design Your Cloud Strategy',
      href: '/contact?service=cloud-architecture',
    },
  },
  {
    id: 'ml-engineering',
    title: 'ML Engineering',
    slug: 'ml-engineering',
    description: 'Production-ready machine learning systems that deliver results.',
    longDescription: `Turn your data into intelligent systems. Our ML engineers build and deploy 
    production-grade machine learning solutions that solve real business problems.`,
    icon: '🧠',
    features: [
      'Custom model development',
      'MLOps pipeline setup',
      'Model optimization',
      'Real-time inference',
      'Monitoring & maintenance',
    ],
    benefits: [
      'Automated decision-making',
      'Predictive insights',
      'Process optimization',
      'Competitive advantage',
    ],
    cta: {
      text: 'Build ML Solutions',
      href: '/contact?service=ml-engineering',
    },
  },
  {
    id: 'strategic-partnerships',
    title: 'Strategic Partnerships',
    slug: 'strategic-partnerships',
    description: 'Collaborative partnerships to accelerate your AI initiatives.',
    longDescription: `Partner with us for long-term success. We work alongside your team, 
    providing expertise, resources, and support to ensure your AI initiatives succeed.`,
    icon: '🤝',
    features: [
      'Dedicated AI team',
      'Knowledge transfer',
      'Co-innovation programs',
      'Flexible engagement models',
      'Ongoing support',
    ],
    benefits: [
      'Access to AI expertise',
      'Reduced project risk',
      'Accelerated innovation',
      'Sustainable growth',
    ],
    cta: {
      text: 'Explore Partnership Options',
      href: '/contact?service=strategic-partnerships',
    },
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
