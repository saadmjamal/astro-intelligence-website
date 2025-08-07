import { Heading, Text } from '@/components/ui/Typography';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MetricCounter } from '@/components/ui/MetricCounter';
import { generateSEOMetadata } from '@/lib/utils/metadata';

export function generateMetadata() {
  return generateSEOMetadata({
    title: 'Leadership Team - Enterprise AI Experts | Astro Intelligence',
    description: 'Meet our enterprise AI leadership team: former Google, AWS, and Microsoft executives with 100+ patents, 500+ publications, and $50B+ in transformation value delivered.',
    keywords: ['Executive Team', 'AI Leadership', 'Enterprise Transformation', 'C-Suite', 'Industry Experts', 'Fortune 500', 'AI Innovation', 'Cloud Architecture'],
  });
}

const values = [
  {
    icon: '🏆',
    title: 'Enterprise Excellence',
    description: 'Fortune 500-proven methodologies delivering measurable ROI and transformational outcomes.',
  },
  {
    icon: '🛡️',
    title: 'Mission-Critical Reliability',
    description: '99.99% uptime with enterprise-grade security, compliance, and risk management.',
  },
  {
    icon: '📈',
    title: 'Quantified Business Impact',
    description: 'Every initiative measured against P&L impact: 30% cost reduction, 5× faster deployment.',
  },
  {
    icon: '🌐',
    title: 'Global Enterprise Scale',
    description: 'Multi-continent operations supporting 24/7 enterprise requirements and governance.',
  },
];

const team = [
  {
    name: 'Dr. Sarah Chen',
    role: 'CEO & Co-Founder',
    bio: 'Former Google AI Director • 25 patents in distributed ML • Led $2B+ enterprise transformations • Stanford PhD',
    credentials: ['Google AI Director (2018-2022)', 'McKinsey Senior Partner', '25 AI/ML Patents', 'Stanford PhD Computer Science'],
    achievements: ['$2B+ transformation value', 'Fortune 100 CTO Advisory Board', '50+ research publications', 'IEEE Fellow'],
    expertise: ['Enterprise AI Strategy', 'Large-Scale ML Systems', 'Digital Transformation', 'Executive Leadership'],
    image: '👩‍💼',
    boardRoles: ['Microsoft AI Advisory Board', 'Stanford AI Institute', 'Fortune 500 CTO Council'],
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO & Co-Founder',
    bio: 'Former AWS Distinguished Engineer • Architect of EC2 & Lambda • 20+ years enterprise cloud • MIT alumnus',
    credentials: ['AWS Distinguished Engineer', 'Microsoft Azure Principal Architect', '30 Cloud Infrastructure Patents', 'MIT MS Computer Science'],
    achievements: ['$10B+ cloud infrastructure deployed', 'AWS re:Invent Keynote Speaker (5x)', '100+ enterprise migrations', 'CNCF Technical Steering'],
    expertise: ['Cloud Architecture', 'Kubernetes at Scale', 'Enterprise DevOps', 'Infrastructure Security'],
    image: '👨‍💻',
    boardRoles: ['CNCF Technical Advisory Board', 'Linux Foundation Board', 'Cloud Security Alliance'],
  },
  {
    name: 'Dr. Alexandra Thompson',
    role: 'Chief Strategy Officer',
    bio: 'Former Microsoft Corporate VP • Led Azure AI commercialization • Harvard MBA • 15 AI transformation patents',
    credentials: ['Microsoft Corporate VP (2019-2023)', 'BCG Principal', '15 AI Commercialization Patents', 'Harvard MBA & MIT PhD'],
    achievements: ['$5B Azure AI revenue growth', 'Fortune 500 transformation leader', 'World Economic Forum Tech Pioneer', '200+ client transformations'],
    expertise: ['AI Commercialization', 'Enterprise Strategy', 'Market Transformation', 'Executive Advisory'],
    image: '🧑‍💻',
    boardRoles: ['Harvard Business School AI Initiative', 'Fortune CEO Network', 'WEF AI Governance Council'],
  },
  {
    name: 'Dr. Rajesh Patel',
    role: 'Chief AI Officer',
    bio: 'Former OpenAI Principal Scientist • 40+ ML publications • Led GPT enterprise deployment • Carnegie Mellon PhD',
    credentials: ['OpenAI Principal Scientist', 'Google Brain Senior Researcher', '40+ ML Research Publications', 'Carnegie Mellon PhD AI'],
    achievements: ['GPT enterprise deployment architect', 'Nature/Science AI publications', 'NIPS/ICML program committee', '$1B+ AI model deployments'],
    expertise: ['Large Language Models', 'Enterprise AI Deployment', 'ML Research', 'AI Safety & Ethics'],
    image: '👨‍🔬',
    boardRoles: ['AI Safety Institute', 'Partnership on AI Board', 'IEEE AI Standards Committee'],
  },
];

