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
