import EnhancedHeroFixed from '@/components/EnhancedHeroFixed'
import TrustSection from '@/components/TrustSection'
import AIShowcase from '@/components/AIShowcase'
import CoreServices from '@/components/CoreServices'
import OutcomeMetricsBand from '@/components/OutcomeMetricsBand'
import ThreePillars from '@/components/ThreePillars'
import HowWeWork from '@/components/HowWeWork'
import ComplianceStrip from '@/components/ComplianceStrip'
import CometAbout from '@/components/CometAbout'
import CometContact from '@/components/CometContact'
import EnhancedFooter from '@/components/EnhancedFooter'
import PersonaValueProps from '@/components/PersonaValueProps'
import ProofStrip from '@/components/ProofStrip'
import SystemsFit from '@/components/SystemsFit'

export default function RedesignedHomePage() {
  return (
    <>
      <main className="bg-black min-h-screen">
        {/* Hero Section - Optimized for conversion */}
        <section className="relative">
          <EnhancedHeroFixed />
        </section>
        
        <OutcomeMetricsBand />
        
        {/* Proof & Systems Fit */}
        <ProofStrip />
        <SystemsFit />
        {/* AI Intelligence Showcase - Highlight AI capabilities */}
        <section className="relative -mt-8">
          <AIShowcase />
        </section>
        
        <ThreePillars />
        <ComplianceStrip />
        <HowWeWork />
        {/* Keep detailed services below the summary pillars */}
        <section className="relative -mt-8">
          <CoreServices />
        </section>

        {/* Persona Value Props - role-tailored benefits */}
        <section className="relative -mt-8">
          <PersonaValueProps />
        </section>
        
        {/* About Section */}
        <section className="relative -mt-8">
          <CometAbout />
        </section>
        
        {/* Contact Section - Keep existing for now */}
        <section className="relative -mt-8">
          <CometContact />
        </section>
      </main>
      
      {/* Enhanced Footer with better CTAs */}
      <EnhancedFooter />
    </>
  )
}