'use client';

import { motion } from 'framer-motion';

const marqueeItems = [
  '🚀 REGISTER NOW',
  '💰 ₹2L+ PRIZE POOL',
  '🏆 6+ COMPETITIONS',
  '👥 3000+ PARTICIPANTS',
  '🌟 APRIL 24-25, 2026',
  '📍 NEWTON SCHOOL OF TECHNOLOGY',
  '🤖 ROBOTICS ARENA',
  '💻 24-HOUR HACKATHON',
];

export default function InfiniteMarquee() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[var(--energy)] via-[var(--dc1426)] to-[var(--black-red)] py-3">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <div
            key={index}
            className="text-lg font-black text-[#12080d] tracking-wider"
            style={{ textShadow: '1px 1px 0px rgba(255,255,255,0.2)' }}
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
