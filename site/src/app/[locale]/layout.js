import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { fontVariables } from '@/app/fonts';
import { SITE } from '@/content/site';
import Masthead from '@/components/Masthead';
import SiteFooter from '@/components/SiteFooter';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Site' });

  return {
    metadataBase: new URL(SITE.url),
    title: { default: t('title'), template: `%s — ${t('name')}` },
    description: t('description'),
    authors: [{ name: SITE.name, url: SITE.url }],
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
    openGraph: { type: 'website', siteName: SITE.name, title: t('title'), description: t('description'), locale },
    twitter: { card: 'summary', title: t('title'), description: t('description') },
    icons: { icon: '/logo.png', apple: '/logo.png' },
  };
}

export const viewport = {
  themeColor: '#efe7d4',
};

// The date printed on the masthead: when this edition was built.
function editionDate(locale) {
  const tag = { en: 'en-GB', th: 'th-TH', ja: 'ja-JP' }[locale] || 'en-GB';
  return new Intl.DateTimeFormat(tag, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Site' });

  return (
    <html lang={locale} className={fontVariables}>
      <body>
        <NextIntlClientProvider>
          <a href="#main" className="skip">{t('nav.skip')}</a>
          <div className="sheet">
            <Masthead date={editionDate(locale)} />
            <main id="main">{children}</main>
            <SiteFooter />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
