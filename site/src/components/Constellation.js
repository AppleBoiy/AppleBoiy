'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { CONSTELLATION_EDGES } from '@/content/projects';

/**
 * Projects drawn as a constellation. Hovering or focusing a star shows its card;
 * the lines are the relations between projects (a tiny knowledge graph).
 * `projects` carry their localized copy: { slug, star:[x,y], year, title, category, summary }.
 */
export default function Constellation({ projects, labels }) {
  const [active, setActive] = useState(projects[0].slug);
  const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
  const current = bySlug[active];
  const linked = new Set(
    CONSTELLATION_EDGES.filter((edge) => edge.includes(active)).flat()
  );

  return (
    <div className="constellation">
      <div className="sky-map">
        <svg className="sky-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {CONSTELLATION_EDGES.map(([a, b]) => {
            const on = a === active || b === active;
            return (
              <line
                key={`${a}-${b}`}
                x1={bySlug[a].star[0]}
                y1={bySlug[a].star[1]}
                x2={bySlug[b].star[0]}
                y2={bySlug[b].star[1]}
                className={on ? 'on' : ''}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        <ul className="stars">
          {projects.map((project, i) => {
            const state = project.slug === active ? 'active' : linked.has(project.slug) ? 'linked' : '';
            return (
              <li key={project.slug} style={{ left: `${project.star[0]}%`, top: `${project.star[1]}%` }}>
                <Link
                  href={`/projects/${project.slug}`}
                  className={`star ${state} ${project.star[0] > 80 ? 'flip' : ''}`}
                  onMouseEnter={() => setActive(project.slug)}
                  onFocus={() => setActive(project.slug)}
                  aria-describedby={project.slug === active ? 'sky-card' : undefined}
                >
                  <span className="star-core" aria-hidden="true" />
                  <span className="star-name">
                    <span className="star-num">{String(i + 1).padStart(2, '0')}</span>
                    {project.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <article id="sky-card" className="glass sky-card" aria-live="polite">
        <span className="glass-corner tl" aria-hidden="true">✦</span>
        <span className="glass-corner br" aria-hidden="true">✦</span>
        <p className="tag tag-sky">{current.category} · {current.year}</p>
        <h3 className="sky-card-title">{current.title}</h3>
        <p className="sky-card-text">{current.summary}</p>
        <Link href={`/projects/${current.slug}`} className="text-link">
          {labels.read} <span className="arrow" aria-hidden="true">→</span>
        </Link>
      </article>
    </div>
  );
}
