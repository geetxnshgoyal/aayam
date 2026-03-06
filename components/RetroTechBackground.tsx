'use client';

/**
 * Poster-style deep blue background with optional tech imagery and motion.
 */
const BG_IMAGE = '/images/backgrounds/tech-circuit.jpg';

export default function RetroTechBackground() {
  return (
    <div
      className="retro-tech-bg fixed inset-0 -z-[1] overflow-hidden bg-[var(--bg-deep)]"
      aria-hidden
    >
      {/* Tech background image — subtle, blends into theme */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.18] motion-reduce:opacity-10"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, var(--bg-deep) 0%, transparent 35%, transparent 65%, var(--bg-deep) 100%)',
        }}
      />
      {/* Poster-style polka-dot texture (darker dots on blue) */}
      <div
        className="absolute inset-0 opacity-40 motion-reduce:opacity-25"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(0,0,0,0.35) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Base gradient — bright blue + soft orange glow */}
      <div
        className="absolute inset-0 opacity-60 motion-reduce:opacity-35"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 30% 20%, rgba(66, 165, 245, 0.12) 0%, transparent 45%),
            radial-gradient(ellipse 80% 60% at 70% 70%, rgba(255, 255, 255, 0.04) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 50% 80%, rgba(255, 152, 0, 0.06) 0%, transparent 50%)
          `,
          animation: 'gradient-drift 20s ease-in-out infinite alternate',
        }}
      />

      {/* Main grid — neutral white (poster-style) */}
      <div
        className="absolute inset-0 grid-move opacity-[0.18] motion-reduce:opacity-[0.1]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Secondary grid — bright blue tint */}
      <div
        className="absolute inset-0 grid-move-slow opacity-[0.1] motion-reduce:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(66, 165, 245, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(66, 165, 245, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
        }}
      />

      {/* CRT scan line — soft white/blue */}
      <div
        className="absolute inset-0 pointer-events-none scan-sweep opacity-25 motion-reduce:opacity-12"
        style={{
          background: `
            linear-gradient(
              transparent 0%, transparent 42%,
              rgba(255, 255, 255, 0.06) 48%, rgba(66, 165, 245, 0.1) 50%,
              rgba(255, 255, 255, 0.06) 52%, transparent 58%, transparent 100%
            )
          `,
          backgroundSize: '100% 300%',
        }}
      />

      {/* Horizontal data-stream lines — cyan */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0.15, 0.35, 0.55, 0.75, 0.9].map((top, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px signal-line opacity-25 motion-reduce:opacity-12"
            style={{
              top: `${top * 100}%`,
              animationDelay: `${i * 2.5}s`,
              background: 'linear-gradient(90deg, transparent 0%, rgba(66, 165, 245, 0.3) 20%, rgba(255, 255, 255, 0.15) 50%, rgba(66, 165, 245, 0.3) 80%, transparent 100%)',
              backgroundSize: '200% 100%',
            }}
          />
        ))}
      </div>

      {/* Vertical flow — cyan */}
      <div
        className="absolute top-0 bottom-0 w-24 left-0 opacity-[0.15] motion-reduce:opacity-[0.08] data-flow-vertical"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(66, 165, 245, 0.1) 25%, transparent 50%, rgba(66, 165, 245, 0.08) 75%, transparent 100%)',
          backgroundSize: '100% 200%',
        }}
      />
      <div
        className="absolute top-0 bottom-0 w-24 right-0 opacity-[0.15] motion-reduce:opacity-[0.08] data-flow-vertical data-flow-reverse"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(66, 165, 245, 0.1) 25%, transparent 50%, rgba(66, 165, 245, 0.08) 75%, transparent 100%)',
          backgroundSize: '100% 200%',
        }}
      />

      {/* Corner brackets — neutral border */}
      <div className="absolute inset-0 pointer-events-none border border-[var(--border-accent)] rounded-sm" style={{ margin: '1px' }} />
      <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-[var(--text-muted)]/30 rounded-tl" />
      <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-[var(--text-muted)]/30 rounded-tr" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-[var(--text-muted)]/30 rounded-bl" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-[var(--text-muted)]/30 rounded-br" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.35) 100%)',
        }}
      />
    </div>
  );
}
