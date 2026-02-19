'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { HiLightningBolt, HiUsers, HiCode } from 'react-icons/hi';
import { FaTrophy, FaGithub } from 'react-icons/fa';
import { useRef } from 'react';
import ScrollingStats from '@/components/ScrollingStats';
import MovingBorder from '@/components/MovingBorder';
import GlowingCard from '@/components/GlowingCard';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  const stats = [
    { icon: HiUsers, value: '3000+', label: 'Participants' },
    { icon: FaTrophy, value: '12+', label: 'Competitions' },
    { icon: HiLightningBolt, value: '₹5L+', label: 'Prize Pool' },
    { icon: HiCode, value: '20+', label: 'Sponsors' },
  ];

  const highlights = [
    {
      title: 'Hackathons',
      description: '24-hour and 12-hour innovation marathons with blind code challenges, AI vs Human battles, and tech meme challenges',
      gradient: 'from-[var(--dc1426)] via-[var(--black-red)] to-[var(--energy)]',
      glowColor: 'rgba(86, 15, 40, 0.3)',
    },
    {
      title: 'Competitive Programming',
      description: 'Solo and team CP contests plus code optimizer challenges — push your algorithmic thinking to the limit',
      gradient: 'from-[var(--energy)] via-[var(--dc1426)] to-[var(--midich)]',
      glowColor: 'rgba(32, 9, 52, 0.3)',
    },
    {
      title: 'Robotics Arena',
      description: 'Robo Racing, Soccer, Fighting, Maze Solver, and Drone Hurdle Racing — build machines that dominate',
      gradient: 'from-[var(--black-red)] via-[var(--dc1426)] to-[var(--energy)]',
      glowColor: 'rgba(86, 15, 40, 0.35)',
    },
    {
      title: 'Open Source',
      description: 'Contribute to real open-source projects, collaborate with the community, and ship code that matters',
      gradient: 'from-[var(--energy)] via-[var(--mydiry)] to-[var(--dc1426)]',
      glowColor: 'rgba(32, 9, 52, 0.28)',
    },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen text-white overflow-x-hidden selection:bg-[var(--horror-magenta)] selection:text-white">
      <motion.section
        style={{ y, opacity }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Glass container for hero content */}
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.div
              className="relative w-[300px] md:w-[500px] h-[150px] md:h-[200px] mx-auto mb-6 logo-glow"
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0] }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-transparent/5 blur-2xl rounded-full scale-75 animate-pulse" />
              <Image
                src="/images/logo.png"
                alt="AAYAM"
                fill
                className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                priority
              />
            </motion.div>
          </motion.div>

          <div className="backdrop-blur-sm bg-black/30 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl max-w-4xl mx-auto neon-border">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl font-[var(--font-cinzel)] font-bold mb-6 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            >
              EXPLORING NEW DIMENSIONS
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-[var(--horror-magenta)] to-transparent mb-8 mx-auto max-w-2xl"
            />

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-300 mb-10 font-light tracking-wide"
            >
              Hosted by <span className="text-[var(--horror-cyan)] font-semibold">Newton School of Technology</span>
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/competitions"
                  className="group relative px-10 py-5 bg-[var(--horror-magenta)] hover:bg-[var(--dc1426)] rounded-none clip-path-polygon font-bold text-xl overflow-hidden transition-all duration-300 block text-white tracking-wider border border-white/20"
                  style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    ENTER THE ARENA
                    <span className="animate-bounce-x">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/about"
                  className="group px-10 py-5 border border-white/30 hover:border-[var(--horror-cyan)] hover:text-[var(--horror-cyan)] hover:bg-[var(--horror-cyan)]/10 rounded-none font-bold text-xl transition-all duration-300 backdrop-blur-md bg-black/40 block text-white tracking-wider"
                  style={{ clipPath: 'polygon(0 0, 90% 0, 100% 30%, 100% 100%, 10% 100%, 0 70%)' }}
                >
                  DECRYPT DATA
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 100 }}
            className="flex justify-center gap-4 md:gap-12 flex-wrap max-w-5xl mx-auto mt-16"
          >
            {[
              { text: 'March 14-15, 2026', icon: '📅', label: 'IGNITION' },
              { text: 'Bangalore, India', icon: '📍', label: 'COORDINATES' },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-4 px-6 py-3 rounded-lg bg-black/40 backdrop-blur-md border border-white/5 hover:border-[var(--horror-magenta)]/50 transition-colors duration-300"
              >
                <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">{item.icon}</span>
                <div className="text-left">
                  <div className="text-[10px] text-[var(--horror-cyan)] uppercase tracking-widest">{item.label}</div>
                  <div className="text-base md:text-lg font-medium text-gray-200">{item.text}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Scrolling Stats with Moving Border */}
      <ScrollingStats
        stats={[
          { icon: '📅', label: 'Event Date', value: 'March 14-15, 2026' },
          { icon: '🏆', label: 'Prize Pool', value: '₹5L+' },
          { icon: '🎯', label: 'Competitions', value: '12+' },
          { icon: '👥', label: 'Participants', value: '3000+' },
          { icon: '🤝', label: 'Sponsors', value: '20+' },
          { icon: '📍', label: 'Location', value: 'Bangalore, India' },
        ]}
        direction="left"
        speed={40}
        className="border-b border-white/10 bg-black/40 backdrop-blur-md"
      />
      <section className="relative py-24 overflow-hidden">
        {/* Transparent section to show background */}

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-[var(--font-cinzel)] font-bold mb-6 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-[var(--horror-cyan)] to-white filter drop-shadow-[0_0_10px_rgba(0,217,255,0.3)]">
              BY THE NUMBERS
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="relative bg-black/50 p-8 rounded-xl border border-white/10 backdrop-blur-md overflow-hidden hover:border-[var(--horror-magenta)]/50 transition-all duration-300 neon-border group h-full flex flex-col items-center justify-center text-center">

                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--horror-magenta)]/10 to-[var(--horror-purple)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-[var(--horror-purple)] border border-[var(--horror-magenta)]/30 text-white shadow-[0_0_15px_rgba(200,0,100,0.3)]"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="w-8 h-8" />
                    </motion.div>
                    <div className="text-3xl md:text-4xl font-black text-white mb-2 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                      {stat.value}
                    </div>
                    <div className="text-[var(--horror-cyan)] text-sm font-semibold tracking-wider uppercase">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="relative py-24 overflow-hidden">

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-[var(--font-cinzel)] font-bold mb-4 text-white">
              ENTER THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--horror-magenta)] to-[var(--horror-cyan)]">NEXT DIMENSION</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Build beyond limits. Compete for glory.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group h-full"
              >
                <div className="relative h-full bg-black/60 backdrop-blur-md p-8 rounded-xl border border-white/10 overflow-hidden hover:border-[var(--horror-cyan)]/50 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_30px_rgba(0,217,255,0.15)]">

                  {/* Hover gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-6">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${highlight.gradient} flex items-center justify-center shadow-lg`}>
                        <div className="w-6 h-6 bg-transparent/20 rounded-full" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-white font-[var(--font-cinzel)] group-hover:text-[var(--horror-cyan)] transition-colors">{highlight.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{highlight.description}</p>

                    <div className="mt-auto pt-6 flex items-center text-[var(--horror-magenta)] text-sm font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                      REGISTER <span className="ml-2">→</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">

        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glow behind the card */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[var(--horror-purple)] via-[var(--horror-magenta)] to-[var(--horror-purple)] rounded-3xl blur-2xl opacity-20 animate-pulse" />

            <div className="relative bg-black/70 p-12 md:p-16 rounded-3xl border border-white/10 backdrop-blur-xl neon-border">
              <h2
                className="text-4xl md:text-6xl font-[var(--font-cinzel)] font-bold mb-8 text-white filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              >
                wHERE INNOVATION Meets POSSIBILITY
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                12+ competitions. ₹5L+ in prizes. 3000+ innovators.<br />
                <span className="text-[var(--horror-cyan)] font-semibold">Register now</span> and enter the next dimension.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/competitions"
                  className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-[var(--energy)] via-[var(--dc1426)] to-[var(--black-red)] rounded-full font-bold text-2xl shadow-2xl shadow-[0_20px_60px_rgba(220,20,38,0.35)] hover:shadow-[0_24px_70px_rgba(220,20,38,0.45)] transition-all duration-300"
                >
                  Register Now
                  <span className="animate-bounce-x">→</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
