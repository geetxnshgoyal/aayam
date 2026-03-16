/**
 * One-time migration: Copy ambassadors and signups from Supabase to Firestore.
 * Run: node --env-file=.env.local scripts/migrate-supabase-to-firestore.cjs
 * Or: node scripts/migrate-supabase-to-firestore.cjs (with env vars set)
 */
const path = require('path');
const fs = require('fs');
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  }
}

const { createClient } = require('@supabase/supabase-js');
const admin = require('firebase-admin');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_KEY. Add to .env.local');
  process.exit(1);
}

const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  path.join(process.cwd(), 'aayam-db178-firebase-adminsdk-fbsvc-90f4ee85d6.json');

if (!fs.existsSync(keyPath)) {
  console.error('Firebase service account not found at', keyPath);
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

const db = admin.firestore();
const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log('Fetching ambassadors from Supabase...');
  const { data: ambassadors, error: ambErr } = await supabase
    .from('ambassadors')
    .select('*')
    .order('created_at', { ascending: true });

  if (ambErr) {
    console.error('Supabase ambassadors error:', ambErr);
    process.exit(1);
  }

  console.log(`Found ${ambassadors.length} ambassadors. Migrating...`);

  // Preserve Supabase UUIDs as Firestore doc IDs so existing JWTs and references still work
  for (const a of ambassadors) {
    const ref = db.collection('ambassadors').doc(a.id);
    await ref.set({
      name: a.name,
      email: a.email,
      phone: a.phone || null,
      college: a.college || null,
      year: a.year || null,
      referral_code: a.referral_code,
      status: a.status,
      signup_count: a.signup_count || 0,
      tier: a.tier || 'none',
      password: a.password,
      created_at: a.created_at,
      approved_at: a.approved_at || null,
    });
    console.log(`  Migrated ambassador ${a.email} (id: ${a.id})`);
  }

  console.log('\nFetching signups from Supabase...');
  const { data: signups, error: sigErr } = await supabase
    .from('signups')
    .select('*')
    .order('registered_at', { ascending: true });

  if (sigErr) {
    console.error('Supabase signups error:', sigErr);
    process.exit(1);
  }

  console.log(`Found ${signups.length} signups. Migrating...`);

  for (const s of signups) {
    const ref = db.collection('signups').doc(s.id);
    await ref.set({
      ambassador_id: s.ambassador_id,
      participant_name: s.participant_name,
      participant_email: s.participant_email,
      participant_phone: s.participant_phone || null,
      participant_college: s.participant_college || null,
      registered_at: s.registered_at,
      status: s.status || 'approved',
      approved_at: s.approved_at || null,
      approved_by: s.approved_by || null,
    });
    console.log(`  Migrated signup ${s.participant_email} (id: ${s.id})`);
  }

  console.log('\nMigration complete.');
}

migrate().catch((e) => {
  console.error(e);
  process.exit(1);
});
