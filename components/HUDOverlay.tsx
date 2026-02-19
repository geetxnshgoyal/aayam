'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

export default function HUDOverlay() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [phase, setPhase] = useState<'intro' | 'loop'>(isHome ? 'intro' : 'loop');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isHome) {
      setPhase('loop');
      return;
    }
    // Transition after intro duration approx 6-8 seconds
    const timer = setTimeout(() => {
      setPhase('loop');
    }, 8000);
    return () => clearTimeout(timer);
  }, [isHome]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
      {/* 1. Viewport Vignette (Blue/Cyan Glow) */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,100,255,0.3)] animate-pulse" />

      {/* 2. Main content Frame (Magenta Border) */}

      {/* 2. Main content Frame (Magenta Border) - Top Only */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-x-12 inset-y-12 border-t border-magenta-500/20 bg-gradient-to-b from-magenta-500/5 via-transparent to-transparent rounded-t-[40px]"
      >
        {/* Magenta Corners/Markers - Top Only */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-magenta-500/40 rounded-tl-3xl shadow-[0_0_15px_rgba(255,0,255,0.2)]" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-magenta-500/40 rounded-tr-3xl shadow-[0_0_15px_rgba(255,0,255,0.2)]" />
      </motion.div>

      {/* 3. Circular HUD Rings (Pulsing around center) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
        {/* Large Green Arc Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-green-500/10 rounded-full border-t-transparent border-r-transparent"
        />
        {/* Red Segment Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-10 border border-red-500/10 rounded-full border-b-transparent border-l-transparent"
        />
        {/* Pulsing Crosshair Rings */}
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-20 border border-white/5 rounded-full flex items-center justify-center"
        >
          <div className="w-full h-[1px] bg-white/5" />
          <div className="h-full w-[1px] bg-white/5 absolute" />
        </motion.div>
      </div>

      {/* 4. Targeting Marker (Red Dot) */}
      <motion.div
        animate={phase === 'intro'
          ? { x: ["20vw", "60vw", "70vw"], y: "60vh" }
          : { x: "25vw", y: "65vh" }
        }
        transition={{ duration: 3, ease: "easeInOut" }}
        className="absolute top-0 left-0"
      >
        <div className="relative">
          <div className="w-3 h-3 bg-red-600 rounded-full shadow-[0_0_15px_rgba(255,0,0,0.8)]" />
          <motion.div
            animate={{ scale: [1, 2], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-2 border border-red-500 rounded-full"
          />
        </div>
      </motion.div>

      {/* 5. HUD Data Labels */}
      <div className="absolute top-20 left-20 font-mono text-[10px] text-cyan-500/40 space-y-2 uppercase tracking-widest hidden md:block">
        <div>STATUS: {phase === 'intro' ? 'INITIALIZING_CORE' : 'SYNDICATE_LINK_STABLE'}</div>
        <div>CLEARANCE: LEVEL_4</div>
        <div>UPLINK: ACTIVE</div>
      </div>

      <div className="absolute bottom-20 right-20 font-mono text-[10px] text-magenta-500/40 text-right space-y-2 uppercase tracking-widest hidden md:block">
        <div>NODE_COORD: 14.2568.10</div>
        <div>SIMULATION: RUNNING</div>
        <div>ENCRYPTION: AES_256_STABLE</div>
      </div>
    </div>
  );
}
