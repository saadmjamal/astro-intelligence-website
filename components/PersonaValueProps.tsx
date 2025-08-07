'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  BriefcaseIcon, 
  ServerIcon, 
  UsersIcon,
  TrendingDownIcon,
  ShieldCheckIcon,
  RocketIcon,
  CodeIcon,
  CloudIcon,
  WorkflowIcon
} from 'lucide-react';

const personas = [
  {
    id: 'cio',
    title: 'For IT Executives',
    role: 'CIO / IT Director',
    icon: BriefcaseIcon,
    benefits: [
      { icon: TrendingDownIcon, text: 'Reduce cloud costs by 30%+ with AI optimization' },
      { icon: ShieldCheckIcon, text: 'Ensure compliance with ethical AI governance' },
      { icon: RocketIcon, text: 'Achieve 40% faster time-to-market' }
    ],
    description: 'Strategic cloud transformation that delivers measurable ROI while maintaining enterprise security and compliance standards.',
    cta: 'Schedule Executive Briefing',
    ctaLink: '/contact?type=executive',
    color: 'from-blue-600/20 to-blue-600/5'
  },
  {
    id: 'sysadmin',
    title: 'For IT Teams',
    role: 'SysAdmin / Cloud Ops',
    icon: ServerIcon,
    benefits: [
      { icon: CodeIcon, text: 'Automate repetitive tasks with intelligent scripts' },
      { icon: CloudIcon, text: 'Multi-cloud orchestration (AWS, Azure, GCP)' },
      { icon: WorkflowIcon, text: 'Self-healing infrastructure with AI monitoring' }
    ],
    description: 'Powerful automation tools that integrate seamlessly with your existing infrastructure and reduce manual workload by 70%.',
    cta: 'Start Free Trial',
    ctaLink: '/contact?type=trial',
    color: 'from-green-600/20 to-green-600/5'
  },
  {
    id: 'devops',
    title: 'For Dev Teams',
    role: 'DevOps / Engineering Lead',
    icon: UsersIcon,
    benefits: [
      { icon: RocketIcon, text: 'Deploy environments 5× faster' },
      { icon: WorkflowIcon, text: 'Automated CI/CD pipeline optimization' },
      { icon: ShieldCheckIcon, text: 'Built-in security and compliance checks' }
    ],
    description: 'Accelerate your development lifecycle with intelligent automation that removes bottlenecks and improves team productivity.',
    cta: 'Request Team Demo',
    ctaLink: '/contact?type=team-demo',
    color: 'from-purple-600/20 to-purple-600/5'
  }
];

export default function PersonaValueProps() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Heading as="h2" variant="h2" className="mb-4">
            Solutions Tailored to Your Role
          </Heading>
          <Text variant="lead" className="max-w-3xl mx-auto text-muted-foreground">
            Whether you're making strategic decisions, managing infrastructure, or leading development teams, 
            our AI-powered solutions deliver value that matters to you.
          </Text>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 grid-gap-md">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card hover className="h-full card-padding relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${persona.color}`} />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <persona.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <Heading as="h3" variant="h5" className="mb-1">
                        {persona.title}
                      </Heading>
                      <Text variant="small" className="text-muted-foreground">
                        {persona.role}
                      </Text>
                    </div>
                  </div>

                  <Text variant="body" className="mb-6">
                    {persona.description}
                  </Text>

                  <div className="space-y-3 mb-8">
                    {persona.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <benefit.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <Text variant="small" className="text-muted-foreground">
                          {benefit.text}
                        </Text>
                      </div>
                    ))}
                  </div>

                  <Button variant="secondary" asChild className="w-full">
                    <Link href={persona.ctaLink}>
                      {persona.cta}
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Text variant="small" className="text-muted-foreground">
            Not sure which solution fits your needs? 
            <Link href="/contact" className="text-primary hover:underline ml-1">
              Let's discuss your requirements
            </Link>
          </Text>
        </motion.div>
      </div>
    </section>
  );
}