'use client';

import Image from 'next/image';

/**
 * Movable multi-image layer for hero — floating tech imagery with Ken Burns–style drift.
 * Uses existing background images. Respects prefers-reduced-motion.
 */
const IMAGES = [
  { src: '/images/backgrounds/tech-circuit.jpg', alt: '', delay: 0, duration: 24 },
  { src: '/images/backgrounds/tech-matrix.jpg', alt: '', delay: 4, duration: 28 },
  { src: '/images/backgrounds/tech-glows.jpg', alt: '', delay: 8, duration: 26 },
];

export default function HeroFloatingImages() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {IMAGES.map((img, i) => (
        <div
          key={img.src + i}
          className="absolute w-[40%] sm:w-[35%] aspect-[16/10] max-w-[380px] opacity-[0.12] motion-reduce:opacity-[0.06] float-image-layer"
          style={{
            left: `${8 + i * 28}%`,
            top: `${10 + (i % 2) * 35}%`,
            animationDuration: `${img.duration}s`,
            animationDelay: `${img.delay}s`,
          }}
        >
          <Image
            src={img.src}
            alt=""
            fill
            className="object-cover rounded-sm"
            sizes="380px"
          />
        </div>
      ))}
    </div>
  );
}
