import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { PROJECTS, getProject } from '@/content/projects';
import { stripProtocol } from '@/content/site';

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
      <header className="page-head rise">
        <Link href="/projects" className="back">
          <span aria-hidden="true">←</span> {t('labels.back')}
        </Link>
        <p className="eyebrow" style={{ marginTop: 48 }}>{t(`items.${slug}.category`)}</p>
        <h1 className="title" style={{ marginTop: 20, maxWidth: '22ch' }}>{t(`items.${slug}.title`)}</h1>
      </header>

      <dl className="facts rise" style={{ animationDelay: '100ms' }}>
        <div>
          <dt className="eyebrow">{t('labels.year')}</dt>
          <dd className="mono" style={{ color: 'var(--ink)' }}>{project.year}</dd>
        </div>
        <div>
          <dt className="eyebrow">{t('labels.role')}</dt>
          <dd>{t(`items.${slug}.role`)}</dd>
        </div>
        <div>
          <dt className="eyebrow">{t('labels.stack')}</dt>
          <dd>{project.stack.join(', ')}</dd>
        </div>
        <div>
          <dt className="eyebrow">{t('labels.links')}</dt>
          <dd>
            {links.length === 0 && <span className="faint">—</span>}
            {links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="link" title={link.text}>
                {link.label} <span className="arrow arrow-ne" aria-hidden="true">↗</span>
              </a>
            ))}
          </dd>
        </div>
      </dl>

      <section className="band rise" style={{ animationDelay: '160ms', borderTop: 0 }}>
        <h2 className="eyebrow band-label">{t('labels.overview')}</h2>
        <p className="prose" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.2rem, 2vw, 1.4rem)', lineHeight: 1.6 }}>
          {t(`items.${slug}.summary`)}
        </p>
      </section>

      <section className="band">
        <h2 className="eyebrow band-label">{t('labels.outcome')}</h2>
        <p className="prose">{t(`items.${slug}.outcome`)}</p>
      </section>

      <Link href={`/projects/${next.slug}`} className="next">
        <span className="eyebrow">{t('labels.next')}</span>
        <span className="row-title">
          {t(`items.${next.slug}.title`)} <span className="arrow faint" aria-hidden="true">→</span>
        </span>
      </Link>
    </article>
  );
}
