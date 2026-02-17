# Supabase Setup Guide

Complete step-by-step guide to set up Supabase for the AAYAM Ambassador Platform.

---

## Part 1: Create Supabase Project

### Step 1: Sign Up / Sign In

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign in"
3. Sign in with GitHub (recommended) or email

### Step 2: Create New Project

1. Click "New Project" button
2. Fill in the details:
   - **Name:** `aayam-ambassador` (or your choice)
   - **Database Password:** Generate a strong password and **SAVE IT SECURELY**
   - **Region:** Choose closest to your users (e.g., `ap-south-1` for India)
   - **Pricing Plan:** Free tier is sufficient to start

3. Click "Create new project"
4. Wait 2-3 minutes for project to initialize

---

## Part 2: Get API Credentials

### Step 1: Navigate to API Settings

1. In your Supabase project dashboard
2. Click **Settings** (⚙️ icon) in the left sidebar
3. Click **API** under Project Settings

### Step 2: Copy Credentials

You'll see:

**Project URL:**
```
https://abcdefghijklmnop.supabase.co
```
→ Copy this to `NEXT_PUBLIC_SUPABASE_URL`

**Project API keys:**
- **anon public:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
  → Copy this to `NEXT_PUBLIC_SUPABASE_ANON_KEY`

- **service_role:** (Don't use this in frontend! Keep secret)

### Step 3: Add to .env.local

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Part 3: Create Database Tables

### Step 1: Open SQL Editor

1. Click **SQL Editor** in the left sidebar
2. Click **New query**

### Step 2: Create Tables

Copy and paste this entire SQL script (from DATABASE_SCHEMA.md):

```sql
-- Create ambassadors table
CREATE TABLE ambassadors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  college VARCHAR(255) NOT NULL,
  year VARCHAR(50) NOT NULL,
  referral_code VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  signup_count INTEGER DEFAULT 0,
  tier VARCHAR(20) DEFAULT 'none' CHECK (tier IN ('none', 'bronze', 'silver', 'gold', 'platinum')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create signups table
CREATE TABLE signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ambassador_id UUID NOT NULL REFERENCES ambassadors(id) ON DELETE CASCADE,
  participant_name VARCHAR(255) NOT NULL,
  participant_email VARCHAR(255) NOT NULL,
  participant_phone VARCHAR(20) NOT NULL,
  participant_college VARCHAR(255) NOT NULL,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_ambassadors_email ON ambassadors(email);
CREATE INDEX idx_ambassadors_referral_code ON ambassadors(referral_code);
CREATE INDEX idx_ambassadors_status ON ambassadors(status);
CREATE INDEX idx_signups_ambassador_id ON signups(ambassador_id);
CREATE INDEX idx_signups_participant_email ON signups(participant_email);

-- Create function to automatically update ambassador tier based on signup count
CREATE OR REPLACE FUNCTION update_ambassador_tier()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.signup_count >= 100 THEN
    NEW.tier := 'platinum';
  ELSIF NEW.signup_count >= 50 THEN
    NEW.tier := 'gold';
  ELSIF NEW.signup_count >= 25 THEN
    NEW.tier := 'silver';
  ELSIF NEW.signup_count >= 10 THEN
    NEW.tier := 'bronze';
  ELSE
    NEW.tier := 'none';
  END IF;
  
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update tier when signup_count changes
CREATE TRIGGER trigger_update_ambassador_tier
BEFORE UPDATE OF signup_count ON ambassadors
FOR EACH ROW
EXECUTE FUNCTION update_ambassador_tier();
```

3. Click **Run** (or press `Ctrl+Enter`)
4. You should see "Success. No rows returned"

### Step 3: Verify Tables Created

1. Click **Table Editor** in the left sidebar
2. You should see 3 tables:
   - `ambassadors`
   - `signups`
   - `admin_users`

---

## Part 4: Set Up Row Level Security (RLS)

### Why RLS?
Row Level Security ensures users can only access data they're authorized to see.

### Step 1: Enable RLS

Go back to **SQL Editor** and run:

```sql
-- Enable Row Level Security
ALTER TABLE ambassadors ENABLE ROW LEVEL SECURITY;
ALTER TABLE signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
```

### Step 2: Create Policies

```sql
-- Allow ambassadors to read their own data
CREATE POLICY "Ambassadors can view own profile"
ON ambassadors FOR SELECT
USING (true);

-- Allow public registration (INSERT)
CREATE POLICY "Anyone can register as ambassador"
ON ambassadors FOR INSERT
WITH CHECK (true);

-- Allow ambassadors to update their own data
CREATE POLICY "Ambassadors can update own profile"
ON ambassadors FOR UPDATE
USING (true);

-- Allow viewing signups
CREATE POLICY "Ambassadors can view signups"
ON signups FOR SELECT
USING (true);

-- Allow creating signups
CREATE POLICY "Ambassadors can create signups"
ON signups FOR INSERT
WITH CHECK (true);

-- Admin policies (service role has full access by default)
CREATE POLICY "Service role has full access to admin_users"
ON admin_users FOR ALL
USING (true);
```

---

## Part 5: Create First Admin User

### Step 1: Generate Password Hash

You need to hash the admin password. Run this in your terminal:

```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-admin-password', 10));"
```

**Example output:**
```
$2a$10$abcdefghijklmnopqrstuvwxyz123456789ABCDEFGH
```

### Step 2: Insert Admin User

In Supabase SQL Editor:

```sql
INSERT INTO admin_users (email, password, name)
VALUES (
  'admin@aayamfest.com',
  '$2a$10$YOUR_HASHED_PASSWORD_HERE',
  'Super Admin'
);
```

Replace:
- `admin@aayamfest.com` with your admin email
- `$2a$10$YOUR_HASHED_PASSWORD_HERE` with the hash from Step 1

### Step 3: Verify Admin Created

```sql
SELECT id, email, name, created_at FROM admin_users;
```

You should see your admin user listed!

---

## Part 6: Test Connection

### Step 1: Update .env.local

Make sure your `.env.local` has:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
JWT_SECRET=your-jwt-secret-here
```

### Step 2: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
rm -rf .next
npm run dev
```

### Step 3: Test Registration

1. Go to http://localhost:3000/ambassador/register
2. Fill out the form
3. Submit
4. Check Supabase Table Editor → `ambassadors` table
5. You should see the new ambassador with `status: pending`

### Step 4: Test Admin Login

1. Go to http://localhost:3000/admin/login
2. Use your admin credentials
3. You should be redirected to admin dashboard
4. You should see the pending ambassador

### Step 5: Test Approval

1. In admin dashboard, approve the ambassador
2. Check `ambassadors` table - status should be `approved`

### Step 6: Test Ambassador Login

1. Go to http://localhost:3000/ambassador/login
2. Login with ambassador credentials
3. You should see the dashboard with referral code

---

## Part 7: Monitor & Debug

### Database Activity

1. Click **Database** → **Roles** to see users
2. Click **Database** → **Replication** to see activity logs

### API Logs

1. Click **API Docs** to see all available endpoints
2. Click **Logs** to see real-time API calls

### Common Issues

**Error: "relation 'ambassadors' does not exist"**
- Tables weren't created. Re-run Part 3 SQL script

**Error: "new row violates row-level security policy"**
- RLS policies too restrictive. Check Part 4

**Error: "duplicate key value violates unique constraint"**
- Email or referral code already exists
- Check for existing records in table

**Can't connect from app**
- Verify `.env.local` has correct values
- Restart dev server after changes
- Check Supabase project is running (not paused)

---

## Part 8: Production Setup

### For Vercel Deployment

1. Create a **separate** Supabase project for production
2. Follow all steps above for production project
3. In Vercel:
   - Go to Project Settings → Environment Variables
   - Add production Supabase credentials
   - Mark as "Production" environment only

### Security Checklist

- ✅ Different Supabase project for dev/prod
- ✅ Strong database password (saved securely)
- ✅ RLS policies enabled
- ✅ Admin password hashed
- ✅ JWT_SECRET is different in prod
- ✅ Regular backups enabled

### Enable Backups

1. Go to **Database** → **Backups**
2. Free tier has daily backups (7-day retention)
3. Upgrade for more retention if needed

---

## Part 9: Optional Enhancements

### Email Notifications

See [ENV_SETUP.md](./ENV_SETUP.md) for email configuration.

### Custom Domain

1. Go to **Settings** → **API**
2. Add custom domain (requires paid plan)

### Database Migrations

For future schema changes:

1. Use SQL Editor for one-time changes
2. Save SQL files in `/migrations` folder
3. Version control your SQL changes

---

## Troubleshooting

### Supabase Project Paused

Free tier projects pause after 1 week of inactivity:
- Just visit your project dashboard to wake it up
- Takes ~30 seconds to resume

### Rate Limits

Free tier limits:
- 50,000 rows per month
- 500MB database space
- Good for testing, upgrade for production

### Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- Check [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for schema details

---

## Next Steps

1. ✅ Supabase project created
2. ✅ Tables created with RLS
3. ✅ Admin user created
4. ✅ Connection tested
5. → Test complete ambassador flow
6. → Deploy to production

**You're all set! 🚀**
