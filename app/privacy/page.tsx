import { Metadata } from 'next';
import { Heading, Text } from '@/components/ui/Typography';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - Astro Intelligence Inc',
  description: 'Our commitment to protecting your privacy and handling your data responsibly.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-black opacity-50" />
        <div className="relative mx-auto max-w-4xl">
          <Heading as="h1" variant="h1" className="mb-6">
            Privacy Policy
          </Heading>
          <Text variant="lead" className="mb-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </Text>
          <Text variant="body" className="text-offwhite/80">
            At Astro Intelligence Inc, we take your privacy seriously. This policy outlines how we collect, 
            use, and protect your personal information.
          </Text>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Introduction */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              1. Introduction
            </Heading>
            <Text variant="body" className="text-offwhite/80 mb-4">
              This Privacy Policy describes how Astro Intelligence Inc ("we," "our," or "us") collects, uses, 
              and shares information about you when you use our website, services, and products (collectively, 
              the "Services").
            </Text>
          </div>

          {/* Information We Collect */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              2. Information We Collect
            </Heading>
            
            <Heading as="h3" variant="h4" className="mb-3 mt-6">
              2.1 Information You Provide
            </Heading>
            <ul className="space-y-2 text-offwhite/80">
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">
                  Account information (name, email, company details)
                </Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">
                  Payment information (processed securely through Stripe)
                </Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">
                  Communications and feedback
                </Text>
              </li>
            </ul>

            <Heading as="h3" variant="h4" className="mb-3 mt-6">
              2.2 Information We Collect Automatically
            </Heading>
            <ul className="space-y-2 text-offwhite/80">
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">
                  Usage data and analytics (via privacy-friendly Plausible Analytics)
                </Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">
                  Technical information (IP address, browser type, device information)
                </Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">
                  Error reports and performance data (via Sentry)
                </Text>
              </li>
            </ul>
          </div>

          {/* How We Use Information */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              3. How We Use Your Information
            </Heading>
            <Text variant="body" className="text-offwhite/80 mb-4">
              We use the information we collect to:
            </Text>
            <ul className="space-y-2 text-offwhite/80">
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Provide and improve our Services</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Process transactions and send related information</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Send technical notices and support messages</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Respond to your comments and questions</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Analyze usage patterns and improve user experience</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Comply with legal obligations</Text>
              </li>
            </ul>
          </div>

          {/* Data Sharing */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              4. Information Sharing and Disclosure
            </Heading>
            <Text variant="body" className="text-offwhite/80 mb-4">
              We do not sell, trade, or rent your personal information. We may share your information in the 
              following circumstances:
            </Text>
            <ul className="space-y-2 text-offwhite/80">
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">
                  With service providers who assist in our operations (under strict confidentiality agreements)
                </Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">
                  To comply with laws or respond to legal requests
                </Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">
                  To protect our rights, privacy, safety, or property
                </Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">
                  With your consent or at your direction
                </Text>
              </li>
            </ul>
          </div>

          {/* Data Security */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              5. Data Security
            </Heading>
            <Text variant="body" className="text-offwhite/80 mb-4">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. These include:
            </Text>
            <ul className="space-y-2 text-offwhite/80">
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Encryption of data in transit and at rest</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Regular security audits and penetration testing</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Access controls and authentication measures</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Employee training on data protection</Text>
              </li>
            </ul>
          </div>

          {/* Your Rights */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              6. Your Rights
            </Heading>
            <Text variant="body" className="text-offwhite/80 mb-4">
              Depending on your location, you may have certain rights regarding your personal information:
            </Text>
            <ul className="space-y-2 text-offwhite/80">
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Access and receive a copy of your personal data</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Correct or update inaccurate information</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Request deletion of your personal data</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Object to or restrict certain processing</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Data portability</Text>
              </li>
            </ul>
            <Text variant="body" className="text-offwhite/80 mt-4">
              To exercise these rights, please contact us at privacy@astrointelligence.com.
            </Text>
          </div>

          {/* Cookies */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              7. Cookies and Tracking Technologies
            </Heading>
            <Text variant="body" className="text-offwhite/80 mb-4">
              We use cookies and similar tracking technologies to improve your experience. You can control 
              cookie preferences through your browser settings. For more information, see our{' '}
              <Link href="/cookies" className="text-magenta hover:text-magenta/80 underline">
                Cookie Policy
              </Link>.
            </Text>
          </div>

          {/* Children's Privacy */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              8. Children's Privacy
            </Heading>
            <Text variant="body" className="text-offwhite/80">
              Our Services are not intended for children under 16 years of age. We do not knowingly collect 
              personal information from children under 16.
            </Text>
          </div>

          {/* International Transfers */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              9. International Data Transfers
            </Heading>
            <Text variant="body" className="text-offwhite/80">
              Your information may be transferred to and processed in countries other than your own. We ensure 
              appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
            </Text>
          </div>

          {/* Changes */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              10. Changes to This Policy
            </Heading>
            <Text variant="body" className="text-offwhite/80">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date.
            </Text>
          </div>

          {/* Contact */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              11. Contact Us
            </Heading>
            <Text variant="body" className="text-offwhite/80 mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
            </Text>
            <div className="bg-gradient-to-br from-offwhite/5 to-offwhite/0 border border-offwhite/10 rounded-2xl p-6">
              <Text variant="body" className="text-offwhite/80">
                <strong>Astro Intelligence Inc</strong><br />
                Privacy Team<br />
                Email: privacy@astrointelligence.com<br />
                Address: 123 Market Street, San Francisco, CA 94105<br />
                Phone: +1 (555) 123-4567
              </Text>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}