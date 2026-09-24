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
  const previous = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const links = [
    project.live && { href: project.live, label: t('labels.live'), text: stripProtocol(project.live) },
    project.source && { href: project.source, label: t('labels.source'), text: stripProtocol(project.source) },
  ].filter(Boolean);

  return (
    <article>
      <header className="article-head">
        <Link href="/projects" className="text-link">
          <span aria-hidden="true">←</span> {t('labels.backSection')}
        </Link>
        <div><span className="kicker">{t(`items.${slug}.category`)}</span></div>
        <h1 className="headline">{t(`items.${slug}.title`)}</h1>
        <p className="deck">{t(`items.${slug}.role`)}</p>
        <p className="byline">{t('labels.byline')} · {project.year}</p>
      </header>
      <hr className="rule-thick" />

      <div className="article">
        <div className="columns">
          <p className="dropcap">{t(`items.${slug}.summary`)}</p>
          <p>{t(`items.${slug}.outcome`)}</p>
        </div>
        <aside>
          <h2 className="box-title">{t('labels.factFile')}</h2>
          <dl className="facts">
            <div>
              <dt>{t('labels.year')}</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>{t('labels.role')}</dt>
              <dd>{t(`items.${slug}.role`)}</dd>
            </div>
            <div>
              <dt>{t('labels.stack')}</dt>
              <dd>{project.stack.join(', ')}</dd>
            </div>
            <div>
              <dt>{t('labels.links')}</dt>
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
        </aside>
      </div>

      <nav className="pager" aria-label={t('labels.pager')}>
        <Link href={`/projects/${previous.slug}`}>
          <span className="label">← {t('labels.previousStory')}</span>
          <span className="pager-title">{t(`items.${previous.slug}.title`)}</span>
        </Link>
        <Link href={`/projects/${next.slug}`}>
          <span className="label">{t('labels.nextStory')} →</span>
          <span className="pager-title">{t(`items.${next.slug}.title`)}</span>
        </Link>
      </nav>
    </article>
  );
}
