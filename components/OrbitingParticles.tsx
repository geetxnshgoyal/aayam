'use client';

import { useEffect, useRef } from 'react';

export default function OrbitingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);

    let animationFrameId: number;
    let time = 0;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const w = window.innerWidth;
    const h = window.innerHeight;
    const centerX = w / 2;
    const centerY = h / 2;

    function drawOrbit(radius: number, speed: number, particleCount: number, color: string) {
      if (!ctx) return;
      for (let i = 0; i < particleCount; i++) {
        const angle = (time * speed + (Math.PI * 2 * i) / particleCount) * 0.01;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const size = 1.5 + Math.sin(angle * 2) * 0.8;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        ctx.strokeStyle = `${color}80`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    function drawConnections(radius: number, speed: number, particleCount: number, color: string) {
      if (!ctx) return;
      const points = [];
      for (let i = 0; i < particleCount; i++) {
        const angle = (time * speed + (Math.PI * 2 * i) / particleCount) * 0.01;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        points.push({ x, y });
      }

      for (let i = 0; i < points.length; i++) {
        const next = (i + 1) % points.length;
        ctx.strokeStyle = `${color}40`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[next].x, points[next].y);
        ctx.stroke();
      }
    }

    function animate() {
      if (!ctx || !canvas) return;

      // Clear with dark background
      ctx.fillStyle = '#0A0B16';
      ctx.fillRect(0, 0, w, h);

      time++;

      // Multiple orbits
      drawConnections(80, 2, 8, 'rgba(220, 20, 38, 0.3)');
      drawOrbit(80, 2, 8, 'rgba(220, 20, 38, 1)');

      drawConnections(140, -1.5, 12, 'rgba(86, 15, 40, 0.2)');
      drawOrbit(140, -1.5, 12, 'rgba(86, 15, 40, 0.6)');

      drawConnections(200, 1, 6, 'rgba(32, 9, 52, 0.15)');
      drawOrbit(200, 1, 6, 'rgba(32, 9, 52, 0.4)');

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
