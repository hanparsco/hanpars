/** True when a finished-product page has real product information (an FDA label match or an editorial entry).
 *  Pages without it only say "information is being prepared" and are kept out of the index (noindex, follow). */
import info from './fdf-info.json';
import editorial from './fdf-editorial.json';
import { parseFdf, infoKey, labelUsable } from './fdf-parse';
export function fdfHasInfo(entry: { name: string }): boolean {
  const p = parseFdf(entry.name);
  const infos = info as Record<string, any>;
  const comboKey = p.ingredients.length > 1 ? p.ingredients.map(i => infoKey(i)).sort().join(' + ') : '';
  const keys = [...(comboKey ? [comboKey] : []), ...(p.ingredients.length > 1 ? [] : p.ingredients.map(i => infoKey(i)))];
  if (keys.some(k => labelUsable(k, infos[k], p as any))) return true;
  return !!(editorial as Record<string, any>)[comboKey || infoKey(p.ingredient)];
}
