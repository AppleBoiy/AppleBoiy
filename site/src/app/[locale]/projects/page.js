import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PROJECTS } from '@/content/projects';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Projects' });
  return { title: t('title'), description: t('intro'), alternates: { canonical: `/${locale}/projects` } };
}

export default async function ProjectsPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Projects');

  return (
    <>
      <header className="section-front">
        <span className="kicker">{t('section')}</span>
        <h1 className="headline">{t('heading')}</h1>
        <p className="deck">{t('intro')}</p>
      </header>
      <hr className="rule-thick" />
      <div className="stories" style={{ marginBottom: 40 }}>
        {PROJECTS.map((project) => (
          <article key={project.slug} className="story">
            <span className="kicker">{t(`items.${project.slug}.category`)}</span>
            <Link href={`/projects/${project.slug}`}>
              <h3>{t(`items.${project.slug}.title`)}</h3>
            </Link>
            <p className="byline">{project.year} · {t(`items.${project.slug}.role`)}</p>
            <p>{t(`items.${project.slug}.summary`)}</p>
            <Link href={`/projects/${project.slug}`} className="text-link">
              {t('labels.continued')} <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
