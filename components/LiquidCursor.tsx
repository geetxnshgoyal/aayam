'use client';

import { useEffect, useRef } from 'react';

export default function LiquidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const points: { x: number; y: number }[] = [];
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let lastMouseUpdate = 0;

    for (let i = 0; i < 5; i++) {
      points.push({ x: mouseX, y: mouseY });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseUpdate < 16) return;
      lastMouseUpdate = now;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    let lastFrame = performance.now();

    function animate(currentTime: number) {
      if (!ctx || !canvas) return;

      const deltaTime = currentTime - lastFrame;
      if (deltaTime < 16.67) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrame = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points[0].x += (mouseX - points[0].x) * 0.25;
      points[0].y += (mouseY - points[0].y) * 0.25;

      for (let i = 1; i < points.length; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * 0.35;
        points[i].y += (points[i - 1].y - points[i].y) * 0.35;
      }

      for (let i = points.length - 1; i >= 0; i--) {
        const size = ((points.length - i) / points.length) * 3;
        const alpha = 0.25 - (i / points.length) * 0.2;
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52, 211, 153, ${alpha})`;
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998] hidden md:block"
      style={{ mixBlendMode: 'screen', willChange: 'transform' }}
    />
  );
}
