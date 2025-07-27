import { Metadata } from 'next';
import { Heading, Text } from '@/components/ui/Typography';

export const metadata: Metadata = {
  title: 'Terms of Service - Astro Intelligence Inc',
  description: 'Terms and conditions for using Astro Intelligence services and products.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="from-navy via-navy absolute inset-0 bg-gradient-to-br to-black opacity-50" />
        <div className="relative mx-auto max-w-4xl">
          <Heading as="h1" variant="h1" className="mb-6">
            Terms of Service
          </Heading>
          <Text variant="lead" className="mb-4">
            Effective Date:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          <Text variant="body" className="text-offwhite/80">
            Please read these Terms of Service carefully before using our services.
          </Text>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Agreement */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              1. Agreement to Terms
            </Heading>
            <Text variant="body" className="text-offwhite/80 mb-4">
              By accessing or using the services provided by Astro Intelligence Inc ("Company,"
              "we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If
              you disagree with any part of these terms, you do not have permission to access our
              services.
            </Text>
          </div>

          {/* Services Description */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              2. Description of Services
            </Heading>
            <Text variant="body" className="text-offwhite/80 mb-4">
              Astro Intelligence Inc provides:
            </Text>
            <ul className="text-offwhite/80 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">AI-enhanced infrastructure orchestration services</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">DevOps consulting and implementation</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Platform engineering solutions</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Microservices architecture design and deployment</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Automation scripts and tools</Text>
              </li>
            </ul>
          </div>

          {/* Account Terms */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              3. Account Terms
            </Heading>
            <Text variant="body" className="text-offwhite/80 mb-4">
              When you create an account with us, you must:
            </Text>
            <ul className="text-offwhite/80 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">
                  Be at least 18 years of age or have legal parental consent
                </Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Provide accurate, complete, and current information</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Maintain the security of your account credentials</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">
                  Accept responsibility for all activities under your account
                </Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Notify us immediately of any unauthorized use</Text>
              </li>
            </ul>
          </div>

          {/* Acceptable Use */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              4. Acceptable Use Policy
            </Heading>
            <Text variant="body" className="text-offwhite/80 mb-4">
              You agree not to use our services to:
            </Text>
            <ul className="text-offwhite/80 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Violate any laws or regulations</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Infringe on intellectual property rights</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Transmit malicious code or interfere with our services</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Attempt unauthorized access to our systems</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Engage in any activity that harms our reputation</Text>
              </li>
            </ul>
          </div>

          {/* Payment Terms */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              5. Payment and Billing
            </Heading>

            <Heading as="h3" variant="h4" className="mt-6 mb-3">
              5.1 Pricing
            </Heading>
            <Text variant="body" className="text-offwhite/80 mb-4">
              Pricing for our services is as described on our website or in your service agreement.
              We reserve the right to modify pricing with 30 days notice.
            </Text>

            <Heading as="h3" variant="h4" className="mt-6 mb-3">
              5.2 Payment
            </Heading>
            <Text variant="body" className="text-offwhite/80 mb-4">
              Payment is due according to the terms in your service agreement. Late payments may
              incur fees and result in service suspension.
            </Text>

            <Heading as="h3" variant="h4" className="mt-6 mb-3">
              5.3 Refunds
            </Heading>
            <Text variant="body" className="text-offwhite/80">
              Refund policies are as specified in your service agreement. Generally, we offer a
              30-day money-back guarantee for new subscriptions.
            </Text>
          </div>

          {/* Intellectual Property */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              6. Intellectual Property Rights
            </Heading>

            <Heading as="h3" variant="h4" className="mt-6 mb-3">
              6.1 Our Content
            </Heading>
            <Text variant="body" className="text-offwhite/80 mb-4">
              All content, features, and functionality of our services are owned by Astro
              Intelligence Inc and are protected by international copyright, trademark, and other
              intellectual property laws.
            </Text>

            <Heading as="h3" variant="h4" className="mt-6 mb-3">
              6.2 Your Content
            </Heading>
            <Text variant="body" className="text-offwhite/80 mb-4">
              You retain ownership of content you submit to our services. By submitting content, you
              grant us a license to use, modify, and display that content as necessary to provide
              our services.
            </Text>

            <Heading as="h3" variant="h4" className="mt-6 mb-3">
              6.3 Open Source
            </Heading>
            <Text variant="body" className="text-offwhite/80">
              Some of our scripts and tools are provided under open source licenses. The applicable
              license terms will be clearly indicated.
            </Text>
          </div>

          {/* Confidentiality */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              7. Confidentiality
            </Heading>
            <Text variant="body" className="text-offwhite/80">
              Both parties agree to maintain the confidentiality of any proprietary information
              shared during the course of our business relationship. This obligation survives
              termination of these Terms.
            </Text>
          </div>

          {/* Warranties and Disclaimers */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              8. Warranties and Disclaimers
            </Heading>
            <Text variant="body" className="text-offwhite/80 mb-4">
              Our services are provided "as is" and "as available" without warranties of any kind,
              either express or implied. We do not warrant that:
            </Text>
            <ul className="text-offwhite/80 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Services will be uninterrupted or error-free</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Results obtained will meet your specific requirements</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">All defects or errors will be corrected</Text>
              </li>
            </ul>
          </div>

          {/* Limitation of Liability */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              9. Limitation of Liability
            </Heading>
            <Text variant="body" className="text-offwhite/80 mb-4 font-semibold uppercase">
              To the maximum extent permitted by law, Astro Intelligence Inc shall not be liable for
              any indirect, incidental, special, consequential, or punitive damages, including loss
              of profits, data, or use, arising from your use of our services.
            </Text>
            <Text variant="body" className="text-offwhite/80">
              Our total liability shall not exceed the amount paid by you to us in the twelve (12)
              months preceding the claim.
            </Text>
          </div>

          {/* Indemnification */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              10. Indemnification
            </Heading>
            <Text variant="body" className="text-offwhite/80">
              You agree to indemnify and hold harmless Astro Intelligence Inc, its officers,
              directors, employees, and agents from any claims, damages, or expenses arising from
              your use of our services or violation of these Terms.
            </Text>
          </div>

          {/* Termination */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              11. Termination
            </Heading>
            <Text variant="body" className="text-offwhite/80 mb-4">
              We may terminate or suspend your account immediately, without prior notice, for:
            </Text>
            <ul className="text-offwhite/80 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Breach of these Terms</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Non-payment of fees</Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-magenta mt-1">•</span>
                <Text variant="body">Conduct harmful to other users or our business</Text>
              </li>
            </ul>
            <Text variant="body" className="text-offwhite/80 mt-4">
              Upon termination, your right to use our services will cease immediately.
            </Text>
          </div>

          {/* Governing Law */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              12. Governing Law
            </Heading>
            <Text variant="body" className="text-offwhite/80">
              These Terms shall be governed by and construed in accordance with the laws of the
              State of California, United States, without regard to its conflict of law provisions.
            </Text>
          </div>

          {/* Changes to Terms */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              13. Changes to Terms
            </Heading>
            <Text variant="body" className="text-offwhite/80">
              We reserve the right to modify these Terms at any time. We will provide notice of
              material changes via email or through our services. Continued use after changes
              constitutes acceptance of the new Terms.
            </Text>
          </div>

          {/* Contact Information */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              14. Contact Information
            </Heading>
            <Text variant="body" className="text-offwhite/80 mb-4">
              For questions about these Terms, please contact us at:
            </Text>
            <div className="from-offwhite/5 to-offwhite/0 border-offwhite/10 rounded-2xl border bg-gradient-to-br p-6">
              <Text variant="body" className="text-offwhite/80">
                <strong>Astro Intelligence Inc</strong>
                <br />
                Legal Department
                <br />
                Email: legal@astrointelligence.com
                <br />
                Address: 123 Market Street, San Francisco, CA 94105
                <br />
                Phone: +1 (555) 123-4567
              </Text>
            </div>
          </div>

          {/* Entire Agreement */}
          <div>
            <Heading as="h2" variant="h2" className="mb-4">
              15. Entire Agreement
            </Heading>
            <Text variant="body" className="text-offwhite/80">
              These Terms constitute the entire agreement between you and Astro Intelligence Inc
              regarding our services and supersede any prior agreements.
            </Text>
          </div>
        </div>
      </section>
    </div>
  );
}
