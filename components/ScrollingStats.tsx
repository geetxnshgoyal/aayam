'use client';

import { useEffect, useRef } from 'react';

interface ScrollingStatsProps {
  stats: Array<{
    icon?: string;
    label: string;
    value: string;
  }>;
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

const ScrollingStats = ({
  stats,
  direction = 'left',
  speed = 30,
  className = '',
}: ScrollingStatsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollContainer = container.querySelector(
      '[data-scroll-content]'
    ) as HTMLElement;
    if (!scrollContainer) return;

    let animationId: number;
    let position = 0;

    const animate = () => {
      if (direction === 'left') {
        position -= speed / 100;
        if (Math.abs(position) > scrollContainer.offsetWidth / 2) {
          position = 0;
        }
      } else {
        position += speed / 100;
        if (position > scrollContainer.offsetWidth / 2) {
          position = -scrollContainer.offsetWidth / 2;
        }
      }

      scrollContainer.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-gradient-to-r from-transparent via-black/50 to-transparent py-4 ${className}`}
    >
      <div
        data-scroll-content
        className="flex gap-16 whitespace-nowrap"
        style={{
          width: 'fit-content',
        }}
      >
        {/* Double the stats for seamless loop */}
        {[...stats, ...stats].map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-6 text-center min-w-max"
          >
            {stat.icon && <span className="text-2xl">{stat.icon}</span>}
            <div>
              <div className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
                {stat.label}
              </div>
              <div className="text-xl md:text-2xl font-bold text-white">
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingStats;
