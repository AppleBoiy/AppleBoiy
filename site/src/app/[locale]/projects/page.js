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
      <header className="page-head rise">
        <h1 className="title">{t('title')}</h1>
        <p className="lede">{t('intro')}</p>
      </header>

      <div className="rows rise" style={{ animationDelay: '120ms' }}>
        {PROJECTS.map((project, i) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className="row">
            <span className="row-index mono">{String(i + 1).padStart(2, '0')}</span>
            <span className="row-title">{t(`items.${project.slug}.title`)}</span>
            <span className="row-meta">{t(`items.${project.slug}.category`)}</span>
            <span className="row-end">
              <span className="mono">{project.year}</span>
              <span className="arrow faint" aria-hidden="true">→</span>
            </span>
            <span className="row-summary">{t(`items.${project.slug}.summary`)}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
