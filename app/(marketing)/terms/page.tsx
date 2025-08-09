import { Metadata } from 'next';
export const dynamic = 'force-dynamic'
import { Heading, Text } from '@/components/ui/Typography';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Terms of Service | Saad Jamal',
  description: 'Terms of service for Saad Jamal\'s consulting and software services.',
};

export default function TermsPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="content-width">
        <Card className="card-padding md:p-12">
          <Heading as="h1" variant="h1" className="mb-8">
            Terms of Service
          </Heading>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                1. Acceptance of Terms
              </Heading>
              <Text>
                By accessing or using the services provided by Saad Jamal Consulting ("we," "our," or "us"), you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </Text>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                2. Services Description
              </Heading>
              <Text className="mb-4">
                We provide the following services:
              </Text>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cloud architecture and consulting</li>
                <li>AI/ML engineering and implementation</li>
                <li>Automation and scripting solutions</li>
                <li>Software development and integration</li>
                <li>Technical advisory and strategic partnerships</li>
                <li>Premium scripts and tools (via marketplace)</li>
              </ul>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                3. Client Responsibilities
              </Heading>
              <Text className="mb-4">
                As a client, you agree to:
              </Text>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information about your project requirements</li>
                <li>Respond to communications in a timely manner</li>
                <li>Provide necessary access to systems and resources</li>
                <li>Make payments according to agreed terms</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                4. Intellectual Property
              </Heading>
              <Text className="mb-4">
                <strong>Client Work:</strong> Unless otherwise agreed in writing, all custom work created for clients becomes 
                the property of the client upon full payment.
              </Text>
              <Text className="mb-4">
                <strong>Our Property:</strong> Our methodologies, frameworks, pre-existing code libraries, and general knowledge 
                remain our property.
              </Text>
              <Text>
                <strong>Open Source:</strong> Some deliverables may include open-source components subject to their respective licenses.
              </Text>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                5. Confidentiality
              </Heading>
              <Text>
                Both parties agree to maintain the confidentiality of any proprietary information received during the engagement. 
                This obligation survives the termination of our services.
              </Text>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                6. Payment Terms
              </Heading>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Consulting Services:</strong> Billed hourly or per project as agreed</li>
                <li><strong>Retainer Services:</strong> Monthly payment in advance</li>
                <li><strong>Premium Scripts:</strong> One-time payment via Stripe</li>
                <li><strong>Late Payments:</strong> Subject to 1.5% monthly interest</li>
                <li><strong>Refunds:</strong> Evaluated on a case-by-case basis</li>
              </ul>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                7. Warranties and Disclaimers
              </Heading>
              <Text className="mb-4">
                <strong>Our Warranty:</strong> We warrant that our services will be performed in a professional and workmanlike manner.
              </Text>
              <Text>
                <strong>Disclaimer:</strong> EXCEPT AS EXPRESSLY PROVIDED, OUR SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. 
                WE DO NOT GUARANTEE SPECIFIC RESULTS OR OUTCOMES.
              </Text>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                8. Limitation of Liability
              </Heading>
              <Text>
                OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM OUR SERVICES SHALL NOT EXCEED THE AMOUNT PAID BY YOU FOR THE SPECIFIC 
                SERVICE GIVING RISE TO THE CLAIM. WE SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES.
              </Text>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                9. Indemnification
              </Heading>
              <Text>
                You agree to indemnify and hold us harmless from any claims arising from your use of our deliverables, 
                violation of these terms, or infringement of any third-party rights.
              </Text>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                10. Termination
              </Heading>
              <Text>
                Either party may terminate the engagement with 30 days written notice. Upon termination, you shall pay for all 
                services rendered up to the termination date.
              </Text>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                11. Dispute Resolution
              </Heading>
              <Text>
                Any disputes shall first be addressed through good-faith negotiations. If unresolved, disputes shall be settled 
                through binding arbitration in accordance with the rules of the American Arbitration Association.
              </Text>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                12. Governing Law
              </Heading>
              <Text>
                These terms shall be governed by the laws of the State of Texas, United States, without regard to its conflict 
                of law provisions.
              </Text>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                13. Modifications
              </Heading>
              <Text>
                We reserve the right to modify these terms at any time. Material changes will be communicated to active clients. 
                Continued use of our services constitutes acceptance of modified terms.
              </Text>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                14. Entire Agreement
              </Heading>
              <Text>
                These terms, together with any signed statements of work or service agreements, constitute the entire agreement 
                between the parties.
              </Text>
            </section>

            <section className="mb-8">
              <Heading as="h2" variant="h3" className="mb-4">
                15. Contact Information
              </Heading>
              <Text>
                For questions about these terms, please contact us at:
              </Text>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-semibold">Saad Jamal</p>
                <p>Email: legal@saadjamal.com</p>
                <p>Website: saadjamal.com</p>
              </div>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
}