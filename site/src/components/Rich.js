// Renders a translation containing <em>…</em> (italic accent words in headings).
export default function rich(t, key) {
  return t.rich(key, { em: (chunks) => <em>{chunks}</em> });
}
