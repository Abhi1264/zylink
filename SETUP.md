# Solo Link Setup & Deployment Guide

Complete guide for setting up Solo Link locally and deploying to production.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [Database Configuration](#database-configuration)
- [Environment Variables](#environment-variables)
- [Google OAuth Setup](#google-oauth-setup) - See [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md)
- [Local Subdomain Testing](#local-subdomain-testing)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Commands Reference](#commands-reference)
- [API Reference](#api-reference)

---

## Prerequisites

Before you begin, ensure you have:

- Node.js 18 or higher installed
- npm or pnpm package manager
- PostgreSQL database (we recommend [Supabase](https://supabase.com) - free tier available)
- A code editor (VS Code recommended)

---

## Quick Start

Get up and running in 5 minutes:

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 3. Generate auth secret
openssl rand -base64 32
# Add to .env.local as BETTER_AUTH_SECRET

# 4. Initialize database
npm run db:push

# 5. Start development server
npm run dev

# 6. Open browser
open http://localhost:3000
```

Create your first account and start adding links!

---

## Detailed Setup

### Step 1: Database Setup

#### Using Supabase (Recommended - Free Tier)

1. Go to [supabase.com](https://supabase.com) and sign up
2. Click "New Project"
3. Fill in project details:
   - **Name**: Solo Link (or your choice)
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to you
4. Wait for project creation (~2 minutes)
5. Go to **Project Settings** → **Database**
6. Copy the **Connection String** (URI format)
7. Save for the next step

**Alternative Database Providers:**

- [Neon](https://neon.tech) - Serverless Postgres
- [Railway](https://railway.app) - All-in-one platform
- [DigitalOcean](https://digitalocean.com) - Managed databases
- Local PostgreSQL installation

### Step 2: Environment Configuration

Create `.env.local` file in the project root:

```env
# Database (REQUIRED)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@[YOUR-HOST]:5432/postgres

# Auth Secret (REQUIRED - generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET=your-generated-secret-here
BETTER_AUTH_URL=http://localhost:3000

# App URLs (REQUIRED)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ROOT_DOMAIN=localhost:3000

# OAuth Providers (OPTIONAL)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Analytics (OPTIONAL)
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Generate Auth Secret:**

```bash
openssl rand -base64 32
```

Copy the output and paste as `BETTER_AUTH_SECRET` in `.env.local`.

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Initialize Database

Push the schema to your database:

```bash
npm run db:push
```

You should see: `✓ Changes applied successfully`

**Verify in Supabase:**

- Go to **Table Editor**
- You should see `users` and `links` tables

### Step 5: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and create your first account!

---

## Database Configuration

### Schema Overview

The application uses two main tables:

**Users Table:**

- `id` (text, primary key)
- `email` (text, unique, not null)
- `username` (text, unique, not null)
- `image` (text, nullable)
- `createdAt` (timestamp, not null)

**Links Table:**

- `id` (serial, primary key)
- `userId` (text, foreign key → users.id, cascade delete)
- `title` (text, not null)
- `url` (text, not null)
- `order` (integer, not null, default 0)
- `isEnabled` (boolean, not null, default true)
- `clicks` (integer, not null, default 0)
- `createdAt` (timestamp, not null)

### Migration Scripts

```bash
# Development: Push schema changes directly
npm run db:push

# Production: Generate and run migrations
npm run db:generate
npm run db:migrate

# Database GUI
npm run db:studio
```

### Connection Pooling

For production, use connection pooling:

- **Supabase**: Use pooler connection string (port 6543)
- **Self-hosted**: Use PgBouncer

---

## Environment Variables

### Required Variables

| Variable                  | Description                  | Example                                 |
| ------------------------- | ---------------------------- | --------------------------------------- |
| `DATABASE_URL`            | PostgreSQL connection string | `postgresql://user:pass@host:5432/db`   |
| `BETTER_AUTH_SECRET`      | Random secret (32+ chars)    | Generate with `openssl rand -base64 32` |
| `BETTER_AUTH_URL`         | App URL for auth             | `http://localhost:3000`                 |
| `NEXT_PUBLIC_APP_URL`     | Public app URL               | `http://localhost:3000`                 |
| `NEXT_PUBLIC_ROOT_DOMAIN` | Your domain                  | `localhost:3000`                        |

### Optional Variables

**OAuth Providers:**

| Variable               | How to Get                                                          |
| ---------------------- | ------------------------------------------------------------------- |
| `GOOGLE_CLIENT_ID`     | [Google Cloud Console](https://console.cloud.google.com)            |
| `GOOGLE_CLIENT_SECRET` | Google Cloud Console                                                |
| `GITHUB_CLIENT_ID`     | [GitHub Developer Settings](https://github.com/settings/developers) |
| `GITHUB_CLIENT_SECRET` | GitHub Developer Settings                                           |

**Analytics:**

| Variable                   | How to Get                               |
| -------------------------- | ---------------------------------------- |
| `NEXT_PUBLIC_POSTHOG_KEY`  | [PostHog Dashboard](https://posthog.com) |
| `NEXT_PUBLIC_POSTHOG_HOST` | Usually `https://app.posthog.com`        |

### OAuth Setup

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `https://yourdomain.com/api/auth/callback/google`
6. Copy Client ID and Secret to `.env.local`

#### GitHub OAuth

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create new OAuth App
3. Authorization callback URL: `https://yourdomain.com/api/auth/callback/github`
4. Copy Client ID and Secret to `.env.local`

---

## Local Subdomain Testing

To test subdomains locally (e.g., `john.localhost:3000`):

### macOS/Linux

1. Edit `/etc/hosts`:

```bash
sudo nano /etc/hosts
```

2. Add entries for test subdomains:

```
127.0.0.1 localhost
127.0.0.1 john.localhost
127.0.0.1 jane.localhost
```

3. Save and exit (Ctrl+X, Y, Enter)

4. Test:

```bash
# Start dev server
npm run dev

# Open in browser
open http://john.localhost:3000
```

### Windows

1. Edit `C:\Windows\System32\drivers\etc\hosts` (as Administrator)
2. Add the same entries as above
3. Save and test

### Alternative: Use a Tool

- [dnsmasq](http://www.thekelleys.org.uk/dnsmasq/doc.html) (macOS)
- [Acrylic DNS Proxy](https://mayakron.altervista.org/support/acrylic/Home.htm) (Windows)

---

## Development Workflow

### Daily Development

```bash
# Start dev server
npm run dev

# Make changes to code
# Hot reload automatically updates browser

# Stop server
Ctrl+C
```

### Common Tasks

**Add a new feature:**

1. Create/modify components in `src/components/`
2. Update routes in `src/app/`
3. Add Server Actions in `src/app/actions/`
4. Test locally

**Modify database schema:**

1. Edit `src/lib/db/schema.ts`
2. Run `npm run db:push` to apply changes
3. Update related types and queries

**Add a new UI component:**

1. Use shadcn/ui: `npx shadcn@latest add [component]`
2. Or create custom component in `src/components/ui/`

### Code Style

- Use TypeScript strict mode (no `any` types)
- Default to Server Components
- Use `'use client'` only when necessary (interactivity)
- Use Server Actions for mutations
- Follow existing patterns

---

## Deployment

### Vercel (Recommended)

**Easiest setup with automatic CI/CD and wildcard SSL.**

#### Steps

1. **Push to GitHub:**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-url>
git push -u origin main
```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Framework: Next.js (auto-detected)

3. **Add Environment Variables:**

Go to Project Settings → Environment Variables and add:

```env
DATABASE_URL=your-supabase-connection-string
BETTER_AUTH_SECRET=your-generated-secret
BETTER_AUTH_URL=https://yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_ROOT_DOMAIN=yourdomain.com
```

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete

5. **Configure Custom Domain:**
   - Go to Project Settings → Domains
   - Add root domain: `yourdomain.com`
   - Add wildcard: `*.yourdomain.com`

6. **Update DNS:**

In your domain registrar:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: *
Value: cname.vercel-dns.com
```

7. **Verify:**
   - Visit `https://yourdomain.com`
   - Create account with username "test"
   - Visit `https://test.yourdomain.com`

✅ Done! Your app is live with subdomains.

---

### Railway

**All-in-one platform with built-in database.**

#### Steps

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add PostgreSQL: Click "New" → "Database" → "PostgreSQL"
5. Add environment variables:

```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
BETTER_AUTH_SECRET=your-secret
BETTER_AUTH_URL=${{Railway.PUBLIC_DOMAIN}}
NEXT_PUBLIC_APP_URL=${{Railway.PUBLIC_DOMAIN}}
NEXT_PUBLIC_ROOT_DOMAIN=${{Railway.PUBLIC_DOMAIN}}
```

6. Deploy and configure custom domain in Settings → Domains

---

### Netlify

#### Steps

1. Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Deploy:

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

3. Add environment variables in Site Settings
4. Configure custom domain and DNS

---

### Self-Hosted (Docker)

#### Dockerfile

```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

#### docker-compose.yml

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env.local
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_USER: postgres
      POSTGRES_DB: Solo Link
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

#### Deploy

```bash
docker-compose up -d
```

---

### DNS Configuration

For all platforms, configure wildcard DNS:

**Standard Setup:**

```
Type: A
Name: @
Value: <your-server-ip>

Type: CNAME
Name: *
Value: yourdomain.com
```

**Cloudflare Setup:**

```
Type: A
Name: @
Value: <your-server-ip>
Proxy: ON

Type: CNAME
Name: *
Value: yourdomain.com
Proxy: ON
```

---

## Troubleshooting

### Database Connection Failed

**Symptoms:** "Connection failed" error on startup

**Solutions:**

- Verify `DATABASE_URL` is correct in `.env.local`
- Check Supabase project is active
- Ensure IP is whitelisted (Supabase auto-whitelists)
- Try pooler connection string (port 6543)
- Test connection: `psql $DATABASE_URL -c "SELECT 1"`

### Port Already in Use

**Symptoms:** "Port 3000 is already in use"

**Solutions:**

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

### Module Not Found

**Symptoms:** "Cannot find module" errors

**Solutions:**

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run dev
```

### Subdomain Not Working Locally

**Symptoms:** Subdomain doesn't resolve

**Solutions:**

- Add entry to `/etc/hosts` (see [Local Subdomain Testing](#local-subdomain-testing))
- Use `http://` not `https://` for local development
- Clear browser cache
- Try different browser

### Authentication Errors

**Symptoms:** "Unauthorized" or session errors

**Solutions:**

- Sign out and sign in again
- Clear browser cookies
- Verify `BETTER_AUTH_SECRET` is set correctly
- Check `BETTER_AUTH_URL` matches your app URL
- Restart dev server

### Build Failures

**Symptoms:** Build fails with TypeScript errors

**Solutions:**

- Check for type errors: `npx tsc --noEmit`
- Ensure all dependencies are installed
- Clear cache: `rm -rf .next`
- Update Next.js: `npm install next@latest`

### Subdomain Not Working in Production

**Symptoms:** Subdomain shows 404 or redirects incorrectly

**Solutions:**

- Verify DNS wildcard record is set up
- Check platform supports wildcard domains
- Ensure `NEXT_PUBLIC_ROOT_DOMAIN` is correct
- Verify SSL certificate covers wildcards
- Test DNS propagation: `nslookup test.yourdomain.com`

---

## Commands Reference

### Development

```bash
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
```

### Database

```bash
npm run db:push          # Push schema to database (dev)
npm run db:generate      # Generate migration files
npm run db:migrate       # Run migrations (prod)
npm run db:studio        # Open Drizzle Studio GUI
```

### Direct Database Access

```bash
# Connect to database
psql $DATABASE_URL

# Run query
psql $DATABASE_URL -c "SELECT * FROM users LIMIT 10"

# Backup database
pg_dump $DATABASE_URL > backup.sql

# Restore database
psql $DATABASE_URL < backup.sql
```

---

## API Reference

### Server Actions

Import from `src/app/actions/links.ts`:

```typescript
import {
  createLink,
  updateLink,
  deleteLink,
  reorderLinks,
  getUserLinks,
  incrementLinkClicks,
} from "@/app/actions/links";
```

#### createLink(data)

Creates a new link for the authenticated user.

```typescript
await createLink({
  title: "My Portfolio",
  url: "https://example.com",
  isEnabled: true,
});
```

#### updateLink(linkId, data)

Updates an existing link.

```typescript
await updateLink(1, {
  title: "Updated Title",
  isEnabled: false,
});
```

#### deleteLink(linkId)

Deletes a link.

```typescript
await deleteLink(1);
```

#### reorderLinks(linkIds)

Reorders links based on array order.

```typescript
await reorderLinks([3, 1, 2, 4]);
```

#### getUserLinks()

Gets all links for the authenticated user.

```typescript
const links = await getUserLinks();
```

### Authentication

#### Server Side

```typescript
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const session = await auth.api.getSession({
  headers: await headers(),
});

if (!session?.user) {
  redirect("/login");
}
```

#### Client Side

```typescript
'use client';

import { useSession, signIn, signOut, signUp } from '@/lib/auth/client';

export function MyComponent() {
  const { data: session, isPending } = useSession();

  const handleSignIn = async () => {
    await signIn.email({
      email: 'user@example.com',
      password: 'password',
      callbackURL: '/admin',
    });
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return <div>{session?.user?.name}</div>;
}
```

### Database Queries

```typescript
import { db } from "@/lib/db";
import { users, links } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Get user by username
const [user] = await db
  .select()
  .from(users)
  .where(eq(users.username, "john"))
  .limit(1);

// Get user's links
const userLinks = await db
  .select()
  .from(links)
  .where(eq(links.userId, user.id))
  .orderBy(links.order);
```

---

## Performance Optimization

### Production Checklist

- [ ] Enable connection pooling (Supabase pooler or PgBouncer)
- [ ] Configure CDN (Cloudflare)
- [ ] Enable image optimization
- [ ] Set up caching headers
- [ ] Monitor performance (Vercel Analytics or similar)

### Monitoring

**Recommended Tools:**

- **Vercel Analytics** - Built-in performance monitoring
- **PostHog** - User analytics and session recordings
- **Sentry** - Error tracking
- **Better Uptime** - Uptime monitoring

---

## Cost Estimates

### Free Tier (Side Projects)

| Service   | Plan  | Limits                           |
| --------- | ----- | -------------------------------- |
| Vercel    | Hobby | 100GB bandwidth, unlimited sites |
| Supabase  | Free  | 500MB database, 2GB bandwidth    |
| PostHog   | Free  | 1M events/month                  |
| **Total** |       | **$0/month**                     |

### Production (Small Scale)

| Service   | Plan | Cost              |
| --------- | ---- | ----------------- |
| Vercel    | Pro  | $20/month         |
| Supabase  | Pro  | $25/month         |
| Domain    |      | ~$12/year         |
| **Total** |      | **~$45-50/month** |

---

## Security Best Practices

- ✅ Never commit `.env.local` to git
- ✅ Use strong secrets (32+ characters)
- ✅ Enable rate limiting on auth routes
- ✅ Keep dependencies updated
- ✅ Use connection pooling in production
- ✅ Enable HTTPS in production
- ✅ Implement CSRF protection (built-in with Next.js)
- ✅ Validate user input
- ✅ Use parameterized queries (Drizzle ORM handles this)

---

## Support

Need help?

1. Check this guide's [Troubleshooting](#troubleshooting) section
2. Search existing GitHub issues
3. Open a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Environment details (OS, Node version, etc.)
   - Error messages or screenshots

---

**Good luck with your Solo Link deployment! 🚀**
