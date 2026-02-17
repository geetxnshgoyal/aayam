# AAYAM Ambassador Platform - Complete Setup Guide

This guide will get your Ambassador Platform up and running in **15 minutes**! 🚀

---

## 📋 What's Included

The AAYAM Ambassador Platform includes:

✅ **Ambassador Registration** - Students can apply to become ambassadors  
✅ **Admin Approval System** - Review and approve/reject applications  
✅ **Referral Tracking** - Each ambassador gets a unique referral code  
✅ **Automatic Tier System** - Bronze/Silver/Gold/Platinum based on signups  
✅ **Ambassador Dashboard** - Track signups and progress  
✅ **Admin Dashboard** - Monitor all ambassadors and analytics  

---

## 🚀 Quick Start (15 Minutes)

### Step 1: Install Dependencies (1 minute)

If not already done:

```bash
npm install
```

All required packages are already in `package.json`.

### Step 2: Set Up Supabase (7 minutes)

Follow the detailed guide: **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)**

Quick summary:
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Run SQL script to create tables
4. Set up Row Level Security
5. Create first admin user

### Step 3: Configure Environment Variables (3 minutes)

Follow the detailed guide: **[ENV_SETUP.md](./ENV_SETUP.md)**

Quick setup:
```bash
# Copy example file
cp .env.local.example .env.local

# Edit .env.local with your Supabase credentials
# Get these from Supabase Dashboard → Settings → API
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `JWT_SECRET` - Generate with: `openssl rand -base64 32`

### Step 4: Start Development Server (1 minute)

```bash
npm run dev
```

Visit http://localhost:3000

### Step 5: Test Everything (3 minutes)

1. **Register an ambassador**: http://localhost:3000/ambassador/register
2. **Login as admin**: http://localhost:3000/admin/login
3. **Approve the ambassador** from admin dashboard
4. **Login as ambassador**: http://localhost:3000/ambassador/login
5. **Add a signup** from ambassador dashboard

---

## 🎯 User Flows

### Ambassador Flow

```
1. Visit /ambassador → Learn about program
2. Click "Apply for Ambassador Program"
3. Fill registration form at /ambassador/register
4. Wait for admin approval
5. Receive approval (manual notification for now)
6. Login at /ambassador/login
7. Access dashboard at /ambassador/dashboard
8. Share referral code with friends
9. Add signups manually or track automatic signups
10. Tier automatically upgrades based on count
```

### Admin Flow

```
1. Login at /admin/login
2. Access dashboard at /admin/dashboard
3. See pending applications
4. Review ambassador details
5. Approve or reject
6. Monitor all ambassadors
7. View tier distribution
8. See all participant signups
```

---

## 📊 Tier System

Tiers automatically update based on signup count:

| Tier | Signups Required | Rewards |
|------|-----------------|---------|
| **Bronze** | 10-24 | Certificate, Stickers Pack |
| **Silver** | 25-49 | T-shirt, Certificate, Tech Swag, LinkedIn Badge |
| **Gold** | 50-99 | Premium Goodie, Gold Certificate, LinkedIn Badge, LOR, Mentor Session |
| **Platinum** | 100+ | Full Merch Set, Platinum Certificate, All-Access Pass, LOR, Meet Organizers, Featured on Website, Future Team Priority |

---

## 🗂️ Project Structure

```
app/
├── ambassador/
│   ├── page.tsx              # Public info page
│   ├── register/
│   │   └── page.tsx          # Registration form
│   ├── login/
│   │   └── page.tsx          # Ambassador login
│   └── dashboard/
│       └── page.tsx          # Ambassador dashboard
├── admin/
│   ├── login/
│   │   └── page.tsx          # Admin login
│   └── dashboard/
│       └── page.tsx          # Admin panel
└── api/
    ├── ambassador/
    │   ├── register/
    │   │   └── route.ts      # Registration API
    │   ├── login/
    │   │   └── route.ts      # Ambassador auth
    │   ├── dashboard/
    │   │   └── route.ts      # Get ambassador data
    │   └── add-signup/
    │       └── route.ts      # Add new signup
    └── admin/
        ├── login/
        │   └── route.ts      # Admin auth
        ├── dashboard/
        │   └── route.ts      # Get all data
        └── approve-ambassador/
            └── route.ts      # Approve/reject

lib/
└── supabase.ts               # Supabase client config

