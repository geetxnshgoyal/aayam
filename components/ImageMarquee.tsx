'use client';

import Image from 'next/image';

const IMAGES = [
  '/images/backgrounds/tech-circuit.jpg',
  '/images/backgrounds/tech-matrix.jpg',
  '/images/backgrounds/tech-glows.jpg',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=70',
  'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&q=70',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=70',
];

/**
 * Horizontal scrolling image strip - movable multi-image design.
 * Respects prefers-reduced-motion.
 */
export default function ImageMarquee({ className = '' }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden py-4 motion-reduce:[&_*]:animate-none ${className}`}
      aria-hidden
    >
      <div className="flex gap-8 animate-marquee w-max">
        {[...IMAGES, ...IMAGES].map((src, i) => (
          <div
            key={src + i}
            className="relative w-36 sm:w-44 h-24 sm:h-28 flex-shrink-0 rounded border-2 border-[var(--accent-yellow)]/40 opacity-70 hover:opacity-100 hover:border-[var(--accent-cyan)] transition-all duration-300"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover rounded"
              sizes="176px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
