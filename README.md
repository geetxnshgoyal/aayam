# AAYAM 2026

**Step Beyond the Known** — Official website for AAYAM 2026, the techfest by [Newton School of Technology](https://www.newtonschool.co), Bengaluru.

April 24–25, 2026 • NST S-VYASA University, Bengaluru • ₹2L+ Prize Pool

## Features

- **Public site** — Home, Competitions, About, Gallery, Sponsors
- **Ambassador program** — Register, earn points, complete tasks, convert points to signups
- **Admin dashboard** — Approve ambassadors, manage signups, create tasks, bulk upload
- **COMICO theme** — Retro comic-style design with Ben-Day dots and speed lines

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** Firebase Firestore
- **Auth:** JWT (admin + ambassador)
- **Email:** Nodemailer (SMTP)
- **Styling:** Tailwind CSS 4

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/aayam.git
cd aayam

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your values (see Environment Variables below)
```

### Environment Variables

Create `.env.local` with:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Site base URL (optional) |
| `JWT_SECRET` | JWT signing key (min 32 chars in production) |
| `FIREBASE_PROJECT_ID` | Firebase project ID |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email |
| `FIREBASE_PRIVATE_KEY` | Firebase private key (use `\n` for newlines) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Email (ambassador approvals) |
| `ADMIN_SEED_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | For one-time admin seed |

See `.env.example` for the full template.

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

### Deployment (Vercel)

Set these environment variables in **Vercel → Project → Settings → Environment Variables**:

| Variable | Required | Notes |
|----------|----------|-------|
| `JWT_SECRET` | **Yes** | Min 32 chars. Generate: `openssl rand -base64 32` |
| `FIREBASE_PROJECT_ID` | Yes | From Firebase Console |
| `FIREBASE_CLIENT_EMAIL` | Yes | Service account email |
| `FIREBASE_PRIVATE_KEY` | Yes | Full key with `\n` for newlines |
| `SMTP_*` | Yes | For ambassador emails |
| `ADMIN_SEED_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Yes | For admin seed |
| `NEXT_PUBLIC_SITE_URL` | Optional | e.g. `https://www.aayamfest.com` |

**Important:** `JWT_SECRET` must be set in production or ambassador/admin login will fail with 500.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (pages)/            # Public pages
│   ├── admin/              # Admin login & dashboard
│   ├── ambassador/         # Ambassador register, login, dashboard
│   └── api/                # API routes
├── components/             # React components
├── lib/                    # Utilities, Firebase, auth, email
├── public/                 # Static assets
└── scripts/                # One-time scripts (seed, migration)
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Firestore Collections

- `ambassadors` — Ambassador registrations
- `admin_users` — Admin accounts
- `signups` — Participant signups (linked to ambassadors)
- `tasks` — Ambassador tasks
- `task_submissions` — Task submissions
- `ambassador_points` — Points ledger

Deploy indexes: `firebase deploy --only firestore:indexes`

## License

Private — Newton School of Technology
