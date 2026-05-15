# SideHustleHub

Marketplace for side hustles — connect people who want work done with people ready to do it.

## Getting started

Install dependencies:

```bash
yarn install
```

Copy environment variables and add your Clerk keys (optional for local dev — Clerk keyless mode works without keys):

```bash
cp .env.example .env.local
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Localhost troubleshooting

If the app errors or auth redirects fail locally:

1. **Use port 3000** — `yarn dev` binds to `3000`. If you see “port in use”, stop the other process: `lsof -ti:3000 | xargs kill -9`
2. **Clear the Next.js cache** — `yarn dev:clean` (fixes missing `.next` manifest errors)
3. **Clerk domains** — In [Clerk Dashboard](https://dashboard.clerk.com/) → **Configure → Domains**, add `http://localhost:3000`
4. **Env file** — Prefer `.env.local` for secrets (copy from `.env.example`). Restart the dev server after changing env vars.

## Jobs platform (scaffold)

| Route | Description |
| ----- | ----------- |
| `/jobs` | Browse open jobs (public) |
| `/jobs/new` | Post a job (sign in required) |
| `/jobs/[id]` | Job detail + poster applications |
| `/jobs/[id]/apply` | Apply to a job (sign in required) |
| `/dashboard` | Your posted jobs and applications |

Data is stored **in memory** for now (resets on server restart). Replace `src/lib/jobs/store.ts` with a database (e.g. Supabase) for production.

Full product backlog (posters, workers, payments, trust, admin): [docs/PRODUCT-FEATURES.md](docs/PRODUCT-FEATURES.md).

## Auth (Clerk)

| Route        | Description                    |
| ------------ | ------------------------------ |
| `/sign-up`   | Create account                 |
| `/sign-in`   | Sign in                        |
| `/dashboard` | Protected user dashboard       |

Get API keys from the [Clerk Dashboard](https://dashboard.clerk.com/) and add them to `.env.local`. Without keys, Clerk runs in keyless dev mode when you start the app.

## Scripts

| Command       | Description                    |
| ------------- | ------------------------------ |
| `yarn dev`    | Start dev server on port 3000  |
| `yarn dev:clean` | Clear `.next` cache and start dev |
| `yarn build`  | Production build               |
| `yarn start`  | Serve production build         |
| `yarn lint`   | Run ESLint                     |

## Deploy on Vercel

This repo is ready for [Vercel](https://vercel.com). Next.js is auto-detected; `vercel.json` sets `yarn install` and `yarn build`.

### Option A — GitHub (recommended)

1. Push this repo to GitHub (`main` branch).
2. Open [vercel.com/new](https://vercel.com/new) and **Import** `Kasibhussain/Sidehustlehub`.
3. Leave **Framework Preset** as Next.js and **Root Directory** as `.`
4. Add **Environment Variables** (Production, Preview, and Development):

   | Name | Value |
   | ---- | ----- |
   | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | From [Clerk Dashboard](https://dashboard.clerk.com/) → API Keys |
   | `CLERK_SECRET_KEY` | From Clerk → API Keys (secret) |
   | `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
   | `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` |
   | `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/dashboard` |
   | `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/dashboard` |
   | `NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL` | `/dashboard` |
   | `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL` | `/dashboard` |

5. Click **Deploy**.

After the first deploy, in Clerk go to **Configure → Domains** and add your Vercel URL (e.g. `https://your-app.vercel.app` and any custom domain).

### `MIDDLEWARE_INVOCATION_FAILED` (500 on Vercel)

This almost always means **Clerk env vars are missing or wrong** on Vercel:

1. Vercel → your project → **Settings → Environment Variables**
2. Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` from [Clerk API Keys](https://dashboard.clerk.com/~/api-keys)
3. Enable them for **Production**, **Preview**, and **Development**
4. Add the path variables from the table above (`/sign-in`, `/sign-up`, etc.)
5. **Redeploy** (Deployments → ⋯ → Redeploy) — env changes do not apply to old deployments
6. In Clerk → **Configure → Domains**, add your live URL: `https://<your-project>.vercel.app`

Copy keys exactly (no quotes, no trailing spaces). The build will fail with a clear error if required keys are missing on Vercel.

### Option B — Vercel CLI

```bash
yarn global add vercel   # or: npm i -g vercel
vercel login
vercel link              # link to a new or existing project
vercel env pull .env.local   # optional: pull env from Vercel
vercel --prod
```

Set the same Clerk variables with `vercel env add` or in the [Vercel project settings](https://vercel.com/docs/projects/environment-variables).

## Stack

- [Next.js 15](https://nextjs.org) (App Router)
- [Clerk](https://clerk.com) authentication
- [Vercel](https://vercel.com) hosting
- React 19
- TypeScript
