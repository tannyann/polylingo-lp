# PolyLingo — Landing Page

Next.js 14 (App Router) + Tailwind CSS 事前登録 LP for [PolyLingo](https://polylingo.app).

**Repository:** [tannyann/polylingo-lp](https://github.com/tannyann/polylingo-lp)

## Setup

```bash
git clone https://github.com/tannyann/polylingo-lp.git
cd polylingo-lp
npm install
cp .env.example .env.local
# .env.local を編集
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Recommended | Server-side signup insert |
| `RESEND_API_KEY` | Yes (prod) | Confirmation email |
| `RESEND_FROM_EMAIL` | Yes (prod) | Sender address |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional | Plausible analytics |

## Deploy to Vercel

See [DEPLOY.md](./DEPLOY.md) for full instructions.

1. Import [tannyann/polylingo-lp](https://github.com/tannyann/polylingo-lp) on Vercel
2. **Root Directory** = `.` (repository root — no subdirectory)
3. Set environment variables
4. Add domain `polylingo.app`

```bash
npx vercel login
./scripts/deploy-vercel.sh
```

## Structure

```
├── app/                  # App Router, API routes, OG image
├── components/           # Section components
├── emails/               # React Email templates
├── lib/                  # copy, analytics, supabase, constructs
├── data/                 # constructs_month1.json
└── vercel.json           # Deploy config (region, headers)
```
