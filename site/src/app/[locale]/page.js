import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PROJECTS } from '@/content/projects';
import { RESUME_EXPERIENCE, RESUME_PROJECT, RESUME_SKILLS, TIMELINE_FROM } from '@/content/resume';
import { SITE, stripProtocol } from '@/content/site';
import { edition as makeEdition } from '@/lib/edition';
import { PAGES, TOTAL_PAGES, projectPage, projectsIn } from '@/content/pages';
import Masthead from '@/components/Masthead';
import Page from '@/components/Page';
import PageTurner from '@/components/PageTurner';
import GalaxyPlate from '@/components/GalaxyPlate';
import ContactForm from '@/components/ContactForm';

function projectLinks(project, t) {
  return [
    project.live && { href: project.live, label: t('labels.live') },
    project.source && { href: project.source, label: t('labels.source') },
  ].filter(Boolean);
}

function FactLine({ project, t }) {
  return (
    <p className="story-facts">
      <span>{project.stack.join(' · ')}</span>
      {projectLinks(project, t).map((link) => (
        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label} ↗
        </a>
      ))}
    </p>
  );
}

/* Page B, layout 1 — the lead story across the top of the page. */
function LeadStory({ project, t, paper }) {
  const { slug } = project;
  return (
    <article id={`story-${slug}`} className="lab-lead">
      <div className="lab-lead-head">
        <span className="kicker">{t(`items.${slug}.category`)}</span>
        <h3 className="headline">{t(`items.${slug}.title`)}</h3>
        <p className="deck">{t(`items.${slug}.role`)} · {project.year}</p>
      </div>
      <div className="lab-lead-body">
        <p className="lab-lede dropcap">{t(`items.${slug}.summary`)}</p>
        <blockquote className="pull-quote">
          <span className="label">{paper('pullQuote')}</span>
          <p>{t(`items.${slug}.outcome`)}</p>
        </blockquote>
        <FactLine project={project} t={t} />
      </div>
    </article>
  );
}

/* Page B, layout 1 — the three stories set in ruled columns beneath the lead. */
function ColumnStory({ project, t }) {
  const { slug } = project;
  return (
    <article id={`story-${slug}`} className="lab-column">
      <span className="kicker">{t(`items.${slug}.category`)}</span>
      <h3>{t(`items.${slug}.title`)}</h3>
      <p className="byline">{t(`items.${slug}.role`)} · {project.year}</p>
      <p className="lab-summary">{t(`items.${slug}.summary`)}</p>
      <p className="lab-outcome">{t(`items.${slug}.outcome`)}</p>
      <FactLine project={project} t={t} />
    </article>
  );
}

/* Page C, layout 2 — an almanac ledger: number, story, and a boxed fact file per row. */
function LedgerStory({ project, number, t }) {
  const { slug } = project;
  const links = projectLinks(project, t);
  return (
    <article id={`story-${slug}`} className="ledger-row">
      <span className="ledger-number" aria-hidden="true">{String(number).padStart(2, '0')}</span>
      <div className="ledger-story">
        <span className="kicker">{t(`items.${slug}.category`)}</span>
        <h3>{t(`items.${slug}.title`)}</h3>
        <p className="byline">{t(`items.${slug}.role`)}</p>
        <p className="ledger-summary">{t(`items.${slug}.summary`)}</p>
      </div>
      <aside className="ledger-box">
        <p className="ledger-year">{project.year}</p>
        <p className="ledger-outcome">{t(`items.${slug}.outcome`)}</p>
        <p className="ledger-stack">{project.stack.join(' · ')}</p>
        {links.length > 0 && (
          <p className="ledger-links">
            {links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label} ↗
              </a>
            ))}
          </p>
        )}
      </aside>
    </article>
  );
}

const monthIndex = (ym) => {
  const [year, month] = ym.split('-').map(Number);
  return year * 12 + (month - 1);
};

