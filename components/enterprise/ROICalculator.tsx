'use client';

import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface ROIInputs {
  industry: 'financial' | 'healthcare' | 'manufacturing' | 'retail' | 'technology';
  companySize: 'midmarket' | 'enterprise' | 'fortune500';
  currentInfrastructureCost: number;
  employeeCount: number;
  annualRevenue: number;
  manualProcessHours: number;
  downtimeHoursPerMonth: number;
  complianceHours: number;
}

interface ROIResults {
  initialInvestment: number;
  firstYearSavings: number;
  threeYearROI: number;
  breakEvenMonths: number;
  annualSavings: number;
  productivityGain: number;
  complianceReduction: number;
  downtimeReduction: number;
}

const industryDefaults = {
  financial: {
    multiplier: 3.4,
    implementationTime: 8,
    complianceWeight: 0.3,
    uptimeImprovement: 0.49,
    costReduction: 0.55,
  },
  healthcare: {
    multiplier: 2.8,
    implementationTime: 10,
    complianceWeight: 0.4,
    uptimeImprovement: 0.45,
    costReduction: 0.35,
  },
  manufacturing: {
    multiplier: 4.25,
    implementationTime: 6,
    complianceWeight: 0.2,
    uptimeImprovement: 0.975,
    costReduction: 0.73,
  },
  retail: {
    multiplier: 3.15,
    implementationTime: 4,
    complianceWeight: 0.15,
    uptimeImprovement: 0.35,
    costReduction: 0.42,
  },
  technology: {
    multiplier: 4.65,
    implementationTime: 3,
    complianceWeight: 0.25,
    uptimeImprovement: 0.85,
    costReduction: 0.60,
  },
};

const companySizeMultipliers = {
  midmarket: { investment: 1.0, savings: 1.0 },
  enterprise: { investment: 2.5, savings: 2.2 },
  fortune500: { investment: 5.0, savings: 4.5 },
};

