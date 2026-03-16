import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb, COLLECTIONS } from '@/lib/firebase';

/**
 * One-time seed: create one admin user in Firestore (same structure as Supabase).
 *
 * Set in .env.local:
 *   ADMIN_SEED_SECRET=your-random-secret
 *   ADMIN_EMAIL=admin@yourdomain.com
 *   ADMIN_PASSWORD=your-secure-password
 *
 * POST /api/admin/seed with body: { "secret": "your-random-secret" }
 * If an admin with ADMIN_EMAIL already exists, responds "already exists".
 * Otherwise creates the admin and returns success.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const secret = typeof body.secret === 'string' ? body.secret.trim() : '';

    const expectedSecret = process.env.ADMIN_SEED_SECRET;
    if (!expectedSecret || secret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env.local' },
        { status: 400 }
      );
    }

    const db = getDb();
    const coll = db.collection(COLLECTIONS.admin_users);

    const existing = await coll.where('email', '==', email).limit(1).get();
    if (!existing.empty) {
      return NextResponse.json({
        message: 'Admin user already exists',
        email,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const docRef = await coll.add({
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      message: 'Admin user created',
      email,
      id: docRef.id,
    });
  } catch (error) {
    console.error('Admin seed error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
