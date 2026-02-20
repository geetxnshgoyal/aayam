'use client';

import { motion } from 'framer-motion';
import { HiSpeakerphone, HiUserGroup, HiTrendingUp, HiGift, HiStar, HiBadgeCheck, HiLightningBolt } from 'react-icons/hi';
import { FaTrophy, FaUsers, FaShare, FaChartLine } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';
import Magnetic from '@/components/Magnetic';
import TextEncrypt from '@/components/TextEncrypt';

export default function AmbassadorPage() {
  const benefits = [
    {
      icon: HiGift,
      title: 'RESTRICTED GOODIES',
      description: 'Acquire official AAYAM tactical gear, encrypted swag, and exclusive artifacts.',
      gradient: 'from-[var(--horror-magenta)] to-[var(--horror-purple)]',
    },
    {
      icon: HiBadgeCheck,
      title: 'NODAL RECOGNITION',
      description: 'Receive an official Protocol certification and global synchronized recognition.',
      gradient: 'from-[var(--horror-cyan)] to-blue-600',
    },
    {
      icon: HiStar,
      title: 'TOTAL ACCESS',
      description: 'Unrestricted clearance to all AAYAM sectors and decrypted protocols.',
      gradient: 'from-purple-500 to-[var(--horror-magenta)]',
    },
    {
      icon: HiLightningBolt,
      title: 'DIRECT OVERLINK',
      description: 'Instant communication with the Architects and exclusive data streams.',
      gradient: 'from-gray-400 to-gray-600',
    },
    {
      icon: FaTrophy,
      title: 'BOUNTY MULTIPLIER',
      description: 'High-performance operatives get bonus credits, hardware, and special status.',
      gradient: 'from-[var(--horror-magenta)] to-red-600',
    },
    {
      icon: HiUserGroup,
      title: 'THE SYNDICATE',
      description: 'Connect with core sponsors, mentors, and industrial leaders at the Nexus.',
      gradient: 'from-[var(--horror-cyan)] to-teal-500',
    },
  ];

  const responsibilities = [
    {
      icon: FaShare,
      title: 'SIGNAL PROPAGATION',
      description: 'Broadcast AAYAM logs, create content, and infect your network.',
    },
    {
      icon: FaUsers,
      title: 'CAMPUS INFILTRATION',
      description: 'Deploy awareness in your node through posters and closed-circuit groups.',
    },
    {
      icon: FaChartLine,
      title: 'CONVERSION DRIVE',
      description: 'Use your unique uplink to recruit students into the simulation.',
    },
    {
      icon: HiTrendingUp,
      title: 'METRIC REPORTING',
      description: 'Log your campaign activities and track propagation performance.',
    },
  ];

  const tiers = [
    {
      name: 'BRONZE OPERATIVE',
      target: '10-25 SIGN-UPS',
      rewards: ['Tactical Certification', 'Insignia Pack'],
      gradient: 'from-orange-600 to-orange-800',
    },
    {
      name: 'SILVER OPERATIVE',
      target: '25-50 SIGN-UPS',
      rewards: ['Priority Clearance', 'Nodal Badge'],
      gradient: 'from-gray-400 to-gray-600',
    },
    {
      name: 'GOLD OPERATIVE',
      target: '50-100 SIGN-UPS',
      rewards: ['Gold Clearance', 'Executive Access', 'Recommendation Log', 'Nexus Session'],
      gradient: 'from-yellow-400 to-yellow-600',
    },
    {
      name: 'PLATINUM OPERATIVE',
      target: '100+ SIGN-UPS',
      rewards: ['Platinum Clearance', 'Total Access Pass', 'Concert Pass', 'LOR', 'Core Team Priority', 'Meet with Organizers', 'and many more exciting things'],
      gradient: 'from-purple-400 to-purple-600',
    },
  ];

  const faqs = [
    {
      q: 'Who can become an operative?',
      a: 'Any college/university student passionate about technology and events can apply. No prior experience needed!',
    },
    {
      q: 'How do I track my propagation?',
      a: "You'll get a unique uplink and access to a dashboard showing your real-time recruitment and tier progress.",
    },
    {
      q: 'When do I receive my bounty?',
      a: 'Gear is dispatched as you hit each tier. Final rewards are distributed at the event or within 2 weeks after.',
    },
    {
      q: 'Can I be an operative from any node?',
      a: 'Absolutely! Our program is open to students from across India. Promote AAYAM anywhere!',
    },
    {
      q: 'What if I don\'t hit a tier?',
      a: 'All active operatives get a certificate of participation and exclusive swag. Every byte of effort counts!',
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-32 relative bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-32"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-[var(--horror-magenta)] rounded-full text-white font-mono text-xs tracking-[0.4em] uppercase"
          >
            <HiSpeakerphone className="w-4 h-4" />
            <span>Recruiting Operatives</span>
          </motion.div>

          <h1 className="text-6xl md:text-9xl font-display font-black mb-8 text-white tracking-tighter leading-none">
            JOIN THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--horror-magenta)] via-purple-400 to-[var(--horror-cyan)] animate-gradient-shift bg-[length:200%_auto]">
              <TextEncrypt text="SYNDICATE" />
            </span>
          </h1>
          <p className="text-xl md:text-3xl text-gray-400 max-w-4xl mx-auto font-light leading-relaxed mb-16">
            AAYAM — Become the face of the technological infiltration. Promote AAYAM 2026 on your campus node.
          </p>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <Magnetic>
              <Link href="/ambassador/register" className="px-12 py-6 bg-white text-black font-black text-xl tracking-[0.2em] rounded-full hover:bg-[var(--horror-magenta)] hover:text-white transition-all duration-500 shadow-2xl uppercase">
                Apply Now
              </Link>
            </Magnetic>
            <Magnetic>
              <a href="#rewards" className="px-12 py-6 bg-transparent text-white border border-white/20 font-black text-xl tracking-[0.2em] rounded-full hover:bg-transparent/10 transition-all duration-500 uppercase">
                View Bounties
              </a>
            </Magnetic>
          </div>
        </motion.div>

        {/* Narrative Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-40"
        >
          <div className="relative group p-1 md:p-2 bg-gradient-to-br from-[var(--horror-magenta)]/20 to-transparent rounded-[4rem]">
            <div className="relative bg-[#050508]/80 backdrop-blur-3xl p-10 md:p-20 rounded-[3.8rem] border border-white/5 overflow-hidden">
              <div className="absolute top-0 right-0 p-12 font-mono text-white/5 text-[15rem] font-black pointer-events-none select-none">
                OP
              </div>

              <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-1 bg-[var(--horror-cyan)] rounded-full shadow-[0_0_15px_var(--horror-cyan)]" />
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-widest uppercase">The Directive</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-16 text-xl text-gray-400 leading-relaxed font-light">
                <p>
                  The <span className="text-white font-bold">AAYAM Ambassador Protocol</span> is our strategy to expand the simulation across all physical institutional nodes. As an operative, you will act as the primary interface between the Architects and your local campus.
                </p>
                <p>
                  This is not marketing. <span className="text-[var(--horror-magenta)] font-bold">This is expansion.</span> Deploy the visual identity, drive recruitment, and secure your place in the high-tier hierarchy of the 2026 dimension.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Benefits */}
        <div className="mb-40">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-7xl font-display font-bold text-white uppercase tracking-tighter">Operative Rewards</h2>
            <p className="text-gray-500 mt-6 tracking-[0.5em] font-mono text-xs uppercase">Decrypted perks for active clearance levels</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-[#050508]/40 backdrop-blur-md rounded-[2.5rem] border border-white/5 p-12 overflow-hidden hover:border-[var(--horror-magenta)]/30 transition-all duration-500"
              >
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${benefit.gradient} opacity-20 group-hover:opacity-100 transition-opacity`} />
                <div className={`w-16 h-16 mb-8 rounded-2xl bg-transparent/5 flex items-center justify-center border border-white/10 group-hover:bg-transparent/10 transition-colors`}>
                  <benefit.icon className="w-8 h-8 text-[var(--horror-cyan)] group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-display font-black text-white mb-4 group-hover:text-[var(--horror-magenta)] transition-colors">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed font-light">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tiers */}
        <div id="rewards" className="mb-40">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-7xl font-display font-bold text-white uppercase tracking-tighter">Clearance Levels</h2>
            <div className="w-40 h-1 bg-gradient-to-r from-transparent via-[var(--horror-magenta)] to-transparent mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative bg-transparent/5 backdrop-blur-xl rounded-[3rem] p-12 border border-white/10 overflow-hidden group hover:border-[var(--horror-magenta)]/40 transition-all duration-500"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />

                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-3xl font-display font-black text-white">{tier.name}</h3>
                  <div className="px-6 py-2 rounded-full border border-[var(--horror-magenta)] text-[var(--horror-magenta)] font-mono text-sm font-bold shadow-[0_0_15px_var(--horror-magenta)]/20">
                    {tier.target}
                  </div>
                </div>

                <ul className="grid grid-cols-1 gap-4">
                  {tier.rewards.map((reward, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-gray-300 font-light text-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--horror-cyan)]" />
                      {reward}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ - THE LOGS */}
        <div className="mb-40">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-widest">The Logs (FAQ)</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/40 backdrop-blur-md rounded-[2rem] p-10 border border-white/10 hover:border-[var(--horror-magenta)]/50 transition-all duration-300 cursor-help group shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <span className="text-[var(--horror-magenta)] font-mono text-xl mt-1 font-bold">Q:</span>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--horror-magenta)] transition-colors">
                      {faq.q}
                    </h3>
                    <p className="text-gray-300 leading-relaxed font-light">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative bg-transparent/5 backdrop-blur-3xl p-20 md:p-32 rounded-[4rem] text-center border border-white/10 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--horror-magenta)] to-transparent" />
          <h2 className="text-5xl md:text-8xl font-display font-black mb-10 text-white leading-tight uppercase">
            Initiate <br /> <span className="text-[var(--horror-cyan)]">Infiltration</span>
          </h2>
          <p className="text-2xl text-gray-400 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
            The expansion starts with one node. Will it be yours?
          </p>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <Magnetic>
              <Link href="/ambassador/register" className="px-14 py-7 bg-white text-black font-black text-xl tracking-[0.2em] rounded-full hover:bg-[var(--horror-magenta)] hover:text-white transition-all duration-500 shadow-2xl uppercase">
                Authorize
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/ambassador/login" className="px-14 py-7 bg-transparent text-white border border-white/20 font-black text-xl tracking-[0.2em] rounded-full hover:bg-transparent/10 transition-all duration-500 uppercase">
                Operative Login
              </Link>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
