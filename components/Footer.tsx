import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Text } from '@/components/ui/Typography';

const footerLinks = {
  services: [
    { name: 'AI Consulting', href: '/services/ai-consulting' },
    { name: 'Cloud Architecture', href: '/services/cloud-architecture' },
    { name: 'ML Engineering', href: '/services/ml-engineering' },
    { name: 'Strategic Partnerships', href: '/services/strategic-partnerships' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Scripts', href: '/scripts' },
    { name: 'Research Lab', href: '/research-lab' },
    { name: 'Case Studies', href: '/portfolio' },
    { name: 'Documentation', href: '/docs' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-subtle border-t bg-black" role="contentinfo">
      <div className="mx-auto max-w-7xl section-padding-sm">
        <div className="grid grid-cols-1 grid-gap-md lg:grid-cols-5">
          {/* Logo and Ethics Statement */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-magenta hover:text-magenta/80 transition-colors">
              <Logo variant="full" className="mb-4 h-8 w-auto" data-testid="footer-logo" />
            </Link>
            <Text variant="small" className="text-muted-foreground max-w-sm">
              Empowering enterprises with ethical AI and cloud innovation. We believe in responsible
              technology that augments human potential.
            </Text>
            <div className="mt-6">
              <Text variant="caption">
                © {new Date().getFullYear()} Astro Intelligence Inc. All rights reserved.
              </Text>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 grid-gap-md sm:grid-cols-3 lg:col-span-3">
            <div>
              <h3 className="font-heading text-offwhite text-sm font-semibold tracking-wider uppercase">
                Services
              </h3>
              <ul className="mt-4 space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-magenta text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-magenta focus:ring-offset-2 focus:ring-offset-black rounded-sm inline-block px-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-offwhite text-sm font-semibold tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-magenta text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-magenta focus:ring-offset-2 focus:ring-offset-black rounded-sm inline-block px-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-offwhite text-sm font-semibold tracking-wider uppercase">
                Resources
              </h3>
              <ul className="mt-4 space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-magenta text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-magenta focus:ring-offset-2 focus:ring-offset-black rounded-sm inline-block px-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-subtle mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <nav aria-label="Legal links" className="flex space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-magenta text-xs transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <nav aria-label="Social links" className="flex items-center space-x-6">
              <Link
                href="https://github.com/astro-intelligence"
                className="text-muted-foreground hover:text-magenta transition-colors focus:outline-none focus:ring-2 focus:ring-magenta focus:ring-offset-2 focus:ring-offset-black rounded-md p-1"
                aria-label="GitHub (opens in new window)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="https://linkedin.com/company/astro-intelligence"
                className="text-muted-foreground hover:text-magenta transition-colors focus:outline-none focus:ring-2 focus:ring-magenta focus:ring-offset-2 focus:ring-offset-black rounded-md p-1"
                aria-label="LinkedIn (opens in new window)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
