import { Metadata } from 'next';
import { Heading, Text } from '@/components/ui/Typography';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Careers - Astro Intelligence Inc',
  description:
    'Join our team of innovators building the future of AI and cloud infrastructure. Explore open positions and our unique culture.',
};

const benefits = [
  {
    icon: '💰',
    title: 'Competitive Compensation',
    description: 'Top-tier salaries, equity packages, and performance bonuses.',
  },
  {
    icon: '🏥',
    title: 'Health & Wellness',
    description: '100% coverage for you and your family, plus wellness stipends.',
  },
  {
    icon: '🌴',
    title: 'Flexible Time Off',
    description: 'Unlimited PTO, sabbaticals, and global remote work options.',
  },
  {
    icon: '📚',
    title: 'Learning & Development',
    description: '$5,000 annual budget for courses, conferences, and certifications.',
  },
  {
    icon: '🏠',
    title: 'Remote-First Culture',
    description: 'Work from anywhere with quarterly team retreats.',
  },
  {
    icon: '🎯',
    title: 'Impact & Purpose',
    description: 'Work on meaningful projects that transform industries.',
  },
];

const openPositions = [
  {
    category: 'Engineering',
    positions: [
      {
        title: 'Senior Platform Engineer',
        location: 'Remote (Global)',
        type: 'Full-time',
        level: 'Senior',
        description: 'Build and maintain our next-generation platform infrastructure.',
        requirements: [
          '5+ years Kubernetes experience',
          'Platform engineering expertise',
          'Go or Python proficiency',
        ],
      },
      {
        title: 'AI/ML Engineer',
        location: 'Remote (US/EU)',
        type: 'Full-time',
        level: 'Mid-Senior',
        description: 'Develop and deploy ML models for infrastructure optimization.',
        requirements: ['3+ years ML engineering', 'PyTorch/TensorFlow', 'MLOps experience'],
      },
      {
        title: 'DevOps Engineer',
        location: 'Remote (Global)',
        type: 'Full-time',
        level: 'Mid-level',
        description: 'Implement and manage CI/CD pipelines for enterprise clients.',
        requirements: [
          'GitOps workflows',
          'Cloud platforms (AWS/GCP/Azure)',
          'Infrastructure as Code',
        ],
      },
    ],
  },
  {
    category: 'Product & Design',
    positions: [
      {
        title: 'Senior Product Manager',
        location: 'San Francisco or Remote',
        type: 'Full-time',
        level: 'Senior',
        description: 'Drive product strategy for our AI orchestration platform.',
        requirements: [
          '5+ years B2B SaaS PM',
          'Technical background',
          'Enterprise software experience',
        ],
      },
      {
        title: 'UX Designer',
        location: 'Remote (Global)',
        type: 'Full-time',
        level: 'Mid-level',
        description: 'Design intuitive interfaces for complex technical products.',
        requirements: ['3+ years UX design', 'Developer tools experience', 'Figma proficiency'],
      },
    ],
  },
  {
    category: 'Sales & Marketing',
    positions: [
      {
        title: 'Enterprise Account Executive',
        location: 'New York or Remote',
        type: 'Full-time',
        level: 'Senior',
        description: 'Drive enterprise sales for Fortune 500 accounts.',
        requirements: [
          '5+ years enterprise sales',
          'Cloud/DevOps industry knowledge',
          '$1M+ quota achievement',
        ],
      },
      {
        title: 'Content Marketing Manager',
        location: 'Remote (US)',
        type: 'Full-time',
        level: 'Mid-level',
        description: 'Create technical content that resonates with developers and CTOs.',
        requirements: [
          'Technical writing skills',
          'Developer marketing experience',
          'SEO expertise',
        ],
      },
    ],
  },
];

