'use client';

/**
 * Lightweight floating dots/orbs for hero — pure CSS, no canvas.
 * Adds visible motion in the foreground. Respects prefers-reduced-motion.
 */
export default function HeroParticles() {
  const dots = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: 2 + (i % 3),
    left: 5 + (i * 7) + (i % 2) * 15,
    delay: i * 0.8,
    duration: 8 + (i % 4),
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {dots.map((d) => (
        <div
          key={d.id}
          className="absolute rounded-full bg-[var(--accent-cyan)] motion-reduce:animate-none"
          style={{
            width: d.size,
            height: d.size,
            left: `${d.left}%`,
            top: `${20 + (d.id % 5) * 18}%`,
            opacity: 0.2 + (d.id % 3) * 0.15,
            animation: `float-dot ${d.duration}s ease-in-out infinite`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
      {dots.slice(0, 6).map((d) => (
        <div
          key={`w-${d.id}`}
          className="absolute rounded-full bg-[var(--text-primary)] motion-reduce:animate-none"
          style={{
            width: d.size,
            height: d.size,
            right: `${5 + d.id * 12}%`,
            top: `${25 + (d.id % 4) * 22}%`,
            opacity: 0.15,
            animation: `float-dot ${d.duration + 2}s ease-in-out infinite`,
            animationDelay: `${d.delay + 1}s`,
          }}
        />
      ))}
      {/* Orange accent (poster campfire) */}
      {[0, 1, 2].map((i) => (
        <div
          key={`orange-${i}`}
          className="absolute rounded-full bg-[var(--accent-orange)] motion-reduce:animate-none"
          style={{
            width: 3,
            height: 3,
            left: `${15 + i * 25}%`,
            top: `${70 + i * 8}%`,
            opacity: 0.25,
            animation: `float-dot ${10 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}
    </div>
  );
}