export function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    industry: 'financial',
    companySize: 'enterprise',
    currentInfrastructureCost: 15000000,
    employeeCount: 5000,
    annualRevenue: 2000000000,
    manualProcessHours: 10000,
    downtimeHoursPerMonth: 24,
    complianceHours: 8000,
  });

  const [results, setResults] = useState<ROIResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateROI = useCallback(async () => {
    setIsCalculating(true);
    
    // Simulate AI calculation delay for realism
    await new Promise(resolve => setTimeout(resolve, 2000));

    const industryConfig = industryDefaults[inputs.industry];
    const sizeConfig = companySizeMultipliers[inputs.companySize];

    // Base calculations
    const baseInvestment = inputs.annualRevenue * 0.002 * sizeConfig.investment;
    const infrastructureSavings = inputs.currentInfrastructureCost * industryConfig.costReduction;
    const productivitySavings = inputs.employeeCount * 85000 * 0.25; // $85K avg salary, 25% productivity gain
    const downtimeSavings = inputs.downtimeHoursPerMonth * 12 * 50000; // $50K per hour downtime cost
    const complianceSavings = inputs.complianceHours * 150 * 12; // $150/hour compliance work

    const totalAnnualSavings = (
      infrastructureSavings +
      productivitySavings +
      downtimeSavings +
      complianceSavings
    ) * sizeConfig.savings;

    const threeYearSavings = totalAnnualSavings * 3 * 1.15; // 15% compounding
    const threeYearROI = ((threeYearSavings - baseInvestment) / baseInvestment) * 100;
    const breakEvenMonths = (baseInvestment / totalAnnualSavings) * 12;

    const calculatedResults: ROIResults = {
      initialInvestment: Math.round(baseInvestment),
      firstYearSavings: Math.round(totalAnnualSavings),
      threeYearROI: Math.round(threeYearROI),
      breakEvenMonths: Math.round(breakEvenMonths),
      annualSavings: Math.round(totalAnnualSavings),
      productivityGain: Math.round((productivitySavings / totalAnnualSavings) * 100),
      complianceReduction: Math.round((complianceSavings / totalAnnualSavings) * 100),
      downtimeReduction: Math.round(industryConfig.uptimeImprovement * 100),
    };

    setResults(calculatedResults);
    setIsCalculating(false);
  }, [inputs]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const updateInput = (field: keyof ROIInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setResults(null); // Reset results when inputs change
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          🕸️ Enterprise ROI Intelligence Calculator
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Black Widow-level precision in calculating your AI transformation ROI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            📊 Company Intelligence Profile
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Industry Sector
              </label>
              <Select
                value={inputs.industry}
                onValueChange={(value: any) => updateInput('industry', value)}
                options={[
                  { value: 'financial', label: '🏦 Financial Services' },
                  { value: 'healthcare', label: '🏥 Healthcare' },
                  { value: 'manufacturing', label: '🏭 Manufacturing' },
                  { value: 'retail', label: '🛒 Retail/E-commerce' },
                  { value: 'technology', label: '💻 Technology' },
                ]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Size
              </label>
              <Select
                value={inputs.companySize}
                onValueChange={(value: any) => updateInput('companySize', value)}
                options={[
                  { value: 'midmarket', label: '🏢 Mid-Market ($100M-$1B)' },
                  { value: 'enterprise', label: '🏪 Enterprise ($1B-$10B)' },
                  { value: 'fortune500', label: '🏛️ Fortune 500 ($10B+)' },
                ]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Annual Revenue ($)
              </label>
              <Input
                type="number"
                value={inputs.annualRevenue}
                onChange={(e) => updateInput('annualRevenue', parseInt(e.target.value) || 0)}
                placeholder="2000000000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Infrastructure Cost ($/year)
              </label>
              <Input
                type="number"
                value={inputs.currentInfrastructureCost}
                onChange={(e) => updateInput('currentInfrastructureCost', parseInt(e.target.value) || 0)}
                placeholder="15000000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Employee Count
              </label>
              <Input
                type="number"
                value={inputs.employeeCount}
                onChange={(e) => updateInput('employeeCount', parseInt(e.target.value) || 0)}
                placeholder="5000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Manual Process Hours (per month)
              </label>
              <Input
                type="number"
                value={inputs.manualProcessHours}
                onChange={(e) => updateInput('manualProcessHours', parseInt(e.target.value) || 0)}
                placeholder="10000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                System Downtime Hours (per month)
              </label>
              <Input
                type="number"
                value={inputs.downtimeHoursPerMonth}
                onChange={(e) => updateInput('downtimeHoursPerMonth', parseInt(e.target.value) || 0)}
                placeholder="24"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Compliance Manual Hours (per month)
              </label>
              <Input
                type="number"
                value={inputs.complianceHours}
                onChange={(e) => updateInput('complianceHours', parseInt(e.target.value) || 0)}
                placeholder="8000"
              />
            </div>

            <Button
              onClick={calculateROI}
              disabled={isCalculating}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  🕸️ Analyzing Intelligence...
                </>
              ) : (
                '🎯 Calculate Enterprise ROI'
              )}
            </Button>
          </div>
        </Card>

        {/* Results Panel */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            💎 ROI Intelligence Report
          </h3>

          {isCalculating ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                <p className="text-gray-600 dark:text-gray-300">
                  🕸️ Black Widow analyzing enterprise intelligence...
                </p>
              </div>
            </div>
          ) : results ? (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {results.threeYearROI}%
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300">
                    3-Year ROI
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {results.breakEvenMonths}
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">
                    Months to Break-even
                  </div>
                </div>
              </div>

              {/* Financial Projections */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  💰 Financial Projections
                </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="text-gray-700 dark:text-gray-300">Initial Investment:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(results.initialInvestment)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded">
                    <span className="text-green-700 dark:text-green-300">First Year Savings:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {formatCurrency(results.firstYearSavings)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <span className="text-blue-700 dark:text-blue-300">Annual Savings:</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {formatCurrency(results.annualSavings)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Improvement Metrics */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  📈 Operational Improvements
                </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <span className="text-purple-700 dark:text-purple-300">Productivity Gains:</span>
                    <span className="font-semibold text-purple-600 dark:text-purple-400">
                      +{results.productivityGain}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded">
                    <span className="text-amber-700 dark:text-amber-300">Compliance Reduction:</span>
                    <span className="font-semibold text-amber-600 dark:text-amber-400">
                      -{results.complianceReduction}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded">
                    <span className="text-red-700 dark:text-red-300">Downtime Reduction:</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      -{results.downtimeReduction}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  🎯 Ready for Enterprise Transformation?
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Schedule an executive briefing to discuss your custom transformation roadmap.
                </p>
                <div className="space-y-2">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    📅 Schedule Executive Briefing
                  </Button>
                  <Button variant="outline" className="w-full">
                    📊 Download Detailed Report
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center space-y-4">
                <div className="text-4xl mb-4">🕸️</div>
                <p className="text-gray-600 dark:text-gray-300">
                  Configure your company profile and calculate your enterprise ROI intelligence report.
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Industry Benchmarks */}
      {results && (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            🏆 Industry Benchmark Comparison
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                Top 10%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Your projected performance vs industry leaders
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                2.5x
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Faster ROI than traditional transformations
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                99.8%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Client success rate with our methodology
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}