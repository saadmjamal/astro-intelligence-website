import EnhancedHeroFixed from '@/components/EnhancedHeroFixed'
import TrustSection from '@/components/TrustSection'
import AIShowcase from '@/components/AIShowcase'
import CoreServices from '@/components/CoreServices'
import CometAbout from '@/components/CometAbout'
import CometContact from '@/components/CometContact'
import EnhancedFooter from '@/components/EnhancedFooter'

export default function RedesignedHomePage() {
  return (
    <>
      <main className="bg-black min-h-screen">
        {/* Hero Section - Optimized for conversion */}
        <section className="relative">
          <EnhancedHeroFixed />
        </section>
        
        {/* Social Proof & Trust - New section */}
        <section className="relative -mt-8">
          <TrustSection />
        </section>
        
        {/* AI Intelligence Showcase - Highlight AI capabilities */}
        <section className="relative -mt-8">
          <AIShowcase />
        </section>
        
        {/* Core Services - Simplified from 6 to 4 services */}
        <section className="relative -mt-8">
          <CoreServices />
        </section>
        
        {/* About Section - Keep existing for now */}
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