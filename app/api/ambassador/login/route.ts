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

    const isValid = await bcrypt.compare(password, ambassador.password || '');
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: ambassador.id, email: ambassador.email, role: 'ambassador' },
      getJwtSecret(),
      { expiresIn: '7d' }
    );

    const { password: _, ...ambassadorData } = ambassador;

    return NextResponse.json({
      message: 'Login successful',
      token,
      ambassador: ambassadorData,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
