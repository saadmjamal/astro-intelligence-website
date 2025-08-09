import { Metadata } from 'next';
import Script from 'next/script';
import { Heading, Text } from '@/components/ui/Typography';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ContactForm } from './ContactForm';
import { Calendar, MessageSquare, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us - Get Your Free Cloud & AI Consultation | Astro Intelligence',
  description: 'Schedule your free consultation to discover how to cut cloud costs by 30% and deploy 5× faster. Get a custom ROI roadmap with no obligation.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding">
        <div className="from-navy via-navy absolute inset-0 bg-gradient-to-br to-black opacity-50" />
        <div className="relative mx-auto max-w-7xl text-center">
          <Heading as="h1" variant="h1" className="mb-6">
            Start Your 30% Cost Reduction Journey
          </Heading>
          <Text variant="lead" className="mx-auto mb-8 max-w-3xl text-muted-foreground">
            Join Fortune 500 companies achieving dramatic cost savings and 5× faster deployment. 
            Get your free consultation and custom ROI roadmap today.
          </Text>
          <div className="flex flex-wrap justify-center grid-gap text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>30-minute strategy session</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Custom ROI assessment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>No commitment required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section-padding">
        <div className="container-width">
          <div className="mb-20 grid grid-gap-md lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <Heading as="h3" variant="h4" className="mb-3">
                Executive Briefing
              </Heading>
              <Text variant="body" className="text-muted-foreground mb-4">
                30-minute strategy session with ROI assessment for IT leaders.
              </Text>
              <Button variant="outline" asChild>
                <Link href="https://calendly.com/saadjamal/30min" target="_blank" rel="noopener noreferrer" data-analytics="calendly-click">
                  Book Executive Call
                </Link>
              </Button>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <Heading as="h3" variant="h4" className="mb-3">
                Quick Assessment
              </Heading>
              <Text variant="body" className="text-muted-foreground mb-4">
                Get your custom cloud optimization roadmap within 24 hours.
              </Text>
              <Button variant="outline" asChild>
                <a href="#contact-form">Start Assessment</a>
              </Button>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <Heading as="h3" variant="h4" className="mb-3">
                Priority Support
              </Heading>
              <Text variant="body" className="text-muted-foreground mb-4">
                For urgent cloud issues or immediate assistance.
              </Text>
              <Link
                href="mailto:saad@astrointelligence.com?subject=Priority%20Cloud%20Consultation"
                className="text-primary hover:text-primary/80 underline transition-colors"
              >
                Get Priority Response
              </Link>
            </div>
          </div>

          {/* Calendly Inline Embed */}
          <div className="mb-16" aria-label="Schedule with Calendly">
            <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/saadjamal/30min"
              style={{ minWidth: '320px', height: '700px' }}
              data-analytics="calendly-inline"
            />
          </div>

          {/* Contact Form */}
          <div id="contact-form">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="bg-muted/30 section-padding">
        <div className="container-width">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <Heading as="h2" variant="h3" className="mb-4">
              Available Worldwide
            </Heading>
            <Text variant="body" className="text-muted-foreground max-w-2xl mx-auto">
              Based in the United States, serving clients globally. 
              Available for remote collaboration across all time zones.
            </Text>
          </div>
        </div>
      </section>
    </div>
  );
}
