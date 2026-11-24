// Translated insight articles: zh (titles for the archive + some full bodies), fa and tr (full bodies). Keyed by slug.
import zh from './articles.zh.json';
import fa from './articles.fa.json';
import tr from './articles.tr.json';
type Tx = { title: string; excerpt: string; content?: string };
type Pack = { categories: Record<string, string>; articles: Record<string, Tx> };
const packs: Record<string, Pack> = { zh: zh as Pack, fa: fa as Pack, tr: tr as Pack };
export const artTx = (lang: string, slug: string): Tx | undefined => packs[lang]?.articles[slug];
export const artCat = (lang: string, cat: string): string => packs[lang]?.categories[cat] || cat;
export const artFull = (lang: string, slug: string): boolean => lang === 'en' || !!packs[lang]?.articles[slug]?.content;
/** Languages that have a full body for this article (en always). */
export const fullLangs = (slug: string): string[] => ['en', 'fa', 'zh', 'tr'].filter(l => artFull(l, slug));
export const htmlLangOf: Record<string, string> = { en: 'en', fa: 'fa', zh: 'zh-Hans', tr: 'tr' };
/** Escape text and wrap Latin codes (M4Q(R2), ICH Q12, 2.3.1 …) in dir="ltr" spans so the Persian-digit pass and the bidi algorithm leave them intact. */
export const ltrWrap = (text: string): string => {
  const esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc.replace(/[A-Za-z0-9][A-Za-z0-9().\-–/+]*(?: [A-Za-z0-9][A-Za-z0-9().\-–/+]*)*/g, (s) => {
    let core = s, tail = '';
    while (core && (core.endsWith('.') || (core.endsWith(')') && (core.match(/\(/g) || []).length < (core.match(/\)/g) || []).length))) { tail = core.slice(-1) + tail; core = core.slice(0, -1); }
    return /[A-Za-z]/.test(core) || /\d\.\d/.test(core) ? `<span dir="ltr">${core}</span>${tail}` : s;
  });
};
