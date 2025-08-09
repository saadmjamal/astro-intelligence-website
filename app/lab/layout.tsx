import { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Logo } from '@/components/ui/Logo';
import { 
  ArrowLeft, 
  Beaker, 
  BookOpen, 
  Code2, 
  Cpu, 
  Microscope,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';

const labNavigation = [
  { name: 'Overview', href: '/lab', icon: Beaker },
  { name: 'Research', href: '/lab#experiments', icon: Microscope },
  { name: 'Publications', href: '/lab/publications', icon: BookOpen },
  { name: 'Open Source', href: '/lab/open-source', icon: Code2 },
  { name: 'Demos', href: '/lab/demos', icon: Cpu },
];

export const dynamic = 'force-dynamic'

export default function LabLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-navy-900/5 to-purple-900/5">
      {/* Lab Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center grid-gap">
              <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Main Site
              </Link>
              <div className="h-6 w-px bg-border" />
              <Link href="/lab" className="flex items-center gap-2">
                <Logo variant="icon" className="h-8 w-8" />
                <span className="font-semibold text-lg bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Research Lab</span>
              </Link>
            </div>
            <nav className="hidden lg:flex items-center gap-2">
              {labNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
              <div className="ml-4 flex items-center gap-4">
                <ThemeToggle />
                <Button size="sm" asChild>
                  <Link href="/contact">Collaborate</Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Lab Footer */}
      <footer className="mt-20 border-t border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 grid-gap-md">
            {/* About */}
            <div className="md:col-span-2">
              <h3 className="font-semibold mb-4">About the Research Lab</h3>
              <p className="text-sm text-muted-foreground mb-4">
                The Astro Intelligence Research Lab is dedicated to exploring cutting-edge 
                technologies in AI, machine learning, and cloud computing. We publish our 
                findings and open-source our tools to benefit the developer community.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/astrointelligence"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/astrointel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/company/astrointelligence"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {labNavigation.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a 
                    href="https://github.com/astrointelligence/research"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Research Repository
                  </a>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    Engineering Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact Team
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Astro Intelligence Research Lab. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}