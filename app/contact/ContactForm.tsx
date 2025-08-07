'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { Alert } from '@/components/ui/Alert';
import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact.schema';
import { Send, CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mobile-container max-w-2xl">
      <div className="mobile-card-enhanced rounded-2xl bg-card mobile-padding lg:p-12 shadow-xl">
        <Heading as="h2" variant="h2" className="mb-6 sm:mb-8 text-center mobile-hero-text">
          Get in Touch
        </Heading>

        {submitStatus === 'success' && (
          <Alert variant="success" className="mb-6">
            <CheckCircle2 className="h-5 w-5" />
            <div>
              <strong>Message sent successfully!</strong>
              <p>We'll get back to you within 24 hours.</p>
            </div>
          </Alert>
        )}

        {submitStatus === 'error' && (
          <Alert variant="error" className="mb-6">
            <div>
              <strong>Failed to send message</strong>
              <p>{errorMessage}</p>
            </div>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="stack-md space-y-4 sm:space-y-6">
          {/* Honeypot field (hidden from users) */}
          <input
            type="text"
            {...register('honeypot')}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <Input
            label="Name"
            id="name"
            type="text"
            placeholder="John Doe"
            error={!!errors.name}
            helperText={errors.name?.message}
            className="mobile-form-field"
            {...register('name')}
          />

          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="john@company.com"
            error={!!errors.email}
            helperText={errors.email?.message}
            className="mobile-form-field"
            {...register('email')}
          />

          <Input
            label="Company (optional)"
            id="company"
            type="text"
            placeholder="Acme Corp"
            error={!!errors.company}
            helperText={errors.company?.message}
            className="mobile-form-field"
            {...register('company')}
          />

          <div>
            <label htmlFor="budget" className="mobile-form-label">
              Budget (optional)
            </label>
            <select
              id="budget"
              className="mobile-form-field w-full rounded-lg border border-input bg-background text-foreground interactive input-focus"
              {...register('budget')}
            >
              <option value="">Select budget range</option>
              <option value="under-10k">Under $10k</option>
              <option value="10k-50k">$10k - $50k</option>
              <option value="50k-100k">$50k - $100k</option>
              <option value="over-100k">Over $100k</option>
            </select>
          </div>

          <Textarea
            label="Message"
            id="message"
            rows={4}
            placeholder="Tell us about your project..."
            error={!!errors.message}
            helperText={errors.message?.message}
            className="mobile-form-field resize-none"
            required
            {...register('message')}
          />

          <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            By submitting this form, you agree to our{' '}
            <Link href="/privacy" className="text-primary hover:underline touch-target">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/terms" className="text-primary hover:underline touch-target">
              Terms of Service
            </Link>
            .
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="mobile-button-primary mobile-haptic-light touch-target-critical"
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                Send Message
                <Send className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 sm:mt-8 text-center">
          <Text variant="small" className="text-muted-foreground mobile-body-text">
            Prefer to schedule a call?{' '}
            <Link 
              href="https://calendly.com/saadjamal" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline touch-target"
            >
              Book a time that works for you
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
}