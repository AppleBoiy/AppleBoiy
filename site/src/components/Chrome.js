'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export function Mark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 2.5c.9 7.4 5.2 11.9 13.5 13.5-8.3 1.6-12.6 6.1-13.5 13.5-.9-7.4-5.2-11.9-13.5-13.5C10.8 14.4 15.1 9.9 16 2.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Fixed frame around every page: left rail with the mark, menu button and section ruler,
 * the top hairline, language switch and the contact button. Watches `[data-scene]`
 * sections to recolour itself (sky vs paper) and to show the current section.
 */
export default function Chrome() {
  const t = useTranslations('Site');
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sections, setSections] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const scenes = Array.from(document.querySelectorAll('[data-scene]'));
    setSections(scenes.map((el) => ({ id: el.id, label: el.dataset.label })).filter((s) => s.id && s.label));

    // The frame's colour follows the scene under the top bar; the ruler follows mid-screen.
    const toneObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) document.documentElement.dataset.tone = entry.target.dataset.scene;
        }
      },
      { rootMargin: '-6% 0px -93% 0px' }
    );

    const activeObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -54% 0px' }
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            revealObserver.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 }
    );

    scenes.forEach((scene) => {
      toneObserver.observe(scene);
      activeObserver.observe(scene);
      revealObserver.observe(scene);
    });
    if (scenes[0]) document.documentElement.dataset.tone = scenes[0].dataset.scene;

    return () => {
      toneObserver.disconnect();
      activeObserver.disconnect();
      revealObserver.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const layers = Array.from(document.querySelectorAll('.scene-art[data-parallax]'));
    if (layers.length === 0) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const layer of layers) {
        const rect = layer.parentElement.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) continue;
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        layer.style.setProperty('--drift', `${(progress * 60).toFixed(1)}px`);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (!menuOpen) return undefined;
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const nav = [
    { href: '/', label: t('nav.home') },
    { href: '/projects', label: t('nav.projects') },
    { href: '/cv', label: t('nav.cv') },
    { href: '/#contact', label: t('nav.contact') },
  ];

  return (
    <>
      <div className="chrome" aria-hidden={menuOpen || undefined}>
        <span className="chrome-band" aria-hidden="true" />
        <span className="chrome-hline" aria-hidden="true" />
        <span className="chrome-vline" aria-hidden="true" />

        <Link href="/" className="chrome-mark" aria-label={t('name')}>
          <Mark />
        </Link>

        <button type="button" className="chrome-menu" onClick={() => setMenuOpen(true)} aria-label={t('menu.open')}>
          <span /><span /><span /><span />
        </button>

        {sections.length > 0 && (
          <nav className="ruler" aria-label={t('menu.sections')}>
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={section.id === active ? 'on' : ''}
                aria-current={section.id === active ? 'true' : undefined}
              >
                <span className="ruler-tick" aria-hidden="true" />
                <span className="ruler-label">{section.label}</span>
              </a>
            ))}
          </nav>
        )}

        <div className="chrome-top">
          <nav className="chrome-nav" aria-label={t('nav.label')}>
            <Link href="/projects" aria-current={pathname.startsWith('/projects') ? 'page' : undefined}>
              {t('nav.projects')}
            </Link>
            <Link href="/cv" aria-current={pathname === '/cv' ? 'page' : undefined}>
              {t('nav.cv')}
            </Link>
          </nav>
          <div className="chrome-lang" role="group" aria-label={t('language')}>
            {routing.locales.map((l) => (
              <Link
                key={l}
                href={pathname}
                locale={l}
                lang={l}
                hrefLang={l}
                aria-current={l === locale ? 'true' : undefined}
                aria-label={t(`languageNames.${l}`)}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <Link href="/#contact" className="btn-black">
            {t('nav.contact')} <span className="btn-box" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className={`menu ${menuOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label={t('menu.label')} hidden={!menuOpen}>
        <button type="button" className="menu-close" onClick={() => setMenuOpen(false)}>
          {t('menu.close')} <span aria-hidden="true">×</span>
        </button>
        <nav aria-label={t('nav.label')}>
          <ol className="menu-list">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setMenuOpen(false)}>
                  <span className="menu-num">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="menu-foot">
          <div className="chrome-lang" role="group" aria-label={t('language')}>
            {routing.locales.map((l) => (
              <Link key={l} href={pathname} locale={l} lang={l} aria-current={l === locale ? 'true' : undefined} onClick={() => setMenuOpen(false)}>
                {t(`languageNames.${l}`)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
