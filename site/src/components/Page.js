import { getTranslations } from 'next-intl/server';

/**
 * One printed page of the paper: running head (after the front page), content,
 * and a foot with the page number and a "continued on" link to the next page.
 */
export default async function Page({ n, total, head, date, children }) {
  const t = await getTranslations('Paper');

  return (
    <section id={`page-${n}`} className="page" data-page={n} aria-label={t('page', { n })}>
      {n > 1 && (
        <header className="running-head">
          <span className="running-title">The Chaipat Chronicle</span>
          <span>{head}</span>
          <span>{date} · {t('page', { n })}</span>
        </header>
      )}
      <div className="page-body">{children}</div>
      <footer className="page-foot">
        <span className="page-number">— {n} —</span>
        {n < total && (
          <a href={`#page-${n + 1}`} className="text-link">
            {t('continued', { n: n + 1 })} <span className="arrow" aria-hidden="true">→</span>
          </a>
        )}
      </footer>
    </section>
  );
}
