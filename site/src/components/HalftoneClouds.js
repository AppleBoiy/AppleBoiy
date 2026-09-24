'use client';

import { useEffect, useRef } from 'react';
import { fbm, fitCanvas, onResize, seeded } from '@/lib/art';

/**
 * Printed-halftone clouds. Each cloud is a cluster of soft blobs, broken up with noise,
 * rendered as a dot screen whose dot size follows the density.
 * `clouds` are boxes in 0–1 units of the canvas: { x, y, w, h }.
 */
export default function HalftoneClouds({ clouds, seed = 7, color = '244, 236, 222', step = 7, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;

    const draw = () => {
      const { ctx, width, height } = fitCanvas(canvas);
      ctx.clearRect(0, 0, width, height);
      const rand = seeded(seed);
      const blobs = clouds.flatMap((c) =>
        Array.from({ length: 9 }, () => ({
          x: (c.x + rand() * c.w) * width,
          y: (c.y + c.h * (0.35 + rand() * 0.65)) * height,
          r: (0.18 + rand() * 0.22) * Math.min(c.w * width, c.h * height * 2.2),
        }))
      );

      for (let y = step / 2; y < height; y += step) {
        const offset = (Math.round(y / step) % 2) * (step / 2);
        for (let x = step / 2 + offset; x < width; x += step) {
          let d = 0;
          for (const b of blobs) {
            const dx = (x - b.x) / b.r;
            const dy = (y - b.y) / (b.r * 0.62);
            d += Math.exp(-(dx * dx + dy * dy) * 1.6);
          }
          if (d < 0.08) continue;
          const n = fbm(x / 70, y / 70, seed, 4);
          const v = Math.min(1, d * 0.75) * (0.35 + n * 1.05) - 0.18;
          if (v <= 0.02) continue;
          const r = Math.min(step * 0.62, (step / 2) * Math.pow(v, 0.75) * 1.25);
          ctx.fillStyle = `rgba(${color}, ${Math.min(1, 0.45 + v)})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    return onResize(canvas, draw);
  }, [clouds, seed, color, step]);

  return <canvas ref={ref} className={`art-canvas ${className}`} aria-hidden="true" />;
}
