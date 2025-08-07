'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Copy, Wand2, Clock, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { FormField } from '@/components/ui/FormField';
import Input from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import { Heading, Text } from '@/components/ui/Typography';
import { ContentGenerationRequest, ContentGenerationResponse } from '@/types/ai';
import { cn } from '@/lib/utils';

interface ContentGeneratorProps {
  className?: string;
  onGenerated?: (content: ContentGenerationResponse) => void;
}

export default function ContentGenerator({ className, onGenerated }: ContentGeneratorProps) {
  const [formData, setFormData] = useState<ContentGenerationRequest>({
    type: 'blog_post',
    topic: '',
    audience: undefined,
    tone: 'professional',
    length: 'medium',
    keywords: [],
    context: '',
  });
  
  const [generatedContent, setGeneratedContent] = useState<ContentGenerationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keywordInput, setKeywordInput] = useState('');

  const handleInputChange = (field: keyof ContentGenerationRequest, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.keywords?.includes(keywordInput.trim())) {
      handleInputChange('keywords', [...(formData.keywords || []), keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    handleInputChange('keywords', formData.keywords?.filter(k => k !== keyword) || []);
  };

  const generateContent = async () => {
    if (!formData.topic.trim() || !formData.audience?.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content');
      }

      const result = await response.json();
      setGeneratedContent(result.data);
      onGenerated?.(result.data);
      
    } catch (error) {
      console.error('Content generation error:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate content');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (generatedContent) {
      await navigator.clipboard.writeText(generatedContent.content);
      // You could add a toast notification here
    }
  };

  const downloadContent = () => {
    if (generatedContent) {
      const blob = new Blob([generatedContent.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${formData.topic.replace(/\s+/g, '-').toLowerCase()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="text-center">
        <Heading as="h2" variant="h3" className="mb-2">
          AI Content Generator
        </Heading>
        <Text variant="body-large" hierarchy="muted">
          Generate professional content tailored to your needs
        </Text>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Generation Form */}
        <Card variant="elevated" className="p-6">
          <div className="space-y-4">
            <FormField label="Content Type" required>
              <Select
                value={formData.type}
                onChange={(value) => handleInputChange('type', value)}
                options={[
                  { value: "blog_post", label: "Blog Post" },
                  { value: "case-study", label: "Case Study" },
                  { value: "technical-doc", label: "Technical Documentation" },
                  { value: "email", label: "Email" },
                  { value: "proposal", label: "Proposal" }
                ]}
              />
            </FormField>

            <FormField label="Topic" required>
              <Input
                value={formData.topic}
                onChange={(e) => handleInputChange('topic', e.target.value)}
                placeholder="e.g., Cloud Cost Optimization Strategies"
              />
            </FormField>

            <FormField label="Target Audience" required>
              <Input
                value={formData.audience}
                onChange={(e) => handleInputChange('audience', e.target.value)}
                placeholder="e.g., CTOs and Engineering Teams"
              />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Tone">
                <Select
                  value={formData.tone}
                  onChange={(value) => handleInputChange('tone', value)}
                  options={[
                    { value: "professional", label: "Professional" },
                    { value: "casual", label: "Casual" },
                    { value: "persuasive", label: "Persuasive" },
                    { value: "educational", label: "Educational" }
                  ]}
                />
              </FormField>

              <FormField label="Length">
                <Select
                  value={formData.length}
                  onChange={(value) => handleInputChange('length', value)}
                  options={[
                    { value: "short", label: "Short (500-800 words)" },
                    { value: "medium", label: "Medium (800-1500 words)" },
                    { value: "long", label: "Long (1500+ words)" }
                  ]}
                />
              </FormField>
            </div>

            <FormField label="Keywords (SEO)">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    placeholder="Add keyword"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                  />
                  <Button variant="secondary" size="sm" onClick={addKeyword}>
                    Add
                  </Button>
                </div>
                {formData.keywords && formData.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                      >
                        {keyword}
                        <button
                          onClick={() => removeKeyword(keyword)}
                          className="text-primary/70 hover:text-primary"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </FormField>

            <FormField label="Additional Context">
              <Textarea
                value={formData.context || ''}
                onChange={(e) => handleInputChange('context', e.target.value)}
                placeholder="Any specific requirements, background information, or style preferences..."
                rows={3}
              />
            </FormField>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <Text variant="body-small" className="text-red-600 dark:text-red-400">
                  {error}
                </Text>
              </div>
            )}

            <Button
              onClick={generateContent}
              disabled={isLoading || !formData.topic.trim() || !formData.audience?.trim()}
              size="lg"
              className="w-full"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <Wand2 className="h-4 w-4" />
                  </motion.div>
                  Generating Content...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Content
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Generated Content Preview */}
        <Card variant="elevated" className="p-6">
          {generatedContent ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Heading as="h3" variant="h5">Generated Content</Heading>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={downloadContent}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-3 gap-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-center">
                  <FileText className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <Text variant="caption" hierarchy="muted">
                    {generatedContent.metadata.wordCount} words
                  </Text>
                </div>
                <div className="text-center">
                  <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <Text variant="caption" hierarchy="muted">
                    {generatedContent.metadata.readingTime} min read
                  </Text>
                </div>
                <div className="text-center">
                  <BarChart3 className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <Text variant="caption" hierarchy="muted">
                    {generatedContent.metadata.seoScore || 0}% SEO
                  </Text>
                </div>
              </div>

              {/* Content Preview */}
              <div className="max-h-96 overflow-y-auto p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm font-mono">
                  {generatedContent.content}
                </pre>
              </div>

              {/* Suggestions */}
              {generatedContent.metadata.suggestions && generatedContent.metadata.suggestions.length > 0 && (
                <div className="space-y-2">
                  <Text variant="body-small" className="font-medium">AI Suggestions:</Text>
                  <ul className="space-y-1">
                    {generatedContent.metadata.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></div>
                        <Text variant="caption" hierarchy="muted">{suggestion}</Text>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <Heading as="h3" variant="h5" hierarchy="muted" className="mb-2">
                No Content Generated Yet
              </Heading>
              <Text variant="body-small" hierarchy="muted">
                Fill out the form and click "Generate Content" to create AI-powered content
              </Text>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}