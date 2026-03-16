import { getApps, initializeApp, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { cert } from 'firebase-admin/app';
import path from 'path';
import fs from 'fs';

/**
 * Initialize Firebase Admin using service account file.
 * Set GOOGLE_APPLICATION_CREDENTIALS in .env.local to the path to your JSON key file,
 * or place aayam-db178-firebase-adminsdk-*.json in project root (and add to .gitignore).
 */
function getFirebaseApp(): App {
  const existing = getApps()[0];
  if (existing) return existing as App;

  const keyPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    path.join(process.cwd(), 'aayam-db178-firebase-adminsdk-fbsvc-90f4ee85d6.json');

  try {
    const json = fs.readFileSync(keyPath, 'utf8');
    const serviceAccount = JSON.parse(json);
    return initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id || 'aayam-db178',
    });
  } catch (e) {
    throw new Error(
      `Firebase init failed. Set GOOGLE_APPLICATION_CREDENTIALS in .env.local to your service account JSON path, or add the JSON file to project root. Error: ${e instanceof Error ? e.message : String(e)}`
    );
  }
}

let _db: Firestore | null = null;

export function getDb(): Firestore {
  if (!_db) {
    const app = getFirebaseApp();
    _db = getFirestore(app);
  }
  return _db;
}

export const COLLECTIONS = {
  ambassadors: 'ambassadors',
  admin_users: 'admin_users',
  signups: 'signups',
  tasks: 'tasks',
  task_submissions: 'task_submissions',
  ambassador_points: 'ambassador_points',
} as const;

/** Firestore Timestamp to ISO string for API responses */
export function toISO(ts: { toDate?: () => Date } | undefined): string {
  if (!ts || typeof ts.toDate !== 'function') return '';
  return ts.toDate().toISOString();
}

/** Doc snapshot to object with id */
export function docToData<T extends object>(
  snap: FirebaseFirestore.DocumentSnapshot
): (T & { id: string }) | null {
  if (!snap.exists) return null;
  const data = snap.data() as T;
  return { ...data, id: snap.id } as T & { id: string };
}
