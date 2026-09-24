import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('Site.notFound');

  return (
    <section className="page not-found">
      <p className="masthead-title masthead-small">The Chaipat Chronicle</p>
      <hr className="rule-double" />
      <span className="kicker">404 — Correction</span>
      <h1 className="headline">{t('title')}</h1>
      <p className="deck">{t('body')}</p>
      <Link href="/" className="text-link">
        <span aria-hidden="true">←</span> {t('home')}
      </Link>
    </section>
  );
}
