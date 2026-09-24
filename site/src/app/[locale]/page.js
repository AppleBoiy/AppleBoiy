import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PROJECTS } from '@/content/projects';
import { SITE } from '@/content/site';

function Band({ index, label, children }) {
  return (
    <section className="band rise" aria-labelledby={`h-${index}`}>
      <header className="band-label">
        <span className="num mono">{index}</span>
        <h2 id={`h-${index}`} className="eyebrow">{label}</h2>
      </header>
      <div>{children}</div>
    </section>
  );
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Home');
  const tp = await getTranslations('Projects');
  const featured = PROJECTS.filter((project) => project.featured);

  return (
    <>
      <section className="hero rise">
        <p className="eyebrow">{t('greeting')}</p>
        <h1 className="display">{SITE.name}</h1>
        <p className="lede">{t('intro')}</p>
      </section>

      <Band index="01" label={t('now.label')}>
        <div className="split">
          <div>
            <p className="now-role">{t('now.role')}</p>
            <p className="now-org">{t('now.org')}</p>
            <p className="now-text prose">{t('now.text')}</p>
            <p className="now-since mono">{t('now.since')}</p>
          </div>
          <div>
            <p className="eyebrow" style={{ marginBottom: 12 }}>{t('focus.label')}</p>
            <ul className="focus-list">
              {t.raw('focus.items').map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Band>

      <Band index="02" label={t('selected.label')}>
        <div className="rows">
          {featured.map((project, i) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="row">
              <span className="row-index mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="row-title">{tp(`items.${project.slug}.title`)}</span>
              <span className="row-meta">{tp(`items.${project.slug}.category`)}</span>
              <span className="row-end">
                <span className="mono">{project.year}</span>
                <span className="arrow faint" aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
        <Link href="/projects" className="more">
          {t('selected.all')} <span className="arrow" aria-hidden="true">→</span>
        </Link>
      </Band>

      <Band index="03" label={t('path.label')}>
        <div className="rows">
          {t.raw('path.items').map((item) => (
            <div key={`${item.period}-${item.title}`} className="path-row">
              <span className="mono">{item.period}</span>
              <span className="path-title">{item.title}</span>
              <span className="muted" style={{ fontSize: '0.92rem' }}>{item.org}</span>
            </div>
          ))}
        </div>
        <Link href="/cv" className="more">
          {t('path.cv')} <span className="arrow" aria-hidden="true">→</span>
        </Link>
      </Band>

      <Band index="04" label={t('contact.label')}>
        <p className="prose muted">{t('contact.text')}</p>
        <a href={`mailto:${SITE.email}`} className="contact-mail">
          <span className="link">{SITE.email}</span> <span className="arrow faint" aria-hidden="true">→</span>
        </a>
      </Band>
    </>
  );
}
