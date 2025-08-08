'use client';

import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { 
  Brain,
  Shield,
  Database,
  Globe,
  Award,
  Mail,
  BookOpen,
  Users,
  Cpu,
  Atom
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  role: string;
  avatar: string;
  specializations: string[];
  bio: string;
  achievements: string[];
  publications: number;
  citations: number;
  hIndex: number;
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  previousRoles: string[];
  researchAreas: string[];
  awards: string[];
  socialLinks: {
    email: string;
    scholar?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 'bruce-banner',
    name: 'Dr. Bruce Banner',
    title: 'Chief Research Scientist & Lab Director',
    role: 'Quantum AI & Neuromorphic Computing',
    avatar: '🧬',
    specializations: ['Quantum Machine Learning', 'Neuromorphic Computing', 'High-Energy Physics'],
    bio: 'Dr. Banner leads our quantum AI research initiatives, pioneering the integration of quantum computing principles with machine learning systems. His breakthrough work in quantum-enhanced optimization has revolutionized AI training efficiency.',
    achievements: [
      'Developed QEVO algorithm achieving 87% AI training speedup',
      'Pioneer in neuromorphic edge computing (1000x power reduction)',
      'Led 847-hospital global healthcare AI consortium',
      'Founded privacy-preserving federated learning protocols'
    ],
    publications: 127,
    citations: 8942,
    hIndex: 47,
    education: [
      { degree: 'Ph.D. in Theoretical Physics', institution: 'MIT', year: '2015' },
      { degree: 'M.S. in Quantum Computing', institution: 'Caltech', year: '2012' },
      { degree: 'B.S. in Physics & Mathematics', institution: 'Harvard University', year: '2010' }
    ],
    previousRoles: [
      'Senior Research Scientist - Google Quantum AI (2020-2024)',
      'Principal Investigator - CERN Quantum Computing Initiative (2018-2020)',
      'Postdoc Fellow - IBM Quantum Research (2015-2018)'
    ],
    researchAreas: [
      'Quantum-Enhanced Machine Learning',
      'Bio-Inspired Computing Systems',
      'Privacy-Preserving AI',
      'High-Performance Computing'
    ],
    awards: [
      'NeurIPS Outstanding Paper Award 2024',
      'IEEE Fellow 2023',
      'MIT Technology Review Innovator Under 35 2022',
      'NSF CAREER Award 2021'
    ],
    socialLinks: {
      email: 'banner@astrointelligence.com',
      scholar: 'https://scholar.google.com/citations?user=banner',
      linkedin: 'https://linkedin.com/in/bruce-banner-ai',
      twitter: 'https://twitter.com/drbannergamma'
    }
  },
  {
    id: 'sarah-chen',
    name: 'Dr. Sarah Chen',
    title: 'Principal Research Scientist',
    role: 'Privacy-Preserving AI & Cryptographic ML',
    avatar: '🔒',
    specializations: ['Cryptographic ML', 'Federated Learning', 'Homomorphic Encryption'],
    bio: 'Dr. Chen is a world-renowned expert in privacy-preserving machine learning, leading the development of cryptographically secure AI systems that enable collaboration while maintaining perfect privacy.',
    achievements: [
      'Architected ZeroTrust-FL federated learning framework',
      'Developed homomorphic encryption for neural networks',
      'Led 1,247-bank global fraud detection network',
      'Created privacy-compliant smart city AI platform'
    ],
    publications: 89,
    citations: 6734,
    hIndex: 42,
    education: [
      { degree: 'Ph.D. in Computer Science', institution: 'Stanford University', year: '2016' },
      { degree: 'M.S. in Cryptography', institution: 'UC Berkeley', year: '2013' },
      { degree: 'B.S. in Mathematics & Computer Science', institution: 'Carnegie Mellon', year: '2011' }
    ],
    previousRoles: [
      'Senior Staff Engineer - Apple Machine Learning Privacy (2019-2024)',
      'Research Scientist - Microsoft Research (2017-2019)',
      'Cryptographic Engineer - Signal Foundation (2016-2017)'
    ],
    researchAreas: [
      'Homomorphic Encryption',
      'Secure Multi-party Computation',
      'Differential Privacy',
      'Federated Learning Systems'
    ],
    awards: [
      'ACM Prize in Computing 2023',
      'IEEE Security & Privacy Award 2022',
      'EFF Pioneer Award 2021',
      'Sloan Research Fellowship 2020'
    ],
    socialLinks: {
      email: 'chen@astrointelligence.com',
      scholar: 'https://scholar.google.com/citations?user=sarahchen',
      linkedin: 'https://linkedin.com/in/sarah-chen-crypto'
    }
  },
  {
    id: 'elena-vasquez',
    name: 'Dr. Elena Vasquez',
    title: 'Senior Research Scientist',
    role: 'Neuromorphic Hardware & Brain-Computer Interfaces',
    avatar: '🧠',
    specializations: ['Spiking Neural Networks', 'Neuromorphic Chips', 'Bio-Neural Interfaces'],
    bio: 'Dr. Vasquez bridges neuroscience and computer science, developing brain-inspired computing systems that achieve unprecedented efficiency through biological principles.',
    achievements: [
      'Designed SynapticFlow neuromorphic architecture',
      'Created first bio-compatible neural interface chip',
      'Achieved human-level performance at 1000x lower power',
      'Pioneered spike-timing dependent plasticity in silicon'
    ],
    publications: 76,
    citations: 4521,
    hIndex: 36,
    education: [
      { degree: 'Ph.D. in Bioengineering', institution: 'ETH Zurich', year: '2017' },
      { degree: 'M.S. in Neuroscience', institution: 'University of Edinburgh', year: '2014' },
      { degree: 'B.S. in Electrical Engineering', institution: 'Technical University of Madrid', year: '2012' }
    ],
    previousRoles: [
      'Principal Engineer - Intel Neuromorphic Research (2020-2024)',
      'Research Scientist - IBM Almaden Research (2018-2020)',
      'Postdoc Fellow - Human Brain Project, EU (2017-2018)'
    ],
    researchAreas: [
      'Neuromorphic Engineering',
      'Brain-Computer Interfaces',
      'Synaptic Plasticity Modeling',
      'Ultra-Low Power Computing'
    ],
    awards: [
      'Nature Bioengineering Rising Star 2024',
      'European Research Council Starting Grant 2023',
      'IEEE Biomedical Engineering Award 2022',
      'Marie Curie Fellowship 2021'
    ],
    socialLinks: {
      email: 'vasquez@astrointelligence.com',
      scholar: 'https://scholar.google.com/citations?user=elenavasquez'
    }
  },
  {
    id: 'priya-sharma',
    name: 'Dr. Priya Sharma',
    title: 'Senior Research Scientist',
    role: 'Distributed AI Systems & Edge Computing',
    avatar: '🌐',
    specializations: ['Edge AI', 'Distributed Systems', 'Mobile Computing'],
    bio: 'Dr. Sharma specializes in bringing advanced AI capabilities to resource-constrained environments, enabling intelligent systems to operate efficiently at the edge of networks.',
    achievements: [
      'Deployed AI across 10,000+ edge devices globally',
      'Created federated learning for mobile networks',
      'Optimized neural networks for 1000x efficiency gain',
      'Led smart city AI deployments in 156 cities'
    ],
    publications: 64,
    citations: 3892,
    hIndex: 31,
    education: [
      { degree: 'Ph.D. in Computer Systems', institution: 'University of Toronto', year: '2018' },
      { degree: 'M.S. in Distributed Computing', institution: 'University of Waterloo', year: '2015' },
      { degree: 'B.Tech in Computer Engineering', institution: 'IIT Delhi', year: '2013' }
    ],
    previousRoles: [
      'Staff Research Engineer - Google Edge AI (2021-2024)',
      'Senior Engineer - Qualcomm AI Research (2019-2021)',
      'Research Associate - Vector Institute (2018-2019)'
    ],
    researchAreas: [
      'Edge Computing',
      'Mobile AI Systems',
      'Distributed Machine Learning',
      'IoT Intelligence'
    ],
    awards: [
      'ACM MobiSys Best Paper Award 2023',
      'Google Research Impact Award 2022',
      'NSERC Postdoc Fellowship 2021',
      'Qualcomm Innovation Fellowship 2020'
    ],
    socialLinks: {
      email: 'sharma@astrointelligence.com',
      scholar: 'https://scholar.google.com/citations?user=priyasharma',
      linkedin: 'https://linkedin.com/in/priya-sharma-edge-ai'
    }
  },
  {
    id: 'david-kim',
    name: 'Prof. David Kim',
    title: 'Distinguished Research Scientist',
    role: 'Quantum Computing & Optimization Theory',
    avatar: '⚛️',
    specializations: ['Quantum Algorithms', 'Optimization Theory', 'Quantum Annealing'],
    bio: 'Prof. Kim brings deep expertise in quantum computing theory and optimization, providing the mathematical foundation for our quantum-enhanced AI systems.',
    achievements: [
      'Proved theoretical foundations of quantum ML speedups',
      'Developed quantum annealing for neural optimization',
      'Created adiabatic quantum computation protocols',
      'Established quantum advantage boundaries for AI'
    ],
    publications: 134,
    citations: 12847,
    hIndex: 54,
    education: [
      { degree: 'Ph.D. in Theoretical Physics', institution: 'Princeton University', year: '2012' },
      { degree: 'M.S. in Applied Mathematics', institution: 'MIT', year: '2009' },
      { degree: 'B.S. in Physics & Mathematics', institution: 'Seoul National University', year: '2007' }
    ],
    previousRoles: [
      'Professor - University of Chicago (2018-2024)',
      'Research Scientist - D-Wave Systems (2015-2018)',
      'Postdoc Fellow - Institute for Quantum Computing (2012-2015)'
    ],
    researchAreas: [
      'Quantum Algorithm Design',
      'Quantum Optimization',
      'Quantum Machine Learning Theory',
      'Adiabatic Quantum Computing'
    ],
    awards: [
      'Sloan Research Fellowship 2024',
      'NSF CAREER Award 2023',
      'APS Outstanding Referee 2022',
      'Packard Fellowship 2021'
    ],
    socialLinks: {
      email: 'kim@astrointelligence.com',
      scholar: 'https://scholar.google.com/citations?user=davidkim',
      twitter: 'https://twitter.com/profkimquantum'
    }
  },
  {
    id: 'marcus-thompson',
    name: 'Dr. Marcus Thompson',
    title: 'Principal Hardware Architect',
    role: 'AI Accelerator Design & Custom Silicon',
    avatar: '🔧',
    specializations: ['AI Accelerators', 'ASIC Design', 'Hardware-Software Co-design'],
    bio: 'Dr. Thompson designs custom silicon solutions for AI workloads, creating specialized hardware that enables our breakthrough performance improvements.',
    achievements: [
      'Designed neuromorphic processing chips',
      'Created quantum-classical hybrid processors',
      'Achieved 1000x power efficiency improvements',
      'Led hardware acceleration for federated learning'
    ],
    publications: 52,
    citations: 2976,
    hIndex: 28,
    education: [
      { degree: 'Ph.D. in Electrical Engineering', institution: 'UC Berkeley', year: '2019' },
      { degree: 'M.S. in Computer Architecture', institution: 'Georgia Tech', year: '2016' },
      { degree: 'B.S. in Computer Engineering', institution: 'University of Michigan', year: '2014' }
    ],
    previousRoles: [
      'Senior Hardware Engineer - NVIDIA Research (2022-2024)',
      'Principal Engineer - Cerebras Systems (2020-2022)',
      'Hardware Design Engineer - Tesla AI (2019-2020)'
    ],
    researchAreas: [
      'AI Accelerator Architecture',
      'Neuromorphic Computing Hardware',
      'Quantum Computing Systems',
      'Low-Power VLSI Design'
    ],
    awards: [
      'IEEE ISSCC Best Paper Award 2024',
      'DAC Young Fellow Award 2023',
      'NVIDIA Graduate Fellowship 2022',
      'SRC Graduate Fellowship 2021'
    ],
    socialLinks: {
      email: 'thompson@astrointelligence.com',
      scholar: 'https://scholar.google.com/citations?user=marcusthompson'
    }
  }
];