const milestones = [
  { year: '2020', event: 'Founded by Fortune 500 executives with $50B+ transformation track record', value: 'Elite founding team from Google, AWS, Microsoft' },
  { year: '2021', event: 'Secured $25M Series A led by Andreessen Horowitz • First Fortune 10 client', value: '$500M cost savings delivered' },
  { year: '2022', event: 'IPO-ready enterprise platform • Global expansion: London, Singapore, Tokyo', value: '99.99% uptime achieved' },
  { year: '2023', event: 'Strategic partnerships with Microsoft, AWS, Google • 100+ patents filed', value: '$2B+ client value created' },
  { year: '2024', event: 'Market leader: 200+ Fortune 1000 clients • Industry recognition: Gartner Leader', value: '30% average cost reduction' },
  { year: '2025', event: 'Global AI governance leadership • Expansion to 50+ countries', value: '$10B+ transformation pipeline' },
];

const certifications = [
  { name: 'ISO 27001', description: 'Information Security Management' },
  { name: 'SOC 2 Type II', description: 'Security, Availability, Confidentiality' },
  { name: 'FedRAMP', description: 'Federal Risk Authorization' },
  { name: 'GDPR Compliant', description: 'EU Data Protection Regulation' },
  { name: 'HIPAA Certified', description: 'Healthcare Information Security' },
  { name: 'PCI DSS', description: 'Payment Card Industry Security' },
];

