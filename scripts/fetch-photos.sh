#!/usr/bin/env bash
# Downloads the photographs listed in scripts/photos.txt into public/photos (skips files that exist).
# Photos are from Unsplash and used under the Unsplash License (https://unsplash.com/license).
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/photos
changed=0
while IFS='|' read -r name id credit; do
  name="$(echo "$name" | xargs)"; id="$(echo "$id" | xargs)"
  [[ -z "$name" || "$name" == \#* ]] && continue
  for variant in "1800:" "900:-900"; do
    w="${variant%%:*}"; suffix="${variant#*:}"
    out="public/photos/${name%.jpg}${suffix}.jpg"
    if [[ ! -s "$out" ]]; then
      echo "fetching $out"
      curl -fsSL "https://images.unsplash.com/${id}?w=${w}&q=72&fm=jpg&fit=max&auto=format" -o "$out"
      changed=1
    fi
  done
done < scripts/photos.txt
{ echo "Photographs in this folder are from Unsplash (https://unsplash.com/license)."; echo; grep -v '^#' scripts/photos.txt | awk -F'|' '{gsub(/ /,"",$1); print $1" — "$3}'; } > public/photos/CREDITS.txt
echo "changed=$changed" >> "${GITHUB_OUTPUT:-/dev/null}"
