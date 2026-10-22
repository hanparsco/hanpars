import type { APIRoute } from 'astro';
import fdf from '../../data/fdf.json';
import apis from '../../data/apis.json';
import molecules from '../../data/molecules.json';
import { fdfSlug, slugify } from '../../data/fdf-parse';

export function getStaticPaths() { return [{ params: { list: 'fdf' } }, { params: { list: 'api' } }]; }

const mols = molecules as Record<string, { cid?: number | null }>;
export const GET: APIRoute = ({ params }) => {
  // rows: [name, code, group, pageSlug]
  const rows = params.list === 'fdf'
    ? (fdf as { name: string; code: string }[]).map(e => [e.name, e.code, '', fdfSlug(e)])
    : (apis as { name: string; cas: string; class?: string }[]).map(a => { const sl = slugify(a.name); return [a.name, a.cas || '', a.class || 'other', mols[sl]?.cid ? sl : '']; });
  return new Response(JSON.stringify(rows), { headers: { 'Content-Type': 'application/json' } });
};