DATABASE_SCHEMA.md            # Complete DB schema
SUPABASE_SETUP.md            # Supabase setup guide
ENV_SETUP.md                 # Environment variables guide
.env.local.example           # Example env file
```

---

## 🔐 Security Features

✅ **Password Hashing** - bcrypt with 10 rounds  
✅ **JWT Authentication** - 7-day expiry tokens  
✅ **Row Level Security** - Supabase RLS policies  
✅ **Input Validation** - All forms validated  
✅ **Unique Constraints** - Email and referral codes  
✅ **Status Checks** - Only approved ambassadors can login  

---

## 🎨 Features

### Ambassador Features
- ✨ Unique referral code generation (AAYAM + 6 random chars)
- 📊 Real-time signup tracking
- 🎯 Progress bar to next tier
- 📋 List of all signups
- 📱 Responsive design
- 🎭 Cyberpunk aesthetic

### Admin Features
- 📊 Complete analytics dashboard
- 👥 View all ambassadors
- ✅ One-click approve/reject
- 📈 Tier distribution stats
- 📋 View all participant signups
- 🔍 Filter by status (pending/approved/all)

---

## 🛠️ Development

### Run Development Server

```bash
npm run dev
```

### Clear Next.js Cache

If you make changes and don't see them:

```bash
rm -rf .next && npm run dev
```

### Check for Build Errors

```bash
npm run build
```

---

## 📦 Database Tables

### ambassadors
Stores all ambassador applications:
- id, name, email, password (hashed)
- phone, college, year
- referral_code (unique)
- status (pending/approved/rejected)
- signup_count, tier
- timestamps

### signups
Stores all participant registrations:
- id, ambassador_id (foreign key)
- participant_name, email, phone, college
- registered_at

### admin_users
Stores admin accounts:
- id, email, password (hashed)
- name, created_at

**See [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for complete schema**

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `JWT_SECRET`
5. Deploy!

**Important:** Create a separate Supabase project for production

### Environment Variables in Vercel

Go to Project Settings → Environment Variables and add:
- Production values for Supabase
- New JWT_SECRET for production
- Email API keys (if using)

---

## 📧 Email Notifications (Optional)

To automatically email ambassadors when approved:

1. Sign up for [Resend](https://resend.com) or [SendGrid](https://sendgrid.com)
2. Get API key
3. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   EMAIL_FROM=noreply@aayamfest.com
   ```
4. Uncomment email code in `/app/api/admin/approve-ambassador/route.ts`

**See [ENV_SETUP.md](./ENV_SETUP.md) for details**

---

## 🌐 Subdomain Setup (Optional)

To use `ambassador.aayamfest.com`:

### Vercel Setup
1. Go to Vercel project settings
2. Domains → Add Domain
3. Add `ambassador.aayamfest.com`
4. Get CNAME record from Vercel

### DNS Configuration
1. Go to your domain provider (GoDaddy, Namecheap, etc.)
2. Add CNAME record:
   - **Name:** `ambassador`
   - **Value:** `cname.vercel-dns.com`
   - **TTL:** Automatic
3. Wait for DNS propagation (5-30 minutes)

---

## 🐛 Troubleshooting

### "Supabase is not defined"
- Check `.env.local` has correct Supabase credentials
- Restart dev server

### "Invalid token" on login
- Check `JWT_SECRET` is set in `.env.local`
- Clear browser localStorage
- Try logging in again

### Can't approve ambassadors
- Verify admin is logged in
- Check browser console for errors
- Verify API route is working

### Tables not found
- Run the SQL script from [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- Check Supabase dashboard → Table Editor

### Ambassador can't login
- Make sure admin approved them (status = 'approved')
- Check password is correct
- Verify email exists in database

---

## 📚 Documentation Files

- **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - Complete database schema and SQL
- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Step-by-step Supabase setup
- **[ENV_SETUP.md](./ENV_SETUP.md)** - Environment variables guide
- **[.env.local.example](./.env.local.example)** - Example environment file

---

## ☑️ Setup Checklist

- [ ] Node.js installed
- [ ] Dependencies installed (`npm install`)
- [ ] Supabase account created
- [ ] Supabase project created
- [ ] Database tables created (SQL script)
- [ ] RLS policies enabled
- [ ] First admin user created
- [ ] `.env.local` file created
- [ ] Supabase credentials added
- [ ] JWT_SECRET generated
- [ ] Dev server started (`npm run dev`)
- [ ] Tested ambassador registration
- [ ] Tested admin login
- [ ] Tested approval flow
- [ ] Tested ambassador login
- [ ] Tested signup tracking

---

## 🎯 Next Steps

Once everything is set up:

1. **Customize Rewards** - Edit tier rewards in `/app/ambassador/page.tsx`
2. **Add Email Notifications** - Set up Resend/SendGrid
3. **Design Tweaks** - Adjust colors in Tailwind config
4. **Marketing** - Promote the ambassador program!
5. **Deploy to Production** - Use Vercel with production Supabase
6. **Monitor Growth** - Check admin dashboard regularly

---

## 💡 Tips

- **Test locally first** before deploying
- **Use separate Supabase projects** for dev and production
- **Backup your database** regularly (Supabase does this automatically)
- **Rotate JWT_SECRET** every few months
- **Monitor Supabase quotas** on free tier
- **Add analytics** to track conversion rates

---

## 🤝 Need Help?

If you get stuck:

1. Check the error message carefully
2. Review the relevant documentation file
3. Check Supabase logs (Dashboard → Logs)
4. Check browser console (F12)
5. Verify all environment variables are set

---

## 🎉 You're All Set!

Your Ambassador Platform is ready to go! Start by:

1. Creating a few test ambassadors
2. Testing the approval flow
3. Adding sample signups
4. Checking tier progression
5. Deploying to production

**Happy building! 🚀**
