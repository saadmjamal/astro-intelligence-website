'use client';

import { useState } from 'react';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

// export const metadata: Metadata = {
//   title: 'Contact - Astro Intelligence Inc',
//   description: 'Get in touch with our team. We\'re here to help you transform your infrastructure.',
// };

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  acceptTerms: boolean;
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // TODO: Implement actual form submission
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      console.log('Form data:', data);

      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="from-navy via-navy absolute inset-0 bg-gradient-to-br to-black opacity-50" />
        <div className="relative mx-auto max-w-7xl text-center">
          <Heading as="h1" variant="h1" color="gradient" className="mb-6">
            Let's Build Something Amazing
          </Heading>
          <Text variant="lead" className="mx-auto max-w-3xl">
            Ready to transform your infrastructure? Our team is here to help you navigate your cloud
            and AI journey.
          </Text>
        </div>
      </section>

      {/* Contact Options */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 grid gap-8 lg:grid-cols-3">
            <div className="text-center">
              <div className="from-magenta mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br to-purple-600">
                <span className="text-2xl">📅</span>
              </div>
              <Heading as="h3" variant="h4" className="mb-3">
                Schedule a Call
              </Heading>
              <Text variant="body" className="text-offwhite/70 mb-4">
                Book a 30-minute discovery call with our solutions architect.
              </Text>
              <Button variant="secondary" asChild>
                <Link href="/book-call">Book Now</Link>
              </Button>
            </div>

            <div className="text-center">
              <div className="from-magenta mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br to-purple-600">
                <span className="text-2xl">💬</span>
              </div>
              <Heading as="h3" variant="h4" className="mb-3">
                Live Chat
              </Heading>
              <Text variant="body" className="text-offwhite/70 mb-4">
                Chat with our team for quick questions and immediate assistance.
              </Text>
              <Button variant="secondary">Start Chat</Button>
            </div>

            <div className="text-center">
              <div className="from-magenta mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br to-purple-600">
                <span className="text-2xl">📧</span>
              </div>
              <Heading as="h3" variant="h4" className="mb-3">
                Email Us
              </Heading>
              <Text variant="body" className="text-offwhite/70 mb-4">
                Send us a detailed message and we'll respond within 24 hours.
              </Text>
              <Link
                href="mailto:hello@astrointelligence.com"
                className="text-magenta hover:text-magenta/80 underline transition-colors"
              >
                hello@astrointelligence.com
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="mx-auto max-w-4xl">
            <div className="from-offwhite/5 to-offwhite/0 border-offwhite/10 rounded-2xl border bg-gradient-to-br p-8 md:p-12">
              <Heading as="h2" variant="h2" className="mb-8 text-center">
                Tell Us About Your Project
              </Heading>

              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="mb-6 text-6xl">✅</div>
                  <Heading as="h3" variant="h3" className="mb-4">
                    Thank You!
                  </Heading>
                  <Text variant="lead" className="mb-8">
                    We've received your message and will get back to you within 24 hours.
                  </Text>
                  <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
                        First Name *
                      </label>
                      <input
                        {...register('firstName', { required: 'First name is required' })}
                        type="text"
                        id="firstName"
                        className="bg-navy border-offwhite/20 text-offwhite placeholder-offwhite/40 focus:border-magenta w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none"
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
                        Last Name *
                      </label>
                      <input
                        {...register('lastName', { required: 'Last name is required' })}
                        type="text"
                        id="lastName"
                        className="bg-navy border-offwhite/20 text-offwhite placeholder-offwhite/40 focus:border-magenta w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none"
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Email and Company */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Email *
                      </label>
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                          },
                        })}
                        type="email"
                        id="email"
                        className="bg-navy border-offwhite/20 text-offwhite placeholder-offwhite/40 focus:border-magenta w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none"
                        placeholder="john@company.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="company" className="mb-2 block text-sm font-medium">
                        Company *
                      </label>
                      <input
                        {...register('company', { required: 'Company is required' })}
                        type="text"
                        id="company"
                        className="bg-navy border-offwhite/20 text-offwhite placeholder-offwhite/40 focus:border-magenta w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none"
                        placeholder="Acme Corp"
                      />
                      {errors.company && (
                        <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Role */}
                  <div>
                    <label htmlFor="role" className="mb-2 block text-sm font-medium">
                      Your Role *
                    </label>
                    <input
                      {...register('role', { required: 'Role is required' })}
                      type="text"
                      id="role"
                      className="bg-navy border-offwhite/20 text-offwhite placeholder-offwhite/40 focus:border-magenta w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none"
                      placeholder="CTO, VP Engineering, etc."
                    />
                    {errors.role && (
                      <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
                    )}
                  </div>

                  {/* Project Type */}
                  <div>
                    <label htmlFor="projectType" className="mb-2 block text-sm font-medium">
                      Project Type *
                    </label>
                    <select
                      {...register('projectType', { required: 'Please select a project type' })}
                      id="projectType"
                      className="bg-navy border-offwhite/20 text-offwhite focus:border-magenta w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none"
                    >
                      <option value="">Select a project type</option>
                      <option value="ai-orchestration">AI-Enhanced Orchestration</option>
                      <option value="devops">DevOps Implementation</option>
                      <option value="platform-engineering">Platform Engineering</option>
                      <option value="microservices">Microservices Architecture</option>
                      <option value="consulting">General Consulting</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.projectType && (
                      <p className="mt-1 text-sm text-red-500">{errors.projectType.message}</p>
                    )}
                  </div>

                  {/* Budget and Timeline */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="budget" className="mb-2 block text-sm font-medium">
                        Budget Range
                      </label>
                      <select
                        {...register('budget')}
                        id="budget"
                        className="bg-navy border-offwhite/20 text-offwhite focus:border-magenta w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none"
                      >
                        <option value="">Select budget range</option>
                        <option value="<50k">Less than $50k</option>
                        <option value="50k-100k">$50k - $100k</option>
                        <option value="100k-250k">$100k - $250k</option>
                        <option value="250k-500k">$250k - $500k</option>
                        <option value=">500k">More than $500k</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="timeline" className="mb-2 block text-sm font-medium">
                        Timeline
                      </label>
                      <select
                        {...register('timeline')}
                        id="timeline"
                        className="bg-navy border-offwhite/20 text-offwhite focus:border-magenta w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none"
                      >
                        <option value="">Select timeline</option>
                        <option value="immediate">Immediate (ASAP)</option>
                        <option value="1-3months">1-3 months</option>
                        <option value="3-6months">3-6 months</option>
                        <option value="6months+">6+ months</option>
                        <option value="planning">Just planning</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                      Tell us more about your project *
                    </label>
                    <textarea
                      {...register('message', { required: 'Please tell us about your project' })}
                      id="message"
                      rows={6}
                      className="bg-navy border-offwhite/20 text-offwhite placeholder-offwhite/40 focus:border-magenta w-full resize-none rounded-lg border px-4 py-3 transition-colors focus:outline-none"
                      placeholder="Describe your current challenges, goals, and what you're looking to achieve..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Terms */}
                  <div className="flex items-start gap-3">
                    <input
                      {...register('acceptTerms', { required: 'You must accept the terms' })}
                      type="checkbox"
                      id="acceptTerms"
                      className="bg-navy border-offwhite/20 text-magenta focus:ring-magenta mt-1 h-4 w-4 rounded"
                    />
                    <label htmlFor="acceptTerms" className="text-offwhite/70 text-sm">
                      I agree to the{' '}
                      <Link
                        href="/privacy"
                        className="text-magenta hover:text-magenta/80 underline"
                      >
                        Privacy Policy
                      </Link>{' '}
                      and{' '}
                      <Link href="/terms" className="text-magenta hover:text-magenta/80 underline">
                        Terms of Service
                      </Link>
                    </label>
                  </div>
                  {errors.acceptTerms && (
                    <p className="text-sm text-red-500">{errors.acceptTerms.message}</p>
                  )}

                  {/* Submit Button */}
                  <div className="pt-6 text-center">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="min-w-[200px]"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="from-magenta/5 bg-gradient-to-r to-purple-600/5 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading as="h2" variant="h2" className="mb-12 text-center">
            Global Presence
          </Heading>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 text-4xl">🌉</div>
              <Heading as="h3" variant="h4" className="mb-2">
                San Francisco
              </Heading>
              <Text variant="body" className="text-offwhite/70">
                123 Market Street
                <br />
                San Francisco, CA 94105
                <br />
                United States
              </Text>
            </div>

            <div className="text-center">
              <div className="mb-4 text-4xl">🏛️</div>
              <Heading as="h3" variant="h4" className="mb-2">
                London
              </Heading>
              <Text variant="body" className="text-offwhite/70">
                456 Canary Wharf
                <br />
                London E14 5AB
                <br />
                United Kingdom
              </Text>
            </div>

            <div className="text-center">
              <div className="mb-4 text-4xl">🏮</div>
              <Heading as="h3" variant="h4" className="mb-2">
                Singapore
              </Heading>
              <Text variant="body" className="text-offwhite/70">
                789 Marina Boulevard
                <br />
                Singapore 018985
                <br />
                Singapore
              </Text>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
