'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { HiLightningBolt, HiUsers, HiCode } from 'react-icons/hi';
import { FaTrophy } from 'react-icons/fa';
import { useRef } from 'react';
import ScrollingStats from '@/components/ScrollingStats';
import Countdown from '@/components/Countdown';
import ImageMarquee from '@/components/ImageMarquee';
import { RevealOnScroll, GlitchBorder, NeonButton } from '@/components/ImmersionEffects';

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

const competitions = [
  { name: 'Hackathon', prize: '₹50,000', icon: '💻' },
  { name: 'Robotics', prize: '₹40,000', icon: '🤖' },
  { name: 'CP Challenge', prize: '₹30,000', icon: '⚡' },
  { name: 'AI Battle', prize: '₹35,000', icon: '🧠' },
  { name: 'Web3 Hack', prize: '₹25,000', icon: '🔗' },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-[env(safe-area-inset-bottom)]"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-yellow)]/30 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-6"
          >
            <div className="relative w-[200px] md:w-[280px] h-[80px] md:h-[120px] mx-auto mb-6">
              <Image
                src="/images/logo.png"
                alt="AAYAM 2026 — Step Beyond the Known"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 200px, 280px"
              />
            </div>
          </motion.div>

          <div className="panel-comic panel-comic-yellow bg-[var(--bg-card)]/95 backdrop-blur-sm p-5 sm:p-6 md:p-10 rounded-sm max-w-3xl mx-auto w-full min-w-0">
            <motion.h1
              id="hero-heading"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="font-pixel text-base sm:text-lg md:text-2xl font-bold mb-3 text-[var(--text-primary)] tracking-wide uppercase break-words"
            >
              STEP BEYOND THE KNOWN
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="h-[2px] mb-5 max-w-full origin-center bg-gradient-to-r from-transparent via-[var(--accent-yellow)] to-transparent"
            />
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-[var(--text-secondary)] text-sm md:text-base mb-5 font-medium"
            >
              Hosted by <span className="text-[var(--accent-cyan)]">Newton School of Technology</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">
                Countdown to launch
              </p>
              <Countdown />
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap"
            >
              <Link
                href="/competitions"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 font-pixel text-[10px] bg-[var(--accent-primary)] text-[var(--ink)] border-[3px] border-[var(--accent-yellow)] rounded-sm hover:bg-[var(--accent-primary-hover)] transition-all duration-200 shadow-[6px_6px_0_var(--accent-magenta)] hover:shadow-[4px_4px_0_var(--accent-magenta)]"
              >
                ENTER THE ARENA
                <span className="animate-blink">_</span>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 font-pixel text-[10px] border-2 border-[var(--accent-yellow)]/60 text-[var(--text-primary)] rounded-sm hover:border-[var(--accent-cyan)] hover:bg-[var(--accent-cyan-muted)] transition-all duration-200"
              >
                ABOUT
              </Link>
              <a
                href="/brochure/aayam-sponsorship-booklet-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 font-pixel text-[10px] border-2 border-[var(--accent-orange)] text-[var(--accent-orange)] rounded-sm hover:bg-[var(--accent-amber-muted)] transition-all duration-200"
              >
                BROCHURE
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.35 }}
            className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 flex-wrap max-w-2xl mx-auto mt-10 text-left sm:text-center"
          >
            {[
              { text: 'April 24-25, 2026', label: 'DATE' },
              { text: '8AM - 8PM', label: 'TIME' },
              { text: 'NST S-VYASA University, Bengaluru', label: 'VENUE' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 px-4 py-2.5 rounded-sm border-2 border-[var(--accent-yellow)]/40 bg-[var(--bg-card)]/90 hover:border-[var(--accent-cyan)]/60 transition-colors"
              >
                <span className="font-pixel text-[10px] uppercase tracking-wider text-[var(--accent-cyan)]">
                  {item.label}:
                </span>
                <span className="text-sm text-[var(--text-secondary)] font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <ImageMarquee className="border-y border-[var(--border-subtle)] bg-[var(--bg-card)]/40" />

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
        className="border-y-2 border-[var(--accent-yellow)] bg-[var(--bg-card)]/90 shadow-[0_4px_0_var(--accent-magenta)]"
      />

      {/* By the Numbers — same comic bg as rest of page (no white strip) */}
      <section className="relative py-16 md:py-24 overflow-hidden border-y-2 border-[var(--accent-yellow)]/30" aria-labelledby="stats-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll direction="up">
            <div className="inline-block mx-auto mb-10 border-4 border-[var(--accent-yellow)] bg-[var(--bg-card)] px-6 py-3 shadow-[8px_8px_0_var(--accent-magenta)]">
              <h2
                id="stats-heading"
                className="font-pixel text-lg md:text-2xl font-bold text-center text-[var(--accent-yellow)] uppercase"
              >
                BY THE NUMBERS
              </h2>
            </div>
            <div className="flex justify-center gap-2 mb-10" aria-hidden>
              <span className="w-12 h-1 rounded-full bg-[var(--accent-magenta)]" />
              <span className="w-8 h-1 rounded-full bg-[var(--accent-cyan)]" />
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <RevealOnScroll key={stat.label} direction="up" className="h-full">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  viewport={{ once: true }}
                  className="panel-comic panel-comic-cyan p-5 md:p-6 rounded-sm text-center h-full bg-[var(--ink)] text-[var(--paper)]"
                >
                  <stat.icon className="w-8 h-8 md:w-9 md:h-9 mx-auto mb-2 text-[var(--accent-yellow)]" aria-hidden />
                  <p className="font-mono text-xl md:text-2xl font-bold text-[var(--accent-yellow)] mb-0.5">
                    {stat.value}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-wider text-[var(--paper)]/80">
                    {stat.label}
                  </p>
                </motion.article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Next Dimension — highlights */}
      <section className="relative py-16 md:py-24 overflow-hidden" aria-labelledby="highlights-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll direction="up">
            <div className="text-center mb-10">
              <h2 id="highlights-heading" className="font-pixel text-lg md:text-2xl font-bold mb-3 text-[var(--text-primary)] uppercase">
                NEXT DIMENSION
              </h2>
              <div className="section-underline mx-auto mb-3" />
              <p className="text-[var(--text-secondary)] text-sm md:text-base">Build beyond limits. Compete for glory.</p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {highlights.map((item, index) => (
              <RevealOnScroll key={item.title} direction="up" className="h-full">
                <GlitchBorder className="h-full">
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    viewport={{ once: true }}
                    className="card-retro group p-5 rounded-lg h-full flex flex-col"
                  >
                    <div className="w-9 h-9 rounded-sm border-2 border-[var(--accent-yellow)] flex items-center justify-center mb-3 group-hover:border-[var(--accent-cyan)] group-hover:shadow-[0_0_12px_var(--accent-cyan-muted)] transition-all">
                      <span className="text-[var(--accent-yellow)] font-mono text-base">▸</span>
                    </div>
                    <h3 className="font-mono text-base font-semibold text-[var(--text-primary)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-grow">
                      {item.description}
                    </p>
                    <Link
                      href="/competitions"
                      className="mt-3 font-mono text-xs text-[var(--accent-cyan)] hover:underline inline-flex items-center gap-1"
                    >
                      REGISTER <span aria-hidden>→</span>
                    </Link>
                  </motion.article>
                </GlitchBorder>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Competitions strip */}
      <section className="relative py-16 md:py-24 overflow-hidden" aria-labelledby="competitions-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll direction="up">
            <div className="text-center mb-10">
              <h2 id="competitions-heading" className="font-pixel text-lg md:text-2xl font-bold mb-3 text-[var(--text-primary)] uppercase">
                COMPETITIONS
              </h2>
              <div className="section-underline mx-auto mb-3" />
              <p className="text-[var(--text-secondary)] text-sm md:text-base">Compete. Win. Glory awaits.</p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {competitions.map((comp, i) => (
              <RevealOnScroll key={comp.name} direction="up" className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <Link
                    href="/competitions"
                    className="card-retro group block p-5 rounded-sm h-full text-center transition-all duration-300"
                  >
                    <span className="text-3xl md:text-4xl mb-3 block" aria-hidden>{comp.icon}</span>
                    <h3 className="font-mono text-sm font-semibold text-[var(--text-primary)] mb-1">
                      {comp.name}
                    </h3>
                    <p className="font-mono text-base font-bold text-[var(--accent-yellow)]">
                      {comp.prize}
                    </p>
                    <div className="mt-3 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] transition-all duration-300 mx-auto rounded" />
                  </Link>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll direction="up" className="text-center mt-10">
            <Link
              href="/competitions"
              className="inline-flex items-center gap-2 px-6 py-3 font-pixel text-[10px] font-semibold bg-[var(--accent-primary)] text-[var(--ink)] border-[3px] border-[var(--accent-yellow)] rounded-sm shadow-[6px_6px_0_var(--accent-magenta)] hover:bg-[var(--accent-primary-hover)] transition-all duration-200"
            >
              REGISTER NOW
              <span className="animate-blink">_</span>
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 md:py-28 overflow-hidden" aria-labelledby="cta-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll direction="up">
            <div className="panel-comic panel-comic-magenta bg-[var(--bg-card)] p-6 sm:p-10 md:p-14 rounded-sm w-full min-w-0 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-cyan)]/0 via-[var(--accent-yellow)]/10 to-[var(--accent-magenta)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-sm" />

              <h2 id="cta-heading" className="font-pixel text-lg md:text-2xl font-bold mb-4 text-[var(--text-primary)] uppercase relative z-10">
                WHERE INNOVATION MEETS POSSIBILITY
              </h2>
              <p className="text-[var(--text-secondary)] text-base md:text-lg mb-8 max-w-xl mx-auto relative z-10">
                6+ competitions. ₹2L+ in prizes. 3000+ innovators.{' '}
                <Link href="/competitions" className="text-[var(--accent-cyan)] hover:underline">
                  Register now
                </Link>{' '}
                and step beyond the known.
              </p>
              <div className="relative z-10">
                <NeonButton href="/competitions" color="green">
                  Register Now <span className="animate-blink">_</span>
                </NeonButton>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
