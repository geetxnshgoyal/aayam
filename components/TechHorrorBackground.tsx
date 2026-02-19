'use client';

import { useEffect, useRef } from 'react';

export default function TechHorrorBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const noiseRef = useRef<number[][]>([]);

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

    let time = 0;
    let glitchIntensity = 0;

    // Generate Perlin-like noise
    const generateNoise = () => {
      const noise: number[][] = [];
      for (let y = 0; y < window.innerHeight; y += 20) {
        noise[y] = [];
        for (let x = 0; x < window.innerWidth; x += 20) {
          noise[y][x] = Math.random();
        }
      }
      return noise;
    };

    noiseRef.current = generateNoise();

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const animate = () => {
      // Base dark background
      const gradient = ctx.createLinearGradient(0, 0, window.innerWidth, window.innerHeight);
      gradient.addColorStop(0, '#0a0a15');
      gradient.addColorStop(0.25, '#1a0f25');
      gradient.addColorStop(0.5, '#2d0a2d');
      gradient.addColorStop(0.75, '#1a0f25');
      gradient.addColorStop(1, '#0a0a15');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Add dark radial gradient overlay for depth
      const radialGradient = ctx.createRadialGradient(
        window.innerWidth / 2,
        window.innerHeight / 2,
        0,
        window.innerWidth / 2,
        window.innerHeight / 2,
        Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2)
      );
      radialGradient.addColorStop(0, 'rgba(139, 0, 139, 0.15)');
      radialGradient.addColorStop(0.5, 'rgba(75, 0, 130, 0.1)');
      radialGradient.addColorStop(1, 'rgba(25, 0, 51, 0.3)');
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Animated glitch distortion
      if (Math.random() > 0.95) {
        glitchIntensity = Math.random() * 0.3;
      }
      glitchIntensity *= 0.95;

      if (glitchIntensity > 0.05) {
        for (let i = 0; i < 3; i++) {
          const offset = (Math.random() - 0.5) * 20 * glitchIntensity;
          const hue = Math.random() > 0.5 ? 'rgba(255, 0, 100, 0.1)' : 'rgba(75, 0, 255, 0.1)';
          ctx.fillStyle = hue;
          ctx.fillRect(
            offset,
            Math.random() * window.innerHeight,
            window.innerWidth,
            Math.random() * 20
          );
        }
      }

      // Pulsing dark vignette effect
      const vignetteIntensity = 0.5 + 0.2 * Math.sin(time * 0.001);
      const vignette = ctx.createRadialGradient(
        window.innerWidth / 2,
        window.innerHeight / 2,
        window.innerWidth / 4,
        window.innerWidth / 2,
        window.innerHeight / 2,
        Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2)
      );
      vignette.addColorStop(0, `rgba(0, 0, 0, 0)`);
      vignette.addColorStop(1, `rgba(0, 0, 0, ${vignetteIntensity})`);
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Digital noise overlay
      const imageData = ctx.getImageData(0, 0, window.innerWidth, window.innerHeight);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 10;
        if (Math.random() > 0.995) {
          data[i] += noise;
          data[i + 1] -= noise * 0.5;
          data[i + 2] += noise * 0.8;
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Animated ethereal lines
      ctx.strokeStyle = `rgba(147, 51, 234, ${0.1 + 0.05 * Math.sin(time * 0.002)})`;
      ctx.lineWidth = 0.5;

      for (let i = 0; i < 5; i++) {
        const offsetX = Math.sin(time * 0.0005 + i) * 50;
        const offsetY = Math.cos(time * 0.0003 + i) * 50;

        ctx.beginPath();
        ctx.moveTo(Math.sin(time * 0.0002 + i * 10) * 200 + window.innerWidth / 2 + offsetX, i * window.innerHeight / 5 + offsetY);
        ctx.lineTo(Math.cos(time * 0.0002 + i * 10) * 200 + window.innerWidth / 2 + offsetX, (i + 1) * window.innerHeight / 5 + offsetY);
        ctx.stroke();
      }

      // Pulsing dark red/purple orbs
      const orbCount = 3;
      for (let i = 0; i < orbCount; i++) {
        const x = Math.sin(time * 0.0001 * (i + 1)) * (window.innerWidth * 0.3) + window.innerWidth / 2;
        const y = Math.cos(time * 0.00015 * (i + 1)) * (window.innerHeight * 0.3) + window.innerHeight / 2;
        const size = 80 + 40 * Math.sin(time * 0.002 + i);

        const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        orbGradient.addColorStop(0, `rgba(200, 0, 100, ${0.15 + 0.08 * Math.sin(time * 0.001 + i)})`);
        orbGradient.addColorStop(0.5, `rgba(100, 0, 150, ${0.08 + 0.05 * Math.sin(time * 0.001 + i)})`);
        orbGradient.addColorStop(1, `rgba(30, 0, 60, 0)`);

        ctx.fillStyle = orbGradient;
        ctx.fillRect(x - size, y - size, size * 2, size * 2);
      }

      time++;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
