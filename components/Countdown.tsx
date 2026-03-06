'use client';

import { useState, useEffect } from 'react';

const EVENT_DATE = new Date('2026-04-24T09:00:00+05:30');

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

export default function Countdown() {
  const [diff, setDiff] = useState({ days: 0, hours: 0, min: 0, sec: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const now = new Date();
      const d = EVENT_DATE.getTime() - now.getTime();
      if (d <= 0) {
        setDiff({ days: 0, hours: 0, min: 0, sec: 0 });
        return;
      }
      setDiff({
        days: Math.floor(d / (1000 * 60 * 60 * 24)),
        hours: Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        min: Math.floor((d % (1000 * 60 * 60)) / (1000 * 60)),
        sec: Math.floor((d % (1000 * 60)) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-2 md:gap-4 font-mono text-[var(--text-muted)]">
        <span className="opacity-50">—</span>
        <span className="text-lg md:text-2xl font-bold">LOADING</span>
        <span className="animate-blink">_</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6" role="timer" aria-live="polite">
      <div className="flex flex-col items-center">
        <span className="font-mono text-2xl md:text-4xl font-bold text-[var(--accent-cyan)] tabular-nums">
          {pad(diff.days)}
        </span>
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-[var(--text-muted)]">
          Days
        </span>
      </div>
      <span className="font-mono text-xl md:text-3xl text-[var(--accent-cyan)]/60">:</span>
      <div className="flex flex-col items-center">
        <span className="font-mono text-2xl md:text-4xl font-bold text-[var(--accent-cyan)] tabular-nums">
          {pad(diff.hours)}
        </span>
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-[var(--text-muted)]">
          Hrs
        </span>
      </div>
      <span className="font-mono text-xl md:text-3xl text-[var(--accent-cyan)]/60">:</span>
      <div className="flex flex-col items-center">
        <span className="font-mono text-2xl md:text-4xl font-bold text-[var(--accent-cyan)] tabular-nums">
          {pad(diff.min)}
        </span>
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-[var(--text-muted)]">
          Min
        </span>
      </div>
      <span className="font-mono text-xl md:text-3xl text-[var(--accent-cyan)]/60">:</span>
      <div className="flex flex-col items-center">
        <span className="font-mono text-2xl md:text-4xl font-bold text-[var(--accent-cyan)] tabular-nums">
          {pad(diff.sec)}
        </span>
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-[var(--text-muted)]">
          Sec
        </span>
      </div>
    </div>
  );
}