const values = [
  {
    title: 'Innovation Without Limits',
    description: 'We encourage bold thinking and give you the freedom to experiment.',
  },
  {
    title: 'Diversity & Inclusion',
    description: 'We believe diverse teams build better products. Period.',
  },
  {
    title: 'Work-Life Harmony',
    description: 'Success means thriving both professionally and personally.',
  },
  {
    title: 'Continuous Learning',
    description: 'Stay at the cutting edge with dedicated time for learning.',
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="from-magenta/20 via-navy absolute inset-0 bg-gradient-to-br to-black" />
        <div className="relative mx-auto max-w-7xl text-center">
          <Heading as="h1" variant="h1" color="gradient" className="mb-6">
            Build the Future With Us
          </Heading>
          <Text variant="lead" className="mx-auto mb-8 max-w-3xl">
            Join a team of passionate innovators working on the most challenging problems in AI and
            cloud infrastructure. Your best work starts here.
          </Text>
          <Button size="lg" asChild>
            <Link href="#positions">View Open Positions</Link>
          </Button>
        </div>
      </section>

      {/* Culture & Values */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading as="h2" variant="h2" className="mb-12 text-center">
            Our Culture
          </Heading>

          <div className="mb-16 grid gap-12 md:grid-cols-2">
            <div>
              <Heading as="h3" variant="h3" className="mb-6">
                Where Innovation Meets Impact
              </Heading>
              <div className="text-offwhite/80 space-y-4">
                <Text variant="body">
                  At Astro Intelligence, we're not just building products—we're shaping the future
                  of how enterprises leverage AI and cloud technologies. Our culture is built on
                  trust, autonomy, and a shared passion for excellence.
                </Text>
                <Text variant="body">
                  We believe in giving our team members the tools, freedom, and support they need to
                  do their best work. Whether you're architecting a solution for millions of users
                  or researching the next breakthrough in AI optimization, your work here matters.
                </Text>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {values.map((value) => (
                <div key={value.title} className="space-y-2">
                  <Heading as="h4" variant="h5">
                    {value.title}
                  </Heading>
                  <Text variant="small" className="text-offwhite/70">
                    {value.description}
                  </Text>
                </div>
              ))}
            </div>
          </div>

          {/* Team Photos Placeholder */}
          <div className="from-offwhite/10 to-offwhite/5 rounded-2xl bg-gradient-to-br p-12 text-center">
            <div className="mb-4 text-6xl">🌟</div>
            <Text variant="lead" className="text-offwhite/80">
              200+ brilliant minds from 30+ countries working together
            </Text>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="from-magenta/5 bg-gradient-to-r to-purple-600/5 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading as="h2" variant="h2" className="mb-12 text-center">
            Benefits & Perks
          </Heading>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="from-offwhite/5 to-offwhite/0 border-offwhite/10 rounded-2xl border bg-gradient-to-br p-6"
              >
                <div className="mb-4 text-4xl">{benefit.icon}</div>
                <Heading as="h3" variant="h4" className="mb-2">
                  {benefit.title}
                </Heading>
                <Text variant="body" className="text-offwhite/70">
                  {benefit.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading as="h2" variant="h2" className="mb-12 text-center">
            Open Positions
          </Heading>

          <div className="space-y-12">
            {openPositions.map((category) => (
              <div key={category.category}>
                <Heading as="h3" variant="h3" className="text-magenta mb-6">
                  {category.category}
                </Heading>

                <div className="space-y-6">
                  {category.positions.map((position) => (
                    <div
                      key={position.title}
                      className="from-offwhite/5 to-offwhite/0 border-offwhite/10 hover:border-magenta/50 rounded-2xl border bg-gradient-to-br p-8 transition-colors"
                    >
                      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                          <Heading as="h4" variant="h4" className="mb-2">
                            {position.title}
                          </Heading>

                          <div className="text-offwhite/60 mb-4 flex flex-wrap gap-4 text-sm">
                            <span className="flex items-center gap-1">📍 {position.location}</span>
                            <span className="flex items-center gap-1">⏰ {position.type}</span>
                            <span className="flex items-center gap-1">📊 {position.level}</span>
                          </div>

                          <Text variant="body" className="text-offwhite/80 mb-4">
                            {position.description}
                          </Text>

                          <div>
                            <Text variant="small" className="mb-2 font-semibold">
                              Key Requirements:
                            </Text>
                            <ul className="space-y-1">
                              {position.requirements.map((req) => (
                                <li key={req} className="flex items-start gap-2">
                                  <span className="text-magenta mt-1">•</span>
                                  <Text variant="small" className="text-offwhite/70">
                                    {req}
                                  </Text>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="flex-shrink-0">
                          <Button asChild>
                            <Link
                              href={`/careers/apply?position=${encodeURIComponent(position.title)}`}
                            >
                              Apply Now
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="from-magenta/10 mt-12 rounded-2xl bg-gradient-to-r to-purple-600/10 p-8 text-center">
            <Heading as="h3" variant="h4" className="mb-4">
              Don't See Your Perfect Role?
            </Heading>
            <Text variant="body" className="text-offwhite/80 mb-6">
              We're always looking for exceptional talent. Send us your resume and tell us how you
              can contribute to our mission.
            </Text>
            <Button variant="secondary" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="from-magenta/5 bg-gradient-to-r to-purple-600/5 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Heading as="h2" variant="h2" className="mb-12 text-center">
            Our Hiring Process
          </Heading>

          <div className="space-y-8">
            {[
              {
                step: '1',
                title: 'Application Review',
                description:
                  'We review every application carefully and respond within 3-5 business days.',
              },
              {
                step: '2',
                title: 'Initial Conversation',
                description:
                  '30-minute chat with our recruiting team to discuss your background and interests.',
              },
              {
                step: '3',
                title: 'Technical Assessment',
                description:
                  'Role-specific assessment or take-home project (compensated for your time).',
              },
              {
                step: '4',
                title: 'Team Interviews',
                description:
                  'Meet your potential teammates and dive deep into technical and cultural fit.',
              },
              {
                step: '5',
                title: 'Final Decision',
                description:
                  'We make decisions quickly and provide detailed feedback regardless of outcome.',
              },
            ].map((phase) => (
              <div key={phase.step} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="from-magenta flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br to-purple-600 font-bold">
                    {phase.step}
                  </div>
                </div>
                <div>
                  <Heading as="h3" variant="h5" className="mb-2">
                    {phase.title}
                  </Heading>
                  <Text variant="body" className="text-offwhite/70">
                    {phase.description}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Heading as="h2" variant="h2" className="mb-6">
            Ready to Make an Impact?
          </Heading>
          <Text variant="lead" className="mb-8">
            Join us in building the future of intelligent infrastructure.
          </Text>
          <Button size="lg" asChild>
            <Link href="#positions">Explore Opportunities</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
