'use client';

import { useEffect, useRef } from 'react';

interface ScrollingStatsProps {
  stats: Array<{ icon?: string; label: string; value: string }>;
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

export default function ScrollingStats({
  stats,
  direction = 'left',
  speed = 30,
  className = '',
}: ScrollingStatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const scrollContainer = container.querySelector('[data-scroll-content]') as HTMLElement;
    if (!scrollContainer) return;

    let animationId: number;
    let position = 0;

    const animate = () => {
      if (direction === 'left') {
        position -= speed / 100;
        if (Math.abs(position) > scrollContainer.offsetWidth / 2) position = 0;
      } else {
        position += speed / 100;
        if (position > scrollContainer.offsetWidth / 2) position = -scrollContainer.offsetWidth / 2;
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
      className={`relative overflow-hidden py-4 ${className}`}
      aria-hidden
    >
      <div data-scroll-content className="flex gap-12 md:gap-16 whitespace-nowrap" style={{ width: 'fit-content' }}>
        {[...stats, ...stats].map((stat, idx) => (
          <div key={idx} className="flex items-center gap-3 px-4 min-w-max">
            {stat.icon && <span className="text-[var(--accent-cyan)] font-mono text-sm">{stat.icon}</span>}
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                {stat.label}
              </div>
              <div className="font-mono text-base md:text-lg font-semibold text-[var(--text-primary)]">
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
