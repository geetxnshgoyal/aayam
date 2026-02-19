'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface TechHorrorImageBGProps {
  opacity?: number;
}

export default function TechHorrorImageBG({ opacity = 0.7 }: TechHorrorImageBGProps) {
  const [currentImage, setCurrentImage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    // Rotate through images every 8 seconds
    const interval = setInterval(() => {
      setIsTransitioning(true);
      timeoutRef.current = setTimeout(() => {
        setCurrentImage((prev) => (prev === 3 ? 1 : prev + 1));
        setIsTransitioning(false);
      }, 500);
    }, 8000);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* Light gradient overlay for better text contrast without hiding image */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(5, 5, 8, 0.3) 0%, rgba(5, 5, 8, 0.1) 50%, rgba(5, 5, 8, 0.4) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Tech Horror Images */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: currentImage === num && !isTransitioning ? opacity : 0,
              zIndex: currentImage === num ? 1 : 0,
            }}
          >
            <Image
              src={`/images/tech-horror/bg-0${num}.png`}
              alt={`Tech Horror Background ${num}`}
              fill
              className="object-cover"
              quality={90}
              priority={num === 1}
            />
          </div>
        ))}
      </div>

      {/* Vignette for cinematic look */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 3,
          background: 'radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.4) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
