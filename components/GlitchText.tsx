'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function GlitchText({ 
  children, 
  className = '' 
}: { 
  children: string; 
  className?: string;
}) {
  const [isGlitching, setIsGlitching] = useState(false);

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      <motion.span
        className="relative z-10"
        animate={isGlitching ? {
          x: [0, -2, 2, -2, 0],
          skewX: [0, -5, 5, -5, 0],
        } : {}}
        transition={{
          duration: 0.3,
          repeat: isGlitching ? Infinity : 0,
          repeatDelay: 0.1,
        }}
      >
        {children}
      </motion.span>
      
      {isGlitching && (
        <>
          <motion.span
            className="absolute top-0 left-0 text-[color:var(--energy)] opacity-70"
            animate={{
              x: [-2, 2, -2],
              clipPath: [
                'inset(0 0 0 0)',
                'inset(40% 0 40% 0)',
                'inset(0 0 0 0)',
              ],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
            }}
            style={{ mixBlendMode: 'screen' }}
          >
            {children}
          </motion.span>
          
          <motion.span
            className="absolute top-0 left-0 text-[color:var(--dc1426)] opacity-70"
            animate={{
              x: [2, -2, 2],
              clipPath: [
                'inset(0 0 0 0)',
                'inset(60% 0 20% 0)',
                'inset(0 0 0 0)',
              ],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              delay: 0.1,
            }}
            style={{ mixBlendMode: 'screen' }}
          >
            {children}
          </motion.span>
        </>
      )}
    </div>
  );
}
