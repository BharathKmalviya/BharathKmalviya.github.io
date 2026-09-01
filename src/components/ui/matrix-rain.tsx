'use client';

import {useEffect, useRef} from 'react';

const GLYPHS = 'アイウエオカキクケコサシスセソタチツテト0123456789$#*+=<>';
const DURATION_MS = 4200;
const FADE_MS = 800;

type MatrixRainProps = {
  onDone: () => void;
};

export function MatrixRain({onDone}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 16;
    const columns = Math.ceil(canvas.width / fontSize);
    const drops = Array.from({length: columns}, () => Math.floor(Math.random() * -40));

    const draw = window.setInterval(() => {
      ctx.fillStyle = 'rgba(5, 6, 5, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        ctx.fillStyle = Math.random() > 0.975 ? '#e8ece9' : '#3ddc84';
        ctx.fillText(glyph, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 50);

    const fadeTimer = window.setTimeout(() => {
      canvas.style.opacity = '0';
    }, DURATION_MS - FADE_MS);
    const doneTimer = window.setTimeout(onDone, DURATION_MS);

    return () => {
      window.clearInterval(draw);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-700"
    />
  );
}
