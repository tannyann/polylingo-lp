#!/usr/bin/env bash
# Deploy PolyLingo LP to Vercel (production)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env.local ]]; then
  echo "Warning: .env.local not found. Copy .env.example and fill in values."
  echo "Set env vars in Vercel Dashboard before production traffic."
fi

echo "Deploying from $ROOT ..."
npx vercel deploy --prod --yes

echo ""
echo "Next: add custom domain polylingo.app in Vercel Dashboard → Domains"
