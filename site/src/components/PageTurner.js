'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

/** Floating "‹ Page n of N ›" control that tracks the page in view and turns to the next or previous one. */
export default function PageTurner({ total }) {
  const t = useTranslations('Paper');
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const pages = Array.from(document.querySelectorAll('[data-page]'));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(Number(entry.target.dataset.page));
        }
      },
      { rootMargin: '-45% 0px -54% 0px' }
    );
    pages.forEach((page) => observer.observe(page));
    return () => observer.disconnect();
  }, []);

  const go = (n) => {
    document.getElementById(`page-${n}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="turner" aria-label={t('turn')}>
      <button type="button" onClick={() => go(current - 1)} disabled={current <= 1} aria-label={t('prev')}>‹</button>
      <span aria-live="polite">{t('pageOf', { n: current, total })}</span>
      <button type="button" onClick={() => go(current + 1)} disabled={current >= total} aria-label={t('next')}>›</button>
    </nav>
  );
}
