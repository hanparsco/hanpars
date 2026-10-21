interface ArticleText { excerpt:string; content:string; title:string; }

function plainText(html:string):string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&#x([0-9a-f]+);/gi, (_, code:string) => String.fromCodePoint(parseInt(code,16)))
    .replace(/&#([0-9]+);/g, (_, code:string) => String.fromCodePoint(parseInt(code,10)))
    .replace(/&nbsp;/gi,' ')
    .replace(/&amp;/gi,'&')
    .replace(/&lt;/gi,'<')
    .replace(/&gt;/gi,'>')
    .replace(/&quot;/gi,'"')
    .replace(/&apos;|&#39;/gi,"'")
    .replace(/&ndash;/gi,'–')
    .replace(/&mdash;/gi,'—')
    .replace(/&hellip;/gi,'…')
    .replace(/\s+/g,' ')
    .trim();
}

export function articleSummary(article:ArticleText):string {
  if (article.excerpt.trim()) return plainText(article.excerpt);
  const firstParagraph = article.content.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i)?.[1];
  return plainText(firstParagraph || article.content).slice(0,300) || `Read the dated Hanpars archive article: ${article.title}.`;
}
