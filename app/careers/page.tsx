import { Metadata } from 'next';
export const dynamic = 'force-dynamic'
import { Heading, Text } from '@/components/ui/Typography';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MetricCounter } from '@/components/ui/MetricCounter';

export const metadata: Metadata = {
  title: 'Careers - Join the Future at Astro Intelligence',
  description:
    'Build the future of AI and cloud infrastructure with the brightest minds in tech. Competitive benefits, meaningful work, global remote-first culture.',
  keywords: ['Careers', 'Jobs', 'AI Careers', 'Remote Work', 'Tech Jobs', 'Engineer Jobs', 'Product Manager', 'Enterprise AI'],
};

const benefits = [
  {
    icon: '🎯',
    title: 'Meaningful Impact',
    description: 'Work on projects that transform Fortune 500 companies and touch millions of users worldwide.',
    highlight: 'Real impact, measurable results'
  },
  {
    icon: '💰',
    title: 'Top-Tier Compensation',
    description: 'Competitive salaries (95th percentile), significant equity packages, and performance bonuses.',
    highlight: '95th percentile compensation'
  },
  {
    icon: '🏥',
    title: 'Complete Health Coverage',
    description: '100% premium coverage for you and your family, dental, vision, mental health, and $2K wellness stipend.',
    highlight: '100% covered + wellness stipend'
  },
  {
    icon: '🌍',
    title: 'Global Remote-First',
    description: 'Work from anywhere with quarterly team retreats in amazing locations. Full home office setup included.',
    highlight: 'True remote-first culture'
  },
  {
    icon: '🚀',
    title: 'Unlimited Learning',
    description: '$5,000 annual budget for courses, conferences, certifications. Plus dedicated learning time during work hours.',
    highlight: '$5K learning budget + time'
  },
  {
    icon: '🎨',
    title: 'Creative Freedom',
    description: '20% time for passion projects, open source contributions, and experimental research.',
    highlight: '20% passion project time'
  },
  {
    icon: '⏰',
    title: 'True Work-Life Balance',
    description: 'Unlimited PTO with mandatory minimums, 4-day workweeks in summer, and sabbatical options.',
    highlight: 'Unlimited PTO with minimums'
  },
  {
    icon: '🤝',
    title: 'Equity & Transparency',
    description: 'Meaningful equity in a fast-growing company, open salary bands, and transparent career paths.',
    highlight: 'Meaningful equity ownership'
  },
];

