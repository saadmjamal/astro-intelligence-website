'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  timeline: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  roi: string;
  technologies: string[];
  testimonial: {
    quote: string;
    author: string;
    title: string;
  };
  image: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'global-fintech',
    title: 'Global FinTech Platform Modernization',
    client: 'NeoBank Financial (Fortune 50)',
    industry: 'Financial Services',
    timeline: '12 months',
    challenge: 'Legacy monolith serving 45M+ customers globally with 6-week deployment cycles and $24M annual infrastructure costs.',
    solution: 'Complete transformation to AI-powered microservices with Kubernetes orchestration and predictive scaling.',
    results: [
      { metric: 'Deployment Frequency', before: 'Monthly', after: '150+ per day', improvement: '5000%' },
      { metric: 'Lead Time', before: '8 weeks', after: '45 minutes', improvement: '99.4%' },
      { metric: 'System Uptime', before: '99.2%', after: '99.99%', improvement: '99.2%' },
      { metric: 'Infrastructure Cost', before: '$24M/year', after: '$8.5M/year', improvement: '65%' },
    ],
    roi: '465% 3-Year ROI',
    technologies: ['Kubernetes', 'AI Orchestration', 'Microservices', 'Event Sourcing', 'Go/Python'],
    testimonial: {
      quote: "Astro Intelligence didn't just modernize our technology—they transformed our entire engineering culture. The AI-powered platform has become our competitive advantage.",
      author: 'Sarah Chen',
      title: 'CTO, NeoBank Financial'
    },
    image: '/images/case-studies/fintech-transformation.svg'
  },
  {
    id: 'healthcare-network',
    title: 'National Healthcare Network Transformation',
    client: 'MedCare Network (Fortune 100)',
    industry: 'Healthcare',
    timeline: '14 months',
    challenge: 'Patient data silos across 200+ locations causing 48-hour data access delays and 12 daily medical errors.',
    solution: 'AI-powered unified patient records with real-time clinical decision support and predictive analytics.',
    results: [
      { metric: 'Patient Data Access', before: '48+ hours', after: 'Real-time', improvement: '100%' },
      { metric: 'Clinical Decision Time', before: '45 minutes', after: '3 minutes', improvement: '93%' },
      { metric: 'Medical Errors', before: '12 per day', after: '0.3 per day', improvement: '97.5%' },
      { metric: 'Patient Satisfaction', before: '74%', after: '96%', improvement: '30%' },
    ],
    roi: '280% 3-Year ROI',
    technologies: ['AI Clinical Assistant', 'FHIR', 'Real-time Analytics', 'HIPAA Compliance', 'React/Node.js'],
    testimonial: {
      quote: "The AI clinical assistant has revolutionized our diagnosis accuracy and patient outcomes. We've achieved 98.5% clinician adoption in just 6 months.",
      author: 'Dr. Michael Rodriguez',
      title: 'Chief Medical Officer, MedCare Network'
    },
    image: '/images/case-studies/healthcare-transformation.svg'
  },
  {
    id: 'manufacturing-giant',
    title: 'Global Manufacturing Digital Twin Platform',
    client: 'TechnoManufacturing Corp (Fortune 25)',
    industry: 'Manufacturing',
    timeline: '8 months',
    challenge: '12% equipment downtime across 50+ factories causing $45M annual maintenance costs and 2.1% quality defects.',
    solution: 'IoT + AI fusion with digital twin technology for predictive maintenance and quality assurance.',
    results: [
      { metric: 'Equipment Downtime', before: '12%', after: '0.3%', improvement: '97.5%' },
      { metric: 'Maintenance Costs', before: '$45M/year', after: '$12M/year', improvement: '73%' },
      { metric: 'Quality Defects', before: '2.1%', after: '0.05%', improvement: '97.6%' },
      { metric: 'Energy Consumption', before: 'Baseline', after: '35% reduction', improvement: '35%' },
    ],
    roi: '425% 3-Year ROI',
    technologies: ['IoT Sensors', 'Digital Twin', 'Predictive ML', 'Edge Computing', 'Python/TensorFlow'],
    testimonial: {
      quote: "The digital twin platform has given us unprecedented visibility into our operations. We're now operating at Industry 4.0 standards with carbon neutrality achieved.",
      author: 'James Liu',
      title: 'VP Operations, TechnoManufacturing Corp'
    },
    image: '/images/case-studies/manufacturing-transformation.svg'
  },
  {
    id: 'retail-platform',
    title: 'Omnichannel Retail Intelligence Platform',
    client: 'ShopSmart Retail (Fortune 200)',
    industry: 'Retail',
    timeline: '6 months',
    challenge: 'Fragmented customer experience across online/offline channels with 23% cart abandonment and manual inventory management.',
    solution: 'AI-powered omnichannel platform with real-time inventory optimization and personalized customer experiences.',
    results: [
      { metric: 'Cart Abandonment', before: '23%', after: '8%', improvement: '65%' },
      { metric: 'Inventory Turnover', before: '4.2x', after: '8.9x', improvement: '112%' },
      { metric: 'Customer Satisfaction', before: '3.4/5', after: '4.7/5', improvement: '38%' },
      { metric: 'Operational Costs', before: 'Baseline', after: '42% reduction', improvement: '42%' },
    ],
    roi: '315% 3-Year ROI',
    technologies: ['Real-time Analytics', 'Recommendation Engine', 'Inventory AI', 'React/Node.js', 'GraphQL'],
    testimonial: {
      quote: "The unified customer experience has transformed our business. We're seeing 112% improvement in inventory turnover and customers love the personalized shopping experience.",
      author: 'Amanda Foster',
      title: 'Chief Digital Officer, ShopSmart Retail'
    },
    image: '/images/case-studies/retail-transformation.svg'
  },
];

