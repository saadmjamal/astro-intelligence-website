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
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-6">🛸</div>
        
        <Heading as="h1" variant="h1" color="gradient" className="mb-4">
          404
        </Heading>
        
        <Heading as="h2" variant="h3" className="mb-6">
          Lost in Space
        </Heading>
        
        <Text variant="lead" className="max-w-md mx-auto mb-8 text-offwhite/80">
          Looks like this page drifted off into the digital cosmos. 
          Let's get you back on course.
        </Text>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
        
        <div className="mt-12 pt-8 border-t border-offwhite/10">
          <Text variant="small" className="text-offwhite/60">
            Error Code: 404 | Page Not Found
          </Text>
        </div>
      </div>
    </div>
  );
}