const openPositions = [
  {
    category: 'Engineering',
    count: 8,
    positions: [
      {
        title: 'Senior Platform Engineer',
        location: 'Remote (Global)',
        type: 'Full-time',
        level: 'Senior',
        salary: '$180K - $250K + equity',
        description: 'Architect and build our next-generation platform infrastructure that scales to millions of workloads.',
        requirements: [
          '5+ years with Kubernetes at enterprise scale',
          'Platform engineering or infrastructure experience',
          'Go, Rust, or Python expertise',
          'Experience with cloud-native architectures',
        ],
        highlights: ['Lead major infrastructure initiatives', 'Work with cutting-edge tech stack', 'Shape platform architecture'],
      },
      {
        title: 'AI/ML Staff Engineer',
        location: 'Remote (US/EU)',
        type: 'Full-time',
        level: 'Staff',
        salary: '$200K - $300K + equity',
        description: 'Lead AI/ML initiatives and develop models that optimize enterprise infrastructure for Fortune 500 clients.',
        requirements: [
          '7+ years ML engineering with production systems', 
          'PyTorch/TensorFlow, MLOps, and model deployment',
          'Experience with LLMs and distributed training',
          'PhD preferred but not required'
        ],
        highlights: ['Lead AI research initiatives', 'Work on breakthrough ML applications', 'Publish and present research'],
      },
      {
        title: 'DevOps/SRE Engineer',
        location: 'Remote (Global)',
        type: 'Full-time',
        level: 'Mid-Senior',
        salary: '$140K - $200K + equity',
        description: 'Implement GitOps workflows and maintain 99.99% uptime for enterprise clients across multiple cloud providers.',
        requirements: [
          'GitOps workflows and infrastructure as code',
          'Multi-cloud experience (AWS/GCP/Azure)',
          'Monitoring, alerting, and incident response',
          'Terraform, Ansible, or similar tools',
        ],
        highlights: ['Build world-class reliability systems', 'Work with enterprise-scale infrastructure', 'On-call rotation with fair compensation'],
      },
    ],
  },
  {
    category: 'Product & Design',
    count: 4,
    positions: [
      {
        title: 'Senior Product Manager - AI Platform',
        location: 'San Francisco or Remote',
        type: 'Full-time',
        level: 'Senior',
        salary: '$160K - $220K + equity',
        description: 'Drive product strategy for our AI orchestration platform used by enterprise teams worldwide.',
        requirements: [
          '5+ years B2B SaaS product management',
          'Technical background with developer tools',
          'Enterprise software and AI/ML knowledge',
          'Experience with platform products',
        ],
        highlights: ['Own AI platform roadmap', 'Work directly with enterprise clients', 'Shape the future of AI tooling'],
      },
      {
        title: 'Senior UX Designer',
        location: 'Remote (Global)',
        type: 'Full-time',
        level: 'Senior',
        salary: '$130K - $180K + equity',
        description: 'Design intuitive interfaces for complex technical products that delight developers and enterprise users.',
        requirements: [
          '5+ years UX design for technical products',
          'Developer tools and enterprise software experience',
          'Figma, prototyping, and user research skills',
          'Systems thinking and design system experience',
        ],
        highlights: ['Shape user experience for cutting-edge AI tools', 'Work on award-winning design system', 'User research with Fortune 500 teams'],
      },
    ],
  },
  {
    category: 'Sales & Marketing',
    count: 3,
    positions: [
      {
        title: 'Enterprise Account Executive',
        location: 'New York, SF, or Remote',
        type: 'Full-time',
        level: 'Senior',
        salary: '$120K base + $200K OTE + equity',
        description: 'Drive enterprise sales with Fortune 500 accounts and build lasting relationships with technical leaders.',
        requirements: [
          '5+ years enterprise software sales',
          'Cloud, DevOps, or AI industry knowledge',
          'Proven track record with $1M+ quotas',
          'Technical acumen to engage with CTOs',
        ],
        highlights: ['Work with Fortune 500 decision makers', 'High-value, consultative sales', 'Uncapped commission structure'],
      },
    ],
  },
  {
    category: 'Operations & People',
    count: 2,
    positions: [
      {
        title: 'Head of People',
        location: 'Remote (US/EU)',
        type: 'Full-time',
        level: 'Senior',
        salary: '$150K - $200K + equity',
        description: 'Scale our people operations and culture as we grow from 50 to 200+ team members globally.',
        requirements: [
          '8+ years people ops in high-growth tech',
          'Experience scaling remote-first organizations',
          'Global compliance and employment law',
          'Passion for building inclusive cultures',
        ],
        highlights: ['Shape company culture', 'Build global remote-first operations', 'Work with world-class leadership team'],
      },
    ],
  },
];

const cultureValues = [
  {
    title: 'Radical Transparency',
    description: 'Open salaries, public roadmaps, and honest feedback. We believe transparency builds trust and better decisions.',
    icon: '🔍',
  },
  {
    title: 'Bias Towards Action',
    description: 'We move fast, experiment often, and learn from everything. Better to try and iterate than to wait for perfect.',
    icon: '⚡',
  },
  {
    title: 'Global Mindset',
    description: 'Our team spans 30+ countries, and we build products for a global audience with diverse perspectives.',
    icon: '🌍',
  },
  {
    title: 'Technical Excellence',
    description: 'We write code we\'re proud of, build systems that scale, and solve problems that matter.',
    icon: '⚙️',
  },
];

