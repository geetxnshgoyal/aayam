'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundType?: 'image' | 'video' | 'gradient';
  backgroundSrc?: string; // URL to image or video
  height?: 'full' | 'screen' | 'large' | 'medium';
  overlay?: boolean;
  overlayOpacity?: number;
  cta?: {
    text: string;
    href: string;
  };
}

const HeroSection = ({
  title = 'AAYAM TechFest',
  subtitle = 'Experience the Future',
  backgroundType = 'gradient',
  backgroundSrc,
  height = 'screen',
  overlay = true,
  overlayOpacity = 0.4,
  cta,
}: HeroSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const heightClasses = {
    full: 'h-full',
    screen: 'h-screen',
    large: 'h-[80vh]',
    medium: 'h-[60vh]',
  };

  return (
    <div
      className={`relative w-full ${heightClasses[height]} flex items-center justify-center overflow-hidden`}
    >
      {/* Background Layer */}
      {backgroundType === 'image' && backgroundSrc && (
        <>
          <Image
            src={backgroundSrc}
            alt="Hero background"
            fill
            priority
            className="object-cover"
            quality={85}
            onLoad={() => setIsLoaded(true)}
          />
        </>
      )}

      {backgroundType === 'video' && backgroundSrc && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={() => setIsLoaded(true)}
        >
          <source src={backgroundSrc} type="video/mp4" />
        </video>
      )}

      {backgroundType === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#0A0B16] to-[#330066]" />
      )}

      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {title && (
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            {title}
          </h1>
        )}

        {subtitle && (
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
            {subtitle}
          </p>
        )}

        {cta && (
          <a
            href={cta.href}
            className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            {cta.text}
          </a>
        )}
      </div>

      {/* Gradient overlay on top for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0B16] z-5" />
    </div>
  );
};

export default HeroSection;
