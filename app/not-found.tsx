"use client";
import { Metadata } from 'next';
import { Heading, Text } from '@/components/ui/Typography';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-6 text-8xl">🛸</div>

        <Heading as="h1" variant="h1" color="gradient" className="mb-4">
          404
        </Heading>

        <Heading as="h2" variant="h3" className="mb-6">
          Lost in Space
        </Heading>

        <Text variant="lead" className="text-secondary-foreground mx-auto mb-8 max-w-md">
          Looks like this page drifted off into the digital cosmos. Let's get you back on course.
        </Text>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>

        <div className="border-subtle mt-12 border-t pt-8">
          <Text variant="small" className="text-muted-foreground">
            Error Code: 404 | Page Not Found
          </Text>
        </div>
      </div>
    </div>
  );
}
