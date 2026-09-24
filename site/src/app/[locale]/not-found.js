import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('Site.notFound');

  return (
    <section className="page-head" style={{ minHeight: '50vh' }}>
      <p className="mono">404</p>
      <h1 className="title" style={{ marginTop: 20 }}>{t('title')}</h1>
      <p className="lede">{t('body')}</p>
      <Link href="/" className="more">
        <span aria-hidden="true">←</span> {t('home')}
      </Link>
    </section>
  );
}
