#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/dinos"

fetch_one() {
  local id="$1" title="$2"
  local out="$OUT/${id}.jpg"
  [[ -f "$out" && $(stat -c%s "$out") -gt 5000 ]] && { echo "skip $id"; return 0; }
  sleep 4
  local raw
  raw=$(curl -fsSL "https://en.wikipedia.org/api/rest_v1/page/summary/${title}" \
    | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('thumbnail',{}).get('source',''))" 2>/dev/null || true)
  if [[ -z "$raw" ]]; then echo "fail-api $id"; return 1; fi
  local url
  url=$(python3 -c "import re; raw='''$raw'''; print(re.sub(r'/\d+px-', '/960px-', raw.split('?',1)[0]))")
  sleep 1
  curl -fsSL "$url" -o "$out" && echo "ok $id" || { echo "fail-dl $id"; return 1; }
}

while read -r id title; do fetch_one "$id" "$title" || true; done <<'EOF'
easy-parasaurolophus Parasaurolophus
easy-diplodocus Diplodocus
easy-iguanodon Iguanodon
easy-pachycephalosaurus Pachycephalosaurus
medium-camarasaurus Camarasaurus
medium-styracosaurus Styracosaurus
medium-baryonyx Baryonyx
medium-corythosaurus Corythosaurus
medium-maiasaura Maiasaura
hard-suchomimus Suchomimus
hard-ceratosaurus Ceratosaurus
hard-microraptor Microraptor
hard-oviraptor Oviraptor
hard-struthiomimus Struthiomimus
hard-pentaceratops Pentaceratops
EOF

PLACEHOLDER="$OUT/placeholder.jpg"
for id in easy-parasaurolophus easy-diplodocus easy-iguanodon easy-pachycephalosaurus medium-camarasaurus medium-styracosaurus medium-baryonyx medium-corythosaurus medium-maiasaura hard-suchomimus hard-ceratosaurus hard-microraptor hard-oviraptor hard-struthiomimus hard-pentaceratops; do
  out="$OUT/${id}.jpg"
  if [[ ! -f "$out" || $(stat -c%s "$out") -lt 5000 ]]; then
    cp "$PLACEHOLDER" "$out"
    echo "placeholder $id"
  fi
done
