'use client';
export const dynamic = 'force-dynamic'

import { useState } from 'react';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { chatService } from '@/lib/ai/chat-service';
import { generateServiceRecommendations } from '@/lib/ai/recommendation-engine';
import { contentGenerator } from '@/lib/ai/content-generator';

export default function TestAIPage() {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    const results = [];

    try {
      // Test 1: Chat Service
      const session = await chatService.createSession({
        industry: 'technology',
        companySize: 'medium',
        currentChallenges: ['cloud costs', 'scalability'],
      });

      if (!session.success || !session.data) {
        throw new Error('Failed to create chat session');
      }

      const response = await chatService.sendMessage(session.data.id, 'What services do you offer?');
      
      results.push({
        test: 'Chat Service',
        status: 'PASS',
        data: { sessionId: session.data.id, responseSuccess: response.success }
      });

      // Test 2: Recommendation Engine
      const recommendations = await generateServiceRecommendations(
        'help with cloud cost optimization',
        { industry: 'fintech', companySize: 'enterprise' }
      );

      results.push({
        test: 'Recommendation Engine',
        status: recommendations.length > 0 ? 'PASS' : 'FAIL',
        data: { recommendationCount: recommendations.length }
      });

      // Test 3: Content Generator
      const content = await contentGenerator.generateContent({
        type: 'blog-post',
        topic: 'Cloud Cost Optimization',
        audience: 'business',
        tone: 'professional',
        length: 'short'
      });

      results.push({
        test: 'Content Generator',
        status: content.success && content.data ? 'PASS' : 'FAIL',
        data: { success: content.success }
      });

    } catch (error) {
      results.push({
        test: 'Error',
        status: 'FAIL',
        data: { error: error instanceof Error ? error.message : 'Unknown error' }
      });
    }

    setTestResults(results);
    setIsRunning(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Heading as="h1" variant="display" className="mb-6">
          AI Intelligence Module Tests
        </Heading>
        
        <Text variant="body-large" hierarchy="muted" className="mb-8">
          Test all AI intelligence modules to ensure they're working correctly.
        </Text>

        <div className="mb-8">
          <Button 
            onClick={runTests} 
            disabled={isRunning}
            size="lg"
            className="w-full sm:w-auto"
          >
            {isRunning ? 'Running Tests...' : 'Run AI Module Tests'}
          </Button>
        </div>

        {testResults.length > 0 && (
          <div className="space-y-4">
            <Heading as="h2" variant="h3" className="mb-4">
              Test Results
            </Heading>
            
            {testResults.map((result, index) => (
              <Card key={index} variant="elevated" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Heading as="h3" variant="h5">
                    {result.test}
                  </Heading>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    result.status === 'PASS' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {result.status}
                  </span>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Heading as="h3" variant="h5" className="mb-3">
            Module Overview
          </Heading>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Chat Service:</strong> Intelligent conversational AI with context awareness</li>
            <li>• <strong>Recommendation Engine:</strong> Personalized service matching based on user profile</li>
            <li>• <strong>Content Generator:</strong> AI-powered content creation for multiple formats</li>
            <li>• <strong>Analytics Service:</strong> Performance tracking and insights</li>
          </ul>
        </div>
      </div>
    </div>
  );
}