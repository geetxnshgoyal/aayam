'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { HiLightningBolt, HiUsers, HiCode } from 'react-icons/hi';
import { FaTrophy } from 'react-icons/fa';
import { useRef } from 'react';

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
    <div ref={containerRef} className="relative bg-[#0A0B16] text-white overflow-x-hidden">
      <motion.section
        style={{ y, opacity }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Rich background with cyberpunk animated gradients */}
        <div className="absolute inset-0 bg-[#0A0B16]">
          {/* Cyberpunk city background simulation with animated gradients */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(135deg, #0A0B16 0%, #200934 20%, #0A0B16 40%, #560F28 60%, #0A0B16 80%, #350609 100%)',
                backgroundSize: '400% 400%',
                animation: 'gradient-shift 20s ease infinite',
              }}
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-[#0A0B16]/60" />
          </div>
          
          {/* Neon overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#560F28]/10 via-transparent to-[#200934]/10" />
          
          {/* Grain texture for cyberpunk feel */}
          <div className="absolute inset-0 opacity-[0.015]" style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="3.5" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E")',
          }} />
          
          {/* Focused neon glow spots */}
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#560F28] rounded-full blur-[120px] opacity-25" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#200934] rounded-full blur-[120px] opacity-30" />
        </div>

        {/* Floating neon orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[500px] h-[500px] bg-[#560F28] rounded-full blur-[100px] opacity-15 animate-slow-drift" style={{ left: '10%', top: '20%' }} />
          <div className="absolute w-[600px] h-[600px] bg-[#200934] rounded-full blur-[120px] opacity-20 animate-slow-drift" style={{ left: '70%', top: '40%', animationDelay: '-10s' }} />
          <div className="absolute w-[400px] h-[400px] bg-[#350609] rounded-full blur-[90px] opacity-12 animate-slow-drift" style={{ left: '40%', top: '70%', animationDelay: '-15s' }} />
        </div>

        {/* Twinkling stars */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-[#560F28] rounded-full animate-twinkle opacity-80"
              style={{
                left: `${5 + (i * 4.7) % 90}%`,
                top: `${3 + (i * 7.3) % 94}%`,
                animationDelay: `${(i * 0.7) % 5}s`,
                animationDuration: `${2 + (i % 3)}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-12"
          >
            <motion.div
              className="relative w-80 h-40 mx-auto mb-8 logo-glow"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/images/logo.png"
                alt="AAYAM"
                fill
                className="object-contain"
                style={{ mixBlendMode: 'multiply' }}
                priority
              />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-2xl md:text-3xl text-gray-300 mb-4 max-w-4xl mx-auto leading-relaxed"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent font-light">
              Exploring New Dimensions of Technology
            </span>
          </motion.p>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
          >
            Hosted by Newton School of Technology
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/competitions"
                className="group relative px-10 py-5 bg-gradient-to-r from-[var(--energy)] via-[var(--dc1426)] to-[var(--black-red)] rounded-full font-bold text-xl overflow-hidden shadow-2xl shadow-[0_20px_60px_rgba(220,20,38,0.35)] hover:shadow-[0_25px_70px_rgba(220,20,38,0.45)] transition-shadow duration-300 block"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore Competitions
                  <span className="animate-bounce-x">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#200934] via-[#560F28] to-[#350609] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/about"
                className="group px-10 py-5 border border-white/20 rounded-full font-bold text-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm bg-white/5 block text-white"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            className="flex justify-center gap-6 flex-wrap max-w-5xl mx-auto"
          >
            {[
              { text: 'March 14-15, 2026', icon: '📅' },
              { text: 'Newton School of Technology', icon: '🎓' },
              { text: 'Bangalore, India', icon: '📍' },
            ].map((item) => (
              <motion.div
                key={item.text}
                className="px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-[#560F28]/40"
                whileHover={{ scale: 1.05, borderColor: 'rgba(86,15,40,0.8)' }}
              >
                <span className="text-white font-semibold">
                  {item.icon} {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="relative py-32 bg-[#0A0B16] overflow-hidden">
        {/* Cyberpunk background layer */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-35"
            style={{
              background: 'linear-gradient(225deg, #200934 0%, #560F28 15%, #0A0B16 30%, #350609 50%, #0A0B16 70%, #200934 85%, #560F28 100%)',
              backgroundSize: '400% 400%',
              animation: 'gradient-shift 30s ease infinite',
            }}
          />
          <div className="absolute inset-0 bg-[#0A0B16]/50" />
        </div>
        
        {/* Neon accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#560F28] rounded-full blur-[150px] opacity-15" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMjAsMjAsMzgsMC4xMikiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUlIiBoZWlnaHQ9IjEwMCUlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10" />

        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[var(--energy)] via-[var(--dc1426)] to-[var(--black-red)] bg-clip-text text-transparent">
                By The Numbers
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                <div className="relative bg-[#180C16] p-8 rounded-3xl border border-[#560F28]/30 backdrop-blur-xl overflow-hidden hover:border-[#560F28]/60 transition-all duration-300 shadow-lg shadow-[#560F28]/10 neon-border group scanline-effect">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#560F28]/50 rounded-tl-3xl" />
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#560F28]/50 rounded-tr-3xl" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#560F28]/50 rounded-bl-3xl" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#560F28]/50 rounded-br-3xl" />
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-[#560F28]/15 to-[#200934]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-[var(--energy)] to-[var(--dc1426)] rounded-2xl shadow-lg shadow-[0_12px_30px_rgba(86,15,40,0.4)]"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="text-5xl font-black bg-gradient-to-r from-[var(--energy)] to-[var(--dc1426)] bg-clip-text text-transparent mb-3">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 font-medium">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="relative py-32 bg-[#0A0B16] overflow-hidden">
        {/* Animated cyberpunk background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              background: 'linear-gradient(45deg, #350609 0%, #560F28 20%, #0A0B16 35%, #200934 50%, #0A0B16 65%, #560F28 80%, #350609 100%)',
              backgroundSize: '400% 400%',
              animation: 'gradient-shift 35s ease infinite',
            }}
          />
          <div className="absolute inset-0 bg-[#0A0B16]/50" />
        </div>
        
        {/* Neon glow accents */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#560F28] rounded-full blur-[140px] opacity-15" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#200934] rounded-full blur-[130px] opacity-18" />
        <div className="absolute inset-0">
          <div className="absolute w-[400px] h-[400px] bg-[#560F28] rounded-full blur-[100px] opacity-12 animate-slow-drift" style={{ left: '15%', top: '30%' }} />
          <div className="absolute w-[350px] h-[350px] bg-[#200934] rounded-full blur-[90px] opacity-10 animate-slow-drift" style={{ left: '65%', top: '40%', animationDelay: '-10s' }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Enter the{' '}
              <span className="bg-gradient-to-r from-[var(--energy)] via-[var(--dc1426)] to-[var(--black-red)] bg-clip-text text-transparent">
                Next Dimension
              </span>
            </h2>
            <p className="text-2xl text-gray-400">Build beyond limits. Compete for glory.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -8 }}
                className="group relative"
              >
                <div className="relative h-full bg-[#180C16] p-8 rounded-3xl overflow-hidden border border-[#560F28]/20 hover:border-[#560F28]/50 transition-all duration-300 shadow-lg shadow-[#560F28]/10 neon-border group scanline-effect">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#560F28]/40 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#560F28]/40 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />

                  <div className="relative z-10">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${highlight.gradient} mb-6 shadow-2xl`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    />
                    <h3 className="text-3xl font-bold mb-4 text-white">{highlight.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{highlight.description}</p>
                  </div>

                  <div
                    className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle, ${highlight.glowColor} 0%, transparent 70%)`,
                      filter: 'blur(30px)',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-[#0A0B16] overflow-hidden">
        {/* Cyberpunk street vibe background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-45"
            style={{
              background: 'linear-gradient(180deg, #560F28 0%, #350609 15%, #0A0B16 30%, #200934 50%, #0A0B16 70%, #560F28 85%, #200934 100%)',
              backgroundSize: '100% 400%',
              animation: 'gradient-shift 40s ease infinite',
            }}
          />
          <div className="absolute inset-0 bg-[#0A0B16]/40" />
        </div>
        
        {/* Central neon glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#560F28] rounded-full blur-[150px] opacity-20" />
        <div className="absolute inset-0 opacity-20">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-slow-drift animate-glow-pulse"
              style={{
                left: `${20 + i * 25}%`,
                top: '50%',
                width: `${300 + i * 50}px`,
                height: `${300 + i * 50}px`,
                background: `radial-gradient(circle, rgba(220,20,38,${0.08 + i * 0.03}) 0%, transparent 70%)`,
                filter: 'blur(60px)',
                animationDelay: `${i * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-[var(--energy)] via-[var(--dc1426)] to-[var(--black-red)] rounded-3xl blur-2xl opacity-10 animate-glow-pulse" />

            <div className="relative bg-[#180C16] p-16 rounded-3xl border border-[#560F28]/30 backdrop-blur-xl shadow-2xl shadow-[#560F28]/20 neon-border scanline-effect">
              <h2
                className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-[var(--energy)] via-[var(--dc1426)] to-[var(--black-red)] bg-clip-text text-transparent animate-gradient-shift"
                style={{ backgroundSize: '200% auto' }}
              >
                Where Innovation Meets Possibility
              </h2>
              <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                12+ competitions. ₹5L+ in prizes. 3000+ innovators. Register now and enter the next dimension at Newton School of Technology.
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
