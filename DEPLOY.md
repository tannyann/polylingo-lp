# PolyLingo LP — 本番デプロイ手順

## 前提

- GitHub: [tannyann/polylingo-lp](https://github.com/tannyann/polylingo-lp)
- Vercel アカウント
- Supabase プロジェクト
- Resend API キー（確認メール用）

---

## Step 1: Supabase テーブル作成

1. [Supabase Dashboard](https://supabase.com/dashboard) → プロジェクト → **SQL Editor**
2. `supabase/migrations/001_signups.sql` の内容を貼り付けて **Run**

またはローカルで:

```bash
# DATABASE_URL は Supabase → Settings → Database → Connection string (URI)
export DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres"
./scripts/setup-supabase.sh
```

3. **Settings → API** から以下を控える:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role → `SUPABASE_SERVICE_ROLE_KEY`（サーバー専用・公開禁止）

---

## Step 2: 環境変数

`.env.local`（ローカル）および Vercel Dashboard → Settings → Environment Variables:

| Key | 例 |
|-----|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` |
| `RESEND_API_KEY` | `re_...` |
| `RESEND_FROM_EMAIL` | `PolyLingo <noreply@polylingo.app>` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | `polylingo.app` |

---

## Step 3: Vercel デプロイ

### 方法 A — Git 連携（推奨）

1. [vercel.com/new](https://vercel.com/new) → Import `tannyann/polylingo-lp`
2. **Root Directory** = `.`（リポジトリルート）
3. Environment Variables を Step 2 の通り設定
4. Deploy

### 方法 B — CLI

```bash
npx vercel login          # ブラウザで認証（1回のみ）
./scripts/deploy-vercel.sh
```

---

## Step 4: カスタムドメイン

Vercel → Project → **Domains** → `polylingo.app` を追加。

DNS（お名前.com 等）:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

---

## Step 5: 動作確認

```bash
# LP
curl -I https://polylingo.app

# 登録 API
curl -X POST https://polylingo.app/api/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","mother_tongue":"日本語","target_languages":["en","de"]}'
```

Supabase → **Table Editor** → `signups` に行が追加されることを確認。

Resend Dashboard で確認メール送信を確認。

---

## トラブルシュート

| 症状 | 対処 |
|------|------|
| `503 Supabase が未設定` | Vercel の env vars を再デプロイ |
| `409 既に登録` | 正常（unique email） |
| RLS エラー | `001_signups.sql` の policy を再実行 |
| メール未送信 | Resend の from ドメイン認証を確認 |
