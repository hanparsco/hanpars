import type { APIRoute } from 'astro';
import fdf from '../../data/fdf.json';
import apis from '../../data/apis.json';
import molecules from '../../data/molecules.json';
import { fdfSlug, slugify } from '../../data/fdf-parse';
import { catalogueName } from '../../data/locale';
import { canonicalMolecule } from '../../data/seo-schema';
import type { Lang } from '../../i18n';

export function getStaticPaths() { return ['fdf', 'api'].flatMap(l => ['', '-fa', '-zh', '-tr'].map(sfx => ({ params: { list: l + sfx } }))); }

const mols = molecules as Record<string, { cid?: number | null }>;
export const GET: APIRoute = ({ params }) => {
  // rows: [name, code, group, pageSlug]
  const [type, lang = 'en'] = String(params.list).split('-') as ['fdf' | 'api', Lang];
  const rows: string[][] = type === 'fdf'
    ? (fdf as { name: string; code: string }[]).map(e => [e.name, e.code, '', fdfSlug(e)])
    : (apis as { name: string; cas: string; class?: string }[]).map(a => { const sl = slugify(a.name); return [a.name, a.cas || '', a.class || 'other', mols[sl]?.cid ? canonicalMolecule(sl, molecules as any) : '']; });
  if (lang !== 'en') rows.forEach(r => r.push(catalogueName(lang, type, r[0])));
  return new Response(JSON.stringify(rows), { headers: { 'Content-Type': 'application/json' } });
};
