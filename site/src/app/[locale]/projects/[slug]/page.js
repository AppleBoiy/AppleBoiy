import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { PROJECTS, getProject } from '@/content/projects';
import { stripProtocol } from '@/content/site';
import HalftoneClouds from '@/components/HalftoneClouds';
import Starfield from '@/components/Starfield';

const CLOUDS = [
  { x: 0.35, y: 0.02, w: 0.6, h: 0.24 },
  { x: 0.6, y: 0.45, w: 0.4, h: 0.2 },
];

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => PROJECTS.map(({ slug }) => ({ locale, slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  if (!getProject(slug)) return {};
  const t = await getTranslations({ locale, namespace: 'Projects' });
  return {
    title: t(`items.${slug}.title`),
    description: t(`items.${slug}.summary`),
    alternates: { canonical: `/${locale}/projects/${slug}` },
  };
}

export default async function ProjectPage({ params }) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  setRequestLocale(locale);

  const t = await getTranslations('Projects');
  const index = PROJECTS.indexOf(project);
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const links = [
    project.live && { href: project.live, label: t('labels.live'), text: stripProtocol(project.live) },
    project.source && { href: project.source, label: t('labels.source'), text: stripProtocol(project.source) },
  ].filter(Boolean);

  return (
    <article>
      <section data-scene="sky" className="scene scene-sky page-hero project-hero">
        <div className="scene-art clouds-hero">
          <HalftoneClouds clouds={CLOUDS} seed={index * 13 + 5} />
        </div>
        <Link href="/projects" className="back" data-reveal>
          <span aria-hidden="true">←</span> {t('labels.back')}
        </Link>
        <p className="tag" data-reveal style={{ marginTop: 32, alignSelf: 'flex-start' }}>
          {t(`items.${slug}.category`)}
        </p>
        <h1 className="display" data-reveal="2">{t(`items.${slug}.title`)}</h1>

        <dl className="glass facts" data-reveal="3">
          <div>
            <dt className="tag">{t('labels.year')}</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt className="tag">{t('labels.role')}</dt>
            <dd>{t(`items.${slug}.role`)}</dd>
          </div>
          <div>
            <dt className="tag">{t('labels.stack')}</dt>
            <dd>{project.stack.join(', ')}</dd>
          </div>
          <div>
            <dt className="tag">{t('labels.links')}</dt>
            <dd>
              {links.length === 0 && '—'}
              {links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" title={link.text}>
                  {link.label} ↗
                </a>
              ))}
            </dd>
          </div>
        </dl>
      </section>

      <section id="overview" data-scene="paper" data-label={t('sections.overview')} className="scene scene-paper scene-flow">
        <div className="detail">
          <div data-reveal>
            <p className="tag">{t('labels.overview')}</p>
            <p className="lead">{t(`items.${slug}.summary`)}</p>
          </div>
          <div data-reveal="2">
            <p className="tag">{t('labels.outcome')}</p>
            <p className="body">{t(`items.${slug}.outcome`)}</p>
          </div>
        </div>
      </section>

      <section id="next" data-scene="sky" data-label={t('sections.next')} className="scene scene-night scene-next">
        <div className="scene-art">
          <Starfield seed={index + 40} bright={6} />
        </div>
        <p className="tag" data-reveal style={{ alignSelf: 'flex-start' }}>{t('labels.next')}</p>
        <Link href={`/projects/${next.slug}`} className="next-link" data-reveal="2">
          <span className="display">
            {t(`items.${next.slug}.title`)} <span className="arrow" aria-hidden="true">→</span>
          </span>
        </Link>
      </section>
    </article>
  );
}
