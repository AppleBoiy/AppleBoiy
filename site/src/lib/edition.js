// Volume and issue numbers for the masthead: the volume counts years since 2022,
// the issue is the day of the year this edition was built.
const FIRST_YEAR = 2022;

function roman(n) {
  const table = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let out = '';
  for (const [value, numeral] of table) {
    while (n >= value) {
      out += numeral;
      n -= value;
    }
  }
  return out;
}

export function edition(locale, now = new Date()) {
  const start = Date.UTC(now.getUTCFullYear(), 0, 0);
  const day = Math.floor((now.getTime() - start) / 86400000);
  const volume = now.getUTCFullYear() - FIRST_YEAR + 1;
  const tag = { en: 'en-GB', th: 'th-TH', ja: 'ja-JP' }[locale] || 'en-GB';
  return {
    volume: locale === 'en' ? roman(volume) : String(volume),
    number: day,
    date: new Intl.DateTimeFormat(tag, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(now),
  };
}
