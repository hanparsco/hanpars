/** A–Z browse pages: plain-HTML links to every product / API page (the big catalogues load rows with JavaScript). */
import fdf from './fdf.json';
import molecules from './molecules.json';
import { fdfSlug } from './fdf-parse';
import { canonicalMolecule } from './seo-schema';
import { catalogueName } from './locale';
import type { Lang } from '../i18n';

export type AzItem = { name: string; slug: string; code?: string };
const keyOf = (name: string) => { const c = name.trim().charAt(0).toUpperCase(); return /[A-Z]/.test(c) ? c.toLowerCase() : '0-9'; };

let cache: Record<string, Map<string, AzItem[]>> = {};
export function azGroups(type: 'fdf' | 'api'): Map<string, AzItem[]> {
  if (cache[type]) return cache[type];
  const m = new Map<string, AzItem[]>();
  const push = (it: AzItem) => { const k = keyOf(it.name); if (!m.has(k)) m.set(k, []); m.get(k)!.push(it); };
  if (type === 'fdf') {
    for (const e of fdf as { name: string; code: string }[]) push({ name: e.name, slug: fdfSlug(e), code: e.code });
  } else {
    // every indexable substance page (the routes come from molecules.json; alias pages are noindex and skipped)
    for (const [sl, mol] of Object.entries(molecules as Record<string, { name?: string; cas?: string; cid?: number | null }>)) {
      if (canonicalMolecule(sl, molecules as any) !== sl) continue;
      push({ name: mol.name || sl, slug: sl, code: mol.cas });
    }
  }
  for (const v of m.values()) v.sort((a, b) => a.name.localeCompare(b.name, 'en'));
  const sorted = new Map([...m.entries()].sort(([a], [b]) => (a === '0-9' ? -1 : b === '0-9' ? 1 : a.localeCompare(b))));
  return (cache[type] = sorted);
}
export const azPaths = (type: 'fdf' | 'api') => [...azGroups(type).keys()].map(letter => ({ params: { letter } }));
export const azLoc = (lang: Lang, type: 'fdf' | 'api', name: string) => (lang === 'en' ? '' : catalogueName(lang, type, name));
