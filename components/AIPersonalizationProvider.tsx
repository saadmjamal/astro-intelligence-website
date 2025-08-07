'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'

// Types for different user personas
export type UserPersona = 'enterprise' | 'startup' | 'technical' | 'executive' | 'default'

interface PersonalizationData {
  persona: UserPersona
  interests: string[]
  viewedPages: string[]
  engagementScore: number
  recommendations: string[]
}

interface PersonalizationContextType {
  personalization: PersonalizationData
  updatePersona: (persona: UserPersona) => void
  trackPageView: (page: string) => void
  getPersonalizedContent: (defaultContent: any, variants: Record<UserPersona, any>) => any
}

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined)

export function AIPersonalizationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  const [personalization, setPersonalization] = useState<PersonalizationData>({
    persona: 'default',
    interests: [],
    viewedPages: [],
    engagementScore: 0,
    recommendations: []
  })

  // AI-powered persona detection based on behavior
  useEffect(() => {
    const detectPersona = () => {
      // Enterprise persona detection
      if (personalization.viewedPages.includes('/services/cloud-architecture') || 
          personalization.viewedPages.includes('/services/strategic-partnerships') ||
          personalization.interests.includes('enterprise')) {
        return 'enterprise'
      }
      
      // Startup persona detection
      if (personalization.viewedPages.includes('/services/automation-scripting') ||
          personalization.viewedPages.includes('/portfolio/33seconds-dating-app') ||
          personalization.interests.includes('mvp')) {
        return 'startup'
      }
      
      // Technical persona detection
      if (personalization.viewedPages.includes('/services/ml-engineering') ||
          personalization.viewedPages.includes('/lab') ||
          personalization.interests.includes('technical')) {
        return 'technical'
      }
      
      // Executive persona detection
      if (personalization.viewedPages.includes('/about') ||
          personalization.viewedPages.includes('/contact') ||
          personalization.interests.includes('roi')) {
        return 'executive'
      }
      
      return 'default'
    }

    const newPersona = detectPersona()
    if (newPersona !== personalization.persona) {
      setPersonalization(prev => ({ ...prev, persona: newPersona }))
    }
  }, [personalization.viewedPages, personalization.interests, personalization.persona])

  const updatePersona = (persona: UserPersona) => {
    setPersonalization(prev => ({ ...prev, persona }))
  }

  const trackPageView = useCallback((page: string) => {
    setPersonalization(prev => ({
      ...prev,
      viewedPages: [...prev.viewedPages, page],
      engagementScore: prev.engagementScore + 1
    }))
  }, [])

  // Track page views
  useEffect(() => {
    if (pathname && !personalization.viewedPages.includes(pathname)) {
      trackPageView(pathname)
    }
  }, [pathname, personalization.viewedPages, trackPageView])

  const getPersonalizedContent = (defaultContent: any, variants: Record<UserPersona, any>) => {
    const variant = variants[personalization.persona]
    return variant || defaultContent
  }

  // Generate AI recommendations based on persona
  useEffect(() => {
    const generateRecommendations = () => {
      const recommendationMap: Record<UserPersona, string[]> = {
        enterprise: [
          'Cloud Architecture Assessment',
          'AI Strategy Workshop',
          'Enterprise Security Audit'
        ],
        startup: [
          'MVP Development Sprint',
          'Automation Quick Start',
          'Growth Hacking with AI'
        ],
        technical: [
          'ML Model Optimization',
          'Advanced AI Integration',
          'Custom Algorithm Development'
        ],
        executive: [
          'ROI Calculator',
          'Executive AI Brief',
          'Strategic Partnership Options'
        ],
        default: [
          'Free AI Consultation',
          'Product Demo',
          'Case Study Library'
        ]
      }

      setPersonalization(prev => ({
        ...prev,
        recommendations: recommendationMap[prev.persona]
      }))
    }

    generateRecommendations()
  }, [personalization.persona])

  return (
    <PersonalizationContext.Provider
      value={{
        personalization,
        updatePersona,
        trackPageView,
        getPersonalizedContent
      }}
    >
      {children}
    </PersonalizationContext.Provider>
  )
}

export function usePersonalization() {
  const context = useContext(PersonalizationContext)
  if (context === undefined) {
    throw new Error('usePersonalization must be used within AIPersonalizationProvider')
  }
  return context
}