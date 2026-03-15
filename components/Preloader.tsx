'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Fallback: force hide after 3 seconds
    const fallback = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(fallback);
    };
  }, []);

  // Hide preloader completely after animation
  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[10000] bg-[var(--bg-deep)] flex items-center justify-center"
      >
        <div className="relative w-full max-w-md mx-auto px-8">
          {/* Logo/Title */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="font-pixel text-2xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">
              AAYAM <span className="text-[var(--accent-yellow)]">2026</span>
            </h1>
            <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest">
              Loading Experience
            </p>
          </motion.div>

          {/* Progress Bar Container */}
          <div className="relative h-2 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-sm overflow-hidden">
            {/* Animated Grid Pattern on Progress */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(90deg, 
                    transparent 0%, 
                    var(--accent-yellow) 50%, 
                    transparent 100%)
                `,
                backgroundSize: '20px 100%',
              }}
              animate={{ x: ['-20px', '20px'] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Progress Fill */}
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-yellow)] to-[var(--accent-magenta)]"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Progress Percentage */}
          <motion.div
            className="flex justify-between items-center mt-3 font-mono text-xs"
          >
            <span className="text-[var(--text-muted)]">INITIALIZING</span>
            <motion.span 
              className="text-[var(--accent-yellow)]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.span>
          </motion.div>

          {/* Loading Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-[var(--accent-yellow)]"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* COMICO-style corner brackets */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[var(--accent-yellow)] opacity-60" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[var(--accent-yellow)] opacity-60" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[var(--accent-yellow)] opacity-60" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[var(--accent-yellow)] opacity-60" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
