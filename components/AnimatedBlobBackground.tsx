'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedBlobBackground() {
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

    function drawBlob(x: number, y: number, scale: number, offset: number, color: string, alpha: number) {
      if (!ctx) return;

      const points = 20;
      const angleSlice = (Math.PI * 2) / points;

      ctx.beginPath();
      for (let i = 0; i < points; i++) {
        const angle = angleSlice * i;
        // Perlin-like noise using sine waves
        const noise = 
          Math.sin(angle * 3 + offset * 0.01) * 0.3 +
          Math.sin(angle * 7 + offset * 0.005) * 0.2 +
          Math.sin(angle * 11 + offset * 0.002) * 0.1;
        const radius = (scale * 100) * (1 + noise);
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(220, 20, 38, ${alpha})`;
      ctx.fill();
    }

    function animate() {
      if (!ctx || !canvas) return;

      // Dark background
      ctx.fillStyle = '#0A0B16';
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      time++;

      // Multiple morphing blobs
      drawBlob(canvas.width / dpr / 4, canvas.height / dpr / 3, 1.2, time, '#dc1426', 0.08);
      drawBlob(canvas.width / dpr * 0.75, canvas.height / dpr * 0.6, 1.5, time * 0.7, '#560F28', 0.06);
      drawBlob(canvas.width / dpr * 0.5, canvas.height / dpr * 0.7, 0.9, time * 1.3, '#200934', 0.07);

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
