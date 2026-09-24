import { getTranslations, setRequestLocale } from 'next-intl/server';
import { RESUME_EXPERIENCE, RESUME_PROJECT, RESUME_SKILLS } from '@/content/resume';
import { SITE, stripProtocol } from '@/content/site';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Resume' });
  return { title: t('metaTitle'), description: t('metaDescription'), alternates: { canonical: `/${locale}/cv` } };
}

function Entry({ title, meta, period, points, stack, url, urlLabel }) {
  return (
    <article className="entry">
      <div className="entry-top">
        <h3 className="entry-title">{title}</h3>
        <span className="entry-period">{period}</span>
      </div>
      {meta && <p className="entry-meta">{meta}</p>}
      {points?.length > 0 && (
        <ul className="points">
          {points.map((point) => <li key={point}>{point}</li>)}
        </ul>
      )}
      {(stack?.length > 0 || url) && (
        <p className="stack">
          {stack?.join(' · ')}
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer">
              {urlLabel || stripProtocol(url)} ↗
            </a>
          )}
        </p>
      )}
    </article>
  );
}

export default async function CvPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Resume');

  const contacts = [
    { label: t('contact.email'), value: SITE.email, href: `mailto:${SITE.email}` },
    { label: t('contact.github'), value: stripProtocol(SITE.github), href: SITE.github },
    { label: t('contact.linkedin'), value: stripProtocol(SITE.linkedin), href: SITE.linkedin },
  ];

  return (
    <>
      <header className="cv-head">
        <span className="kicker">{t('kicker')}</span>
        <h1 className="headline">{t('heading')}</h1>
        <p className="deck">{t('deck')}</p>
      </header>

      <dl className="cv-contacts">
        <div>
          <dt>{t('contact.location')}</dt>
          <dd>{t('contact.locationValue')}</dd>
        </div>
        {contacts.map(({ label, value, href }) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>
              <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {value}
              </a>
            </dd>
          </div>
        ))}
      </dl>

      <div className="cv-download">
        <a href={SITE.resume} download={SITE.resumeFilename} className="btn">
          {t('download')} <span aria-hidden="true">↓</span>
        </a>
      </div>

      <div className="cv-grid">
        <div>
          <section className="cv-block">
            <h2 className="box-title">{t('sections.profile')}</h2>
            <p className="profile-text dropcap">{t('profile')}</p>
          </section>

          <section className="cv-block">
            <h2 className="box-title">{t('sections.experience')}</h2>
            {RESUME_EXPERIENCE.map(({ key, stack, url }) => (
              <Entry
                key={key}
                title={t(`experience.${key}.role`)}
                meta={`${t(`experience.${key}.org`)} · ${t(`experience.${key}.place`)}`}
                period={t(`experience.${key}.period`)}
                points={t.raw(`experience.${key}.points`)}
                stack={stack}
                url={url}
              />
            ))}
          </section>
        </div>

        <div className="cv-side">
          <section className="cv-block">
            <h2 className="box-title">{t('sections.education')}</h2>
            <Entry
              title={t('education.degree')}
              meta={`${t('education.school')} · ${t('education.place')}`}
              period={t('education.period')}
              points={t.raw('education.points')}
            />
          </section>

          <section className="cv-block">
            <h2 className="box-title">{t('sections.project')}</h2>
            <Entry
              title={t('project.title')}
              period={t('project.period')}
              points={t.raw('project.points')}
              stack={RESUME_PROJECT.stack}
              url={RESUME_PROJECT.url}
              urlLabel={t('project.repo')}
            />
          </section>

          <section className="cv-block">
            <h2 className="box-title">{t('sections.skills')}</h2>
            <dl className="skills">
              {RESUME_SKILLS.map(({ key, value }) => (
                <div key={key}>
                  <dt>{t(`skills.${key}`)}</dt>
                  <dd>{value ?? t(`skillValues.${key}`)}</dd>
                </div>
              ))}
            </dl>
            <p className="byline" style={{ marginTop: 16 }}>{t('footer.updated')}</p>
          </section>
        </div>
      </div>
    </>
  );
}
