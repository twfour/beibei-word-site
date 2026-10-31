#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="${TARGET:-/srv/www/chinese-writing}"
STAMP="$(date +%Y%m%d%H%M%S)"
RELEASE="$TARGET/releases/$STAMP"
mkdir -p "$RELEASE"
cp "$ROOT/index.html" "$ROOT/styles.css" "$ROOT/app.js" "$ROOT/questions.json" "$RELEASE/"
ln -sfn "$RELEASE" "$TARGET/current"
echo "Deployed release $STAMP to https://chinese.qinyibin.com/writing/"
