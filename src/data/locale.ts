/** Per-language content that lives outside the UI dictionary. English is the source; other languages fall back to it. */
import type { Lang } from '../i18n';
import { pagesFa } from './pages.fa';
import { pagesZh } from './pages.zh';
import { pagesTr } from './pages.tr';
import regEn from './regulatory.json';
import regFa from './regulatory.fa.json';
import regZh from './regulatory.zh.json';
import regTr from './regulatory.tr.json';
import { portfolioFa } from './portfolio.fa';
import { portfolioZh } from './portfolio.zh';
import { portfolioTr } from './portfolio.tr';
import { FORM_FA, ROUTE_FA, formFa } from './seo-fa';
import { FORM_ZH, ROUTE_ZH, formZh } from './seo-zh';
import { FORM_TR, ROUTE_TR, formTr } from './seo-tr';
import namesFa from './names.fa.json';
import namesZh from './names.zh.json';
import namesTr from './names.tr.json';
import excZh from './excipients.zh.json';
import excFnZh from './excipient-functions.zh.json';
import excTr from './excipients.tr.json';
import excFa from './excipients.fa.json';
import excFnFa from './excipient-functions.fa.json';
import excFnTr from './excipient-functions.tr.json';
import { parseFdf } from './fdf-parse';

export const pagesL = { fa: pagesFa, zh: pagesZh, tr: pagesTr } as const;
export const regulatoryL: Record<Lang, typeof regEn> = { en: regEn, fa: regFa as unknown as typeof regEn, zh: regZh as unknown as typeof regEn, tr: regTr as unknown as typeof regEn };
export const portfolioL = { fa: portfolioFa, zh: portfolioZh, tr: portfolioTr } as unknown as Record<'fa' | 'zh' | 'tr', typeof portfolioFa>;
export const FORM_L: Record<'fa' | 'zh' | 'tr', Record<string, string>> = { fa: FORM_FA, zh: FORM_ZH, tr: FORM_TR };
export const ROUTE_L: Record<'fa' | 'zh' | 'tr', Record<string, string>> = { fa: ROUTE_FA, zh: ROUTE_ZH, tr: ROUTE_TR };
export const formL: Record<'fa' | 'zh' | 'tr', (form: string, route?: string) => string> = { fa: formFa, zh: formZh, tr: formTr };
const names: Record<'fa' | 'zh' | 'tr', Record<string, string>> = { fa: namesFa, zh: namesZh, tr: namesTr };

/** Localised substance / product name, matched case-insensitively; '' when unknown or English. */
const lower: Partial<Record<'fa' | 'zh' | 'tr', Map<string, string>>> = {};
export function locName(lang: Lang, name: string): string {
  if (lang === 'en' || !name) return '';
  const m = (lower[lang] ??= new Map(Object.entries(names[lang]).map(([k, v]) => [k.toLowerCase(), v])));
  return names[lang][name] || m.get(name.toLowerCase()) || '';
}

/** Localised name for a catalogue row: FDF product (ingredient, combinations joined), API substance, or excipient. */
const excNames: Partial<Record<'fa' | 'zh' | 'tr', Record<string, string>>> = { fa: excFa as Record<string, string>, zh: excZh as Record<string, string>, tr: excTr as Record<string, string> };
const excFns: Partial<Record<'fa' | 'zh' | 'tr', Record<string, string>>> = { fa: excFnFa as Record<string, string>, zh: excFnZh as Record<string, string>, tr: excFnTr as Record<string, string> };
const excLowerCache: Partial<Record<string, Record<string, string>>> = {};
const excLower = (lang: 'fa' | 'zh' | 'tr') => (excLowerCache[lang] ??= Object.fromEntries(Object.entries(excNames[lang] || {}).map(([k, v]) => [k.toLowerCase(), v])));
export function catalogueName(lang: Lang, type: 'fdf' | 'api' | 'exc', name: string): string {
  if (lang === 'en') return '';
  if (type === 'exc') { const m = excNames[lang]; if (!m) return ''; return m[name] || excLower(lang)[name.toLowerCase()] || locName(lang, name); }
  if (type === 'api') return locName(lang, name);
  const p = parseFdf(name);
  const whole = locName(lang, p.ingredient);
  if (whole) return whole;
  if (p.ingredients.length > 1) {
    const parts = p.ingredients.map(i => locName(lang, i));
    if (parts.every(Boolean)) return parts.join(lang === 'zh' ? '/' : ' / ');
  }
  return '';
}
export function excipientFunction(lang: Lang, fn: string): string {
  if (lang === 'en' || !fn) return fn;
  return excFns[lang]?.[fn] || fn;
}
