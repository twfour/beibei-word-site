#!/usr/bin/env bash
set -Eeuo pipefail

APP_BASE="${APP_BASE:-/opt/changzheng}"
SSH_TARGET="${SSH_TARGET:-root@101.37.82.5}"
SSH_KEY_FILE="${SSH_KEY_FILE:-$HOME/.ssh/flower_position_aliyun_ed25519}"
RELEASE_ID="${RELEASE_ID:-$(date +%Y%m%d%H%M%S)}"
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ARCHIVE="/tmp/changzheng-${RELEASE_ID}.tar.gz"

tar --exclude deploy --exclude .DS_Store -czf "$ARCHIVE" -C "$PROJECT_ROOT" .
ssh -i "$SSH_KEY_FILE" -o BatchMode=yes "$SSH_TARGET" "mkdir -p '$APP_BASE/releases/$RELEASE_ID'"
scp -i "$SSH_KEY_FILE" -o BatchMode=yes "$ARCHIVE" "$SSH_TARGET:/tmp/changzheng-${RELEASE_ID}.tar.gz"

ssh -i "$SSH_KEY_FILE" -o BatchMode=yes "$SSH_TARGET" bash -s -- "$APP_BASE" "$RELEASE_ID" <<'REMOTE'
set -Eeuo pipefail
APP_BASE="$1"
RELEASE_ID="$2"
ARCHIVE="/tmp/changzheng-${RELEASE_ID}.tar.gz"
RELEASE_DIR="$APP_BASE/releases/$RELEASE_ID"
tar -xzf "$ARCHIVE" -C "$RELEASE_DIR"
rm -f "$ARCHIVE"
chown -R root:root "$RELEASE_DIR"
find "$RELEASE_DIR" -type d -exec chmod 755 {} +
find "$RELEASE_DIR" -type f -exec chmod 644 {} +
ln -sfn "$RELEASE_DIR" "$APP_BASE/current.next"
mv -Tf "$APP_BASE/current.next" "$APP_BASE/current"
REMOTE

rm -f "$ARCHIVE"
echo "Deployed release $RELEASE_ID to https://chinese.qinyibin.com/changzheng/"
