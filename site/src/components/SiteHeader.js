'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const NAV = [
  { href: '/', key: 'home' },
  { href: '/projects', key: 'projects' },
  { href: '/cv', key: 'cv' },
];

function isActive(pathname, href) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const t = useTranslations('Site');
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link href="/" className="wordmark">Chaipat Jainan</Link>
      <nav aria-label={t('nav.label')} className="site-nav">
        <ul>
          {NAV.map(({ href, key }) => (
            <li key={key}>
              <Link
                href={href}
                className="nav-link"
                aria-current={isActive(pathname, href) ? 'page' : undefined}
              >
                {t(`nav.${key}`)}
              </Link>
            </li>
          ))}
        </ul>
        <div className="lang" role="group" aria-label={t('language')}>
          {routing.locales.map((l) => (
            <Link
              key={l}
              href={pathname}
              locale={l}
              scroll={false}
              lang={l}
              hrefLang={l}
              aria-current={l === locale ? 'true' : undefined}
              aria-label={t(`languageNames.${l}`)}
            >
              {l.toUpperCase()}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
