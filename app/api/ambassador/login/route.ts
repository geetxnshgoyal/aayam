import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '@/lib/auth';
import { getAmbassadorByEmail } from '@/lib/firestore-helpers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const ambassador = await getAmbassadorByEmail(email);
    if (!ambassador) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (ambassador.status !== 'approved') {
      return NextResponse.json({ error: 'Your application is still pending admin approval' }, { status: 403 });
    }

    const storedHash = ambassador.password;
    if (!storedHash || typeof storedHash !== 'string') {
      return NextResponse.json({ error: 'Account setup incomplete. Please contact admin.' }, { status: 401 });
    }

    let isValid = false;
    try {
      isValid = await bcrypt.compare(password, storedHash);
    } catch {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: ambassador.id, email: ambassador.email, role: 'ambassador' },
      getJwtSecret(),
      { expiresIn: '7d' }
    );

    const { password: _, ...ambassadorData } = ambassador;

    const response = NextResponse.json({
      message: 'Login successful',
      token,
      ambassador: ambassadorData,
    });

    response.cookies.set('ambassador_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Ambassador login error:', msg);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
