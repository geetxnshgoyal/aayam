'use client';

/**
 * Retro comic background — Ben-Day dots (SVG + CSS), speed lines, panel grid.
 * Uses generated comic textures from /images/backgrounds/.
 */
export default function ComicoBackground() {
  return (
    <div
      className="fixed inset-0 -z-[1] overflow-hidden bg-[var(--ink)]"
      aria-hidden
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[var(--bg-deep)]" />

      {/* Generated SVG: Ben-Day halftone (tilable) */}
      <div
        className="absolute inset-0 opacity-[0.85] motion-reduce:opacity-70"
        style={{
          backgroundImage: 'url(/images/backgrounds/comic-halftone.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '32px 32px',
        }}
      />

      {/* CSS fallback halftone — second layer for depth */}
      <div
        className="absolute inset-0 opacity-[0.12] motion-reduce:opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, var(--paper) 2px, transparent 2px)',
          backgroundSize: '20px 20px',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06] motion-reduce:opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, var(--paper) 3px, transparent 3px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Generated SVG: speed lines (retro comic action) */}
      <div
        className="absolute inset-0 pointer-events-none motion-reduce:opacity-50"
        style={{
          backgroundImage: 'url(/images/backgrounds/comic-speed-lines.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Cross-hatch / diagonal grid (arcade-style over dots) */}
      <div
        className="absolute inset-0 opacity-[0.08] motion-reduce:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 19px, rgba(255,214,10,0.15) 19px, rgba(255,214,10,0.15) 20px),
            repeating-linear-gradient(-45deg, transparent, transparent 19px, rgba(255,214,10,0.12) 19px, rgba(255,214,10,0.12) 20px)
          `,
        }}
      />

      {/* Comic panel grid — page gutters */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12] motion-reduce:opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, var(--accent-yellow) 0, var(--accent-yellow) 3px, transparent 3px),
            linear-gradient(90deg, transparent calc(33.333% - 2px), var(--accent-yellow) calc(33.333% - 2px), var(--accent-yellow) calc(33.333% + 1px), transparent calc(33.333% + 1px)),
            linear-gradient(90deg, transparent calc(66.666% - 2px), var(--accent-yellow) calc(66.666% - 2px), var(--accent-yellow) calc(66.666% + 1px), transparent calc(66.666% + 1px)),
            linear-gradient(90deg, transparent calc(100% - 3px), var(--accent-yellow) calc(100% - 3px), var(--accent-yellow) 100%),
            linear-gradient(0deg, var(--accent-yellow) 0, var(--accent-yellow) 3px, transparent 3px),
            linear-gradient(0deg, transparent calc(50% - 2px), var(--accent-yellow) calc(50% - 2px), var(--accent-yellow) calc(50% + 1px), transparent calc(50% + 1px)),
            linear-gradient(0deg, transparent calc(100% - 3px), var(--accent-yellow) calc(100% - 3px), var(--accent-yellow) 100%)
          `,
          backgroundSize: '100% 100%',
        }}
      />

      {/* Finer print grid */}
      <div
        className="absolute inset-0 opacity-[0.05] motion-reduce:opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--accent-magenta) 1px, transparent 1px),
            linear-gradient(90deg, var(--accent-magenta) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Arcade-style frame: thick pink top bar with yellow border */}
      <div className="absolute top-0 left-0 right-0 h-3 md:h-4 bg-[var(--accent-magenta)] border-b-2 border-[var(--accent-yellow)] opacity-90" />
      <div className="absolute top-0 left-0 right-0 h-1 border-b-2 border-[var(--accent-yellow)] opacity-80" />
      {/* Thick yellow bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-3 md:h-4 bg-[var(--accent-yellow)] opacity-90" />

      {/* Corner L-brackets — comic/arcade panel frame */}
      <div className="absolute top-3 md:top-4 left-0 w-20 h-20 md:w-28 md:h-28 border-l-4 border-t-4 border-[var(--accent-yellow)] opacity-60" />
      <div className="absolute top-3 md:top-4 right-0 w-20 h-20 md:w-28 md:h-28 border-r-4 border-t-4 border-[var(--accent-yellow)] opacity-60" />
      <div className="absolute bottom-3 md:bottom-4 left-0 w-20 h-20 md:w-28 md:h-28 border-l-4 border-b-4 border-[var(--accent-yellow)] opacity-60" />
      <div className="absolute bottom-3 md:bottom-4 right-0 w-20 h-20 md:w-28 md:h-28 border-r-4 border-b-4 border-[var(--accent-yellow)] opacity-60" />

      {/* Paper / print noise */}
      <div
        className="absolute inset-0 opacity-[0.04] motion-reduce:opacity-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 50%, rgba(0,0,0,0.45) 100%)',
        }}
      />

      {/* Comic color wash */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          background: `
            radial-gradient(ellipse 100% 70% at 50% 0%, rgba(255,214,10,0.18) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 85% 15%, rgba(230,57,155,0.1) 0%, transparent 45%),
            radial-gradient(ellipse 50% 40% at 15% 85%, rgba(0,180,216,0.08) 0%, transparent 40%)
          `,
        }}
      />
    </div>
  );
}
