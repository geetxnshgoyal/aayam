'use client';

import Image from 'next/image';

interface SectionBackgroundProps {
  src: string;
  opacity?: number;
  className?: string;
}

export function SectionBackground({ src, opacity = 0.1, className = '' }: SectionBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        style={{ opacity }}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-deep)]/70 via-transparent to-[var(--bg-deep)]" />
    </div>
  );
}
