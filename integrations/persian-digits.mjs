/**
 * After the static build, convert Western digits to Persian digits in the text of every page under /fa/,
 * leaving alone anything inside elements marked lang="en" or dir="ltr" (CAS numbers, codes, English article
 * text, formulas), and all attributes, <script>, <style>, <code>, <pre>.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const FA = '۰۱۲۳۴۵۶۷۸۹';
const toFa = (s) => s.replace(/(\d),(?=\d{3}(?!\d))/g, '$1٬').replace(/[0-9]/g, (d) => FA[d.charCodeAt(0) - 48]);
const VOID = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);

export function convertHtml(html) {
  let out = '';
  let i = 0;
  const stack = []; // {tag, skip}
  let skipDepth = 0;
  let forceDepth = 0;
  let rawUntil = null;
  while (i < html.length) {
    if (rawUntil) {
      const end = html.indexOf(rawUntil, i);
      const stop = end === -1 ? html.length : end;
      out += html.slice(i, stop); i = stop; rawUntil = null; continue;
    }
    const lt = html.indexOf('<', i);
    const text = html.slice(i, lt === -1 ? html.length : lt);
    out += (skipDepth > 0 && forceDepth === 0) ? text : toFa(text);
    if (lt === -1) break;
    const gt = html.indexOf('>', lt);
    const tagStr = html.slice(lt, gt + 1);
    out += tagStr;
    i = gt + 1;
    if (tagStr.startsWith('<!--')) { if (!tagStr.endsWith('-->')) { const e = html.indexOf('-->', lt); out += html.slice(i, e + 3); i = e + 3; } continue; }
    if (tagStr.startsWith('<!') || tagStr.startsWith('<?')) continue;
    const m = /^<\/?([a-zA-Z][a-zA-Z0-9-]*)/.exec(tagStr);
    if (!m) continue;
    const tag = m[1].toLowerCase();
    if (tagStr.startsWith('</')) {
      // pop to matching tag
      for (let k = stack.length - 1; k >= 0; k--) {
        const f = stack.pop();
        if (f.skip) skipDepth--;
        if (f.force) forceDepth--;
        if (f.tag === tag) break;
      }
      continue;
    }
    if (VOID.has(tag) || tagStr.endsWith('/>')) continue;
    const forceFa = /\sdata-fa-digits\b/i.test(tagStr);
    const skip = !forceFa && (/\slang=["']en["']/i.test(tagStr) || /\sdir=["']ltr["']/i.test(tagStr) || /\sdata-latin\b/i.test(tagStr) || tag === 'code' || tag === 'pre' || tag === 'svg' || tag === 'math' || tag === 'title');
    stack.push({ tag, skip, force: forceFa });
    if (skip) skipDepth++;
    if (forceFa) forceDepth++;
    if (tag === 'script' || tag === 'style' || tag === 'textarea') rawUntil = `</${tag}`;
  }
  return out;
}

async function walk(dir, acc = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p, acc); else if (e.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

export default function persianDigits() {
  return {
    name: 'persian-digits',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = join(fileURLToPath(dir), 'fa');
        let files = [];
        try { files = await walk(root); } catch { files = []; }
        files.push(root + '.html');
        for (const f of files) {
          let html; try { html = await readFile(f, 'utf8'); } catch { continue; }
          await writeFile(f, convertHtml(html));
        }
        logger.info(`Persian digits applied to ${files.length} pages`);
      },
    },
  };
}
