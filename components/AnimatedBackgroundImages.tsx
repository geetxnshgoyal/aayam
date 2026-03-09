'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Tech-themed floating images for background
const floatingImages = [
  { src: '/images/tech-1.png', alt: 'Tech Element 1', size: 120, delay: 0 },
  { src: '/images/tech-2.png', alt: 'Tech Element 2', size: 80, delay: 1 },
  { src: '/images/tech-3.png', alt: 'Tech Element 3', size: 100, delay: 2 },
  { src: '/images/tech-4.png', alt: 'Tech Element 4', size: 90, delay: 0.5 },
  { src: '/images/tech-5.png', alt: 'Tech Element 5', size: 110, delay: 1.5 },
];

export default function AnimatedBackgroundImages() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-deep)] via-transparent to-[var(--bg-deep)] z-10" />
      
      {/* Floating Tech Images */}
      {floatingImages.map((img, index) => (
        <motion.div
          key={index}
          className="absolute opacity-20 hover:opacity-30 transition-opacity duration-500"
          style={{
            left: `${10 + index * 18}%`,
            top: `${15 + (index % 3) * 25}%`,
            width: img.size,
            height: img.size,
          }}
          initial={{ 
            y: 0, 
            x: 0, 
            rotate: 0,
            scale: 1 
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, 0, -15, 0],
            rotate: [0, 5, -5, 3, 0],
            scale: [1, 1.1, 1, 1.05, 1],
          }}
          transition={{
            duration: 20 + index * 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: img.delay,
          }}
        >
          <div className="relative w-full h-full">
            {/* Fallback gradient if image doesn't exist */}
            <div 
              className="w-full h-full rounded-full blur-2xl"
              style={{
                background: `radial-gradient(circle, var(--accent-cyan-muted) 0%, transparent 70%)`,
              }}
            />
            {/* Uncomment below when you have actual images */}
            {/* <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-contain mix-blend-screen"
              style={{ filter: 'hue-rotate(180deg) brightness(1.2)' }}
            /> */}
          </div>
        </motion.div>
      ))}

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 z-0">
        {/* Horizontal Lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--border-accent)] to-transparent opacity-20"
            style={{ top: `${12.5 * (i + 1)}%` }}
            initial={{ opacity: 0.1, scaleX: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scaleX: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Vertical Lines */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-[var(--border-accent)] to-transparent opacity-20"
            style={{ left: `${16.6 * (i + 1)}%` }}
            initial={{ opacity: 0.1, scaleY: 0 }}
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
              scaleY: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 5 + i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-[var(--accent-cyan)] opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Animated Circles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute rounded-full border border-[var(--accent-cyan)]/20"
          style={{
            width: `${100 + i * 80}px`,
            height: `${100 + i * 80}px`,
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 30 + i * 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Diagonal Scan Lines */}
      <div 
        className="absolute inset-0 opacity-10 z-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            var(--accent-cyan) 2px,
            var(--accent-cyan) 4px
          )`,
          backgroundSize: '20px 20px',
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0 0', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Corner Decorations */}
      <motion.div
        className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-[var(--accent-cyan)]/30 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.div
        className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-[var(--accent-cyan)]/30 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      />
      <motion.div
        className="absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-[var(--accent-cyan)]/30 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-[var(--accent-cyan)]/30 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
      />

      {/* Pulsing Glow Spots */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${200 + i * 50}px`,
            height: `${200 + i * 50}px`,
            left: `${15 + i * 25}%`,
            top: `${20 + (i % 2) * 40}%`,
            background: i % 2 === 0 
              ? 'radial-gradient(circle, var(--accent-cyan-muted) 0%, transparent 70%)'
              : 'radial-gradient(circle, var(--accent-magenta-muted) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
