'use client';

import { useEffect, useRef } from 'react';

interface MovingBorderProps {
  children?: React.ReactNode;
  borderColor?: string;
  borderWidth?: number;
  speed?: number;
  className?: string;
}

const MovingBorder = ({
  children,
  borderColor = 'rgb(168, 85, 247)',
  borderWidth = 2,
  speed = 50,
  className = '',
}: MovingBorderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    let offset = 0;

    const drawBorder = () => {
      ctx.clearRect(0, 0, width, height);

      // Parse color for glow effects
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;

      // Add glow effect
      ctx.shadowBlur = 20;
      ctx.shadowColor = borderColor;

      // Draw moving dashed border with offset
      const dashSize = 20;
      const gapSize = 10;

      // Top border
      ctx.beginPath();
      for (let x = 0; x < width; x += dashSize + gapSize) {
        const adjustedX = (x + offset) % (width + dashSize + gapSize);
        ctx.moveTo(adjustedX, 0);
        ctx.lineTo(Math.min(adjustedX + dashSize, width), 0);
      }
      ctx.stroke();

      // Right border
      ctx.beginPath();
      for (let y = 0; y < height; y += dashSize + gapSize) {
        const adjustedY = (y + offset) % (height + dashSize + gapSize);
        ctx.moveTo(width, adjustedY);
        ctx.lineTo(width, Math.min(adjustedY + dashSize, height));
      }
      ctx.stroke();

      // Bottom border
      ctx.beginPath();
      for (let x = width; x > 0; x -= dashSize + gapSize) {
        const adjustedX = width - ((x - offset) % (width + dashSize + gapSize));
        ctx.moveTo(adjustedX, height);
        ctx.lineTo(Math.max(adjustedX - dashSize, 0), height);
      }
      ctx.stroke();

      // Left border
      ctx.beginPath();
      for (let y = height; y > 0; y -= dashSize + gapSize) {
        const adjustedY = height - ((y - offset) % (height + dashSize + gapSize));
        ctx.moveTo(0, adjustedY);
        ctx.lineTo(0, Math.max(adjustedY - dashSize, 0));
      }
      ctx.stroke();

      // Update offset for animation
      offset = (offset + speed / 100) % (dashSize + gapSize);

      requestAnimationFrame(drawBorder);
    };

    drawBorder();

    // Handle resize
    const handleResize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [borderColor, borderWidth, speed]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
};

export default MovingBorder;
