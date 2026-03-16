'use client';

/**
 * Animated floating elements background - subtle particles/orbs that drift slowly.
 * Uses COMICO accent colors. Respects prefers-reduced-motion.
 */
export default function AnimatedBackgroundElements() {
  const elements = [
    { size: 120, left: '10%', top: '20%', color: 'var(--accent-cyan)', duration: 20, delay: 0 },
    { size: 80, left: '85%', top: '15%', color: 'var(--accent-magenta)', duration: 25, delay: 2 },
    { size: 100, left: '70%', top: '60%', color: 'var(--accent-yellow)', duration: 22, delay: 1 },
    { size: 60, left: '25%', top: '70%', color: 'var(--accent-cyan)', duration: 18, delay: 3 },
    { size: 90, left: '50%', top: '35%', color: 'var(--accent-magenta)', duration: 24, delay: 0.5 },
    { size: 70, left: '5%', top: '50%', color: 'var(--accent-yellow)', duration: 21, delay: 2.5 },
    { size: 50, left: '90%', top: '80%', color: 'var(--accent-cyan)', duration: 19, delay: 1.5 },
    { size: 85, left: '35%', top: '10%', color: 'var(--accent-magenta)', duration: 23, delay: 4 },
  ];

  return (
    <div
      className="fixed inset-0 -z-[1] overflow-hidden pointer-events-none"
      aria-hidden
    >
      {elements.map((el, i) => (
        <div
          key={i}
          className="bg-float-element absolute rounded-full blur-2xl opacity-[0.06]"
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
