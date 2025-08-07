'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, ChevronDown } from 'lucide-react'
import { usePersonalization } from './AIPersonalizationProvider'

const navigation = [
  { name: 'Home', href: '/' },
  { 
    name: 'Services', 
    href: '/services',
    submenu: [
      { name: 'AI Consulting', href: '/services/ai-consulting', icon: '🤖' },
      { name: 'ML Engineering', href: '/services/ml-engineering', icon: '🧠' },
      { name: 'Cloud Architecture', href: '/services/cloud-architecture', icon: '☁️' },
      { name: 'Automation', href: '/services/automation-scripting', icon: '⚡' }
    ]
  },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Lab', href: '/lab' },
  { name: 'About', href: '/about' },
]

export default function EnhancedNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)
  const pathname = usePathname()
  const { personalization } = usePersonalization()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Get personalized CTA based on user persona
  const getPersonalizedCTA = () => {
    const ctaMap = {
      enterprise: 'Schedule Demo',
      startup: 'Start Building',
      technical: 'View Docs',
      executive: 'Get ROI Report',
      default: 'Get Started'
    }
    return ctaMap[personalization.persona]
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4' : 'py-6'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`relative ${
          scrolled ? 'glass-morphism' : 'bg-transparent'
        } rounded-2xl transition-all duration-300`}>
          <div className="flex items-center justify-between px-6 py-4">
            {/* Logo with Animation */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <Link href="/" className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="relative w-10 h-10"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-electric-blue rounded-lg blur-lg opacity-70" />
                  <div className="relative bg-black rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-neon-green" />
                  </div>
                </motion.div>
                <span className="text-xl font-bold text-white">
                  Astro<span className="text-gradient-flow">Intelligence</span>
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-8">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setHoveredMenu(item.name)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <Link
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      pathname === item.href
                        ? 'text-neon-green'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-1">
                      {item.name}
                      {item.submenu && <ChevronDown className="w-4 h-4" />}
                    </span>
                    
                    {/* Active/Hover Indicator */}
                    {(pathname === item.href || hoveredMenu === item.name) && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-gradient-to-r from-neon-green/20 to-electric-blue/20 rounded-lg"
                        transition={{ type: 'spring', duration: 0.5 }}
                      />
                    )}
                  </Link>

                  {/* Submenu */}
                  <AnimatePresence>
                    {item.submenu && hoveredMenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 glass-morphism rounded-xl overflow-hidden"
                      >
                        {item.submenu.map((subItem, index) => (
                          <motion.div
                            key={subItem.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              href={subItem.href}
                              className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                            >
                              <span className="text-2xl">{subItem.icon}</span>
                              <span className="text-sm font-medium">{subItem.name}</span>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Personalized CTA */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="relative inline-flex items-center gap-2 px-6 py-3 overflow-hidden rounded-xl font-medium"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-green via-electric-blue to-cyber-purple bg-[length:200%_100%] animate-gradient-flow" />
                  <span className="relative z-10 text-black font-bold">
                    {getPersonalizedCTA()}
                  </span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="relative z-10"
                  >
                    →
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="mx-4 mt-4 glass-morphism rounded-2xl p-6">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-white/10 last:border-0"
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-4 text-lg font-medium transition-colors ${
                      pathname === item.href
                        ? 'text-neon-green'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                  
                  {/* Mobile Submenu */}
                  {item.submenu && (
                    <div className="pl-4 pb-4 space-y-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 py-2 text-sm text-white/60 hover:text-white transition-colors"
                        >
                          <span>{subItem.icon}</span>
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6"
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-6 py-4 bg-gradient-to-r from-neon-green to-electric-blue text-black font-bold rounded-xl"
                >
                  {getPersonalizedCTA()}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}