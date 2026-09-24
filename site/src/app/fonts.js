import {
  Instrument_Serif,
  Inter_Tight,
  IBM_Plex_Mono,
  Shippori_Mincho,
  Noto_Sans_JP,
  Noto_Sans_Thai,
  Noto_Serif_Thai,
} from 'next/font/google';

export const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const sans = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

export const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const thaiSans = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['400', '500'],
  variable: '--font-thai-sans',
  display: 'swap',
  preload: false,
});

export const thaiSerif = Noto_Serif_Thai({
  subsets: ['thai'],
  weight: ['400', '500'],
  variable: '--font-thai-serif',
  display: 'swap',
  preload: false,
});

export const jaSerif = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ja-serif',
  display: 'swap',
  preload: false,
});

export const jaSans = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ja-sans',
  display: 'swap',
  preload: false,
});

export const fontVariables = [serif, sans, mono, thaiSans, thaiSerif, jaSerif, jaSans]
  .map((font) => font.variable)
  .join(' ');
