'use client'

import React from 'react'
import { motion } from '@/components/animations/AnimationProvider'
import { Sparkles, Users, Target, Lightbulb, Award } from 'lucide-react'

interface TeamMember {
  name: string
  role: string
  expertise: string[]
  image?: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Founder',
    expertise: ['Strategy', 'AI/ML', 'Leadership']
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO',
    expertise: ['Architecture', 'Cloud', 'Security']
  },
  {
    name: 'Emily Johnson',
    role: 'Head of Design',
    expertise: ['UX/UI', 'Branding', 'Research']
  },
  {
    name: 'David Park',
    role: 'Lead Developer',
    expertise: ['Full-Stack', 'DevOps', 'Blockchain']
  }
]

const values = [
  {
    icon: Target,
    title: 'Innovation First',
    description: 'We push boundaries and embrace cutting-edge technologies to deliver exceptional solutions.'
  },
  {
    icon: Users,
    title: 'Client Success',
    description: 'Your success is our priority. We work closely with you to achieve your business goals.'
  },
  {
    icon: Lightbulb,
    title: 'Creative Excellence',
    description: 'We combine technical expertise with creative thinking to solve complex challenges.'
  },
  {
    icon: Award,
    title: 'Quality Driven',
    description: 'We maintain the highest standards in every project, ensuring reliable and scalable solutions.'
  }
]

const CometAbout: React.FC = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tech-green)_0px,_transparent_1px)] bg-[length:40px_40px] opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-tech-green/20 bg-accent-muted px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-tech-green" />
            <span className="text-sm font-medium text-white">
              About Us
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Pioneers in <span className="text-gradient-tech">Digital Innovation</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            We're a team of passionate technologists, designers, and strategists dedicated to 
            transforming businesses through intelligent digital solutions.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-20"
        >
          <div className="bg-gray-900/30 border border-gray-700 rounded-2xl max-w-4xl mx-auto p-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
            <p className="text-xl text-text-secondary">
              To empower businesses with cutting-edge technology solutions that drive growth, 
              enhance efficiency, and create lasting competitive advantages in the digital age.
            </p>
          </div>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-tech-green/10 to-accent-hover/10 mb-4">
                  <Icon className="h-6 w-6 text-tech-green" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {value.title}
                </h4>
                <p className="text-sm text-text-secondary">
                  {value.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-semibold text-center text-white mb-12">
            Meet Our Leadership Team
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-4">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-tech-green to-accent-hover p-[2px] group-hover:scale-105 transition-transform">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold text-white mb-1">
                  {member.name}
                </h4>
                <p className="text-sm text-tech-green mb-3">
                  {member.role}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.expertise.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full bg-gray-900/50 text-text-secondary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="bg-gray-900/30 border border-gray-700 rounded-2xl max-w-4xl mx-auto p-8">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Why Choose Astro Intelligence?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-gradient-tech mb-2">10+</div>
                <p className="text-sm text-text-secondary">Years of Excellence</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-gradient-tech mb-2">500+</div>
                <p className="text-sm text-text-secondary">Solutions Delivered</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-gradient-tech mb-2">15+</div>
                <p className="text-sm text-text-secondary">Industry Awards</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CometAbout