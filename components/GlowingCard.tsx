'use client';

import React, { useRef, useEffect, useState } from 'react';

interface GlowingCardProps {
  children: React.ReactNode;
  glowColor?: string;
  intensity?: number;
  className?: string;
}

const GlowingCard = ({
  children,
  glowColor = 'rgba(168, 85, 247, 0.5)',
  intensity = 1,
  className = '',
}: GlowingCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;

      const rect = card.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      // Create glow effect
      card.style.background = `
        radial-gradient(
          600px at ${e.clientX - rect.left}px ${e.clientY - rect.top}px,
          ${glowColor},
          transparent 80%
        )
      `;
    };

    const handleMouseLeave = () => {
      card.style.background = 'transparent';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [glowColor]);

  return (
    <div
      ref={cardRef}
      className={`relative rounded-lg overflow-hidden transition-all duration-300 ${className}`}
      style={{
        background: 'transparent',
        padding: '1px',
      }}
    >
      {/* Border */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 rounded-lg" />

      {/* Content */}
      <div className="relative bg-black/60 backdrop-blur-md rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default GlowingCard;
