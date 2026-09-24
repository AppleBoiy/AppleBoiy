import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PROJECTS } from '@/content/projects';
import rich from '@/components/Rich';
import HalftoneClouds from '@/components/HalftoneClouds';

const CLOUDS = [
  { x: 0.1, y: 0.05, w: 0.6, h: 0.3 },
  { x: 0.45, y: 0.5, w: 0.5, h: 0.25 },
];

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
      <section data-scene="sky" className="scene scene-sky page-hero">
        <div className="scene-art clouds-hero" data-parallax>
          <HalftoneClouds clouds={CLOUDS} seed={31} />
        </div>
        <p className="tag" data-reveal>{t('tag')}</p>
        <h1 className="display" data-reveal="2">{rich(t, 'heading')}</h1>
        <p className="lead" data-reveal="3">{t('intro')}</p>
      </section>

      <section id="index" data-scene="paper" data-label={t('sections.list')} className="scene scene-paper scene-flow">
        <ol className="index" data-reveal>
          {PROJECTS.map((project, i) => (
            <li key={project.slug}>
              <Link href={`/projects/${project.slug}`}>
                <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="index-title">
                  {t(`items.${project.slug}.title`)}
                  <small>{t(`items.${project.slug}.category`)}</small>
                </span>
                <span className="index-summary">{t(`items.${project.slug}.summary`)}</span>
                <span className="tag index-year">{project.year}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
