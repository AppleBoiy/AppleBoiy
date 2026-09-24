'use client';

import { useEffect, useRef } from 'react';
import { fitCanvas, onResize, seeded } from '@/lib/art';

function sparkle(ctx, x, y, size, alpha) {
  const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 3.2);
  glow.addColorStop(0, `rgba(255, 244, 214, ${0.55 * alpha})`);
  glow.addColorStop(1, 'rgba(255, 244, 214, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, size * 3.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `rgba(255, 250, 235, ${alpha})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x - size * 2.4, y);
  ctx.lineTo(x + size * 2.4, y);
  ctx.moveTo(x, y - size * 2.4);
  ctx.lineTo(x, y + size * 2.4);
  ctx.stroke();
}

/** A static field of small stars with a few glowing, cross-shaped bright ones. */
export default function Starfield({ seed = 3, density = 0.00022, bright = 7, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;

    const draw = () => {
      const { ctx, width, height } = fitCanvas(canvas);
      ctx.clearRect(0, 0, width, height);
      const rand = seeded(seed);
      const count = Math.round(width * height * density);

      for (let i = 0; i < count; i += 1) {
        const x = rand() * width;
        const y = rand() * height;
        const r = 0.4 + rand() * rand() * 1.4;
        ctx.fillStyle = `rgba(255, 250, 235, ${0.35 + rand() * 0.6})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < bright; i += 1) {
        sparkle(ctx, rand() * width, rand() * height, 2 + rand() * 4, 0.6 + rand() * 0.4);
      }
    };

    return onResize(canvas, draw);
  }, [seed, density, bright]);

  return <canvas ref={ref} className={`art-canvas ${className}`} aria-hidden="true" />;
}
