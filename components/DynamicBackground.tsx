'use client';

import { useEffect, useState } from 'react';
import AnimatedBlobBackground from './AnimatedBlobBackground';
import OrbitingParticles from './OrbitingParticles';
import GridWaveBackground from './GridWaveBackground';
import GradientBackground from './GradientBackground';
import TechHorrorBackground from './TechHorrorBackground';

interface AnimatedBGProps {
  type?: 'blob' | 'orbits' | 'grid' | 'particles' | 'combined' | 'horror';
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
        {/* Tech horror main background */}
        <div style={{ opacity: opacity, zIndex: 1, position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <TechHorrorBackground />
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
      {type === 'horror' ? (
        <TechHorrorBackground />
      ) : (
        <>
          <div className="absolute inset-0 bg-[#0A0B16]" />
          {backgrounds[type]}
        </>
      )}
    </div>
  );
} 