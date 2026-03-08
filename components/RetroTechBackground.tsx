'use client';

/**
 * Soft retro background — gentle blue gradients, subtle grid and streams.
 */
const BG_IMAGE = '/images/backgrounds/tech-circuit.jpg';

export default function RetroTechBackground() {
  return (
    <div
      className="retro-tech-bg fixed inset-0 -z-[1] overflow-hidden bg-[var(--bg-deep)]"
      aria-hidden
    >
      {/* Tech background image — very subtle */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08] motion-reduce:opacity-[0.04]"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, var(--bg-deep) 0%, transparent 40%, transparent 60%, var(--bg-deep) 100%)',
        }}
      />
      {/* Very soft gradient — desaturated blue */}
      <div
        className="absolute inset-0 opacity-50 motion-reduce:opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 30% 20%, rgba(107, 163, 212, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 80% 60% at 70% 75%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)
          `,
        }}
      />
      {/* Very soft halftone */}
      <div
        className="absolute inset-0 opacity-25 motion-reduce:opacity-15"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.12) 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Grid — very subtle */}
      <div
        className="absolute inset-0 grid-move opacity-[0.08] motion-reduce:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
      <div
        className="absolute inset-0 grid-move-slow opacity-[0.05] motion-reduce:opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(107, 163, 212, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(107, 163, 212, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Very soft scan */}
      <div
        className="absolute inset-0 pointer-events-none scan-sweep opacity-[0.08] motion-reduce:opacity-[0.04]"
        style={{
          background: `
            linear-gradient(
              transparent 0%, transparent 44%, rgba(255, 255, 255, 0.02) 50%, transparent 56%, transparent 100%
            )
          `,
          backgroundSize: '100% 300%',
        }}
      />

      {/* Horizontal lines — very subtle */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0.2, 0.45, 0.7].map((top, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px signal-line opacity-[0.12] motion-reduce:opacity-[0.06]"
            style={{
              top: `${top * 100}%`,
              animationDelay: `${i * 3}s`,
              background: 'linear-gradient(90deg, transparent 0%, rgba(107, 163, 212, 0.12) 25%, transparent 50%, rgba(107, 163, 212, 0.12) 75%, transparent 100%)',
              backgroundSize: '200% 100%',
            }}
          />
        ))}
      </div>

      {/* Vertical flow — very subtle */}
      <div
        className="absolute top-0 bottom-0 w-20 left-0 opacity-[0.06] motion-reduce:opacity-[0.03] data-flow-vertical"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(107, 163, 212, 0.05) 30%, transparent 70%, transparent 100%)',
          backgroundSize: '100% 200%',
        }}
      />
      <div
        className="absolute top-0 bottom-0 w-20 right-0 opacity-[0.06] motion-reduce:opacity-[0.03] data-flow-vertical data-flow-reverse"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(107, 163, 212, 0.05) 30%, transparent 70%, transparent 100%)',
          backgroundSize: '100% 200%',
        }}
      />

      {/* Corner brackets — very muted */}
      <div className="absolute inset-0 pointer-events-none border border-[var(--border-subtle)] rounded-sm" style={{ margin: '1px' }} />
      <div className="absolute top-6 left-6 w-10 h-10 border-l border-t border-[var(--text-muted)]/20 rounded-tl" />
      <div className="absolute top-6 right-6 w-10 h-10 border-r border-t border-[var(--text-muted)]/20 rounded-tr" />
      <div className="absolute bottom-6 left-6 w-10 h-10 border-l border-b border-[var(--text-muted)]/20 rounded-bl" />
      <div className="absolute bottom-6 right-6 w-10 h-10 border-r border-b border-[var(--text-muted)]/20 rounded-br" />

      {/* Soft vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 85% 75% at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.25) 100%)',
        }}
      />
    </div>
  );
}
