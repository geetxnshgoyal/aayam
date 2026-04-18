'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function BlackHoleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: any[] = [];
    const particleCount = 1500;
    const centerX = () => w / 2;
    const centerY = () => h / 2;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 300 + 100;
      particles.push({
        angle,
        dist,
        size: Math.random() * 1.5 + 0.5,
        speed: (Math.random() * 0.02 + 0.005) * (150 / dist),
        color: Math.random() > 0.5 ? '#FF7A00' : '#FFB000',
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    let frame = 0;
    const animate = () => {
      frame++;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, w, h);

      const cx = centerX();
      const cy = centerY();

      // Core (Event Horizon)
      const coreRadius = Math.min(w, h) * 0.15;
      
      // Accretion Disk Glow
      const glow = ctx.createRadialGradient(cx, cy, coreRadius, cx, cy, coreRadius * 4);
      glow.addColorStop(0, 'rgba(255, 122, 0, 0.4)');
      glow.addColorStop(0.2, 'rgba(255, 122, 0, 0.1)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius * 4, 0, Math.PI * 2);
      ctx.fill();

      // Particles
      particles.forEach(p => {
        p.angle += p.speed;
        const x = cx + Math.cos(p.angle) * p.dist;
        const y = cy + Math.sin(p.angle) * p.dist * 0.3 + Math.sin(frame * 0.02 + p.dist) * 10;
        
        // Gravitational lensing effect (bending paths near core)
        const distFromCenter = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
        const scale = Math.max(0.1, Math.min(1.5, distFromCenter / coreRadius));

        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(x, y, p.size * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // Event Horizon
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      // Inner Lens Glow
      const innerGlow = ctx.createRadialGradient(cx, cy, coreRadius * 0.8, cx, cy, coreRadius);
      innerGlow.addColorStop(0, 'transparent');
      innerGlow.addColorStop(1, 'rgba(255, 122, 0, 0.8)');
      ctx.strokeStyle = innerGlow;
      ctx.lineWidth = 4;
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <motion.h1 
            className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-4 uppercase"
            style={{ textShadow: '0 0 20px rgba(255,122,0,0.5)' }}
          >
            AAYAM
          </motion.h1>
          <motion.p 
            className="text-lg md:text-2xl text-[var(--accent-orange)] font-medium tracking-[0.5em] uppercase"
          >
            Beyond the Event Horizon
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12"
          >
            <button className="px-10 py-4 bg-transparent border-2 border-[var(--accent-orange)] text-[var(--accent-orange)] font-bold rounded-full hover:bg-[var(--accent-orange)] hover:text-black transition-all duration-300 uppercase tracking-widest text-sm glow-orange">
              Enter The Void
            </button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Scroll to explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--accent-orange)] to-transparent" />
      </motion.div>
    </section>
  );
}
