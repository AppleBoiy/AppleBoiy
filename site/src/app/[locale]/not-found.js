import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Starfield from '@/components/Starfield';

export default async function NotFound() {
  const t = await getTranslations('Site.notFound');

  return (
    <section data-scene="sky" className="scene scene-night not-found">
      <div className="scene-art">
        <Starfield seed={404} bright={5} />
      </div>
      <p className="tag" style={{ alignSelf: 'flex-start' }}>404</p>
      <h1 className="display" style={{ marginTop: 24 }}>{t('title')}</h1>
      <p className="lead">{t('body')}</p>
      <Link href="/" className="text-link">
        <span aria-hidden="true">←</span> {t('home')}
      </Link>
    </section>
  );
}
