# Environment Setup Guide

This guide will help you set up all the required environment variables for the AAYAM Ambassador Platform.

## Quick Start

1. Copy the example environment file:
```bash
cp .env.local.example .env.local
```

2. Fill in the required values (see sections below)

3. Restart your development server:
```bash
npm run dev
```

---

## Required Environment Variables

### Supabase Configuration

You'll need these from your Supabase project dashboard.

```env
# Supabase URL - Find this in Project Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Supabase Anon Key - Find this in Project Settings > API > Project API keys
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to find these:**
1. Go to [supabase.com](https://supabase.com) and sign in
2. Open your project (or create one - see SUPABASE_SETUP.md)
3. Click on Settings (⚙️) in the left sidebar
4. Click on "API" under Project Settings
5. Copy the values:
   - **URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

### JWT Secret

Used for signing authentication tokens.

```env
# JWT Secret - Should be a long random string
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
```

**How to generate a secure JWT_SECRET:**

**Option 1: Online generator**
```bash
# Visit https://randomkeygen.com/ and copy a "Fort Knox Password"
```

**Option 2: Terminal (macOS/Linux)**
```bash
openssl rand -base64 32
```

**Option 3: Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

⚠️ **IMPORTANT:** Never commit your actual JWT_SECRET to version control!

---

### Email Service (Optional - for notifications)

When an ambassador is approved, the system can automatically send them an email with their login credentials.

**Recommended: Resend**

```env
# Resend API Key - Get from resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Email sender address (must be verified in Resend)
EMAIL_FROM=noreply@aayamfest.com
```

**Setup Steps:**
1. Go to [resend.com](https://resend.com) and sign up
2. Verify your domain (or use dev@resend.dev for testing)
3. Go to API Keys and create a new key
4. Copy the key to `RESEND_API_KEY`

**Alternative: SendGrid**

```env
# SendGrid API Key
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx

# Verified sender email
EMAIL_FROM=noreply@aayamfest.com
```

---

## Example .env.local File

Create a file named `.env.local` in your project root with this content:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNDI4NTYwMCwiZXhwIjoxOTI5ODYxNjAwfQ.example-key-here

# JWT Secret (generate your own!)
JWT_SECRET=super-secret-jwt-key-change-this-minimum-32-characters-long

# Email Service (Optional)
RESEND_API_KEY=re_123456789
EMAIL_FROM=noreply@aayamfest.com
```

---

## Verification

### Test Supabase Connection

1. Start your dev server: `npm run dev`
2. Open browser console (F12)
3. Go to http://localhost:3000/ambassador/register
4. Try submitting the form
5. Check for Supabase errors in console

### Test JWT Secret

1. Go to http://localhost:3000/ambassador/login
2. Try logging in (after approval)
3. If you get a token, JWT is working!

### Test Email Service

1. Approve an ambassador from admin panel
2. Check if email is sent
3. Check email service dashboard for logs

---

## Troubleshooting

### Error: "supabase is not defined"
- Make sure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Restart your dev server after adding env variables

### Error: "Invalid token"
- Check that `JWT_SECRET` is set and matches across sessions
- Generate a new strong secret if needed

### Error: "Failed to send email"
- Verify your email API key is correct
- Check that sender email is verified in your email service
- Look at email service dashboard for detailed errors

### Changes not reflecting
- Restart dev server: `Ctrl+C` then `npm run dev`
- Clear Next.js cache: `rm -rf .next && npm run dev`

---

## Security Best Practices

1. ✅ **Never commit `.env.local` to Git**
   - It's already in `.gitignore`

2. ✅ **Use different values for production**
   - Generate new JWT_SECRET for production
   - Use production Supabase project

3. ✅ **Rotate secrets regularly**
   - Change JWT_SECRET every few months
   - Regenerate API keys if compromised

4. ✅ **Use environment-specific values**
   - Development: `.env.local`
   - Production: Set in Vercel/hosting platform

---

## Vercel Deployment

When deploying to Vercel:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add all variables from `.env.local`
4. Deploy!

**Note:** Make sure to use production Supabase values, not development ones.

---

## Next Steps

1. ✅ Set up environment variables (this guide)
2. → Set up Supabase database (see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md))
3. → Create first admin user
4. → Test the complete flow

---

## Support

If you encounter issues:
- Check [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for database setup
- Check [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for Supabase configuration
- Verify all environment variables are set correctly
