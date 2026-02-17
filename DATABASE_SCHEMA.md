# AAYAM Ambassador Database Schema

## Supabase Setup Instructions

### 1. Create Supabase Project
1. Go to https://supabase.com
2. Create a new project
3. Save your project URL and anon key

### 2. Create Tables

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Ambassadors Table
CREATE TABLE ambassadors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  college VARCHAR(255),
  year VARCHAR(50),
  referral_code VARCHAR(20) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
  signup_count INTEGER DEFAULT 0,
  tier VARCHAR(20) DEFAULT 'none', -- none, bronze, silver, gold, platinum
  created_at TIMESTAMP DEFAULT NOW(),
  approved_at TIMESTAMP,
  approved_by UUID
);

-- Signups Table
CREATE TABLE signups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ambassador_id UUID REFERENCES ambassadors(id) ON DELETE CASCADE,
  participant_name VARCHAR(255) NOT NULL,
  participant_email VARCHAR(255) NOT NULL,
  participant_phone VARCHAR(20),
  participant_college VARCHAR(255),
  registered_at TIMESTAMP DEFAULT NOW()
);

-- Admin Users Table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_ambassadors_email ON ambassadors(email);
CREATE INDEX idx_ambassadors_status ON ambassadors(status);
CREATE INDEX idx_ambassadors_referral ON ambassadors(referral_code);
CREATE INDEX idx_signups_ambassador ON signups(ambassador_id);
```

### 3. Enable Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE ambassadors ENABLE ROW LEVEL SECURITY;
ALTER TABLE signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies for ambassadors (they can only see their own data)
CREATE POLICY "Ambassadors can view own data"
  ON ambassadors FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Ambassadors can update own data"
  ON ambassadors FOR UPDATE
  USING (auth.uid() = id);

-- Policies for signups (ambassadors can manage their signups)
CREATE POLICY "Ambassadors can view own signups"
  ON signups FOR SELECT
  USING (ambassador_id IN (SELECT id FROM ambassadors WHERE auth.uid() = id));

CREATE POLICY "Ambassadors can insert own signups"
  ON signups FOR INSERT
  WITH CHECK (ambassador_id IN (SELECT id FROM ambassadors WHERE auth.uid() = id));

-- Admin policies (admins can see everything)
CREATE POLICY "Admins can view all"
  ON ambassadors FOR ALL
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));
```

### 4. Create Tier Update Function

```sql
-- Function to automatically update tier based on signup count
CREATE OR REPLACE FUNCTION update_ambassador_tier()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.signup_count >= 100 THEN
    NEW.tier = 'platinum';
  ELSIF NEW.signup_count >= 50 THEN
    NEW.tier = 'gold';
  ELSIF NEW.signup_count >= 25 THEN
    NEW.tier = 'silver';
  ELSIF NEW.signup_count >= 10 THEN
    NEW.tier = 'bronze';
  ELSE
    NEW.tier = 'none';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update tier when signup_count changes
CREATE TRIGGER update_tier_on_signup_count
  BEFORE UPDATE OF signup_count ON ambassadors
  FOR EACH ROW
  EXECUTE FUNCTION update_ambassador_tier();
```

### 5. Create Sample Admin User

```sql
-- Create a sample admin user (change password after first login!)
INSERT INTO admin_users (email, password, name, role)
VALUES (
  'admin@aayam.com',
  '$2a$10$YourHashedPasswordHere', -- You'll generate this in the app
  'Admin User',
  'admin'
);
```

## Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_a_random_secret_here

# Email service (choose one)
EMAIL_SERVER=smtp://username:password@smtp.gmail.com:587
EMAIL_FROM=noreply@aayam.com
```

## Tier Levels

- **Bronze**: 10-25 signups
- **Silver**: 25-50 signups
- **Gold**: 50-100 signups
- **Platinum**: 100+ signups
