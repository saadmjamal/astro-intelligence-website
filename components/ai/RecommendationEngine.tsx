'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowRight, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';
import { ServiceRecommendation, UserProfile } from '@/types/ai';
import { cn } from '@/lib/utils';

interface RecommendationEngineProps {
  query?: string;
  userProfile?: UserProfile;
  className?: string;
  showTitle?: boolean;
  maxRecommendations?: number;
}

export default function RecommendationEngine({
  query,
  userProfile,
  className,
  showTitle = true,
  maxRecommendations = 3,
}: RecommendationEngineProps) {
  const [recommendations, setRecommendations] = useState<ServiceRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          userProfile,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get recommendations');
      }

      const data = await response.json();
      setRecommendations(data.recommendations.slice(0, maxRecommendations));
      
    } catch (error) {
      console.error('Recommendations error:', error);
      setError(error instanceof Error ? error.message : 'Failed to load recommendations');
    } finally {
      setIsLoading(false);
    }
  }, [userProfile, maxRecommendations]);

  // Generate recommendations based on user profile when component mounts
  useEffect(() => {
    if (userProfile && !query) {
      // Create a query based on user profile
      const profileQuery = [
        userProfile.currentChallenges?.join(' '),
        userProfile.interests?.join(' '),
        userProfile.industry,
        `${userProfile.companySize} company`
      ].filter(Boolean).join(' ');
      
      if (profileQuery) {
        fetchRecommendations(profileQuery);
      }
    } else if (query) {
      fetchRecommendations(query);
    }
  }, [query, userProfile, maxRecommendations, fetchRecommendations]);

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        {showTitle && (
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <Heading as="h3" variant="h4">Smart Recommendations</Heading>
          </div>
        )}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="animate-pulse">
              <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg", className)}>
        <Text variant="body-small" className="text-red-600 dark:text-red-400">
          {error}
        </Text>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-6", className)}>
      {showTitle && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <Sparkles className="h-5 w-5 text-primary" />
          <Heading as="h3" variant="h4">AI-Powered Recommendations</Heading>
        </motion.div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {recommendations.map((recommendation, index) => (
            <motion.div
              key={recommendation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                variant="elevated"
                hierarchy="secondary"
                hover
                className="group h-full transition-all duration-300 hover:border-primary/30"
              >
                {/* Relevance Score Badge */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    <Text variant="caption" className="font-medium text-primary">
                      {recommendation.relevanceScore}% Match
                    </Text>
                  </div>
                </div>

                {/* Service Title */}
                <Heading as="h4" variant="h5" className="mb-3">
                  {recommendation.title}
                </Heading>

                {/* Description */}
                <Text variant="body-small" hierarchy="muted" className="mb-4">
                  {recommendation.description}
                </Text>

                {/* AI Reasoning */}
                <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <Text variant="body-small" className="italic">
                    "{recommendation.reasoning}"
                  </Text>
                </div>

                {/* Benefits */}
                <div className="mb-4 space-y-2">
                  <Text variant="body-small" className="font-medium">Key Benefits:</Text>
                  <ul className="space-y-1">
                    {recommendation.reasoning.slice(0, 3).map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start gap-2">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></div>
                        <Text variant="caption" hierarchy="muted">{benefit}</Text>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Timeline and Budget */}
                {(recommendation.timeline || recommendation.estimatedCost) && (
                  <div className="mb-4 grid grid-cols-2 gap-4 text-xs">
                    {recommendation.timeline && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <Text variant="caption" hierarchy="muted">
                          {recommendation.timeline}
                        </Text>
                      </div>
                    )}
                    {recommendation.estimatedCost && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-muted-foreground" />
                        <Text variant="caption" hierarchy="muted">
                          {recommendation.estimatedCost}
                        </Text>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    asChild
                    className="flex-1"
                  >
                    <Link href={`/services/${recommendation.id}`}>
                      Learn More
                      <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    asChild
                  >
                    <Link href="/contact">
                      Discuss
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <Text variant="body-small" hierarchy="muted" className="mb-4">
          Want personalized recommendations for your specific needs?
        </Text>
        <Button variant="secondary" size="lg" asChild>
          <Link href="/contact">
            Schedule a Free Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}