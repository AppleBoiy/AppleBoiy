'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const SECTIONS = [
  { page: 1, key: 'front' },
  { page: 2, key: 'projects' },
  { page: 4, key: 'cv' },
  { page: 5, key: 'letters' },
];

/** Front-page masthead: ears, blackletter title, folio line (edition, date, languages) and page index. */
export default function Masthead({ edition }) {
  const t = useTranslations('Site');
  const th = useTranslations('Home');
  const tp = useTranslations('Paper');
  const locale = useLocale();

  return (
    <header id="masthead">
      <div className="ears">
        <p className="ear">{th('ear.left')}</p>
        <p className="volume">{tp('volume', { volume: edition.volume, number: edition.number })}</p>
        <p className="ear">{th('ear.right')}</p>
      </div>

      <hr className="rule-thick" />
      <h1 className="masthead-title">The Chaipat Chronicle</h1>
      <p className="masthead-tagline">“{th('tagline')}”</p>
      <hr className="rule-double" />

      <div className="folio">
        <span>{th('place')}</span>
        <span>{edition.date}</span>
        <span className="editions" role="group" aria-label={t('language')}>
          <span>{th('editions')}</span>
          {routing.locales.map((l) => (
            <Link
              key={l}
              href="/"
              locale={l}
              lang={l}
              hrefLang={l}
              aria-current={l === locale ? 'true' : undefined}
              aria-label={t(`languageNames.${l}`)}
            >
              {l.toUpperCase()}
            </Link>
          ))}
        </span>
      </div>
      <hr className="rule" />

      <nav aria-label={t('nav.label')}>
        <ul className="sections">
          {SECTIONS.map(({ page, key }) => (
            <li key={key}>
              <a href={`#page-${page}`}>
                <span className="sections-page">{page}</span>
                {tp(`sections.${key}`)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <hr className="rule-thick" />
    </header>
  );
}
