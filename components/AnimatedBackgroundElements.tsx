'use client';

/**
 * Animated floating elements background - subtle particles/orbs that drift slowly.
 * Uses COMICO accent colors. Respects prefers-reduced-motion.
 */
export default function AnimatedBackgroundElements() {
  const elements = [
    { size: 180, left: '5%', top: '15%', color: 'var(--accent-cyan)', duration: 18, delay: 0 },
    { size: 140, left: '88%', top: '10%', color: 'var(--accent-magenta)', duration: 22, delay: 2 },
    { size: 160, left: '65%', top: '55%', color: 'var(--accent-yellow)', duration: 20, delay: 1 },
    { size: 100, left: '20%', top: '65%', color: 'var(--accent-cyan)', duration: 16, delay: 3 },
    { size: 130, left: '45%', top: '30%', color: 'var(--accent-magenta)', duration: 21, delay: 0.5 },
    { size: 110, left: '2%', top: '45%', color: 'var(--accent-yellow)', duration: 19, delay: 2.5 },
    { size: 90, left: '92%', top: '75%', color: 'var(--accent-cyan)', duration: 17, delay: 1.5 },
    { size: 120, left: '30%', top: '5%', color: 'var(--accent-magenta)', duration: 23, delay: 4 },
    { size: 70, left: '75%', top: '85%', color: 'var(--accent-yellow)', duration: 15, delay: 0.8 },
  ];

  return (
    <div
      className="fixed inset-0 -z-[1] overflow-hidden pointer-events-none"
      aria-hidden
    >
      {elements.map((el, i) => (
        <div
          key={i}
          className="bg-float-element absolute rounded-full blur-xl opacity-[0.15]"
          style={{
            width: el.size,
            height: el.size,
            left: el.left,
            top: el.top,
            background: `radial-gradient(circle, ${el.color} 0%, transparent 70%)`,
            animationDuration: `${el.duration}s`,
            animationDelay: `${el.delay}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }}
        />
      ))}
    </div>
  );
}
