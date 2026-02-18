'use client';

import { useEffect, useState } from 'react';
import AnimatedBlobBackground from './AnimatedBlobBackground';
import OrbitingParticles from './OrbitingParticles';
import GridWaveBackground from './GridWaveBackground';
import GradientBackground from './GradientBackground';

interface AnimatedBGProps {
  type?: 'blob' | 'orbits' | 'grid' | 'particles' | 'combined';
  opacity?: number;
}

export default function DynamicBackground({ type = 'combined', opacity = 1 }: AnimatedBGProps) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
  }, []);

  if (!shouldRender) {
    return (
      <div className="fixed inset-0 bg-[#0A0B16]" style={{ zIndex: 0 }} />
    );
  }

  // Combine multiple effects for richness
  if (type === 'combined') {
    return (
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <div
          className="absolute inset-0 bg-[#0A0B16]"
          style={{ zIndex: 1 }}
        />
        {/* Gradient base layer */}
        <div style={{ opacity: opacity * 0.5, zIndex: 2, position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <GradientBackground />
        </div>
        {/* Orbiting particles */}
        <div style={{ opacity: opacity * 0.6, zIndex: 3, position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <OrbitingParticles />
        </div>
        {/* Subtle blobs */}
        <div style={{ opacity: opacity * 0.3, zIndex: 4, position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <AnimatedBlobBackground />
        </div>
        <style>{`
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    );
  }

  // Individual effects
  const backgrounds = {
    blob: <AnimatedBlobBackground />,
    orbits: <OrbitingParticles />,
    grid: <GridWaveBackground />,
    particles: <GradientBackground />,
  };

  return (
    <div className="fixed inset-0" style={{ zIndex: 0, opacity }}>
      <div className="absolute inset-0 bg-[#0A0B16]" />
      {backgrounds[type]}
    </div>
  );
}