const applicationProcess = [
  {
    step: '1',
    title: 'Application Review',
    description: 'We review every application within 2-3 business days and provide feedback regardless of outcome.',
    duration: '2-3 days'
  },
  {
    step: '2',
    title: 'Recruiter Chat',
    description: '30-minute conversation about your background, interests, and what you\'re looking for in your next role.',
    duration: '30 minutes'
  },
  {
    step: '3',
    title: 'Technical Assessment',
    description: 'Role-specific assessment or take-home project. We compensate you for your time on longer projects.',
    duration: '2-4 hours'
  },
  {
    step: '4',
    title: 'Team Interviews',
    description: 'Meet your potential teammates, hiring manager, and dive deep into technical and cultural fit.',
    duration: '2-3 hours'
  },
  {
    step: '5',
    title: 'Final Decision',
    description: 'We make decisions within 48 hours and provide detailed feedback. Reference checks for final candidates.',
    duration: '1-2 days'
  },
];

const testimonials = [
  {
    name: 'Sarah Kim',
    role: 'Senior ML Engineer',
    tenure: '2 years',
    quote: 'The technical challenges are incredible, but what really sets this place apart is the people. Everyone genuinely cares about your growth and the impact we\'re making.',
    highlight: 'Genuine care for growth',
  },
  {
    name: 'Marcus Chen',
    role: 'Staff Platform Engineer',
    tenure: '3 years',
    quote: 'I\'ve worked at FAANG companies, but the combination of cutting-edge tech, meaningful work, and work-life balance here is unmatched.',
    highlight: 'Better than FAANG',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Product Designer',
    tenure: '1.5 years',
    quote: 'The design challenges are complex and fascinating. Plus, the 20% passion project time let me build an open-source tool that thousands of developers now use.',
    highlight: '20% time leads to real impact',
  },
];

const perks = [
  { icon: '🏠', text: 'Premium home office setup ($5K budget)' },
  { icon: '✈️', text: 'Annual travel stipend for digital nomads' },
  { icon: '🍽️', text: 'Meal stipends and premium coffee subscription' },
  { icon: '💻', text: 'Latest MacBook Pro or custom Linux workstation' },
  { icon: '📚', text: 'O\'Reilly subscription and technical book budget' },
  { icon: '🎮', text: 'Gaming and entertainment stipend' },
  { icon: '🏃', text: 'Gym membership or fitness equipment reimbursement' },
  { icon: '👶', text: 'Generous parental leave (16 weeks paid)' },
];

