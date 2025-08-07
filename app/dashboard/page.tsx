import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import { checkUserSubscription } from '@/app/actions/subscription';
import { getPremiumScripts } from '@/lib/scripts-data';
import { Download, Lock } from 'lucide-react';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  const { hasActiveSubscription } = await checkUserSubscription();
  const premiumScripts = getPremiumScripts().slice(0, 3);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container-width">
        <div className="mb-8">
          <Heading as="h1" variant="h1" className="mb-4">
            Dashboard
          </Heading>
          <Text variant="body" className="text-muted-foreground">
            Welcome to your Astro Intelligence dashboard. Access premium scripts and manage your subscription.
          </Text>
        </div>

        {/* Subscription Status */}
        {!hasActiveSubscription && (
          <div className="mb-8 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 card-padding-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                  No Active Subscription
                </h3>
                <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                  Subscribe to access premium scripts and features.
                </p>
              </div>
              <Button asChild>
                <Link href="/dashboard/billing">
                  Subscribe Now
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Premium Scripts Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Premium Scripts
            </h2>
            <Button asChild variant="outline">
              <Link href="/dashboard/scripts">
                View All Scripts
              </Link>
            </Button>
          </div>
          <div className="grid grid-gap-md md:grid-cols-2 lg:grid-cols-3">
            {premiumScripts.map((script) => (
              <div key={script.id} className="rounded-xl bg-white dark:bg-navy-800 card-padding-sm shadow-lg border border-gray-200 dark:border-navy-700">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {script.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {script.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="secondary">{script.category.replace('-', ' ')}</Badge>
                    <Badge variant="outline">{script.language}</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-magenta">Premium</span>
                  <Button size="sm" variant="secondary" asChild>
                    <Link href={`/dashboard/scripts/${script.id}`}>
                      {hasActiveSubscription ? (
                        <>
                          <Download className="mr-2 h-3 w-3" />
                          Download
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 h-3 w-3" />
                          View
                        </>
                      )}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Management */}
        <div className="mt-12 rounded-xl bg-gradient-to-r from-magenta/10 to-purple-600/10 card-padding">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Manage Your Subscription
              </h2>
              <p className="mt-2 text-muted-foreground">
                Access billing, update payment methods, and manage your plan.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button asChild>
                <Link href="/dashboard/billing">
                  Manage Billing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}