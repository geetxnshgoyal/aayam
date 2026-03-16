'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Placeholder tech images - replace with your actual images
const carouselImages = [
  { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop', alt: 'Technology' },
  { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop', alt: 'AI Chip' },
  { src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop', alt: 'Code' },
  { src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop', alt: 'VR' },
  { src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop', alt: 'Cybersecurity' },
  { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop', alt: 'Teamwork' },
  { src: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=300&fit=crop', alt: 'Innovation' },
  { src: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop', alt: 'Tech' },
];

export default function MovingImageCarousel() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Row - Moving Left */}
      <div className="absolute top-[10%] left-0 right-0 h-32 overflow-hidden">
        <motion.div
          className="flex gap-8 absolute"
          animate={{ x: isHovered ? 0 : [0, -1600] }}
          transition={{ 
            duration: 60, 
            repeat: Infinity, 
            ease: 'linear',
          }}
        >
          {[...carouselImages, ...carouselImages].map((img, i) => (
            <motion.div
              key={`top-${i}`}
              className="relative w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden opacity-15 hover:opacity-25 transition-opacity duration-300"
              style={{
                filter: 'hue-rotate(180deg) saturate(0.8) brightness(1.2)',
              }}
              whileHover={{ 
                scale: 1.1, 
                opacity: 0.4,
                zIndex: 10 
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="192px"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Middle Row - Moving Right */}
      <div className="absolute top-[40%] left-0 right-0 h-32 overflow-hidden">
        <motion.div
          className="flex gap-8 absolute"
          animate={{ x: isHovered ? 0 : [-1600, 0] }}
          transition={{ 
            duration: 70, 
            repeat: Infinity, 
            ease: 'linear',
          }}
        >
          {[...carouselImages.reverse(), ...carouselImages.reverse()].map((img, i) => (
            <motion.div
              key={`mid-${i}`}
              className="relative w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden opacity-15 hover:opacity-25 transition-opacity duration-300"
              style={{
                filter: 'hue-rotate(220deg) saturate(0.8) brightness(1.2)',
              }}
              whileHover={{ 
                scale: 1.1, 
                opacity: 0.4,
                zIndex: 10 
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="192px"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Row - Moving Left */}
      <div className="absolute top-[70%] left-0 right-0 h-32 overflow-hidden">
        <motion.div
          className="flex gap-8 absolute"
          animate={{ x: isHovered ? 0 : [0, -1600] }}
          transition={{ 
            duration: 65, 
            repeat: Infinity, 
            ease: 'linear',
          }}
        >
          {[...carouselImages, ...carouselImages].map((img, i) => (
            <motion.div
              key={`bot-${i}`}
              className="relative w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden opacity-15 hover:opacity-25 transition-opacity duration-300"
              style={{
                filter: 'hue-rotate(160deg) saturate(0.8) brightness(1.2)',
              }}
              whileHover={{ 
                scale: 1.1, 
                opacity: 0.4,
                zIndex: 10 
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="192px"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Gradient Overlays for fade effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--bg-deep)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-deep)] to-transparent" />
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[var(--bg-deep)] to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[var(--bg-deep)] to-transparent" />
      </div>
    </div>
  );
}
