// SEO audit over the built site (dist/). Writes seo-audit.json + seo-audit.md.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
const root = process.argv[2] || 'dist';
async function walk(d, acc = []) { for (const e of await readdir(d, { withFileTypes: true })) { const p = join(d, e.name); if (e.isDirectory()) await walk(p, acc); else if (e.name.endsWith('.html')) acc.push(p); } return acc; }
const files = await walk(root);
const pages = []; const titles = new Map(); const descs = new Map();
for (const f of files) {
  const rel = '/' + relative(root, f).split(sep).join('/').replace(/\.html$/, '').replace(/(^|\/)index$/, '');
  const h = await readFile(f, 'utf8');
  if (/http-equiv="refresh"/.test(h)) continue;
  const g = (re) => (re.exec(h) || [])[1] || '';
  const p = {
    path: rel || '/', lang: g(/<html lang="([^"]+)"/), title: g(/<title>([^<]*)<\/title>/), desc: g(/<meta name="description" content="([^"]*)"/),
    canonical: g(/<link rel="canonical" href="([^"]+)"/), robots: g(/<meta name="robots" content="([^"]+)"/),
    h1: (h.match(/<h1[\s>]/g) || []).length, imgs: (h.match(/<img\b[^>]*>/g) || []).length,
    imgNoAlt: (h.match(/<img\b(?![^>]*\balt=)[^>]*>/g) || []).length,
    hreflang: (h.match(/hreflang="/g) || []).length, ld: [], ldErr: 0, bytes: h.length,
    words: h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length,
  };
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { p.ld.push(JSON.parse(m[1])['@type']); } catch { p.ldErr++; } }
  pages.push(p);
  if (!/noindex/.test(p.robots)) { titles.set(p.title, [...(titles.get(p.title) || []), p.path]); descs.set(p.desc, [...(descs.get(p.desc) || []), p.path]); }
}
const idx = pages.filter(p => !/noindex/.test(p.robots));
const issue = (name, list) => ({ name, count: list.length, sample: list.slice(0, 15) });
const report = {
  pages: pages.length, indexable: idx.length,
  issues: [
    issue('title missing', idx.filter(p => !p.title).map(p => p.path)),
    issue('title > 65 chars', idx.filter(p => p.title.length > 65).map(p => `${p.path} (${p.title.length}) ${p.title}`)),
    issue('title < 25 chars', idx.filter(p => p.title.length < 25).map(p => `${p.path} ${p.title}`)),
    issue('description missing', idx.filter(p => !p.desc).map(p => p.path)),
    issue('description > 165 chars', idx.filter(p => p.desc.length > 165).map(p => `${p.path} (${p.desc.length})`)),
    issue('description < 70 chars', idx.filter(p => p.desc && p.desc.length < 70).map(p => `${p.path} ${p.desc}`)),
    issue('duplicate titles', [...titles].filter(([t, l]) => l.length > 1).map(([t, l]) => `${l.length}× ${t} :: ${l.slice(0, 3).join(', ')}`)),
    issue('duplicate descriptions', [...descs].filter(([t, l]) => l.length > 1).map(([t, l]) => `${l.length}× ${t.slice(0, 80)} :: ${l.slice(0, 3).join(', ')}`)),
    issue('h1 count != 1', idx.filter(p => p.h1 !== 1).map(p => `${p.path} (${p.h1})`)),
    issue('images without alt', idx.filter(p => p.imgNoAlt).map(p => `${p.path} (${p.imgNoAlt})`)),
    issue('canonical mismatch', idx.filter(p => p.canonical && new URL(p.canonical).pathname !== p.path).map(p => `${p.path} -> ${p.canonical}`)),
    issue('no hreflang', idx.filter(p => !p.hreflang).map(p => p.path)),
    issue('JSON-LD parse errors', idx.filter(p => p.ldErr).map(p => p.path)),
    issue('thin pages (< 150 words)', idx.filter(p => p.words < 150).map(p => `${p.path} (${p.words})`)),
    issue('heavy pages (> 600 KB)', idx.filter(p => p.bytes > 600000).map(p => `${p.path} (${Math.round(p.bytes / 1024)} KB)`)),
  ],
};
await writeFile('seo-audit.json', JSON.stringify(report, null, 1));
console.log(report.issues.map(i => `${i.name}: ${i.count}`).join('\n'));
