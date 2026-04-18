'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'start' | 'loading' | 'complete'>('start');
  const [progress, setProgress] = useState(0);
  const [stars, setStars] = useState<any[]>([]);

  // Move star generation to useEffect to keep render pure
  useEffect(() => {
    const generatedStars = [...Array(50)].map((_, i) => ({
      id: i,
      x: Math.random() * 100 + '%',
      y: Math.random() * 100 + '%',
      targetX: (Math.random() - 0.5) * 200 + '%',
      targetY: (Math.random() - 0.5) * 200 + '%',
      duration: Math.random() * 2 + 1,
    }));
    setStars(generatedStars);
  }, []);

  useEffect(() => {
    if (phase === 'loading') {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => setPhase('complete'), 500);
            return 100;
          }
          const jump = Math.random() * 8;
          return Math.min(100, p + jump);
        });
      }, 120);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'complete') {
      const timer = setTimeout(onComplete, 800);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === 'start' && (
          <motion.div
            key="start-btn"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            className="relative"
          >
            <div 
              className="px-16 py-10 border-2 border-[var(--accent-green)] rounded-sm group cursor-pointer transition-all duration-300 hover:bg-[var(--accent-green)]/10 box-neon-green relative overflow-hidden" 
              onClick={() => setPhase('loading')}
            >
                <div className="absolute inset-x-0 top-0 h-[1px] bg-[var(--accent-green)]/50 animate-scanline" />
                <h1 className="text-2xl md:text-4xl font-mono font-bold text-[var(--accent-green)] group-hover:text-white transition-colors tracking-[0.2em] uppercase">
                    Enter Another Aayam
                </h1>
                <div className="mt-6 flex justify-between items-center font-mono text-[10px] text-[var(--accent-green)] opacity-60">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[var(--accent-green)] animate-pulse rounded-full" />
                        SYSTEM: ONLINE
                    </span>
                    <span>GRAVITY: 0.0G</span>
                </div>
            </div>
            
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_100%),linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] pointer-events-none opacity-40 mix-blend-screen" />
          </motion.div>
        )}

        {phase === 'loading' && (
          <motion.div
            key="loading-seq"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-lg px-10 text-center relative z-10"
          >
            <div className="mb-10 overflow-hidden h-1.5 bg-zinc-900 border border-white/5 rounded-full">
              <motion.div 
                className="h-full bg-[var(--accent-orange)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                style={{ boxShadow: '0 0 20px var(--accent-orange)' }}
              />
            </div>
            <div className="flex justify-between items-end mb-4">
                <div className="text-left">
                    <h2 className="text-xs font-mono text-[var(--accent-orange)] uppercase tracking-[0.3em] font-bold animate-pulse">
                        Initializing Sequence
                    </h2>
                    <p className="text-[10px] font-mono text-zinc-500 mt-1">ESTABLISHING DIMENSIONAL LINK...</p>
                </div>
                <span className="text-3xl font-mono text-[var(--accent-orange)] font-bold">
                    {Math.floor(progress)}%
                </span>
            </div>
            
            <div className="mt-16 grid grid-cols-2 gap-8 text-left font-mono text-[10px] text-zinc-600 uppercase border-t border-white/5 pt-8">
                <div className="space-y-2">
                    <p className={progress > 20 ? 'text-[var(--accent-green)]' : 'opacity-40'}>
                        {progress > 20 ? '✓' : '○'} Booting Core Engine
                    </p>
                    <p className={progress > 45 ? 'text-[var(--accent-green)]' : 'opacity-40'}>
                        {progress > 45 ? '✓' : '○'} Gravity Calibration
                    </p>
                </div>
                <div className="space-y-2">
                    <p className={progress > 70 ? 'text-[var(--accent-green)]' : 'opacity-40'}>
                        {progress > 70 ? '✓' : '○'} Event Horizon Mapping
                    </p>
                    <p className={progress > 90 ? 'text-[var(--accent-green)]' : 'opacity-40'}>
                        {progress > 90 ? '✓' : '○'} Temporal Shift Ready
                    </p>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Background Starfield during loading */}
      {phase === 'loading' && (
        <div className="absolute inset-0 z-0 overflow-hidden">
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    initial={{ 
                        x: star.x, 
                        y: star.y,
                        scale: 0 
                    }}
                    animate={{ 
                        scale: [0, 1.5, 0],
                        x: star.targetX,
                        y: star.targetY
                    }}
                    transition={{ 
                        repeat: Infinity, 
                        duration: star.duration,
                        ease: "easeIn"
                    }}
                />
            ))}
        </div>
      )}
    </div>
  );
}
