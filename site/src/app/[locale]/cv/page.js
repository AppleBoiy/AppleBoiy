import { getTranslations, setRequestLocale } from 'next-intl/server';
import { RESUME_EXPERIENCE, RESUME_PROJECT, RESUME_SKILLS } from '@/content/resume';
import { SITE, stripProtocol } from '@/content/site';
import rich from '@/components/Rich';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Resume' });
  return { title: t('metaTitle'), description: t('metaDescription'), alternates: { canonical: `/${locale}/cv` } };
}

function Section({ id, label, index, children }) {
  return (
    <section id={id} data-scene="paper" data-label={label} className="scene scene-paper scene-flow cv-section">
      <header data-reveal>
        <span className="tag">{index}</span>
        <h2 className="h2">{label}</h2>
      </header>
      <div data-reveal="2">{children}</div>
    </section>
  );
}

function Entry({ title, meta, period, points, stack, url, urlLabel }) {
  return (
    <article className="entry">
      <h3 className="entry-title">{title}</h3>
      <p className="tag entry-period">{period}</p>
      {meta && <p className="entry-meta">{meta}</p>}
      {points?.length > 0 && (
        <ul className="points">
          {points.map((point) => <li key={point}>{point}</li>)}
        </ul>
      )}
      {(stack?.length > 0 || url) && (
        <p className="stack">
          {stack?.map((item) => <span key={item} className="tag">{item}</span>)}
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-link">
              {urlLabel || stripProtocol(url)} <span className="arrow" aria-hidden="true">↗</span>
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
      <section id="top" data-scene="paper" data-label={t('sections.top')} className="scene scene-paper cv-hero">
        <p className="tag" data-reveal>{t('eyebrow')} — {SITE.name}</p>
        <h1 className="display" data-reveal="2">{rich(t, 'heading')}</h1>
        <p className="lead" data-reveal="3">{t('headline')}</p>

        <dl className="cv-contacts" data-reveal="3">
          <div>
            <dt className="tag">{t('contact.location')}</dt>
            <dd>{t('contact.locationValue')}</dd>
          </div>
          {contacts.map(({ label, value, href }) => (
            <div key={label}>
              <dt className="tag">{label}</dt>
              <dd>
                <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {value}
                </a>
              </dd>
            </div>
          ))}
        </dl>

        <a href={SITE.resume} download={SITE.resumeFilename} className="btn-black cv-download" data-reveal="4">
          {t('download')} <span className="btn-box" aria-hidden="true">↓</span>
        </a>
      </section>

      <Section id="profile" index="01" label={t('sections.profile')}>
        <p className="lead" style={{ maxWidth: '36ch' }}>{t('profile')}</p>
      </Section>

      <Section id="experience" index="02" label={t('sections.experience')}>
        <div className="entries">
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
        </div>
      </Section>

      <Section id="education" index="03" label={t('sections.education')}>
        <Entry
          title={t('education.degree')}
          meta={`${t('education.school')} · ${t('education.place')}`}
          period={t('education.period')}
          points={t.raw('education.points')}
        />
      </Section>

      <Section id="project" index="04" label={t('sections.project')}>
        <Entry
          title={t('project.title')}
          period={t('project.period')}
          points={t.raw('project.points')}
          stack={RESUME_PROJECT.stack}
          url={RESUME_PROJECT.url}
          urlLabel={t('project.repo')}
        />
      </Section>

      <Section id="skills" index="05" label={t('sections.skills')}>
        <dl className="skills">
          {RESUME_SKILLS.map(({ key, value }) => (
            <div key={key}>
              <dt>{t(`skills.${key}`)}</dt>
              <dd>{value ?? t(`skillValues.${key}`)}</dd>
            </div>
          ))}
        </dl>
        <p className="tag" style={{ marginTop: 40 }}>{t('footer.updated')}</p>
      </Section>
    </>
  );
}
