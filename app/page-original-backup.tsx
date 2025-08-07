import EnhancedHero from '@/components/EnhancedHero'
import TrustSection from '@/components/TrustSection'
import CoreServices from '@/components/CoreServices'
import CometAbout from '@/components/CometAbout'
import CometContact from '@/components/CometContact'
import EnhancedFooter from '@/components/EnhancedFooter'

export default function RedesignedHomePage() {
  return (
    <>
      <main className="bg-black">
        {/* Hero Section - Optimized for conversion */}
        <EnhancedHero />
        
        {/* Social Proof & Trust - New section */}
        <TrustSection />
        
        {/* Core Services - Simplified from 6 to 4 services */}
        <CoreServices />
        
        {/* About Section - Keep existing for now */}
        <CometAbout />
        
        {/* Contact Section - Keep existing for now */}
        <CometContact />
      </main>
      
      {/* Enhanced Footer with better CTAs */}
      <EnhancedFooter />
    </>
  )
}