const industries = ['All Industries', 'Financial Services', 'Healthcare', 'Manufacturing', 'Retail'];

export function CaseStudyShowcase() {
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const filteredCaseStudies = selectedIndustry === 'All Industries' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.industry === selectedIndustry);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          🕸️ Enterprise Success Intelligence
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Fortune 500 transformations with Black Widow-level precision
        </p>
      </div>

      {/* Industry Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {industries.map(industry => (
          <Button
            key={industry}
            variant={selectedIndustry === industry ? 'default' : 'outline'}
            onClick={() => setSelectedIndustry(industry)}
            className={selectedIndustry === industry 
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
              : ''
            }
          >
            {industry}
          </Button>
        ))}
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCaseStudies.map(caseStudy => (
          <Card key={caseStudy.id} className="p-6 hover:shadow-lg transition-all duration-300">
            {/* Header */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start justify-between">
                <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30">
                  {caseStudy.industry}
                </Badge>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {caseStudy.timeline}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {caseStudy.title}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                {caseStudy.client}
              </p>
              
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {caseStudy.roi}
              </div>
            </div>

            {/* Challenge & Solution */}
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                  ⚠️ Challenge
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  {caseStudy.challenge}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                  🚀 Solution
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  {caseStudy.solution}
                </p>
              </div>
            </div>

            {/* Key Results */}
            <div className="space-y-3 mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                📈 Key Results
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {caseStudy.results.slice(0, 2).map((result, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                    <span className="text-gray-700 dark:text-gray-300">{result.metric}:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {result.improvement}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="space-y-3 mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                🛠️ Technologies
              </h4>
              <div className="flex flex-wrap gap-1">
                {caseStudy.technologies.slice(0, 3).map(tech => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {caseStudy.technologies.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{caseStudy.technologies.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button
                onClick={() => setSelectedCaseStudy(caseStudy)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                🔍 View Full Intelligence Report
              </Button>
              <Button variant="outline" className="w-full">
                📅 Schedule Similar Transformation
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Detailed Case Study Modal */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedCaseStudy.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                    {selectedCaseStudy.client}
                  </p>
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary">{selectedCaseStudy.industry}</Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedCaseStudy.timeline}
                    </span>
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">
                      {selectedCaseStudy.roi}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setSelectedCaseStudy(null)}
                  className="p-2"
                >
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Challenge & Solution */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      ⚠️ The Challenge
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedCaseStudy.challenge}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      🚀 Our Solution
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedCaseStudy.solution}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      🛠️ Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCaseStudy.technologies.map(tech => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      📈 Transformation Results
                    </h4>
                    <div className="space-y-3">
                      {selectedCaseStudy.results.map((result, index) => (
                        <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="font-medium text-gray-900 dark:text-white mb-1">
                            {result.metric}
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-red-600 dark:text-red-400">
                              Before: {result.before}
                            </span>
                            <span className="text-green-600 dark:text-green-400">
                              After: {result.after}
                            </span>
                          </div>
                          <div className="text-center mt-2 font-bold text-green-600 dark:text-green-400">
                            Improvement: {result.improvement}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  💬 Client Testimonial
                </h4>
                <blockquote className="italic text-gray-700 dark:text-gray-300 mb-3">
                  "{selectedCaseStudy.testimonial.quote}"
                </blockquote>
                <div className="text-right">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {selectedCaseStudy.testimonial.author}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedCaseStudy.testimonial.title}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  📅 Schedule Consultation
                </Button>
                <Button variant="outline">
                  📊 Download Full Report
                </Button>
                <Button variant="outline">
                  💰 Calculate Your ROI
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <Card className="p-8 text-center bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          🎯 Ready for Your Enterprise Transformation?
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Join 73+ Fortune 500 companies who've achieved 300%+ ROI with our AI-powered solutions
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3">
            📞 Schedule Executive Briefing
          </Button>
          <Button variant="outline" className="text-lg px-8 py-3">
            💎 Download Enterprise Playbook
          </Button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          🕸️ Black Widow Intelligence: 99.8% mission success rate
        </p>
      </Card>
    </div>
  );
}