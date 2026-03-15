'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Custom Cursor Component
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });
  const trailX = useSpring(0, { stiffness: 200, damping: 20 });
  const trailY = useSpring(0, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX - 10);
      trailY.set(e.clientY - 10);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY, trailX, trailY]);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-[var(--accent-yellow)] pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        ref={trailRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[var(--accent-yellow)]/50 pointer-events-none z-[9998]"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}

// Scroll Progress Bar
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0,
  });

  return (
    <motion.div
      className="fixed top-[env(safe-area-inset-top)] left-0 right-0 h-1 bg-[var(--accent-primary)] origin-left z-[9997]"
      style={{ scaleX }}
    />
  );
}

// Floating Tech Orbs
export function FloatingTechOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[var(--accent-cyan)]/5 blur-3xl"
          style={{
            width: `${200 + i * 50}px`,
            height: `${200 + i * 50}px`,
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

// Glitch Border Effect
export function GlitchBorder({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-cyan)] via-[var(--accent-magenta)] to-[var(--accent-cyan)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
      <div className="relative bg-[var(--bg-card)] border border-[var(--border-subtle)] group-hover:border-[var(--accent-cyan)]/50 transition-colors duration-300">
        {children}
      </div>
    </div>
  );
}

// Typing Effect Component
export function TypingEffect({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * 0.03 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Neon Glow Button
export function NeonButton({ 
  children, 
  href, 
  color = 'cyan',
  className = '' 
}: { 
  children: React.ReactNode; 
  href?: string; 
  color?: 'cyan' | 'magenta' | 'green' | 'amber';
  className?: string;
}) {
  const colorMap = {
    cyan: { bg: 'var(--accent-cyan)', glow: 'var(--accent-cyan-muted)' },
    magenta: { bg: 'var(--accent-magenta)', glow: 'var(--accent-magenta-muted)' },
    green: { bg: 'var(--accent-primary)', glow: 'var(--glow-primary)' },
    amber: { bg: 'var(--accent-yellow)', glow: 'var(--accent-neon-muted)' },
  };

  const colors = colorMap[color];

  const content = (
    <motion.span
      className={`relative inline-flex items-center justify-center px-6 py-3 font-pixel text-xs font-semibold overflow-hidden group rounded-md border-2 ${className}`}
      style={{ background: colors.bg, borderColor: colors.bg, color: color === 'amber' ? 'var(--ink)' : 'var(--text-primary)' }}
      whileHover={{ scale: 1.03, boxShadow: `0 0 24px ${colors.glow}` }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      <span className="relative z-10">
        {children}
      </span>
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return <button type="button">{content}</button>;
}

// Parallax Layer
export function ParallaxLayer({ 
  children, 
  speed = 0.5, 
  className = '' 
}: { 
  children: React.ReactNode; 
  speed?: number; 
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'], { clamp: false });
  const scaledY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} className={className} style={{ y: scaledY }}>
      {children}
    </motion.div>
  );
}

// Reveal on Scroll
export function RevealOnScroll({ 
  children, 
  className = '',
  direction = 'up'
}: { 
  children: React.ReactNode; 
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0.5, 1]);
  
  const y = useTransform(scrollYProgress, [0, 1], 
    direction === 'up' ? [100, 0] :
    direction === 'down' ? [-100, 0] :
    [0, 0]
  );
  
  const x = useTransform(scrollYProgress, [0, 1],
    direction === 'left' ? [100, 0] :
    direction === 'right' ? [-100, 0] :
    [0, 0]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, y, x }}
    >
      {children}
    </motion.div>
  );
}

// Tech Grid Background
export function TechGridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(var(--border-subtle) 1px, transparent 1px),
            linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }}
      />
    </div>
  );
}