export default function CareersPage() {
  const totalPositions = openPositions.reduce((acc, category) => acc + category.count, 0);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding">
        <div className="absolute inset-0 bg-gradient-to-br from-magenta/20 via-navy to-black" />
        <div className="relative container-width text-center">
          <Badge variant="outline" className="mb-4 bg-magenta/10 text-magenta border-magenta/20">
            🔥 {totalPositions} Open Positions
          </Badge>
          <Heading as="h1" variant="hero" color="gradient" className="mb-6">
            Build the Future of AI
          </Heading>
          <Text variant="hero-lead" className="mx-auto mb-8 max-w-4xl">
            Join a team of brilliant minds working on the most challenging problems in AI and cloud infrastructure. 
            Your best work, meaningful impact, and career growth start here.
          </Text>
          <div className="mb-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="#positions">View Open Positions</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="#culture">Learn Our Culture</Link>
            </Button>
          </div>

          {/* Company Stats */}
          <div className="grid grid-cols-2 grid-gap-md md:grid-cols-4">
            <div className="text-center">
              <MetricCounter value={200} suffix="+" label="Team Members" duration={2} />
              <Text variant="small" className="text-muted-foreground">From 30+ countries</Text>
            </div>
            <div className="text-center">
              <MetricCounter value={95} suffix="%" label="Employee Satisfaction" duration={2.5} />
              <Text variant="small" className="text-muted-foreground">Based on recent survey</Text>
            </div>
            <div className="text-center">
              <MetricCounter value={4.8} suffix="/5" label="Glassdoor Rating" duration={3} />
              <Text variant="small" className="text-muted-foreground">Authentic reviews</Text>
            </div>
            <div className="text-center">
              <MetricCounter value={98} suffix="%" label="Retention Rate" duration={3.5} />
              <Text variant="small" className="text-muted-foreground">People love it here</Text>
            </div>
          </div>
        </div>
      </section>

      {/* Company Mission */}
      <section className="section-padding">
        <div className="content-width">
          <div className="grid grid-gap-xl lg:grid-cols-2 lg:items-center">
            <div>
              <Heading as="h2" variant="h2" className="mb-6">
                Where Intelligence Meets Impact
              </Heading>
              <div className="stack-md">
                <Text variant="lead" className="text-secondary-foreground">
                  We're not just building software—we're shaping how the world's most important companies 
                  leverage AI and cloud technologies to solve their biggest challenges.
                </Text>
                <Text variant="body">
                  Every day, our platform helps Fortune 500 companies reduce costs by 30%, deploy 5× faster, 
                  and make better decisions with AI. Your work directly impacts millions of users and 
                  billions of dollars in enterprise value.
                </Text>
                <Text variant="body">
                  But beyond the impact, we've built something special: a culture where brilliant people 
                  can do their best work, grow their careers, and maintain a life outside of work.
                </Text>
              </div>
            </div>

            <div className="bg-gradient-to-br from-magenta/10 to-purple-600/10 rounded-3xl p-8">
              <Heading as="h3" variant="h4" className="mb-6 text-center">
                What Sets Us Apart
              </Heading>
              <div className="grid grid-cols-2 grid-gap-md">
                {cultureValues.map((value) => (
                  <div key={value.title} className="text-center">
                    <div className="text-3xl mb-3">{value.icon}</div>
                    <Heading as="h4" variant="h6" className="mb-2">
                      {value.title}
                    </Heading>
                    <Text variant="small" className="text-muted-foreground">
                      {value.description}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Employee Testimonials */}
      <section id="culture" className="bg-gradient-to-r from-magenta/5 to-purple-600/5 section-padding">
        <div className="container-width">
          <Heading as="h2" variant="h2" className="mb-4 text-center">
            Hear From Our Team
          </Heading>
          <Text variant="lead" className="text-secondary-foreground mx-auto mb-12 max-w-3xl text-center">
            Real stories from real people about what it's like to work at AstroIntelligence.
          </Text>

          <div className="grid grid-gap-lg md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-gradient-to-br from-bg-card to-transparent border border-subtle rounded-2xl card-padding">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Heading as="h3" variant="h5">
                      {testimonial.name}
                    </Heading>
                    <Badge variant="secondary" className="text-xs">
                      {testimonial.tenure}
                    </Badge>
                  </div>
                  <Text variant="small" className="text-magenta">
                    {testimonial.role}
                  </Text>
                </div>
                <Text variant="body" className="text-secondary-foreground mb-4 italic">
                  "{testimonial.quote}"
                </Text>
                <div className="border-l-2 border-magenta pl-3">
                  <Text variant="small" className="font-semibold text-magenta">
                    {testimonial.highlight}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Perks */}
      <section className="section-padding">
        <div className="container-width">
          <Heading as="h2" variant="h2" className="mb-4 text-center">
            World-Class Benefits
          </Heading>
          <Text variant="lead" className="text-secondary-foreground mx-auto mb-12 max-w-3xl text-center">
            We invest in our people because we know that happy, healthy teams do their best work.
          </Text>

          <div className="grid grid-gap-lg lg:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-gradient-to-br from-bg-card to-transparent border border-subtle hover:border-magenta/50 rounded-2xl card-padding-sm transition-colors">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <Heading as="h3" variant="h4" className="mb-2">
                  {benefit.title}
                </Heading>
                <Text variant="body" className="text-secondary-foreground mb-3">
                  {benefit.description}
                </Text>
                <div className="bg-magenta/10 rounded-lg px-3 py-1">
                  <Text variant="small" className="text-magenta font-semibold">
                    {benefit.highlight}
                  </Text>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Perks */}
          <div className="mt-12">
            <Heading as="h3" variant="h3" className="mb-6 text-center">
              Plus These Amazing Perks
            </Heading>
            <div className="grid grid-cols-2 md:grid-cols-4 grid-gap-md">
              {perks.map((perk, index) => (
                <div key={index} className="flex items-center gap-3 bg-card/50 rounded-lg p-3">
                  <span className="text-2xl">{perk.icon}</span>
                  <Text variant="small" className="text-secondary-foreground">
                    {perk.text}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="bg-gradient-to-r from-magenta/5 to-purple-600/5 section-padding">
        <div className="container-width">
          <Heading as="h2" variant="h2" className="mb-4 text-center">
            Open Positions
          </Heading>
          <Text variant="lead" className="text-secondary-foreground mx-auto mb-12 max-w-3xl text-center">
            We're actively hiring brilliant people across all departments. Find your perfect role.
          </Text>

          <div className="stack-xl">
            {openPositions.map((category) => (
              <div key={category.category}>
                <div className="flex items-center justify-between mb-6">
                  <Heading as="h3" variant="h3" className="text-magenta">
                    {category.category}
                  </Heading>
                  <Badge variant="outline" className="bg-magenta/10 text-magenta border-magenta/20">
                    {category.count} Open Role{category.count !== 1 ? 's' : ''}
                  </Badge>
                </div>

                <div className="stack-lg">
                  {category.positions.map((position) => (
                    <div key={position.title} className="bg-gradient-to-br from-bg-card to-transparent border border-subtle hover:border-magenta/50 rounded-2xl card-padding transition-colors">
                      <div className="grid grid-gap-lg lg:grid-cols-3">
                        <div className="lg:col-span-2">
                          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                            <div>
                              <Heading as="h4" variant="h4" className="mb-2">
                                {position.title}
                              </Heading>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">📍 {position.location}</span>
                                <span className="flex items-center gap-1">⏰ {position.type}</span>
                                <span className="flex items-center gap-1">📊 {position.level}</span>
                                {position.salary && (
                                  <span className="flex items-center gap-1 text-magenta font-semibold">💰 {position.salary}</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <Text variant="body" className="text-secondary-foreground mb-4">
                            {position.description}
                          </Text>

                          <div className="grid md:grid-cols-2 grid-gap">
                            <div>
                              <Text variant="small" className="font-semibold mb-2">Key Requirements:</Text>
                              <ul className="space-y-1">
                                {position.requirements.map((req) => (
                                  <li key={req} className="flex items-start gap-2">
                                    <span className="text-magenta mt-1 text-xs">•</span>
                                    <Text variant="small" className="text-muted-foreground">
                                      {req}
                                    </Text>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {position.highlights && (
                              <div>
                                <Text variant="small" className="font-semibold mb-2">Why You'll Love It:</Text>
                                <ul className="space-y-1">
                                  {position.highlights.map((highlight) => (
                                    <li key={highlight} className="flex items-start gap-2">
                                      <span className="text-green-400 mt-1 text-xs">✓</span>
                                      <Text variant="small" className="text-secondary-foreground">
                                        {highlight}
                                      </Text>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col justify-between">
                          <Button className="w-full mb-4" asChild>
                            <Link href={`/careers/apply?position=${encodeURIComponent(position.title)}`}>
                              Apply Now
                            </Link>
                          </Button>
                          <Button variant="outline" className="w-full" asChild>
                            <Link href={`/careers/learn-more?position=${encodeURIComponent(position.title)}`}>
                              Learn More
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

          {/* Don't See Your Role */}
          <div className="mt-16 bg-gradient-to-r from-magenta/10 to-purple-600/10 rounded-2xl card-padding text-center">
            <Heading as="h3" variant="h4" className="mb-4">
              Don't See Your Perfect Role?
            </Heading>
            <Text variant="body" className="text-secondary-foreground mb-6 max-w-2xl mx-auto">
              We're always looking for exceptional talent. If you're passionate about AI, cloud infrastructure, 
              or building products that matter, we'd love to hear from you.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/contact?type=career-inquiry">Tell Us About Yourself</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/careers/internships">Explore Internships</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="section-padding">
        <div className="content-width">
          <Heading as="h2" variant="h2" className="mb-4 text-center">
            Our Hiring Process
          </Heading>
          <Text variant="lead" className="text-secondary-foreground mx-auto mb-12 max-w-3xl text-center">
            We've designed a fair, efficient process that respects your time and gives you a real sense of what it's like to work here.
          </Text>

          <div className="stack-lg">
            {applicationProcess.map((phase, index) => (
              <div key={phase.step} className="flex grid-gap">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-magenta to-purple-600 font-bold text-white">
                    {phase.step}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <Heading as="h3" variant="h5">
                      {phase.title}
                    </Heading>
                    <Badge variant="secondary" className="text-xs">
                      {phase.duration}
                    </Badge>
                  </div>
                  <Text variant="body" className="text-muted-foreground mb-4">
                    {phase.description}
                  </Text>
                  {index < applicationProcess.length - 1 && (
                    <div className="w-px h-8 bg-gradient-to-b from-magenta/50 to-transparent ml-6" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-card/50 rounded-2xl card-padding text-center">
            <Text variant="body" className="text-secondary-foreground">
              <span className="font-semibold">Our commitment:</span> We provide detailed feedback at every stage, 
              respond quickly, and treat every candidate with respect regardless of outcome.
            </Text>
          </div>
        </div>
      </section>

      {/* Diversity & Inclusion */}
      <section className="bg-gradient-to-r from-magenta/5 to-purple-600/5 section-padding">
        <div className="content-width text-center">
          <Heading as="h2" variant="h2" className="mb-6">
            Diversity Makes Us Stronger
          </Heading>
          <Text variant="lead" className="text-secondary-foreground mx-auto mb-8 max-w-4xl">
            We're building a team that reflects the diversity of the world we serve. Different backgrounds, 
            perspectives, and experiences make us better at solving complex problems.
          </Text>
          
          <div className="grid grid-cols-2 md:grid-cols-4 grid-gap-md mb-8">
            <div className="text-center">
              <div className="text-4xl mb-2">🌍</div>
              <Text variant="body-large" className="text-magenta font-bold">30+</Text>
              <Text variant="small" className="text-muted-foreground">Countries</Text>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">👥</div>
              <Text variant="body-large" className="text-magenta font-bold">45%</Text>
              <Text variant="small" className="text-muted-foreground">Women & Non-Binary</Text>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🗣️</div>
              <Text variant="body-large" className="text-magenta font-bold">25+</Text>
              <Text variant="small" className="text-muted-foreground">Languages Spoken</Text>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🎓</div>
              <Text variant="body-large" className="text-magenta font-bold">60%</Text>
              <Text variant="small" className="text-muted-foreground">First-Gen College</Text>
            </div>
          </div>

          <Text variant="body" className="text-secondary-foreground mb-6">
            We actively work to eliminate bias in our hiring process, provide unconscious bias training, 
            and have employee resource groups that drive real change in our company.
          </Text>
          
          <Button variant="secondary" asChild>
            <Link href="/diversity">Learn About Our D&I Efforts</Link>
          </Button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl text-center">
          <Heading as="h2" variant="h2" className="mb-6">
            Ready to Build the Future?
          </Heading>
          <Text variant="lead" className="mb-8 text-secondary-foreground">
            Join us in creating AI and cloud solutions that transform how the world's most important companies operate. 
            Your career-defining work starts here.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="#positions">Explore Open Roles</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact?type=career-chat">Schedule a Career Chat</Link>
            </Button>
          </div>
          <Text variant="small" className="mt-6 text-muted-foreground">
            Questions? Reach out to careers@astrointelligence.com
          </Text>
        </div>
      </section>
    </div>
  );
}