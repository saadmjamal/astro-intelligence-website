import { Testimonial } from '@/components/ui/Testimonial';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    content: 'Saad and his team transformed our entire cloud infrastructure, reducing costs by 60% while improving performance by 3x. Their expertise in AWS optimization is unmatched.',
    author: {
      name: 'Sarah Chen',
      title: 'CTO',
      company: 'TechStart Inc',
      image: '/images/testimonials/sarah-chen.svg',
    },
    rating: 5,
    project: 'Cloud Migration & Optimization',
    featured: true,
  },
  {
    id: '2',
    content: 'The AI-powered analytics pipeline they built for us processes millions of events daily with 99.9% uptime. Incredible engineering and attention to detail.',
    author: {
      name: 'Marcus Rodriguez',
      title: 'VP of Engineering',
      company: 'DataFlow Systems',
    },
    rating: 5,
    project: 'Real-time Analytics Platform',
    featured: true,
  },
  {
    id: '3',
    content: 'Their Kubernetes expertise helped us scale from 10K to 1M users seamlessly. The auto-scaling solution they implemented saved us hundreds of thousands in infrastructure costs.',
    author: {
      name: 'Emily Watson',
      title: 'Head of Infrastructure',
      company: 'ScaleUp.io',
    },
    rating: 5,
    project: 'Kubernetes Migration',
  },
  {
    id: '4',
    content: 'Astro Intelligence didn\'t just deliver a solution; they transformed how we think about DevOps. Their CI/CD pipeline reduced our deployment time from hours to minutes.',
    author: {
      name: 'David Park',
      title: 'Engineering Manager',
      company: 'FinTech Solutions',
      image: '/images/testimonials/david-park.svg',
    },
    rating: 5,
    project: 'DevOps Transformation',
  },
  {
    id: '5',
    content: 'The machine learning models they developed increased our prediction accuracy by 40%. Their deep understanding of both ML and production systems is rare to find.',
    author: {
      name: 'Lisa Thompson',
      title: 'Director of Data Science',
      company: 'PredictiveAI Corp',
    },
    rating: 5,
    project: 'ML Pipeline Development',
    featured: true,
  },
  {
    id: '6',
    content: 'Working with Saad was transformative for our platform. The serverless architecture he designed handles 10x traffic spikes effortlessly while keeping costs minimal.',
    author: {
      name: 'Ahmed Hassan',
      title: 'Founder & CEO',
      company: 'CloudNative Startup',
    },
    rating: 5,
    project: 'Serverless Architecture',
  },
  {
    id: '7',
    content: 'Their security audit revealed critical vulnerabilities we had missed. The comprehensive security framework they implemented gives us peace of mind.',
    author: {
      name: 'Rachel Green',
      title: 'CISO',
      company: 'SecureBank',
      image: '/images/testimonials/rachel-green.svg',
    },
    rating: 5,
    project: 'Security Audit & Implementation',
  },
  {
    id: '8',
    content: 'The automation scripts they developed saved our team 30+ hours per week. Their attention to edge cases and error handling is exceptional.',
    author: {
      name: 'Tom Wilson',
      title: 'DevOps Lead',
      company: 'AutomateNow',
    },
    rating: 5,
    project: 'Infrastructure Automation',
  },
];

// Get featured testimonials
export const featuredTestimonials = testimonials.filter(t => t.featured);

// Get testimonials by project type
export const getTestimonialsByProject = (project: string) => 
  testimonials.filter(t => t.project?.toLowerCase().includes(project.toLowerCase()));

// Get random testimonials
export const getRandomTestimonials = (count: number) => {
  const shuffled = [...testimonials].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};