import { Metadata } from 'next';
import Image from 'next/image';
import { Heading, Text } from '@/components/ui/Typography';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MetricCounter } from '@/components/ui/MetricCounter';

export const metadata: Metadata = {
  title: 'About - Astro Intelligence Inc',
  description: 'Learn about our mission to empower enterprises with ethical AI and cloud innovation. Meet the team building the future of intelligent infrastructure.',
};

const values = [
  {
    icon: '🎯',
    title: 'Innovation First',
    description: 'We push boundaries and challenge conventions to deliver breakthrough solutions.',
  },
  {
    icon: '🤝',
    title: 'Ethical by Design',
    description: 'Every solution we build prioritizes fairness, transparency, and human benefit.',
  },
  {
    icon: '🚀',
    title: 'Client Success',
    description: 'Your success is our mission. We measure ourselves by the value we create.',
  },
  {
    icon: '🌍',
    title: 'Global Impact',
    description: 'We build solutions that scale globally while respecting local needs and cultures.',
  },
];

const team = [
  {
    name: 'Dr. Sarah Chen',
    role: 'CEO & Co-Founder',
    bio: 'Former Google AI researcher with 15+ years in machine learning and distributed systems.',
    expertise: ['AI Strategy', 'Distributed Systems', 'Ethics in AI'],
    image: '👩‍💼',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO & Co-Founder',
    bio: 'Ex-AWS principal engineer, architect of multiple billion-scale platforms.',
    expertise: ['Cloud Architecture', 'Kubernetes', 'DevOps'],
    image: '👨‍💻',
  },
  {
    name: 'Alex Thompson',
    role: 'VP Engineering',
    bio: 'Platform engineering expert who led transformations at Fortune 500 companies.',
    expertise: ['Platform Engineering', 'Developer Experience', 'Microservices'],
    image: '🧑‍💻',
  },
  {
    name: 'Dr. Priya Patel',
    role: 'Head of AI Research',
    bio: 'PhD in Computer Science from MIT, published researcher in AI optimization.',
    expertise: ['Machine Learning', 'AI Optimization', 'Research'],
    image: '👩‍🔬',
  },
];

const milestones = [
  { year: '2020', event: 'Founded with a vision to democratize AI for enterprises' },
  { year: '2021', event: 'First major client: Fortune 500 financial services transformation' },
  { year: '2022', event: 'Expanded globally with offices in London and Singapore' },
  { year: '2023', event: 'Launched AI-Enhanced Orchestration platform' },
  { year: '2024', event: 'Reached 50+ enterprise clients across 15 countries' },
  { year: '2025', event: 'Leading the industry in ethical AI implementation' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-magenta/20 via-navy to-black" />
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <Heading as="h1" variant="h1" color="gradient" className="mb-6">
              Building the Future of Intelligent Infrastructure
            </Heading>
            <Text variant="lead" className="max-w-3xl mx-auto mb-8">
              We're on a mission to empower enterprises with ethical AI and cloud innovation. 
              By combining cutting-edge technology with human-centered design, we're creating 
              solutions that transform businesses while benefiting society.
            </Text>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <MetricCounter value={2020} label="Founded" duration={1.5} />
            <MetricCounter value={50} suffix="+" label="Enterprise Clients" duration={2} />
            <MetricCounter value={15} suffix="+" label="Countries" duration={2.5} />
            <MetricCounter value={200} suffix="+" label="Team Members" duration={3} />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Heading as="h2" variant="h2" className="text-center mb-12">
            Our Story
          </Heading>
          
          <div className="space-y-6 text-offwhite/80">
            <Text variant="lead">
              Astro Intelligence was born from a simple observation: while AI and cloud technologies 
              held immense promise, most enterprises struggled to implement them effectively, ethically, 
              and at scale.
            </Text>
            
            <Text variant="body">
              Our founders, having led transformative projects at tech giants and witnessed both the 
              potential and pitfalls of emerging technologies, came together with a shared vision: 
              to bridge the gap between cutting-edge innovation and practical business value.
            </Text>
            
            <Text variant="body">
              What started as a consultancy quickly evolved into something more profound. We realized 
              that true transformation required not just technical expertise, but a fundamental rethinking 
              of how technology serves human needs. This led us to develop our core philosophy: 
              <span className="text-magenta font-semibold"> "Intelligence with Integrity."</span>
            </Text>
            
            <Text variant="body">
              Today, we're proud to partner with industry leaders across the globe, helping them 
              navigate the complexities of digital transformation while maintaining their commitment 
              to ethical practices and sustainable growth.
            </Text>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-magenta/5 to-purple-600/5">
        <div className="mx-auto max-w-7xl">
          <Heading as="h2" variant="h2" className="text-center mb-12">
            Our Values
          </Heading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <Heading as="h3" variant="h4" className="mb-3">
                  {value.title}
                </Heading>
                <Text variant="body" className="text-offwhite/70">
                  {value.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading as="h2" variant="h2" className="text-center mb-4">
            Leadership Team
          </Heading>
          <Text variant="lead" className="text-center max-w-3xl mx-auto mb-12 text-offwhite/80">
            Visionaries, innovators, and industry veterans united by a passion for transformative technology.
          </Text>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div 
                key={member.name}
                className="bg-gradient-to-br from-offwhite/5 to-offwhite/0 border border-offwhite/10 rounded-2xl p-6 hover:border-magenta/50 transition-colors"
              >
                <div className="text-6xl mb-4 text-center">{member.image}</div>
                <Heading as="h3" variant="h5" className="text-center mb-1">
                  {member.name}
                </Heading>
                <Text variant="small" className="text-center text-magenta mb-4">
                  {member.role}
                </Text>
                <Text variant="small" className="text-offwhite/70 mb-4">
                  {member.bio}
                </Text>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs bg-offwhite/5 text-offwhite/60 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Text variant="body" className="text-offwhite/70 mb-4">
              And 200+ talented engineers, designers, and innovators worldwide
            </Text>
            <Button variant="secondary" asChild>
              <Link href="/careers">Join Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-magenta/5 to-purple-600/5">
        <div className="mx-auto max-w-4xl">
          <Heading as="h2" variant="h2" className="text-center mb-12">
            Our Journey
          </Heading>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex gap-6 items-center">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-magenta to-purple-600 flex items-center justify-center">
                    <Text variant="body" className="font-bold">
                      {milestone.year}
                    </Text>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="h-px bg-offwhite/20" />
                </div>
                <div className="flex-1">
                  <Text variant="body" className="text-offwhite/80">
                    {milestone.event}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Heading as="h2" variant="h2" className="mb-6">
            Ready to Transform Your Future?
          </Heading>
          <Text variant="lead" className="mb-8">
            Join us in building intelligent, ethical, and transformative solutions.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/book-call">Start Your Journey</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/careers">Join Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}