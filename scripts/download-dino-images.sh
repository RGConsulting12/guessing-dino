#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/dinos"
mkdir -p "$OUT"
SLEEP="${SLEEP_SECONDS:-1.5}"

fetch_wikipedia() {
  local id="$1"
  local title="$2"
  local out="$OUT/${id}.jpg"
  if [[ -f "$out" && $(stat -c%s "$out") -gt 10000 ]]; then
    echo "skip $id"
    return 0
  fi
  sleep "$SLEEP"
  local raw url
  raw=$(curl -fsSL "https://en.wikipedia.org/api/rest_v1/page/summary/${title}" \
    | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('thumbnail',{}).get('source',''))") || true
  if [[ -z "$raw" ]]; then
    echo "no-thumb $id"
    return 1
  fi
  url=$(python3 - <<PY
import re
raw = """$raw"""
print(re.sub(r"/\d+px-", "/960px-", raw.split("?", 1)[0]))
PY
)
  sleep 0.5
  if curl -fsSL "$url" -o "$out"; then
    echo "ok  $id"
  else
    echo "fail $id"
    return 1
  fi
}

while read -r id title; do
  fetch_wikipedia "$id" "$title" || true
done <<'EOF'
easy-trex Tyrannosaurus
easy-triceratops Triceratops
easy-stegosaurus Stegosaurus
easy-brachiosaurus Brachiosaurus
easy-velociraptor Velociraptor
easy-ankylosaurus Ankylosaurus
easy-parasaurolophus Parasaurolophus
easy-diplodocus Diplodocus
easy-spinosaurus Spinosaurus
easy-allosaurus Allosaurus
easy-iguanodon Iguanodon
easy-pachycephalosaurus Pachycephalosaurus
medium-apatosaurus Apatosaurus
medium-camarasaurus Camarasaurus
medium-styracosaurus Styracosaurus
medium-protoceratops Protoceratops
medium-deinonychus Deinonychus
medium-baryonyx Baryonyx
medium-carnotaurus Carnotaurus
medium-giganotosaurus Giganotosaurus
medium-edmontosaurus Edmontosaurus
medium-corythosaurus Corythosaurus
medium-therizinosaurus Therizinosaurus
medium-maiasaura Maiasaura
hard-utahraptor Utahraptor
hard-suchomimus Suchomimus
hard-dilophosaurus Dilophosaurus
hard-ceratosaurus Ceratosaurus
hard-archaeopteryx Archaeopteryx
hard-microraptor Microraptor
hard-compsognathus Compsognathus
hard-oviraptor Oviraptor
hard-gallimimus Gallimimus
hard-struthiomimus Struthiomimus
hard-kentrosaurus Kentrosaurus
hard-pentaceratops Pentaceratops
EOF

if [[ ! -f "$OUT/placeholder.jpg" ]]; then
  cp "$OUT/easy-trex.jpg" "$OUT/placeholder.jpg" 2>/dev/null || true
fi

echo "Images ready in $OUT"
ls "$OUT" | wc -l
