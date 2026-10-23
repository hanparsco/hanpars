"""Partition Noto Sans SC / Noto Serif SC (official Google Fonts files from the Hanpars Chinese font pack) into
unicode-range WOFF2 slices for the Chinese pages. Every slice is a cut of the full font; the character set is the
characters used on the Chinese pages + GB2312 level-1 (3,755 common characters) + Latin/punctuation.
Weights: Sans keeps a variable 400–600 range (body 400, UI 500/600), Serif is instanced at 600 (headings only).
Usage: python3 scripts/make-noto-sc.py <pack-dir> <zh-chars.json>   (needs fontTools + brotli)"""
import json, os, sys
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
PACK, CHARS = sys.argv[1], sys.argv[2]
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'fonts', 'noto-sc')
os.makedirs(OUT, exist_ok=True)
for f in os.listdir(OUT):
    if f.endswith('.woff2') or f == 'noto-sc.css': os.remove(os.path.join(OUT, f))
used = [c for c, _ in json.load(open(CHARS))]
level1 = []
for hi in range(0xB0, 0xD8):
    for lo in range(0xA1, 0xFF):
        try: level1.append(bytes([hi, lo]).decode('gb2312'))
        except UnicodeDecodeError: pass
base = [chr(c) for c in range(0x20, 0x7F)] + [chr(c) for c in range(0xA0, 0x180)] + list('–—‘’“”…·•→←✓°±×µμ®™€～（）：；，。、？！《》「」【】％℃')
def ranges(chars):
    cps = sorted(ord(c) for c in chars); out = []; start = prev = cps[0]
    for c in cps[1:]:
        if c == prev + 1: prev = c; continue
        out.append((start, prev)); start = prev = c
    out.append((start, prev))
    return ','.join(f'U+{a:X}' if a == b else f'U+{a:X}-{b:X}' for a, b in out)
css = ['/* Noto Sans SC + Noto Serif SC (SIL OFL 1.1, official Google Fonts files), partitioned for the Chinese pages by scripts/make-noto-sc.py */']
for fam, alias, src, axis, weight in (
    ('sans', 'Hanpars Noto Sans SC', 'Noto-Sans-SC/Desktop/NotoSansSC-Variable.ttf', {'wght': (400, 600)}, '400 600'),
    ('serif', 'Hanpars Noto Serif SC', 'Noto-Serif-SC/Desktop/NotoSerifSC-Variable.ttf', {'wght': 600}, '600'),
):
    font = TTFont(os.path.join(PACK, src))
    font = instancer.instantiateVariableFont(font, axis)
    cmap = font.getBestCmap()
    order, seen = [], set()
    for ch in base + used + level1:
        if ch not in seen and ord(ch) in cmap: seen.add(ch); order.append(ch)
    first = len([c for c in base if ord(c) in cmap]) + 400
    slices = [order[:first]] + [order[i:i + 400] for i in range(first, len(order), 400)]
    tmp = os.path.join(OUT, f'_{fam}.ttf'); font.save(tmp)
    total = 0
    for i, chars in enumerate(slices):
        o = subset.Options(); o.flavor = 'woff2'; o.layout_features = ['*']; o.name_IDs = ['*']; o.hinting = False; o.notdef_outline = True
        f = subset.load_font(tmp, o); s = subset.Subsetter(o); s.populate(unicodes=[ord(c) for c in chars]); s.subset(f)
        path = os.path.join(OUT, f'{fam}-{i:02d}.woff2'); subset.save_font(f, path, o); total += os.path.getsize(path)
        css.append(f"@font-face {{ font-family:'{alias}'; font-style:normal; font-weight:{weight}; font-display:swap; src:url('/fonts/noto-sc/{fam}-{i:02d}.woff2') format('woff2'); unicode-range:{ranges(chars)}; }}")
    os.remove(tmp)
    print(fam, 'slices', len(slices), 'chars', len(order), 'total KB', total // 1024)
open(os.path.join(OUT, 'noto-sc.css'), 'w').write('\n'.join(css) + '\n')
