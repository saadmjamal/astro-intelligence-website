'use client'

import React from 'react'
import { motion } from '@/components/animations/AnimationProvider'
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Twitter, 
  Linkedin, 
  Globe,
  Shield,
  Award,
  Clock
} from 'lucide-react'
import Link from 'next/link'

const footerSections = [
  {
    title: 'Services',
    links: [
      { name: 'AI & Machine Learning', href: '/services/ai-machine-learning' },
      { name: 'Web Development', href: '/services/web-development' },
      { name: 'Cloud Infrastructure', href: '/services/cloud-devops' },
      { name: 'Performance Engineering', href: '/services/technical-consulting' }
    ]
  },
  {
    title: 'Solutions',
    links: [
      { name: 'Enterprise Automation', href: '/solutions/automation' },
      { name: 'Cost Optimization', href: '/solutions/cost-optimization' },
      { name: 'Digital Transformation', href: '/solutions/digital-transformation' },
      { name: 'Custom Development', href: '/solutions/custom-development' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Documentation', href: '/docs' },
      { name: 'Blog', href: '/blog' },
      { name: 'Support Center', href: '/support' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' }
    ]
  }
]

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/astrointelligence' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/astrointelligence' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/astrointelligence' }
]

const certifications = [
  { name: 'SOC 2 Type II', icon: Shield },
  { name: 'ISO 27001', icon: Award },
  { name: '24/7 Support', icon: Clock }
]

const EnhancedFooter: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-b from-black to-gray-950 border-t border-border-subtle">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tech-green)_0px,_transparent_1px)] bg-[length:40px_40px]"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          {/* Top CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 p-8 bg-gradient-to-r from-tech-green/10 to-accent-hover/10 border border-tech-green/20 rounded-3xl"
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
              Join 500+ enterprises already saving costs and accelerating innovation with AstroIntelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-tech-green hover:bg-accent-hover text-black font-bold text-lg rounded-lg transition-all duration-200 hover:scale-[1.02]"
              >
                Get Your Free Assessment
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/demo"
                className="px-8 py-4 bg-transparent border-2 border-tech-green text-tech-green hover:bg-tech-green hover:text-black font-semibold text-lg rounded-lg transition-all duration-200"
              >
                Schedule Demo
              </Link>
            </div>
          </motion.div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-tech-green rounded-lg flex items-center justify-center">
                  <Globe className="h-6 w-6 text-black font-bold" />
                </div>
                <span className="text-2xl font-bold text-white">AstroIntelligence</span>
              </div>
              <p className="text-text-secondary leading-relaxed mb-6 max-w-sm">
                Transforming enterprises through ethical AI automation and intelligent cloud optimization. 
                Trusted by Fortune 500 companies worldwide.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-tech-green" />
                  <a href="mailto:hello@astrointelligence.com" className="text-text-secondary hover:text-tech-green transition-colors">
                    hello@astrointelligence.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-tech-green" />
                  <a href="tel:+1-555-AI-INTEL" className="text-text-secondary hover:text-tech-green transition-colors">
                    +1 (555) AI-INTEL
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-tech-green" />
                  <span className="text-text-secondary">San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-text-muted hover:text-tech-green transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mb-12 py-8 border-y border-border-subtle"
          >
            {certifications.map((cert) => {
              const Icon = cert.icon
              return (
                <div key={cert.name} className="flex items-center gap-3 text-text-secondary">
                  <Icon className="h-5 w-5 text-tech-green" />
                  <span className="font-medium">{cert.name}</span>
                </div>
              )
            })}
          </motion.div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-text-subtle text-sm">
              © {currentYear} AstroIntelligence. All rights reserved. | 
              <Link href="/terms" className="hover:text-tech-green transition-colors ml-1">Terms</Link> | 
              <Link href="/privacy" className="hover:text-tech-green transition-colors ml-1">Privacy</Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-text-muted text-sm mr-2">Follow us:</span>
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-bg-card hover:bg-tech-green/20 border border-border-subtle hover:border-tech-green/30 rounded-lg flex items-center justify-center text-text-muted hover:text-tech-green transition-all duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Performance Badge */}
        <div className="bg-gradient-to-r from-tech-green/10 to-transparent py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-6 text-sm text-text-muted">
              <span>🚀 Built for Performance</span>
              <span>⚡ 99.9% Uptime SLA</span>
              <span>🔒 Enterprise Security</span>
              <span>🌍 Global CDN</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default EnhancedFooter