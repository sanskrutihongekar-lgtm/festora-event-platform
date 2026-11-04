# FESTORA 2027 – Event Management Platform

Complete event website + administration dashboard for **FESTORA – The Grand Food & Carnival Festival** (12–15 January 2027, Belagavi).

Built for college students who need to deploy without using a terminal.

---

## What is included (Foundation)

- Next.js (App Router) + TypeScript + Tailwind CSS
- Full Prisma schema for Neon PostgreSQL (users, roles, events, registrations, tickets, QR, SPOCs, stalls, speakers, emails, reminders, audit logs, etc.)
- Authentication (JWT cookie sessions) + role-based access control skeleton
- Seed data pre-filled with FESTORA 2027 details + Super Admin account
- Public home page with festival branding
- Environment variable template
- Vercel configuration (no cron jobs)
- Student-friendly deployment path (GitHub web upload → Vercel)

**Still to be expanded:** full registration form engine, ticket + QR generation API, scanner UI, complete admin CRUD modules, Resend email flows, SPOC assignment UI, dynamic page content editor.

---

## Student deployment steps (no terminal required)

### 1. This repository is already on GitHub
You can import it directly into Vercel.

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New… → Project**.
3. Import the repository `festora-event-platform`.
4. Leave the default settings (Framework: Next.js).
5. **Before deploying**, open **Environment Variables** and add the required ones (see below).
6. Click **Deploy**.

### 3. Required environment variables

| Variable | Required? | How to get it |
|----------|-----------|---------------|
| `DATABASE_URL` | Yes | Create a free project at [neon.tech](https://neon.tech) → copy the connection string |
| `AUTH_SECRET` | Yes | Any long random string (min 32 characters) |
| `NEXT_PUBLIC_APP_URL` | Yes | Your Vercel URL, e.g. `https://festora-event-platform.vercel.app` |
| `RESEND_API_KEY` | For emails | [resend.com](https://resend.com) → API Keys |
| `RESEND_FROM_EMAIL` | For emails | A verified sender on Resend |
| `RESEND_FROM_NAME` | Optional | e.g. `FESTORA 2027` |

After the first successful deploy you still need to push the database schema and seed data. A one-time browser setup page will be added in a later version. For now a developer can run:

```
npx prisma db push
npx tsx prisma/seed.ts
```

### 4. First login
- URL: `https://your-app.vercel.app/admin`
- Email: `admin@festora.in`
- Password: `FestoraAdmin2027!`

**Change this password immediately.**

---

## Local development (for developers only)

```bash
npm install
cp .env.example .env
# fill DATABASE_URL and AUTH_SECRET
npx prisma db push
npx tsx prisma/seed.ts
npm run dev
```

---

Built for FESTORA 2027 · Belagavi