const getSpecializationIcon = (spec: string) => {
  if (spec.includes('Quantum')) return Atom;
  if (spec.includes('Neural') || spec.includes('Brain')) return Brain;
  if (spec.includes('Privacy') || spec.includes('Crypto')) return Shield;
  if (spec.includes('Edge') || spec.includes('Distributed')) return Globe;
  if (spec.includes('Database') || spec.includes('Vector')) return Database;
  return Cpu;
};

export default function ResearchTeam() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Research Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the brilliant minds behind our groundbreaking AI research. Our team combines 
            world-class expertise in quantum computing, privacy-preserving AI, and neuromorphic systems.
          </p>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary">
              {teamMembers.reduce((sum, member) => sum + member.publications, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Publications</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-500">
              {teamMembers.reduce((sum, member) => sum + member.citations, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Citations</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-green-500">
              {Math.round(teamMembers.reduce((sum, member) => sum + member.hIndex, 0) / teamMembers.length)}
            </div>
            <div className="text-sm text-muted-foreground">Avg h-index</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-orange-500">
              {teamMembers.reduce((sum, member) => sum + member.awards.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Awards</div>
          </Card>
        </div>

        {/* Team Members */}
        <div className="grid gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              <div className="grid lg:grid-cols-3 gap-6 card-padding">
                {/* Profile Info */}
                <div className="lg:col-span-1 text-center lg:text-left">
                  <div className="text-6xl mb-4 text-center">{member.avatar}</div>
                  <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
                  <p className="text-lg text-primary font-semibold mb-1">{member.title}</p>
                  <p className="text-muted-foreground mb-4">{member.role}</p>

                  {/* Specializations */}
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                    {member.specializations.map((spec) => {
                      const Icon = getSpecializationIcon(spec);
                      return (
                        <Badge key={spec} variant="outline" className="text-xs">
                          <Icon className="mr-1 h-3 w-3" />
                          {spec}
                        </Badge>
                      );
                    })}
                  </div>

                  {/* Academic Metrics */}
                  <div className="grid grid-cols-3 gap-2 text-center mb-4">
                    <div>
                      <div className="text-xl font-bold">{member.publications}</div>
                      <div className="text-xs text-muted-foreground">Papers</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold">{member.citations.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Citations</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold">{member.hIndex}</div>
                      <div className="text-xs text-muted-foreground">h-index</div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex gap-2 justify-center lg:justify-start">
                    <Button size="sm" variant="outline" asChild>
                      <a href={`mailto:${member.socialLinks.email}`}>
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                    {member.socialLinks.scholar && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={member.socialLinks.scholar} target="_blank" rel="noopener noreferrer">
                          <BookOpen className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {member.socialLinks.linkedin && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                          <Users className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Detailed Info */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Bio */}
                  <div>
                    <h3 className="font-semibold mb-2">Biography</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                  </div>

                  {/* Key Achievements */}
                  <div>
                    <h3 className="font-semibold mb-2">Key Achievements</h3>
                    <ul className="space-y-1">
                      {member.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Award className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Education & Career */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Education</h3>
                      <div className="space-y-2">
                        {member.education.map((edu, index) => (
                          <div key={index} className="text-sm">
                            <div className="font-medium">{edu.degree}</div>
                            <div className="text-muted-foreground">{edu.institution} ({edu.year})</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Previous Roles</h3>
                      <div className="space-y-1">
                        {member.previousRoles.slice(0, 3).map((role, index) => (
                          <div key={index} className="text-sm text-muted-foreground">
                            {role}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Research Areas & Awards */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Research Areas</h3>
                      <div className="flex flex-wrap gap-1">
                        {member.researchAreas.map((area) => (
                          <Badge key={area} variant="secondary" size="sm">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Recent Awards</h3>
                      <div className="space-y-1">
                        {member.awards.slice(0, 3).map((award, index) => (
                          <div key={index} className="text-sm text-muted-foreground flex items-center gap-1">
                            <Award className="h-3 w-3 text-yellow-500" />
                            {award}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Join Our Team */}
        <Card className="mt-12 p-8 text-center bg-gradient-to-r from-primary/5 to-purple-500/5">
          <h2 className="text-2xl font-bold mb-4">Join Our Research Team</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're always looking for exceptional researchers and engineers to join our mission 
            of advancing the frontiers of artificial intelligence.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <a href="/careers">View Open Positions</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/contact">Get in Touch</a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}