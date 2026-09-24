import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PROJECTS } from '@/content/projects';
import { SITE } from '@/content/site';
import GalaxyPlate from '@/components/GalaxyPlate';
import ContactForm from '@/components/ContactForm';

export default async function FrontPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Home');
  const tp = await getTranslations('Projects');
  const body = t.raw('lead.body');

  return (
    <>
      <div className="front">
        <article className="lead">
          <span className="kicker">{t('lead.kicker')}</span>
          <h1 className="headline">{t('lead.headline')}</h1>
          <p className="deck">{t('lead.deck')}</p>
          <div className="lead-meta">
            <span className="byline">{t('lead.byline')}</span>
            <span className="byline">{SITE.name}</span>
          </div>
          <div className="lead-body">
            <div className="columns">
              {body.map((paragraph, i) => (
                <p key={paragraph}>
                  {i === 0 && <span className="dateline">{t('lead.dateline')}</span>}
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="photo">
              <GalaxyPlate caption={t('lead.caption')} />
            </div>
          </div>
        </article>

        <aside>
          <h2 className="box-title">{t('brief.title')}</h2>
          <ul className="brief">
            {t.raw('brief.items').map((item) => (
              <li key={item.head}>
                <h4>{item.head}</h4>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>

          <div className="ad">
            <span className="ad-kicker">{t('ad.kicker')}</span>
            <div className="ad-poster">
              <span className="ad-script" lang="en">{t('ad.script')}</span>
              <span className="ad-ribbon">{t('ad.line')}</span>
              <p className="ad-sub">{t('ad.sub')}</p>
              <a href="#letters" className="ad-cta">
                {t('ad.cta')} <span aria-hidden="true">→</span>
              </a>
              <span className="ad-address">{SITE.email}</span>
            </div>
          </div>
        </aside>
      </div>

      <section aria-labelledby="work">
        <header className="section-head">
          <h2 id="work">{t('work.title')}</h2>
          <p>{t('work.subtitle')}</p>
        </header>
        <div className="stories">
          {PROJECTS.map((project, i) => (
            <article key={project.slug} className={`story ${i === 0 ? 'story-feature' : ''}`}>
              <span className="kicker">{tp(`items.${project.slug}.category`)}</span>
              <Link href={`/projects/${project.slug}`}>
                <h3>{tp(`items.${project.slug}.title`)}</h3>
              </Link>
              <p className="byline">{project.year}</p>
              <p>{tp(`items.${project.slug}.summary`)}</p>
              <Link href={`/projects/${project.slug}`} className="text-link">
                {t('work.more')} <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
        <div className="after-stories">
          <Link href="/projects" className="text-link">
            {t('work.all')} <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <div className="lower">
        <section aria-labelledby="record">
          <header className="section-head">
            <h2 id="record">{t('record.title')}</h2>
            <p>{t('record.subtitle')}</p>
          </header>
          <ol className="record">
            {t.raw('record.items').map((item) => (
              <li key={`${item.period}-${item.title}`}>
                <span className="record-period">{item.period}</span>
                <div>
                  <p className="record-title">{item.title}</p>
                  <p className="record-org">{item.org}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/cv" className="text-link" style={{ marginTop: 12 }}>
            {t('record.cv')} <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </section>

        <section id="letters" aria-labelledby="letters-title">
          <header className="section-head">
            <h2 id="letters-title">{t('letters.title')}</h2>
          </header>
          <p className="letters-intro">{t('letters.text')}</p>
          <ContactForm email={SITE.email} labels={t.raw('letters.form')} />
        </section>
      </div>
    </>
  );
}