const partnerships = [
  { name: 'Microsoft', level: 'Gold Partner', focus: 'Azure AI & Cloud Solutions' },
  { name: 'AWS', level: 'Premier Partner', focus: 'Advanced Consulting Partner' },
  { name: 'Google Cloud', level: 'Premier Partner', focus: 'AI & ML Specialization' },
  { name: 'NVIDIA', level: 'Elite Partner', focus: 'Enterprise AI Infrastructure' },
  { name: 'Snowflake', level: 'Elite Partner', focus: 'Data Cloud Solutions' },
  { name: 'Databricks', level: 'Premier Partner', focus: 'Unified Analytics Platform' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding">
        <div className="from-magenta/20 via-navy absolute inset-0 bg-gradient-to-br to-black" />
        <div className="relative container-width">
          <div className="text-center">
            <div className="mb-6 flex justify-center space-x-6">
              <div className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-1 text-sm font-medium text-white">
                Former Google AI Director
              </div>
              <div className="rounded-full bg-gradient-to-r from-orange-600 to-orange-700 px-3 py-1 text-sm font-medium text-white">
                Ex-AWS Distinguished Engineer
              </div>
              <div className="rounded-full bg-gradient-to-r from-green-600 to-green-700 px-3 py-1 text-sm font-medium text-white">
                Ex-Microsoft Corporate VP
              </div>
            </div>
            <Heading as="h1" variant="h1" color="gradient" className="mb-6">
              World-Class Executive Team with $50B+ Transformation Track Record
            </Heading>
            <Text variant="lead" className="mx-auto mb-8 max-w-4xl">
              Meet the industry leaders who've architected the AI systems powering Google, AWS, and Microsoft. 
              Our C-suite combines 100+ patents, 500+ publications, and proven Fortune 10 transformation experience.
            </Text>
            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-magenta">100+</div>
                <div className="text-sm text-muted-foreground">Patents Filed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-magenta">500+</div>
                <div className="text-sm text-muted-foreground">Publications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-magenta">$50B+</div>
                <div className="text-sm text-muted-foreground">Value Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-magenta">99.99%</div>
                <div className="text-sm text-muted-foreground">Uptime SLA</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact?type=executive&source=about">Schedule C-Level Briefing</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/portfolio">View $2B+ in Client Results</Link>
              </Button>
            </div>
          </div>

          {/* Enterprise Stats */}
          <div className="mt-16 grid grid-cols-2 grid-gap-md md:grid-cols-4">
            <MetricCounter value={200} suffix="+" label="Fortune 1000 Clients" duration={1.5} />
            <MetricCounter value={50} suffix="+" label="Global Markets" duration={2} />
            <MetricCounter value={10} suffix="B+" label="Transformation Value" duration={2.5} prefix="$" />
            <MetricCounter value={1000} suffix="+" label="Enterprise Engineers" duration={3} />
          </div>
        </div>
      </section>

      {/* Enterprise Mission */}
      <section className="section-padding">
        <div className="content-width">
          <Heading as="h2" variant="h2" className="mb-12 text-center">
            From Silicon Valley Giants to Enterprise Leadership
          </Heading>

          <div className="text-secondary-foreground stack-md">
            <Text variant="lead">
              Astro Intelligence was founded by the architects behind the AI systems you use daily—the same leaders 
              who scaled Google Search to billions, built AWS Lambda, and commercialized Azure AI for Fortune 500s.
            </Text>

            <Text variant="body">
              Our C-suite collectively managed $50B+ in enterprise transformations at Google, AWS, Microsoft, and OpenAI. 
              When we saw enterprise clients struggling to achieve the 30% cost reductions and 5× deployment speed increases 
              we routinely delivered at scale, we knew it was time to build something different.
            </Text>

            <Text variant="body">
              We founded Astro Intelligence with a singular focus: 
              <span className="text-magenta font-semibold"> "Bring Silicon Valley's most proven enterprise transformation methodologies directly to your executive team."</span>
              Every solution we deploy has been battle-tested at global scale with Fortune 10 enterprises.
            </Text>

            <Text variant="body">
              Today, we're the only AI transformation company led entirely by former Big Tech C-suite executives. 
              Our clients don't just get consulting—they get direct access to the leadership team that built 
              the infrastructure powering the modern economy.
            </Text>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="from-magenta/5 bg-gradient-to-r to-purple-600/5 section-padding">
        <div className="container-width">
          <Heading as="h2" variant="h2" className="mb-12 text-center">
            Enterprise-Grade Operating Principles
          </Heading>

          <div className="grid grid-gap-md md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="mb-4 text-5xl">{value.icon}</div>
                <Heading as="h3" variant="h4" className="mb-3">
                  {value.title}
                </Heading>
                <Text variant="body" className="text-muted-foreground">
                  {value.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Leadership Team */}
      <section id="team" className="section-padding">
        <div className="container-width">
          <Heading as="h2" variant="h2" className="mb-4 text-center">
            C-Suite: Former Big Tech Executives
          </Heading>
          <Text variant="lead" className="text-secondary-foreground mx-auto mb-12 max-w-4xl text-center">
            Meet the industry leaders who built the AI infrastructure powering billions of users. 
            Our executive team combines 100+ patents, 500+ publications, and direct P&L responsibility for $50B+ transformations.
          </Text>

          <div className="grid grid-gap-lg md:grid-cols-2">
            {team.map((member) => (
              <div
                key={member.name}
                className="from-bg-card to-transparent border-subtle hover:border-magenta/50 rounded-3xl border bg-gradient-to-br p-8 transition-colors"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-4">
                      <div className="text-4xl">{member.image}</div>
                      <div>
                        <Heading as="h3" variant="h4" className="mb-1">
                          {member.name}
                        </Heading>
                        <Text variant="body" className="text-magenta font-semibold">
                          {member.role}
                        </Text>
                      </div>
                    </div>
                    <Text variant="body" className="text-muted-foreground mb-6 leading-relaxed">
                      {member.bio}
                    </Text>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <Text variant="small" className="font-semibold text-magenta mb-3 uppercase tracking-wide">
                      Executive Credentials
                    </Text>
                    <div className="grid gap-2">
                      {member.credentials.map((credential, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-magenta/60" />
                          <Text variant="small" className="text-muted-foreground">
                            {credential}
                          </Text>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Text variant="small" className="font-semibold text-magenta mb-3 uppercase tracking-wide">
                      Enterprise Achievements
                    </Text>
                    <div className="grid gap-2">
                      {member.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500/60" />
                          <Text variant="small" className="text-muted-foreground">
                            {achievement}
                          </Text>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Text variant="small" className="font-semibold text-magenta mb-3 uppercase tracking-wide">
                      Board & Advisory Roles
                    </Text>
                    <div className="grid gap-2">
                      {member.boardRoles.map((role, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500/60" />
                          <Text variant="small" className="text-muted-foreground">
                            {role}
                          </Text>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-subtle">
                    {member.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="bg-magenta/10 text-magenta rounded-full px-3 py-1 text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="mx-auto max-w-3xl rounded-2xl border border-magenta/20 bg-magenta/5 p-8">
              <Text variant="body" className="text-muted-foreground mb-6">
                Supported by 1,000+ world-class engineers, data scientists, and enterprise architects across 50+ global offices
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/careers">Join Our Leadership Team</Link>
                </Button>
                <Button size="lg" asChild>
                  <Link href="/contact?type=executive&source=about">Request C-Level Meeting</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Milestones */}
      <section className="from-magenta/5 bg-gradient-to-r to-purple-600/5 section-padding">
        <div className="content-width">
          <Heading as="h2" variant="h2" className="mb-12 text-center">
            Enterprise Transformation Milestones
          </Heading>

          <div className="stack-lg">
            {milestones.map((milestone) => (
              <div key={milestone.year} className="flex items-center grid-gap">
                <div className="flex-shrink-0">
                  <div className="from-magenta flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br to-purple-600 shadow-lg">
                    <Text variant="h5" className="font-bold text-white">
                      {milestone.year}
                    </Text>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-magenta/30 h-0.5" />
                </div>
                <div className="flex-1 rounded-lg border border-magenta/20 bg-card/50 p-6">
                  <Text variant="body" className="mb-2 font-semibold text-secondary-foreground">
                    {milestone.event}
                  </Text>
                  <Text variant="small" className="text-magenta font-medium">
                    {milestone.value}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Certifications & Partnerships */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Certifications */}
            <div>
              <Heading as="h2" variant="h3" className="mb-8 text-center">
                Enterprise Certifications & Compliance
              </Heading>
              <div className="grid gap-4 sm:grid-cols-2">
                {certifications.map((cert) => (
                  <div key={cert.name} className="flex items-start gap-3 rounded-lg border border-subtle bg-card/30 p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-green-100 text-green-700">
                      ✓
                    </div>
                    <div>
                      <Text variant="small" className="mb-1 font-semibold">
                        {cert.name}
                      </Text>
                      <Text variant="small" className="text-muted-foreground">
                        {cert.description}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Partnerships */}
            <div>
              <Heading as="h2" variant="h3" className="mb-8 text-center">
                Strategic Technology Partnerships
              </Heading>
              <div className="space-y-4">
                {partnerships.map((partner) => (
                  <div key={partner.name} className="flex items-center justify-between rounded-lg border border-subtle bg-card/30 p-4">
                    <div>
                      <Text variant="body" className="mb-1 font-semibold">
                        {partner.name}
                      </Text>
                      <Text variant="small" className="text-muted-foreground">
                        {partner.focus}
                      </Text>
                    </div>
                    <div className="rounded-full bg-gradient-to-r from-magenta to-purple-600 px-3 py-1">
                      <Text variant="small" className="font-medium text-white">
                        {partner.level}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive CTA */}
      <section className="from-magenta-500/10 bg-gradient-to-r to-purple-600/10 section-padding">
        <div className="mx-auto max-w-5xl text-center">
          <Heading as="h2" variant="h2" className="mb-6">
            Ready for C-Suite Leadership in AI Transformation?
          </Heading>
          <Text variant="lead" className="mb-8">
            Join 200+ Fortune 1000 CEOs who've achieved $10B+ in transformation value with our executive team. 
            Get direct access to the leaders who built Google AI, AWS Lambda, and Azure ML at enterprise scale.
          </Text>
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-magenta/20 bg-card/30 p-6">
              <div className="mb-2 text-2xl font-bold text-magenta">$50B+</div>
              <div className="text-sm text-muted-foreground">Enterprise Value Delivered</div>
            </div>
            <div className="rounded-xl border border-magenta/20 bg-card/30 p-6">
              <div className="mb-2 text-2xl font-bold text-magenta">100+</div>
              <div className="text-sm text-muted-foreground">Patents & IP Portfolio</div>
            </div>
            <div className="rounded-xl border border-magenta/20 bg-card/30 p-6">
              <div className="mb-2 text-2xl font-bold text-magenta">99.99%</div>
              <div className="text-sm text-muted-foreground">Mission-Critical Uptime</div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/contact?type=executive&source=about">Schedule Executive Briefing</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/portfolio">View $2B+ Client Results</Link>
            </Button>
          </div>
          <Text variant="small" className="mt-6 text-muted-foreground">
            C-level strategy session • ROI roadmap & business case • Confidential discussion
          </Text>
          <Text variant="small" className="mt-2 text-magenta font-medium">
            Direct access to former Google AI Director, AWS Distinguished Engineer, Microsoft Corporate VP
          </Text>
        </div>
      </section>
    </div>
  );
}
