import { Metadata } from 'next';
export const dynamic = 'force-dynamic'
import { Heading, Text } from '@/components/ui/Typography';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Privacy Policy | Saad Jamal',
  description: 'Privacy policy for Saad Jamal\'s services. Learn how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="content-width">
        <Card className="card-padding md:p-12">
          <Heading as="h1" variant="h1" className="mb-8">
            Privacy Policy
          </Heading>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                Introduction
              </Heading>
              <Text>
                At Saad Jamal Consulting ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and safeguard your information when you use our services or visit our website.
              </Text>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                Information We Collect
              </Heading>
              <Text className="mb-4">
                We may collect the following types of information:
              </Text>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Contact Information:</strong> Name, email address, phone number, and company name</li>
                <li><strong>Project Information:</strong> Details about your project requirements and technical specifications</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our website (via Plausible Analytics)</li>
                <li><strong>Communication Data:</strong> Records of our communications via email or contact forms</li>
              </ul>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                How We Use Your Information
              </Heading>
              <Text className="mb-4">
                We use your information for the following purposes:
              </Text>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and deliver our consulting services</li>
                <li>To communicate with you about projects and proposals</li>
                <li>To improve our services and website functionality</li>
                <li>To comply with legal obligations</li>
                <li>To protect against fraudulent or illegal activity</li>
              </ul>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                Data Security
              </Heading>
              <Text>
                We implement industry-standard security measures to protect your personal information from unauthorized access, 
                disclosure, alteration, or destruction. This includes encryption, secure servers, and regular security audits. 
                However, no method of transmission over the internet is 100% secure.
              </Text>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                Third-Party Services
              </Heading>
              <Text className="mb-4">
                We use the following third-party services that may collect data:
              </Text>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Plausible Analytics:</strong> Privacy-focused website analytics (no cookies, GDPR compliant)</li>
                <li><strong>Vercel:</strong> Website hosting and deployment</li>
                <li><strong>Clerk:</strong> Authentication services (if you create an account)</li>
                <li><strong>Stripe:</strong> Payment processing (for premium services)</li>
                <li><strong>Resend:</strong> Email communication services</li>
              </ul>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                Your Rights
              </Heading>
              <Text className="mb-4">
                You have the following rights regarding your personal data:
              </Text>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Request corrections to inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Request your data in a portable format</li>
                <li><strong>Objection:</strong> Object to certain uses of your data</li>
              </ul>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                Cookies
              </Heading>
              <Text>
                We use minimal cookies only for essential website functionality (theme preference, authentication state). 
                We do not use tracking cookies or advertising cookies. Our analytics provider (Plausible) does not use cookies.
              </Text>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                Data Retention
              </Heading>
              <Text>
                We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, 
                comply with legal obligations, or resolve disputes. Project-related data is typically retained for 3 years after 
                project completion unless otherwise required by law.
              </Text>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                Children's Privacy
              </Heading>
              <Text>
                Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal 
                information from children under 18.
              </Text>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                Changes to This Policy
              </Heading>
              <Text>
                We may update this privacy policy from time to time. We will notify you of any material changes by posting 
                the new policy on this page and updating the "Last updated" date.
              </Text>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                Contact Us
              </Heading>
              <Text>
                If you have any questions about this privacy policy or our data practices, please contact us at:
              </Text>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-semibold">Saad Jamal</p>
                <p>Email: privacy@saadjamal.com</p>
                <p>Website: saadjamal.com</p>
              </div>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
}