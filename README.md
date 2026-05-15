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
| `yarn dev`    | Start dev server (Turbopack)   |
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

After the first deploy, in Clerk go to **Configure → Domains** and add your Vercel URL (e.g. `https://sidehustlehub.vercel.app` and any custom domain).

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
