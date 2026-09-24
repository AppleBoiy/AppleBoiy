import {
  UnifrakturMaguntia,
  Playfair_Display,
  Libre_Caslon_Text,
  Oswald,
  Yellowtail,
  Shippori_Mincho,
  Noto_Sans_JP,
  Noto_Sans_Thai,
  Noto_Serif_Thai,
} from 'next/font/google';

// Masthead blackletter.
export const blackletter = UnifrakturMaguntia({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-blackletter',
  display: 'swap',
});

// Headlines.
export const headline = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-headline',
  display: 'swap',
});

// Body text.
export const body = Libre_Caslon_Text({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
});

// Kickers, labels, poster lettering.
export const condensed = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-condensed',
  display: 'swap',
});

// Advertisement script.
export const script = Yellowtail({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
});

export const thaiSans = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['400', '700'],
  variable: '--font-thai-sans',
  display: 'swap',
  preload: false,
});

export const thaiSerif = Noto_Serif_Thai({
  subsets: ['thai'],
  weight: ['400', '700', '900'],
  variable: '--font-thai-serif',
  display: 'swap',
  preload: false,
});

export const jaSerif = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-ja-serif',
  display: 'swap',
  preload: false,
});

export const jaSans = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ja-sans',
  display: 'swap',
  preload: false,
});

export const fontVariables = [blackletter, headline, body, condensed, script, thaiSans, thaiSerif, jaSerif, jaSans]
  .map((font) => font.variable)
  .join(' ');
