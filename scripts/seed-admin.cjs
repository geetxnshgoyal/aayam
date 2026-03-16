/**
 * One-time script to create the first admin user in Firestore.
 * Run: node scripts/seed-admin.cjs
 * Requires .env.local with ADMIN_EMAIL and ADMIN_PASSWORD (and optional ADMIN_SEED_SECRET).
 */
const path = require('path');
const fs = require('fs');

// Load .env.local
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach((line) => {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) {
      const key = m[1].trim();
      let val = m[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
        val = val.slice(1, -1);
      process.env[key] = val;
    }
  });
}

const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.error('Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env.local');
  process.exit(1);
}

const bcrypt = require('bcryptjs');
const admin = require('firebase-admin');

function getFirebaseApp() {
  if (admin.apps.length > 0) return admin.apps[0];
  const keyPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    path.join(process.cwd(), 'aayam-db178-firebase-adminsdk-fbsvc-90f4ee85d6.json');
  const json = fs.readFileSync(keyPath, 'utf8');
  const serviceAccount = JSON.parse(json);
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id || 'aayam-db178',
  });
}

getFirebaseApp();
const db = admin.firestore();
const coll = db.collection('admin_users');

(async () => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existing = await coll.where('email', '==', email).limit(1).get();
    if (!existing.empty) {
      const docRef = existing.docs[0].ref;
      await docRef.update({ password: hashedPassword });
      console.log('Admin password updated for:', email);
      process.exit(0);
      return;
    }
    const docRef = await coll.add({ email, password: hashedPassword });
    console.log('Admin user created:', email, 'id:', docRef.id);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
})();
