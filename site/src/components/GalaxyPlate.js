'use client';

import { useEffect, useRef } from 'react';
import { fbm, fitCanvas, onResize, seeded } from '@/lib/art';

/**
 * A newspaper halftone "photograph" of a two-armed spiral galaxy, with graticule
 * ticks, a compass, and a scale bar.
 */
export default function GalaxyPlate({ caption, seed = 81, ink = '27, 26, 23' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;

    const draw = () => {
      const { ctx, width, height } = fitCanvas(canvas);
      ctx.clearRect(0, 0, width, height);
      const rand = seeded(seed);
      const cx = width / 2;
      const cy = height / 2;
      const R = Math.min(width, height) * 0.5;
      const step = Math.max(4.2, width / 110);
      const tilt = 0.62; // inclination: squash the disc
      const angle = -0.5;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      for (let y = step / 2; y < height; y += step) {
        const offset = (Math.round(y / step) % 2) * (step / 2);
        for (let x = step / 2 + offset; x < width; x += step) {
          // Rotate, then undo the inclination to get disc coordinates.
          const px = (x - cx) * cos + (y - cy) * sin;
          const py = (-(x - cx) * sin + (y - cy) * cos) / tilt;
          const r = Math.hypot(px, py) / R;
          if (r > 1.15) continue;
          const theta = Math.atan2(py, px);
          const arms = Math.pow(0.5 + 0.5 * Math.cos(2 * (theta - 2.4 * Math.log(r + 0.05))), 1.8);
          const disc = Math.exp(-r / 0.5);
          const bulge = Math.exp(-(r * r) / 0.012);
          const n = fbm(x / 26, y / 26, seed, 3);
          let d = bulge * 1.2 + disc * (0.12 + arms * 1.35) * (0.5 + n * 1.0);
          d += rand() * 0.02;
          if (d < 0.07) continue;
          const v = Math.min(1, d);
          const radius = (step / 2) * Math.pow(v, 0.6) * 1.08;
          ctx.fillStyle = `rgba(${ink}, ${0.6 + v * 0.4})`;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // A few field stars.
      for (let i = 0; i < 26; i += 1) {
        const x = rand() * width;
        const y = rand() * height;
        if (Math.hypot(x - cx, y - cy) < R * 0.9) continue;
        ctx.fillStyle = `rgba(${ink}, 0.75)`;
        ctx.beginPath();
        ctx.arc(x, y, 0.8 + rand() * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    return onResize(canvas, draw);
  }, [seed, ink]);

  const ticks = Array.from({ length: 21 }, (_, i) => i * 5);

  return (
    <figure className="plate">
      <div className="plate-frame">
        <canvas ref={ref} className="art-canvas" aria-hidden="true" />
        <svg className="plate-marks" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {ticks.map((t) => (
            <g key={t}>
              <line x1={t} y1="0" x2={t} y2={t % 25 === 0 ? 2.4 : 1.2} />
              <line x1={t} y1="100" x2={t} y2={t % 25 === 0 ? 97.6 : 98.8} />
              <line x1="0" y1={t} x2={t % 25 === 0 ? 2.4 : 1.2} y2={t} />
              <line x1="100" y1={t} x2={t % 25 === 0 ? 97.6 : 98.8} y2={t} />
            </g>
          ))}
          <line x1="47" y1="50" x2="53" y2="50" />
          <line x1="50" y1="47" x2="50" y2="53" />
        </svg>
        <span className="plate-label plate-n">N</span>
        <span className="plate-label plate-e">E</span>
        <span className="plate-scale"><i />10 kpc</span>
      </div>
      {caption && <figcaption className="caption">{caption}</figcaption>}
    </figure>
  );
}
