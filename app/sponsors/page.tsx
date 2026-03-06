'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { HiUsers, HiGlobe, HiLightningBolt, HiStar } from 'react-icons/hi';

const whySponsor = [
  { icon: HiUsers, title: '3000+ Attendees', description: 'Direct access to developers, engineers, and tech-savvy students' },
  { icon: HiGlobe, title: 'Brand Visibility', description: 'Logo placement across website, venue, swag, and all digital communications' },
  { icon: HiLightningBolt, title: 'Talent Pipeline', description: 'Connect with top engineering talent for internships and hiring' },
  { icon: HiStar, title: 'Innovation Presence', description: 'Associate your brand with cutting-edge tech and student innovation' },
];

const sponsorTiers = [
  {
    tier: 'Title Sponsors',
    sponsors: [
      { name: 'TechCorp Global', logo: '/images/logo.png', description: 'Leading technology solutions provider' },
      { name: 'Innovation Labs', logo: '/images/logo.png', description: 'R&D and innovation pioneers' },
    ],
  },
  {
    tier: 'Platinum Sponsors',
    sponsors: [
      { name: 'CloudTech Systems', logo: '/images/logo.png', description: 'Cloud infrastructure experts' },
      { name: 'DataFlow Inc', logo: '/images/logo.png', description: 'Big data analytics solutions' },
      { name: 'AI Ventures', logo: '/images/logo.png', description: 'Artificial intelligence research' },
    ],
  },
  {
    tier: 'Gold Sponsors',
    sponsors: [
      { name: 'CodeMasters', logo: '/images/logo.png', description: 'Software development training' },
      { name: 'RoboTech Solutions', logo: '/images/logo.png', description: 'Robotics and automation' },
      { name: 'WebPro Agency', logo: '/images/logo.png', description: 'Web development services' },
      { name: 'CyberSafe Security', logo: '/images/logo.png', description: 'Cybersecurity solutions' },
    ],
  },
  {
    tier: 'Silver Sponsors',
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

export default function SponsorsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 min-w-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
        <motion.header
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 pt-8"
        >
          <h1 className="font-mono text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]">
            &gt; OUR SPONSORS
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            AAYAM is made possible by our incredible sponsors. Together, we&apos;re building new dimensions of technology.
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-mono text-xl md:text-2xl font-semibold text-center mb-2 text-[var(--accent-cyan)]">
            &gt; WHY SPONSOR AAYAM?
          </h2>
          <p className="text-[var(--text-secondary)] text-center mb-10 max-w-xl mx-auto">
            Reach 3000+ developers, engineers, and students at Newton School of Technology
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whySponsor.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="card-retro rounded-sm p-6 text-center"
              >
                <item.icon className="w-10 h-10 mx-auto mb-4 text-[var(--accent-cyan)]" aria-hidden />
                <h3 className="font-mono font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {sponsorTiers.map((tier, tierIndex) => (
          <motion.section
            key={tier.tier}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: tierIndex * 0.08 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="font-mono text-lg md:text-xl font-semibold text-[var(--accent-cyan)] mb-2">
                {tier.tier}
              </h2>
              <div className="h-px w-16 mx-auto bg-[var(--accent-cyan)]/50" />
            </div>

            <div
              className={`grid gap-6 ${
                tier.tier === 'Title Sponsors'
                  ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
                  : tier.tier === 'Platinum Sponsors'
                    ? 'grid-cols-1 md:grid-cols-3'
                    : tier.tier === 'Gold Sponsors'
                      ? 'grid-cols-2 md:grid-cols-4'
                      : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
              }`}
            >
              {tier.sponsors.map((sponsor, index) => (
                <motion.article
                  key={sponsor.name}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  viewport={{ once: true }}
                  className={`card-retro rounded-sm overflow-hidden text-center ${
                    tier.tier === 'Title Sponsors' ? 'p-10' : 'p-6'
                  }`}
                >
                  <div
                    className={`relative mx-auto mb-4 grayscale hover:grayscale-0 transition-all ${
                      tier.tier === 'Title Sponsors' ? 'w-36 h-16' : 'w-24 h-12'
                    }`}
                  >
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className={`font-mono font-semibold text-[var(--text-primary)] mb-1 ${
                    tier.tier === 'Title Sponsors' ? 'text-lg' : 'text-sm'
                  }`}>
                    {sponsor.name}
                  </h3>
                  <p className={`text-[var(--text-muted)] ${
                    tier.tier === 'Title Sponsors' ? 'text-sm' : 'text-xs'
                  }`}>
                    {sponsor.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </motion.section>
        ))}

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="card-retro rounded-sm p-10 md:p-14 text-center">
            <h2 className="font-mono text-2xl md:text-3xl font-bold mb-4 text-[var(--text-primary)]">
              &gt; INTERESTED IN SPONSORING?
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
              Partner with AAYAM to put your brand in front of 3000+ developers and engineers at Newton School of Technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:aayam.fest@newtonschool.co"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-semibold bg-[var(--accent-primary)] text-white border border-[var(--accent-primary)] hover:shadow-[0_0_20px_var(--glow-primary)] transition-all"
              >
                Contact Sponsorship Team
              </a>
              <a
                href="/brochure/aayam-sponsorship-booklet-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 font-mono text-sm font-semibold border border-[var(--border-accent)] text-[var(--text-primary)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] transition-all"
              >
                Download Brochure
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
