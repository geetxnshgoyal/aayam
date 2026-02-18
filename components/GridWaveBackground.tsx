'use client';

import { useEffect, useRef } from 'react';

export default function GridWaveBackground() {
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
    const gridSize = 40;

    function animate() {
      if (!ctx || !canvas) return;

      // Clear background
      ctx.fillStyle = '#0A0B16';
      ctx.fillRect(0, 0, w, h);

      time += 0.5;

      // Draw animated grid
      ctx.strokeStyle = 'rgba(220, 20, 38, 0.1)';
      ctx.lineWidth = 1;

      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y < h; y += 5) {
          const wave = Math.sin((y * 0.01 + time * 0.02) + Math.sin(x * 0.003)) * 10;
          const posX = x + wave;
          if (y === 0) ctx.moveTo(posX, y);
          else ctx.lineTo(posX, y);
        }
        ctx.stroke();
      }

      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x < w; x += 5) {
          const wave = Math.sin((x * 0.01 + time * 0.02) + Math.sin(y * 0.003)) * 10;
          const posY = y + wave;
          if (x === 0) ctx.moveTo(x, posY);
          else ctx.lineTo(x, posY);
        }
        ctx.stroke();
      }

      // Draw nodes at intersections with glow
      ctx.fillStyle = 'rgba(220, 20, 38, 0.3)';
      for (let x = 0; x < w; x += gridSize) {
        for (let y = 0; y < h; y += gridSize) {
          const wave = Math.sin((x * 0.01 + time * 0.02) + (y * 0.01 + time * 0.02)) * 3;
          const radius = 1.5 + wave;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

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
