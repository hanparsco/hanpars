/** Translated product information and molecule descriptions per language (English is the source). */
import infoFa from './fdf-info.fa.json';
import infoZh from './fdf-info.zh.json';
import infoTr from './fdf-info.tr.json';
import molFa from './molecules.fa.json';
import molZh from './molecules.zh.json';
import molTr from './molecules.tr.json';
type Info = Record<string, Record<string, string>>;
export const infoL: Record<'fa' | 'zh' | 'tr', Info> = { fa: infoFa as Info, zh: infoZh as Info, tr: infoTr as Info };
export const molDescL: Record<'fa' | 'zh' | 'tr', Record<string, string>> = { fa: molFa, zh: molZh, tr: molTr };
