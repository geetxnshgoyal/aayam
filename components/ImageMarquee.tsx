'use client';

import Image from 'next/image';

const IMAGES = [
  '/images/backgrounds/tech-circuit.jpg',
  '/images/backgrounds/tech-matrix.jpg',
  '/images/backgrounds/tech-glows.jpg',
];

/**
 * Horizontal scrolling image strip — movable multi-image design.
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
            className="relative w-32 sm:w-40 h-20 sm:h-24 flex-shrink-0 rounded border border-white/10 opacity-60 hover:opacity-90 transition-opacity"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover rounded"
              sizes="160px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
