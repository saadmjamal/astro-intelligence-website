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
    id: 'cfo',
    title: 'For Finance Leaders',
    role: 'CFO / FP&A',
    icon: BriefcaseIcon,
    benefits: [
      { icon: TrendingDownIcon, text: 'Cut run‑rate opex 20–40% within 90 days' },
      { icon: ShieldCheckIcon, text: 'Audit‑ready controls, PII redaction, tenant‑isolated data' },
      { icon: RocketIcon, text: 'ROI dashboard with payback, sensitivity, and telemetry' }
    ],
    description: 'Outcome‑first automation and copilots with executive‑grade ROI and governance. Proven path from pilot to production in 6–12 weeks.',
    cta: 'Get ROI Model',
    ctaLink: '/contact?asset=roi-model',
    color: 'from-amber-600/20 to-amber-600/5'
  },
  {
    id: 'cio',
    title: 'For IT Executives',
    role: 'CIO / IT Director',
    icon: ServerIcon,
    benefits: [
      { icon: CodeIcon, text: 'Deploy copilots on Azure/AWS/GCP with existing SSO' },
      { icon: CloudIcon, text: 'Integrations: M365, ServiceNow, Slack, Snowflake/Databricks' },
      { icon: WorkflowIcon, text: '6–12 week pilots with production rollout playbooks' }
    ],
    description: 'Low‑risk rollout on your cloud with deep system fit, observability, and SLAs. Built for scale and maintainability.',
    cta: 'See 6‑Week Plan',
    ctaLink: '/contact?plan=6-weeks',
    color: 'from-blue-600/20 to-blue-600/5'
  },
  {
    id: 'ciso',
    title: 'For Security & Risk',
    role: 'CISO / Risk',
    icon: ShieldCheckIcon,
    benefits: [
      { icon: ShieldCheckIcon, text: 'Data stays in tenant, access controls and audit trails' },
      { icon: WorkflowIcon, text: 'Evals for hallucinations, PII, and jailbreaks' },
      { icon: RocketIcon, text: 'Policy‑as‑code guardrails and prompt/model logging' }
    ],
    description: 'Privacy by design and compliance from day one. SOC 2 badges and evidence artifacts ready for audit.',
    cta: 'Review Controls',
    ctaLink: '/contact?type=security-review',
    color: 'from-emerald-600/20 to-emerald-600/5'
  },
  {
    id: 'sysadmin',
    title: 'For IT Teams',
    role: 'SysAdmin / Cloud Ops',
    icon: ServerIcon,
    benefits: [
      { icon: CodeIcon, text: 'Automate toil with reliable copilots and runbooks' },
      { icon: CloudIcon, text: 'Multi‑cloud orchestration with guardrails' },
      { icon: WorkflowIcon, text: 'Self‑healing infra with predictive monitoring' }
    ],
    description: 'Reduce manual workload and incidents with practical automations that fit your toolchain.',
    cta: 'Request Team Demo',
    ctaLink: '/contact?type=team-demo',
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