/* "Service at a glance": a year ruler with one bar per role. */
function Timeline({ roles, title, presentLabel }) {
  const now = new Date();
  const nowIndex = now.getFullYear() * 12 + now.getMonth();
  const from = TIMELINE_FROM * 12;
  const to = (now.getFullYear() + 1) * 12;
  const pos = (index) => `${((index - from) / (to - from)) * 100}%`;
  const years = Array.from({ length: now.getFullYear() - TIMELINE_FROM + 2 }, (_, i) => TIMELINE_FROM + i);

  return (
    <figure className="timeline">
      <figcaption className="box-title">{title}</figcaption>
      <div className="timeline-grid">
        {roles.map((role) => {
          const start = monthIndex(role.start);
          const end = role.end ? monthIndex(role.end) + 1 : nowIndex + 1;
          return (
            <div key={role.key} className="timeline-row">
              <span className="timeline-label">{role.label}</span>
              <span className="timeline-track">
                <span
                  className={`timeline-bar ${role.end ? '' : 'is-current'}`}
                  style={{ left: pos(start), width: `calc(${pos(end)} - ${pos(start)})` }}
                  title={role.period}
                />
              </span>
            </div>
          );
        })}
        <div className="timeline-row timeline-axis" aria-hidden="true">
          <span className="timeline-label" />
          <span className="timeline-track">
            {years.slice(0, -1).map((year) => (
              <span key={year} className="timeline-year" style={{ left: pos(year * 12) }}>{year}</span>
            ))}
            <span className="timeline-now" style={{ left: pos(nowIndex) }}>{presentLabel}</span>
          </span>
        </div>
      </div>
    </figure>
  );
}

/* One job as a classified advertisement. */
function ClassifiedAd({ title, org, period, points, stack, url }) {
  return (
    <article className="classified">
      <h3 className="classified-band">{title}</h3>
      <p className="classified-org">{org}</p>
      <p className="classified-period">{period}</p>
      <ul className="classified-points">
        {points.map((point) => <li key={point}>{point}</li>)}
      </ul>
      <p className="classified-stack">
        {stack.join(' · ')}
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer">{stripProtocol(url)} ↗</a>
        )}
      </p>
    </article>
  );
}

function PosterAd({ kicker, script, line, sub, cta, href, download, footnote }) {
  return (
    <div className="ad">
      <span className="ad-kicker">{kicker}</span>
      <div className="ad-poster">
        <span className="ad-script" lang="en">{script}</span>
        <span className="ad-ribbon">{line}</span>
        <p className="ad-sub">{sub}</p>
        <a href={href} className="ad-cta" {...(download ? { download } : {})}>
          {cta} <span aria-hidden="true">→</span>
        </a>
        {footnote && <span className="ad-address">{footnote}</span>}
      </div>
    </div>
  );
}

