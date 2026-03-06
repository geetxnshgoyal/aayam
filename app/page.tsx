'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { HiLightningBolt, HiUsers, HiCode } from 'react-icons/hi';
import { FaTrophy } from 'react-icons/fa';
import { useRef } from 'react';
import ScrollingStats from '@/components/ScrollingStats';
import Countdown from '@/components/Countdown';
import HeroParticles from '@/components/HeroParticles';

const stats = [
  { icon: HiUsers, value: '3000+', label: 'Participants' },
  { icon: FaTrophy, value: '6+', label: 'Competitions' },
  { icon: HiLightningBolt, value: '₹2L+', label: 'Prize Pool' },
  { icon: HiCode, value: '2+', label: 'Sponsors' },
];

const highlights = [
  {
    title: 'Hackathons',
    description: '24-hour and 12-hour innovation marathons with blind code challenges, AI vs Human battles, and tech meme challenges',
  },
  {
    title: 'Competitive Programming',
    description: 'Solo and team CP contests plus code optimizer challenges — push your algorithmic thinking to the limit',
  },
  {
    title: 'Robotics Arena',
    description: 'Robo Racing, Soccer, Fighting, Maze Solver, and Drone Hurdle Racing — build machines that dominate',
  },
  {
    title: 'Open Source',
    description: 'Contribute to real open-source projects, collaborate with the community, and ship code that matters',
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.85, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-x-hidden">
      <section
        aria-labelledby="hero-heading"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        <HeroParticles />
        <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[var(--bg-deep)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,var(--accent-cyan-muted)_0%,transparent_50%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-accent)] to-transparent" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-8"
          >
            <div className="relative w-[240px] md:w-[320px] h-[100px] md:h-[140px] mx-auto mb-8">
              <Image
                src="/images/logo.png"
                alt="AAYAM — Exploring New Dimensions of Technology"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 240px, 320px"
              />
            </div>
          </motion.div>

          <div className="terminal-border bg-[var(--bg-card)]/90 backdrop-blur-md p-6 md:p-10 rounded-sm max-w-3xl mx-auto">
            <motion.h1
              id="hero-heading"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-mono text-2xl md:text-4xl font-bold mb-4 text-[var(--text-primary)] tracking-wide"
            >
              &gt; EXPLORING NEW DIMENSIONS
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-px bg-[var(--border-accent)] mb-6 max-w-xs mx-auto"
            />
            <motion.p
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-[var(--text-secondary)] text-base md:text-lg mb-6"
            >
              Hosted by <span className="text-[var(--accent-cyan)] font-medium">Newton School of Technology</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-8"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">
                Countdown to launch
              </p>
              <Countdown />
            </motion.div>

            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
            >
              <Link
                href="/competitions"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-pixel text-xs bg-[var(--accent-primary)] text-white border-[3px] border-[var(--accent-primary-border)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[0_0_20px_var(--glow-primary)] transition-all duration-200"
              >
                ENTER THE ARENA
                <span className="animate-blink">_</span>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-semibold border border-[var(--border-accent)] text-[var(--text-primary)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] transition-all duration-200"
              >
                ABOUT
              </Link>
              <a
                href="/brochure/aayam-sponsorship-booklet-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-semibold border border-[var(--border-accent)] text-[var(--text-secondary)] hover:border-[var(--accent-amber)] hover:text-[var(--accent-amber)] transition-all duration-200"
              >
                BROCHURE
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="flex justify-center gap-6 md:gap-10 flex-wrap max-w-2xl mx-auto mt-12"
          >
            {[
              { text: 'April 24-25, 2026', label: 'DATE' },
              { text: 'NST S-VYASA University, Bengaluru', label: 'VENUE' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 px-4 py-2 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)]/50"
              >
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                  {item.label}
                </span>
                <span className="text-sm text-[var(--text-secondary)]">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <ScrollingStats
        stats={[
          { icon: '▸', label: 'Event', value: 'April 24-25, 2026' },
          { icon: '▸', label: 'Prize Pool', value: '₹2L+' },
          { icon: '▸', label: 'Competitions', value: '6+' },
          { icon: '▸', label: 'Participants', value: '3000+' },
          { icon: '▸', label: 'Sponsors', value: '2+' },
          { icon: '▸', label: 'Location', value: 'NST S-VYASA University, Bengaluru' },
        ]}
        direction="left"
        speed={40}
        className="border-y border-[var(--border-subtle)] bg-[var(--bg-card)]/50"
      />

      <section className="relative py-20 md:py-28 overflow-hidden" aria-labelledby="stats-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            id="stats-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-mono text-2xl md:text-4xl font-bold text-center mb-12 text-[var(--text-primary)]"
          >
            &gt; BY THE NUMBERS
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.article
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="card-retro p-6 rounded-sm text-center"
              >
                <stat.icon className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 text-[var(--accent-cyan)]" aria-hidden />
                <p className="font-mono text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-1">
                  {stat.value}
                </p>
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  {stat.label}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 overflow-hidden" aria-labelledby="highlights-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 id="highlights-heading" className="font-mono text-2xl md:text-4xl font-bold mb-2 text-[var(--text-primary)]">
              &gt; NEXT DIMENSION
            </h2>
            <p className="text-[var(--text-secondary)]">Build beyond limits. Compete for glory.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="card-retro p-6 rounded-sm h-full flex flex-col"
              >
                <div className="w-10 h-10 rounded border border-[var(--border-accent)] flex items-center justify-center mb-4">
                  <span className="text-[var(--accent-cyan)] font-mono text-lg">▸</span>
                </div>
                <h3 className="font-mono text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-grow">
                  {item.description}
                </p>
                <Link
                  href="/competitions"
                  className="mt-4 font-mono text-xs text-[var(--accent-cyan)] hover:underline inline-flex items-center gap-1"
                >
                  REGISTER <span aria-hidden>→</span>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 overflow-hidden" aria-labelledby="cta-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="terminal-border bg-[var(--bg-card)] p-10 md:p-14 rounded-sm"
          >
            <h2 id="cta-heading" className="font-mono text-2xl md:text-4xl font-bold mb-6 text-[var(--text-primary)]">
              &gt; WHERE INNOVATION MEETS POSSIBILITY
            </h2>
            <p className="text-[var(--text-secondary)] text-lg mb-10 max-w-xl mx-auto">
              6+ competitions. ₹2L+ in prizes. 3000+ innovators.{' '}
              <Link href="/competitions" className="text-[var(--accent-cyan)] hover:underline">
                Register now
              </Link>{' '}
              and enter the next dimension.
            </p>
            <Link
              href="/competitions"
              className="inline-flex items-center gap-2 px-8 py-4 font-pixel text-xs bg-[var(--accent-primary)] text-white border-[3px] border-[var(--accent-primary-border)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[0_0_25px_var(--glow-primary)] transition-all duration-200"
            >
              Register Now
              <span className="animate-blink">_</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
