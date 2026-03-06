'use client';

import { motion } from 'framer-motion';
import { HiSpeakerphone, HiUserGroup, HiTrendingUp, HiGift, HiStar, HiBadgeCheck, HiLightningBolt } from 'react-icons/hi';
import { FaTrophy, FaUsers, FaShare, FaChartLine } from 'react-icons/fa';
import Link from 'next/link';

const benefits = [
  { icon: HiGift, title: 'Exclusive Goodies', description: 'Official AAYAM gear, swag, and exclusive artifacts.' },
  { icon: HiBadgeCheck, title: 'Recognition', description: 'Official certification and recognition as an AAYAM Ambassador.' },
  { icon: HiStar, title: 'Total Access', description: 'Unrestricted access to all AAYAM sectors and events.' },
  { icon: HiLightningBolt, title: 'Direct Link', description: 'Instant communication with organizers and exclusive updates.' },
  { icon: FaTrophy, title: 'Bounty Multiplier', description: 'Top performers get bonus credits, hardware, and special status.' },
  { icon: HiUserGroup, title: 'The Network', description: 'Connect with sponsors, mentors, and industry leaders.' },
];

const responsibilities = [
  { icon: FaShare, title: 'Spread the Word', description: 'Share AAYAM updates, create content, and grow your network.' },
  { icon: FaUsers, title: 'Campus Outreach', description: 'Drive awareness on your campus through posters and groups.' },
  { icon: FaChartLine, title: 'Conversion Drive', description: 'Use your unique link to recruit students to AAYAM.' },
  { icon: HiTrendingUp, title: 'Reporting', description: 'Log campaign activities and track your impact.' },
];

const tiers = [
  { name: 'Bronze', target: '10-25 sign-ups', rewards: ['Tactical Certification', 'Insignia Pack'] },
  { name: 'Silver', target: '25-50 sign-ups', rewards: ['Priority Clearance', 'Nodal Badge'] },
  { name: 'Gold', target: '50-100 sign-ups', rewards: ['Gold Clearance', 'Executive Access', 'Recommendation Log', 'Nexus Session'] },
  { name: 'Platinum', target: '100+ sign-ups', rewards: ['Platinum Clearance', 'Total Access Pass', 'Concert Pass', 'LOR', 'Core Team Priority', 'Meet with Organizers', 'and more'] },
];

const faqs = [
  { q: 'Who can become an ambassador?', a: 'Any college/university student passionate about technology and events can apply. No prior experience needed!' },
  { q: 'How do I track my progress?', a: "You'll get a unique link and access to a dashboard showing your real-time recruitment and tier progress." },
  { q: 'When do I receive my rewards?', a: 'Gear is dispatched as you hit each tier. Final rewards are distributed at the event or within 2 weeks after.' },
  { q: 'Can I be an ambassador from any college?', a: 'Absolutely! Our program is open to students from across India. Promote AAYAM anywhere!' },
  { q: "What if I don't hit a tier?", a: 'All active ambassadors get a certificate of participation and exclusive swag. Every bit of effort counts!' },
];

export default function AmbassadorPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20 pt-8"
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs text-[var(--accent-cyan)] border border-[var(--border-accent)] px-4 py-2 rounded mb-6">
            <HiSpeakerphone className="w-4 h-4" aria-hidden />
            Recruiting Ambassadors
          </span>
          <h1 className="font-mono text-3xl md:text-5xl font-bold mb-6 text-[var(--text-primary)]">
            &gt; JOIN THE <span className="text-[var(--accent-primary)]">SYNDICATE</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto mb-10">
            Become the face of AAYAM. Promote AAYAM 2026 on your campus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ambassador/register"
              className="inline-flex justify-center px-8 py-4 font-mono text-sm font-semibold bg-[var(--accent-primary)] text-white border border-[var(--accent-primary)] hover:shadow-[0_0_20px_var(--glow-primary)] transition-all"
            >
              Apply Now
            </Link>
            <a
              href="#rewards"
              className="inline-flex justify-center px-8 py-4 font-mono text-sm font-semibold border border-[var(--border-accent)] text-[var(--text-primary)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] transition-all"
            >
              View Bounties
            </a>
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <article className="card-retro rounded-sm p-8 md:p-12">
            <h2 className="font-mono text-xl md:text-2xl font-semibold text-[var(--text-primary)] mb-6">
              &gt; THE DIRECTIVE
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-[var(--text-secondary)] leading-relaxed">
              <p>
                The <strong className="text-[var(--text-primary)]">AAYAM Ambassador Program</strong> expands the fest across all campuses. As an ambassador, you are the primary link between the organizers and your college.
              </p>
              <p>
                This is expansion. Deploy the brand, drive recruitment, and climb the tier hierarchy for AAYAM 2026.
              </p>
            </div>
          </article>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-center mb-2 text-[var(--text-primary)]">
            &gt; OPERATIVE REWARDS
          </h2>
          <p className="text-[var(--text-muted)] text-center text-sm mb-10">Perks for active ambassadors</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                viewport={{ once: true }}
                className="card-retro rounded-sm p-6"
              >
                <item.icon className="w-10 h-10 mb-4 text-[var(--accent-cyan)]" aria-hidden />
                <h3 className="font-mono font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-center mb-2 text-[var(--text-primary)]">
            &gt; YOUR ROLE
          </h2>
          <p className="text-[var(--text-muted)] text-center text-sm mb-10">What ambassadors do</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {responsibilities.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                viewport={{ once: true }}
                className="card-retro rounded-sm p-6"
              >
                <item.icon className="w-8 h-8 mb-3 text-[var(--accent-amber)]" aria-hidden />
                <h3 className="font-mono font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="rewards"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-center mb-2 text-[var(--text-primary)]">
            &gt; CLEARANCE LEVELS
          </h2>
          <div className="h-px w-20 mx-auto bg-[var(--phosphor-green)]/50 my-8" />
          <div className="grid md:grid-cols-2 gap-6">
            {tiers.map((tier, index) => (
              <motion.article
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="card-retro rounded-sm p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-mono text-xl font-semibold text-[var(--text-primary)]">{tier.name}</h3>
                  <span className="font-mono text-xs text-[var(--accent-cyan)] border border-[var(--border-accent)] px-3 py-1.5 rounded">
                    {tier.target}
                  </span>
                </div>
                <ul className="space-y-2">
                  {tier.rewards.map((reward, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[var(--text-secondary)] text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--phosphor-cyan)]" aria-hidden />
                      {reward}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-mono text-2xl font-bold text-center mb-10 text-[var(--text-primary)]">
            &gt; FAQ
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <article key={index} className="card-retro rounded-sm p-6">
                <p className="font-mono text-xs text-[var(--accent-cyan)] mb-2">Q:</p>
                <h3 className="font-mono font-semibold text-[var(--text-primary)] mb-2">{faq.q}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{faq.a}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="card-retro rounded-sm p-12 md:p-16 text-center">
            <h2 className="font-mono text-2xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]">
              &gt; INITIATE
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
              The expansion starts with one campus. Will it be yours?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ambassador/register"
                className="inline-flex justify-center px-8 py-4 font-mono text-sm font-semibold bg-[var(--accent-primary)] text-white border border-[var(--accent-primary)] hover:shadow-[0_0_20px_var(--glow-primary)] transition-all"
              >
                Register as Ambassador
              </Link>
              <Link
                href="/ambassador/login"
                className="inline-flex justify-center px-8 py-4 font-mono text-sm font-semibold border border-[var(--border-accent)] text-[var(--text-primary)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] transition-all"
              >
                Ambassador Login
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