export default async function Edition({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Home');
  const tp = await getTranslations('Projects');
  const tr = await getTranslations('Resume');
  const paper = await getTranslations('Paper');
  const site = await getTranslations('Site');
  const edition = makeEdition(locale);
  const pageProps = { total: TOTAL_PAGES, date: edition.date };

  const contacts = [
    { label: tr('contact.email'), value: SITE.email, href: `mailto:${SITE.email}` },
    { label: tr('contact.github'), value: stripProtocol(SITE.github), href: SITE.github },
    { label: tr('contact.linkedin'), value: stripProtocol(SITE.linkedin), href: SITE.linkedin },
  ];

  const research = projectsIn('research');
  const tools = projectsIn('tools');
  const indexGroups = [
    { title: paper('inside.research'), items: research.map((p) => ({ label: tp(`items.${p.slug}.title`), page: projectPage(p.slug) })) },
    { title: paper('inside.tools'), items: tools.map((p) => ({ label: tp(`items.${p.slug}.title`), page: projectPage(p.slug) })) },
    { title: paper('inside.more'), items: [{ label: paper('inside.cv'), page: PAGES.cv }, { label: paper('inside.letters'), page: PAGES.letters }] },
  ];

  return (
    <>
      {/* ── Page 1: front page ── */}
      <Page n={PAGES.front} {...pageProps}>
        <Masthead edition={edition} />
        <div className="front">
          <article className="lead">
            <span className="kicker">{t('lead.kicker')}</span>
            <h2 className="headline">{t('lead.headline')}</h2>
            <p className="deck">{t('lead.deck')}</p>
            <div className="lead-meta">
              <span className="byline">{t('lead.byline')}</span>
              <span className="byline">{SITE.name}</span>
            </div>
            <div className="lead-body">
              <div className="columns">
                {t.raw('lead.body').map((paragraph, i) => (
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
            <h2 className="box-title">{paper('inside.title')}</h2>
            {indexGroups.map((group) => (
              <div key={group.title}>
                <p className="inside-group label">{group.title}</p>
                <ol className="inside">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <a href={`#page-${item.page}`}>
                        <span>{item.label}</span>
                        <span className="inside-dots" aria-hidden="true" />
                        <span className="inside-page">{item.page}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            ))}

            <PosterAd
              kicker={t('ad.kicker')}
              script={t('ad.script')}
              line={t('ad.line')}
              sub={t('ad.sub')}
              cta={t('ad.cta')}
              href={`#page-${PAGES.letters}`}
              footnote={SITE.email}
            />
          </aside>
        </div>
      </Page>

      {/* ── Section B: the laboratory — lead story over three ruled columns ── */}
      <Page n={PAGES.research} head={paper('sectionPages.research.head')} {...pageProps}>
        <header className="section-front">
          <span className="kicker">{paper('sectionPages.research.kicker')}</span>
          <h2 className="headline">{paper('sectionPages.research.heading')}</h2>
          <p className="deck">{paper('sectionPages.research.deck')}</p>
        </header>
        <LeadStory project={research[0]} t={tp} paper={paper} />
        <div className="lab-columns">
          {research.slice(1).map((project) => (
            <ColumnStory key={project.slug} project={project} t={tp} />
          ))}
        </div>
      </Page>

      {/* ── Section C: the workshop — an almanac ledger, one row per project ── */}
      <Page n={PAGES.tools} head={paper('sectionPages.tools.head')} {...pageProps}>
        <header className="workshop-head">
          <div>
            <span className="kicker">{paper('sectionPages.tools.kicker')}</span>
            <h2 className="headline">{paper('sectionPages.tools.heading')}</h2>
          </div>
          <p className="deck">{paper('sectionPages.tools.deck')}</p>
        </header>
        <div className="ledger">
          {tools.map((project, i) => (
            <LedgerStory key={project.slug} project={project} number={research.length + i + 1} t={tp} />
          ))}
        </div>
      </Page>

      {/* ── Curriculum vitae, page 1: the record ── */}
      <Page n={PAGES.cv} head={paper('pageHeads.cv')} {...pageProps}>
        <header className="record-head">
          <span className="kicker">{tr('record.kicker')}</span>
          <h2 className="headline">{tr('record.heading')}</h2>
          <p className="deck">{tr('record.deck')}</p>
        </header>

        <div className="record-top">
          <div>
            <p className="record-profile dropcap">{tr('profile')}</p>
            <dl className="record-contacts">
              <div>
                <dt>{tr('contact.location')}</dt>
                <dd>{tr('contact.locationValue')}</dd>
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
          </div>
          <Timeline
            title={tr('record.glance')}
            presentLabel={tr('record.present')}
            roles={RESUME_EXPERIENCE.map((role) => ({
              ...role,
              label: tr(`experience.${role.key}.role`),
              period: tr(`experience.${role.key}.period`),
            }))}
          />
        </div>

        <header className="section-head">
          <h2>{tr('record.positions')}</h2>
        </header>
        <div className="classifieds">
          {RESUME_EXPERIENCE.map(({ key, stack, url }) => (
            <ClassifiedAd
              key={key}
              title={tr(`experience.${key}.role`)}
              org={`${tr(`experience.${key}.org`)} · ${tr(`experience.${key}.place`)}`}
              period={tr(`experience.${key}.period`)}
              points={tr.raw(`experience.${key}.points`)}
              stack={stack}
              url={url}
            />
          ))}
        </div>
      </Page>

      {/* ── Curriculum vitae, page 2: qualifications ── */}
      <Page n={PAGES.cvMore} head={paper('pageHeads.cvMore')} {...pageProps}>
        <header className="record-head">
          <span className="kicker">{tr('qual.kicker')}</span>
          <h2 className="headline">{tr('qual.heading')}</h2>
        </header>

        <div className="qual-grid">
          <div className="certificate">
            <p className="certificate-line">{tr('qual.certificate')}</p>
            <p className="certificate-name">{SITE.name}</p>
            <p className="certificate-line">{tr('qual.certifies')}</p>
            <p className="certificate-degree">{tr('education.degree')}</p>
            <p className="certificate-school">{tr('education.school')} · {tr('education.place')}</p>
            <p className="certificate-seal" aria-hidden="true">✦</p>
            <ul className="certificate-notes">
              {tr.raw('education.points').map((point) => <li key={point}>{point}</li>)}
            </ul>
            <p className="certificate-date">{tr('education.period')}</p>
          </div>

          <div className="qual-side">
            <article className="qual-project">
              <span className="kicker">{tr('sections.project')}</span>
              <h3>{tr('project.title')}</h3>
              <p className="byline">{tr('project.period')}</p>
              <ul className="classified-points">
                {tr.raw('project.points').map((point) => <li key={point}>{point}</li>)}
              </ul>
              <p className="classified-stack">
                {RESUME_PROJECT.stack.join(' · ')}
                <a href={RESUME_PROJECT.url} target="_blank" rel="noopener noreferrer">{tr('project.repo')} ↗</a>
              </p>
            </article>

            <a href={SITE.resume} download={SITE.resumeFilename} className="coupon">
              <span className="coupon-scissors" aria-hidden="true">✂</span>
              <span className="coupon-clip">{tr('qual.coupon.clip')}</span>
              <span className="coupon-title">{tr('qual.coupon.title')}</span>
              <span className="coupon-sub">{tr('qual.coupon.sub')}</span>
              <span className="coupon-cta">{tr('qual.coupon.cta')} ↓</span>
            </a>
          </div>
        </div>

        <section className="exchange" aria-labelledby="exchange-title">
          <header className="exchange-head">
            <h3 id="exchange-title">{tr('qual.exchange')}</h3>
            <span className="label">{tr('qual.listings')} · {edition.date}</span>
          </header>
          <dl>
            {RESUME_SKILLS.map(({ key, value }) => (
              <div key={key} className="exchange-row">
                <dt>{tr(`skills.${key}`)}</dt>
                <dd>
                  {(value ?? tr(`skillValues.${key}`)).split(/[,、]\s*(?![^()（）]*[)）])/).map((item) => (
                    <span key={item} className="exchange-item">{item}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
          <p className="byline" style={{ marginTop: 14 }}>{tr('footer.updated')}</p>
        </section>
      </Page>

      {/* ── Letters and the back-page advertisement ── */}
      <Page n={PAGES.letters} head={paper('pageHeads.letters')} {...pageProps}>
        <div className="back-page">
          <section id="letters" aria-labelledby="letters-title">
            <header className="section-head">
              <h2 id="letters-title">{t('letters.title')}</h2>
            </header>
            <p className="letters-intro">{t('letters.text')}</p>
            <ContactForm email={SITE.email} labels={t.raw('letters.form')} />
          </section>
          <PosterAd
            kicker={t('ad.kicker')}
            script={t('ad.script')}
            line={t('ad.line')}
            sub={t('ad.sub')}
            cta={t('ad.cta')}
            href={`mailto:${SITE.email}`}
            footnote={SITE.email}
          />
        </div>
        <p className="colophon">
          © {new Date().getFullYear()} {site('footer.rights')} · {site('footer.printed')} ·{' '}
          <a href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub</a> ·{' '}
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> ·{' '}
          <a href="#page-1">{site('footer.top')} ↑</a>
        </p>
      </Page>

      <PageTurner total={TOTAL_PAGES} />
    </>
  );
}
