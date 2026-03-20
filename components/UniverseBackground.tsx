'use client';

import { useEffect, useRef } from 'react';

export default function UniverseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Stars
    const STAR_COUNT = 280;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.2,
      alpha: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
      color: (['#ffffff', '#b8cde0', '#00b4d8', '#ffd60a', '#ff7a4f'] as const)[
        Math.floor(Math.random() * 5)
      ],
    }));

    // Shooting stars
    interface Shooter {
      x: number; y: number; vx: number; vy: number; len: number; alpha: number; life: number;
    }
    const shooters: Shooter[] = [];
    const spawnShooter = () => {
      shooters.push({
        x: Math.random() * 0.8,
        y: Math.random() * 0.4,
        vx: (Math.random() * 0.004 + 0.003),
        vy: (Math.random() * 0.002 + 0.001),
        len: Math.random() * 100 + 60,
        alpha: 1,
        life: 1,
      });
    };

    // Nebula blobs (static, drawn once into offscreen)
    const nebulaCanvas = document.createElement('canvas');
    const drawNebula = () => {
      nebulaCanvas.width = w;
      nebulaCanvas.height = h;
      const nc = nebulaCanvas.getContext('2d')!;
      const blobs = [
        { x: 0.15, y: 0.2, r: 0.28, color: 'rgba(0,180,216,0.045)' },
        { x: 0.75, y: 0.35, r: 0.22, color: 'rgba(230,57,155,0.04)' },
        { x: 0.5, y: 0.7, r: 0.35, color: 'rgba(255,122,79,0.035)' },
        { x: 0.88, y: 0.8, r: 0.18, color: 'rgba(255,214,10,0.03)' },
        { x: 0.05, y: 0.8, r: 0.2, color: 'rgba(55,224,255,0.04)' },
      ];
      for (const b of blobs) {
        const grd = nc.createRadialGradient(b.x * w, b.y * h, 0, b.x * w, b.y * h, b.r * Math.max(w, h));
        grd.addColorStop(0, b.color);
        grd.addColorStop(1, 'transparent');
        nc.fillStyle = grd;
        nc.fillRect(0, 0, w, h);
      }
    };
    drawNebula();
    window.addEventListener('resize', drawNebula);

    // Earth orbit params
    let earthAngle = 0;
    const EARTH_ORBIT_X = 0.82;
    const EARTH_ORBIT_Y = 0.28;

    // Floating particles (asteroids/dust)
    const particles = Array.from({ length: 26 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0002,
      alpha: Math.random() * 0.4 + 0.1,
      color: (['#00b4d8', '#e6399b', '#ffd60a', '#ff7a4f', '#37e0ff'] as const)[Math.floor(Math.random() * 5)],
    }));

    let t = 0;
    let shooterTimer = 0;

    const draw = () => {
      t++;
      shooterTimer++;

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Radial deep space gradient background
      const bg = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.75);
      bg.addColorStop(0, '#0d1528');
      bg.addColorStop(0.5, '#07101e');
      bg.addColorStop(1, '#020810');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Nebula
      ctx.drawImage(nebulaCanvas, 0, 0);

      // Stars
      for (const s of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset);
        ctx.save();
        ctx.globalAlpha = s.alpha * (0.5 + 0.5 * twinkle);
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.shadowBlur = s.r > 1.2 ? 6 : 2;
        ctx.shadowColor = s.color;
        ctx.fill();
        ctx.restore();
      }

      // Shooting stars
      if (shooterTimer % 220 === 0) spawnShooter();
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.018;
        s.alpha = Math.max(0, s.life);
        if (s.life <= 0) { shooters.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = s.alpha * 0.85;
        const grad = ctx.createLinearGradient(s.x * w, s.y * h, s.x * w - s.len, s.y * h - s.len * 0.4);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(1, 'transparent');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x * w, s.y * h);
        ctx.lineTo(s.x * w - s.len, s.y * h - s.len * 0.4);
        ctx.stroke();
        ctx.restore();
      }

      // Floating particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      // ── Earth ──
      const earthR = Math.min(w, h) * 0.075;
      const ex = EARTH_ORBIT_X * w;
      const ey = EARTH_ORBIT_Y * h;
      earthAngle += 0.004;

      // Atmosphere glow
      const atmoGlow = ctx.createRadialGradient(ex, ey, earthR * 0.85, ex, ey, earthR * 1.5);
      atmoGlow.addColorStop(0, 'rgba(0,180,216,0.18)');
      atmoGlow.addColorStop(0.5, 'rgba(0,100,200,0.08)');
      atmoGlow.addColorStop(1, 'transparent');
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.fillStyle = atmoGlow;
      ctx.beginPath();
      ctx.arc(ex, ey, earthR * 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Earth body clip
      ctx.save();
      ctx.beginPath();
      ctx.arc(ex, ey, earthR, 0, Math.PI * 2);
      ctx.clip();

      // Ocean base
      const oceanGrad = ctx.createRadialGradient(ex - earthR * 0.3, ey - earthR * 0.3, 0, ex, ey, earthR);
      oceanGrad.addColorStop(0, '#1a6ea8');
      oceanGrad.addColorStop(0.5, '#0d4a7a');
      oceanGrad.addColorStop(1, '#03233d');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(ex - earthR, ey - earthR, earthR * 2, earthR * 2);

      // Scrolling continent texture via rotation
      ctx.save();
      ctx.translate(ex, ey);
      ctx.rotate(earthAngle);
      // Land masses (simplified blobs)
      const landPatches = [
        { dx: -0.2, dy: -0.3, rx: 0.45, ry: 0.3 },
        { dx: 0.3, dy: -0.15, rx: 0.22, ry: 0.35 },
        { dx: 0.05, dy: 0.35, rx: 0.35, ry: 0.2 },
        { dx: -0.5, dy: 0.1, rx: 0.2, ry: 0.3 },
        { dx: 0.55, dy: 0.3, rx: 0.18, ry: 0.22 },
      ];
      for (const lp of landPatches) {
        ctx.beginPath();
        ctx.ellipse(lp.dx * earthR, lp.dy * earthR, lp.rx * earthR, lp.ry * earthR, earthAngle * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = '#2d7a3a';
        ctx.fill();
        // highlight
        ctx.beginPath();
        ctx.ellipse(lp.dx * earthR - earthR * 0.05, lp.dy * earthR - earthR * 0.05, lp.rx * earthR * 0.6, lp.ry * earthR * 0.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(80,180,90,0.35)';
        ctx.fill();
      }
      ctx.restore();

      // Cloud layer
      ctx.save();
      ctx.translate(ex, ey);
      ctx.rotate(-earthAngle * 0.6);
      ctx.globalAlpha = 0.38;
      const clouds = [
        { dx: -0.1, dy: -0.55, rx: 0.5, ry: 0.12 },
        { dx: 0.4, dy: 0.0, rx: 0.38, ry: 0.1 },
        { dx: -0.3, dy: 0.4, rx: 0.45, ry: 0.12 },
        { dx: 0.0, dy: -0.2, rx: 0.25, ry: 0.08 },
      ];
      for (const c of clouds) {
        ctx.beginPath();
        ctx.ellipse(c.dx * earthR, c.dy * earthR, c.rx * earthR, c.ry * earthR, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fill();
      }
      ctx.restore();

      // Terminator (shadow)
      const termGrad = ctx.createLinearGradient(ex - earthR, ey, ex + earthR, ey);
      termGrad.addColorStop(0, 'rgba(0,0,0,0.0)');
      termGrad.addColorStop(0.55, 'rgba(0,0,0,0.0)');
      termGrad.addColorStop(0.75, 'rgba(0,0,20,0.55)');
      termGrad.addColorStop(1, 'rgba(0,0,10,0.85)');
      ctx.fillStyle = termGrad;
      ctx.fillRect(ex - earthR, ey - earthR, earthR * 2, earthR * 2);

      ctx.restore(); // end clip

      // Earth border glow
      ctx.save();
      ctx.beginPath();
      ctx.arc(ex, ey, earthR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,180,216,0.45)';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 16;
      ctx.shadowColor = '#00b4d8';
      ctx.stroke();
      ctx.restore();

      // Moon (small, orbiting earth)
      const moonAngle = earthAngle * 2.5;
      const moonOrbitR = earthR * 1.8;
      const mx = ex + Math.cos(moonAngle) * moonOrbitR;
      const my = ey + Math.sin(moonAngle) * moonOrbitR * 0.4;
      const moonR = earthR * 0.22;

      ctx.save();
      ctx.beginPath();
      ctx.arc(mx, my, moonR, 0, Math.PI * 2);
      const moonGrad = ctx.createRadialGradient(mx - moonR * 0.3, my - moonR * 0.3, 0, mx, my, moonR);
      moonGrad.addColorStop(0, '#d8d8d0');
      moonGrad.addColorStop(0.7, '#a0a098');
      moonGrad.addColorStop(1, '#606060');
      ctx.fillStyle = moonGrad;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(180,200,220,0.4)';
      ctx.fill();
      // terminator on moon
      const moonShadow = ctx.createLinearGradient(mx - moonR, my, mx + moonR, my);
      moonShadow.addColorStop(0, 'transparent');
      moonShadow.addColorStop(0.6, 'transparent');
      moonShadow.addColorStop(1, 'rgba(0,0,0,0.7)');
      ctx.fillStyle = moonShadow;
      ctx.beginPath();
      ctx.arc(mx, my, moonR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Orbit ring (dashed)
      ctx.save();
      ctx.globalAlpha = 0.12;
      ctx.beginPath();
      ctx.setLineDash([4, 8]);
      ctx.ellipse(ex, ey, moonOrbitR, moonOrbitR * 0.4, 0, 0, Math.PI * 2);
      ctx.strokeStyle = '#00b4d8';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Satellite (smaller, faster)
      const satAngle = earthAngle * 5;
      const satOrbit = earthR * 1.35;
      const sx = ex + Math.cos(satAngle) * satOrbit;
      const sy = ey + Math.sin(satAngle) * satOrbit * 0.6;

      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.translate(sx, sy);
      ctx.rotate(satAngle);
      // body
      ctx.fillStyle = '#b8cde0';
      ctx.fillRect(-4, -2, 8, 4);
      // solar panels
      ctx.fillStyle = '#00b4d8';
      ctx.fillRect(-10, -1.5, 5, 3);
      ctx.fillRect(5, -1.5, 5, 3);
      ctx.restore();

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', drawNebula);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
