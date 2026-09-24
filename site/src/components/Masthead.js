'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const SECTIONS = [
  { href: '/', key: 'home' },
  { href: '/projects', key: 'projects' },
  { href: '/cv', key: 'cv' },
  { href: '/#letters', key: 'contact' },
];

function isCurrent(pathname, href) {
  if (href.includes('#')) return false;
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

/** Newspaper masthead: ears, blackletter title, folio line (date + editions) and section index. */
export default function Masthead({ date }) {
  const t = useTranslations('Site');
  const th = useTranslations('Home');
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header id="masthead">
      <div className="ears">
        <p className="ear">{th('ear.left')}</p>
        <p className="volume">{th('volume')}</p>
        <p className="ear">{th('ear.right')}</p>
      </div>

      <hr className="rule-thick" />
      <Link href="/" className="masthead-title" aria-label={t('name')}>
        The Chaipat Chronicle
      </Link>
      <p className="masthead-tagline">“{th('tagline')}”</p>
      <hr className="rule-double" />

      <div className="folio">
        <span>{th('place')}</span>
        <span>{date}</span>
        <span className="editions" role="group" aria-label={t('language')}>
          <span>{th('editions')}</span>
          {routing.locales.map((l) => (
            <Link
              key={l}
              href={pathname}
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
          {SECTIONS.map(({ href, key }) => (
            <li key={key}>
              <Link href={href} aria-current={isCurrent(pathname, href) ? 'page' : undefined}>
                {t(`nav.${key}`)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <hr className="rule-thick" />
    </header>
  );
}
