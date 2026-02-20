'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { HiUsers, HiGlobe, HiLightningBolt, HiStar, HiMail } from 'react-icons/hi';

export default function SponsorsPage() {
  const whySponsor = [
    { icon: HiUsers, title: '3000+ Attendees', description: 'Direct access to developers, engineers, and tech-savvy students' },
    { icon: HiGlobe, title: 'Brand Visibility', description: 'Logo placement across website, venue, swag, and all digital communications' },
    { icon: HiLightningBolt, title: 'Talent Pipeline', description: 'Connect with top engineering talent for internships and hiring' },
    { icon: HiStar, title: 'Innovation Presence', description: 'Associate your brand with cutting-edge tech and student innovation' },
  ];

  const sponsorTiers = [
    {
      tier: 'Title Sponsors',
      gradient: 'from-[var(--energy)] to-[var(--dc1426)]',
      sponsors: [
        { name: 'TechCorp Global', logo: '/images/logo.png', description: 'Leading technology solutions provider' },
        { name: 'Innovation Labs', logo: '/images/logo.png', description: 'R&D and innovation pioneers' },
      ],
    },
    {
      tier: 'Platinum Sponsors',
      gradient: 'from-[var(--midich)] to-[var(--energy)]',
      sponsors: [
        { name: 'CloudTech Systems', logo: '/images/logo.png', description: 'Cloud infrastructure experts' },
        { name: 'DataFlow Inc', logo: '/images/logo.png', description: 'Big data analytics solutions' },
        { name: 'AI Ventures', logo: '/images/logo.png', description: 'Artificial intelligence research' },
      ],
    },
    {
      tier: 'Gold Sponsors',
      gradient: 'from-[var(--dc1426)] to-[var(--black-red)]',
      sponsors: [
        { name: 'CodeMasters', logo: '/images/logo.png', description: 'Software development training' },
        { name: 'RoboTech Solutions', logo: '/images/logo.png', description: 'Robotics and automation' },
        { name: 'WebPro Agency', logo: '/images/logo.png', description: 'Web development services' },
        { name: 'CyberSafe Security', logo: '/images/logo.png', description: 'Cybersecurity solutions' },
      ],
    },
    {
      tier: 'Silver Sponsors',
      gradient: 'from-[var(--mydiry)] to-[var(--midich)]',
      sponsors: [
        { name: 'StartupHub', logo: '/images/logo.png', description: 'Startup incubator' },
        { name: 'DevTools Pro', logo: '/images/logo.png', description: 'Developer tools' },
        { name: 'TechMedia Group', logo: '/images/logo.png', description: 'Tech media and publications' },
        { name: 'Edu Tech Solutions', logo: '/images/logo.png', description: 'Educational technology' },
        { name: 'Green Energy Tech', logo: '/images/logo.png', description: 'Sustainable technology' },
        { name: 'Smart IoT Systems', logo: '/images/logo.png', description: 'IoT solutions' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Hero */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 pt-8"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Our{' '}
            <span className="bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] bg-clip-text text-transparent">
              Sponsors
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            AAYAM is made possible by our incredible sponsors. Together, we&apos;re building new dimensions of technology.
          </p>
        </motion.div>

        {/* Why Sponsor AAYAM */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Sponsor AAYAM?</h2>
          <p className="text-gray-400 text-center text-lg mb-12 max-w-2xl mx-auto">
            Reach 3000+ developers, engineers, and students at Newton School of Technology
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whySponsor.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center group hover:border-white/20 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-gradient-to-br from-[var(--energy)] to-[var(--dc1426)] rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sponsor Tiers */}
        {sponsorTiers.map((tier, tierIndex) => (
          <motion.div
            key={tier.tier}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: tierIndex * 0.1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h2 className={`text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r ${tier.gradient} bg-clip-text text-transparent`}>
                {tier.tier}
              </h2>
              <div className={`h-1 w-24 mx-auto rounded-full bg-gradient-to-r ${tier.gradient}`} />
            </div>

            <div className={`grid gap-6 ${tier.tier === 'Title Sponsors'
              ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
              : tier.tier === 'Platinum Sponsors'
                ? 'grid-cols-1 md:grid-cols-3'
                : tier.tier === 'Gold Sponsors'
                  ? 'grid-cols-2 md:grid-cols-4'
                  : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
              }`}>
              {tier.sponsors.map((sponsor, index) => (
                <motion.div
                  key={sponsor.name}
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className={`group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 ${tier.tier === 'Title Sponsors' ? 'p-10' : 'p-6'
                    }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  <div className="relative flex flex-col items-center">
                    <div className={`relative ${tier.tier === 'Title Sponsors' ? 'w-40 h-20' : 'w-28 h-14'
                      } mb-4 grayscale group-hover:grayscale-0 transition-all duration-300`}>
                      <Image src={sponsor.logo} alt={sponsor.name} fill className="object-contain" />
                    </div>
                    <h3 className={`font-bold text-center mb-1 text-white ${tier.tier === 'Title Sponsors' ? 'text-xl' : 'text-base'
                      }`}>
                      {sponsor.name}
                    </h3>
                    <p className={`text-gray-400 text-center ${tier.tier === 'Title Sponsors' ? 'text-sm' : 'text-xs'
                      }`}>
                      {sponsor.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="bg-white/5 rounded-3xl p-12 md:p-16 text-center border border-white/10">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-white">
              Interested in Sponsoring?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Partner with AAYAM to put your brand in front of 3000+ developers and engineers at Newton School of Technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-[0_12px_30px_rgba(220,20,38,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 text-white">
                <HiMail className="w-5 h-5" />
                Contact Sponsorship Team
              </button>
              <button className="px-8 py-4 border border-white/20 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 text-white">
                Download Brochure
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
