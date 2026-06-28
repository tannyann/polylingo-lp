#!/usr/bin/env bash
# Apply signups migration to Supabase via Management API or psql.
# Requires: SUPABASE_ACCESS_TOKEN, SUPABASE_PROJECT_REF (or DATABASE_URL)
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MIGRATION="$SCRIPT_DIR/../supabase/migrations/001_signups.sql"

if [[ -n "${DATABASE_URL:-}" ]]; then
  echo "Applying migration via DATABASE_URL..."
  psql "$DATABASE_URL" -f "$MIGRATION"
  echo "Done."
  exit 0
fi

if command -v supabase &>/dev/null && [[ -n "${SUPABASE_PROJECT_REF:-}" ]]; then
  echo "Run this SQL in Supabase Dashboard → SQL Editor:"
  echo "  https://supabase.com/dashboard/project/${SUPABASE_PROJECT_REF}/sql/new"
  echo ""
  cat "$MIGRATION"
  exit 0
fi

echo "Set DATABASE_URL or open Supabase SQL Editor and paste:"
echo ""
cat "$MIGRATION"
