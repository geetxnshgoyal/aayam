'use client';

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

// Tech images for the scroll experience
const scrollImages = [
  {
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    alt: 'AI & Technology',
    title: 'ARTIFICIAL INTELLIGENCE',
    description: 'Explore the future of AI and machine learning',
    color: '#00ffff',
  },
  {
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    alt: 'Blockchain',
    title: 'BLOCKCHAIN',
    description: 'Decentralize the future with Web3 technologies',
    color: '#ffb800',
  },
  {
    src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
    alt: 'Cybersecurity',
    title: 'CYBERSECURITY',
    description: 'Protect the digital frontier',
    color: '#ff00ff',
  },
  {
    src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop',
    alt: 'Virtual Reality',
    title: 'VIRTUAL REALITY',
    description: 'Step into immersive digital worlds',
    color: '#00ff88',
  },
  {
    src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
    alt: 'IoT',
    title: 'INTERNET OF THINGS',
    description: 'Connect everything, everywhere',
    color: '#ff6b6b',
  },
  {
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
    alt: 'Robotics',
    title: 'ROBOTICS',
    description: 'Build the machines of tomorrow',
    color: '#a855f7',
  },
];

const competitions = [
  { name: 'Hackathon', prize: '₹50,000', icon: '💻' },
  { name: 'Robotics', prize: '₹40,000', icon: '🤖' },
  { name: 'CP Challenge', prize: '₹30,000', icon: '⚡' },
  { name: 'AI Battle', prize: '₹35,000', icon: '🧠' },
  { name: 'Web3 Hack', prize: '₹25,000', icon: '🔗' },
];

export default function ImmersiveScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeSection, setActiveSection] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="relative">
      {/* Progress Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col gap-3">
          {scrollImages.map((_, i) => (
            <motion.button
              key={i}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === i ? 'scale-125' : ''
              }`}
              style={{
                borderColor: scrollImages[i].color,
                backgroundColor: activeSection === i ? scrollImages[i].color : 'transparent',
              }}
              onClick={() => {
                const sectionHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
                window.scrollTo({ top: i * sectionHeight, behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.3 }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            background: 'radial-gradient(ellipse at center, #1a3150 0%, #0f1f33 100%)',
          }}
        />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(var(--border-accent) 1px, transparent 1px),
                linear-gradient(90deg, var(--border-accent) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Floating Elements */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[var(--accent-cyan)] opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-pixel text-3xl md:text-6xl font-bold mb-6 text-[var(--text-primary)]">
              <span className="gradient-text">TECH ZONE</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[var(--text-secondary)] text-lg md:text-xl mb-8"
          >
            Scroll to explore the future of technology
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/competitions"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-pixel text-xs bg-[var(--accent-primary)] text-[var(--text-primary)] border-[3px] border-[var(--accent-primary-border)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[0_4px_16px_var(--glow-primary)] transition-all duration-200"
            >
              ENTER COMPETITIONS
            </Link>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--text-muted)] text-sm"
            >
              ↓ Scroll to Explore ↓
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Image Scroll Sections */}
      {scrollImages.map((section, index) => (
        <ImageScrollSection
          key={index}
          section={section}
          index={index}
          scrollProgress={smoothProgress}
          onActivate={() => setActiveSection(index)}
        />
      ))}

      {/* Competitions Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-deep)] via-[var(--bg-card)] to-[var(--bg-deep)] z-0" />
        
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-pixel text-2xl md:text-4xl font-bold mb-4 text-[var(--text-primary)] uppercase">
              <span className="gradient-text">COMPETITIONS</span>
            </h2>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent" />
            <p className="text-[var(--text-secondary)] mt-4 text-lg">
              Compete. Win. Glory Awaits.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {competitions.map((comp, i) => (
              <CompetitionCard key={comp.name} comp={comp} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              href="/competitions"
              className="inline-flex items-center gap-2 px-8 py-4 font-pixel text-xs font-semibold bg-[var(--accent-primary)] text-[var(--text-primary)] border-[3px] border-[var(--accent-primary-border)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[0_4px_16px_var(--glow-primary)] transition-all duration-200"
            >
              REGISTER NOW
              <span className="animate-blink">_</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] via-[var(--bg-card)] to-[var(--bg-deep)] z-0" />
        
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-32 bg-gradient-to-b from-transparent via-[var(--accent-cyan)]/20 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-200, 800],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <h2 className="font-pixel text-2xl md:text-5xl font-bold mb-6 text-[var(--text-primary)]">
            <span className="gradient-text">READY TO STEP BEYOND?</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-8 max-w-2xl mx-auto">
            Join 3000+ innovators. Compete for ₹2L+ in prizes. 
            Experience the future of technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/competitions"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-pixel text-xs bg-[var(--accent-primary)] text-[var(--text-primary)] border-[3px] border-[var(--accent-primary-border)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[0_4px_16px_var(--glow-primary)] transition-all duration-200"
            >
              REGISTER NOW
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-pixel text-xs border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan-muted)] transition-all duration-200"
            >
              LEARN MORE
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

// Image Scroll Section Component
function ImageScrollSection({ 
  section, 
  index, 
  scrollProgress,
  onActivate 
}: { 
  section: typeof scrollImages[0]; 
  index: number;
  scrollProgress: any;
  onActivate: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      if (value > 0.3 && value < 0.7) {
        onActivate();
      }
    });
    return unsubscribe;
  }, [scrollYProgress, onActivate]);

  const particleConfigs = useMemo(() =>
    [...Array(15)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      xOffset: Math.random() * 100 - 50,
      duration: 6 + Math.random() * 4,
      delay: Math.random() * 2,
    })),
  []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <Image
          src={section.src}
          alt={section.alt}
          fill
          className="object-cover opacity-30"
          sizes="100vw"
          priority={index < 2}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${section.color}15 0%, var(--bg-deep) 100%)`,
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        style={{ opacity }}
      >
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 
            className="font-pixel text-3xl md:text-6xl font-bold mb-4"
            style={{ 
              color: section.color,
              textShadow: `0 0 40px ${section.color}80`,
            }}
          >
            {section.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-[var(--text-secondary)] text-lg md:text-xl mb-8">
            {section.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4"
        >
          <div 
            className="w-24 h-1 rounded-full"
            style={{ background: section.color }}
          />
        </motion.div>
      </motion.div>

      {/* Floating Particles */}
      {particleConfigs.map((cfg, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full opacity-40"
          style={{
            left: `${cfg.left}%`,
            top: `${cfg.top}%`,
            backgroundColor: section.color,
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, cfg.xOffset, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: cfg.duration,
            repeat: Infinity,
            delay: cfg.delay,
          }}
        />
      ))}
    </section>
  );
}

// Competition Card Component
function CompetitionCard({ comp, index }: { comp: typeof competitions[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.5, 1]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{ y, opacity }}
      className="card-retro group p-6 rounded-sm text-center hover:border-[var(--accent-cyan)]/50 transition-all duration-300 cursor-pointer"
      whileHover={{ 
        y: -10, 
        boxShadow: '0 20px 40px rgba(107, 163, 212, 0.2)',
      }}
    >
      <motion.div
        className="text-5xl mb-4"
        whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        {comp.icon}
      </motion.div>
      <h3 className="font-mono text-lg font-semibold text-[var(--text-primary)] mb-2">
        {comp.name}
      </h3>
      <p 
        className="font-mono text-xl font-bold text-[var(--accent-cyan)]"
        style={{ textShadow: '0 0 10px var(--accent-cyan-muted)' }}
      >
        {comp.prize}
      </p>
      <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] transition-all duration-300 mx-auto" />
    </motion.div>
  );
}
