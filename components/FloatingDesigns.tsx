'use client';

import { useEffect, useRef } from 'react';

interface FloatingDesignProps {
  count?: number;
  colors?: string[];
  speed?: number;
  className?: string;
}

const FloatingDesigns = ({
  count = 6,
  colors = ['rgba(168, 85, 247, 0.3)', 'rgba(236, 72, 153, 0.3)', 'rgba(59, 130, 246, 0.3)'],
  speed = 3,
  className = '',
}: FloatingDesignProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      angle: number;
      speed: number;
      shape: 'circle' | 'square' | 'triangle';
    }> = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 60 + 30,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * speed + 0.5,
        shape: ['circle', 'square', 'triangle'][
          Math.floor(Math.random() * 3)
        ] as 'circle' | 'square' | 'triangle',
      });
    }

    const drawShape = (
      x: number,
      y: number,
      size: number,
      shape: string,
      color: string,
      rotation: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = color;

      switch (shape) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, size, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'square':
          ctx.fillRect(-size / 2, -size / 2, size, size);
          break;

        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(size, size);
          ctx.lineTo(-size, size);
          ctx.closePath();
          ctx.fill();
          break;
      }

      ctx.restore();
    };

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Update position
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.angle = Math.PI - particle.angle;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.angle = -particle.angle;
        }

        // Keep in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Draw shape with rotation
        drawShape(
          particle.x,
          particle.y,
          particle.size,
          particle.shape,
          particle.color,
          time * 0.005
        );
      });

      time++;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [count, colors, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
};

export default FloatingDesigns;
