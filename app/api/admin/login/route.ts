import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '@/lib/auth';
import { getDb, COLLECTIONS, docToData } from '@/lib/firebase';
import type { AdminUser } from '@/lib/db-types';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** GET: quick check that this route is reachable (e.g. open in browser) */
export async function GET() {
  return NextResponse.json({ ok: true, message: 'Admin login API is up. Use POST with email and password.' });
}

export async function POST(request: Request) {
  try {
    let body: { email?: string; password?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    let db;
    try {
      db = getDb();
    } catch (dbError) {
      console.error('Firebase getDb error:', dbError);
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Check server configuration.' },
        { status: 503 }
      );
    }
    const snapshot = await db
      .collection(COLLECTIONS.admin_users)
      .where('email', '==', email)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const doc = snapshot.docs[0];
    const admin = docToData<AdminUser>(doc as any);
    if (!admin || !admin.password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { adminId: admin.id, email: admin.email },
      getJwtSecret(),
      { expiresIn: '7d' }
    );

    const { password: _, ...adminData } = admin;

    const response = NextResponse.json({
      message: 'Login successful',
      token,
      admin: adminData,
    });

    // Set HttpOnly cookie so session works when localStorage is blocked (e.g. iframe, strict privacy)
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
