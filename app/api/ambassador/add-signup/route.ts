import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '@/lib/auth';
import { getSignupByEmail, createSignup } from '@/lib/firestore-helpers';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, getJwtSecret(), { algorithms: ['HS256'] }) as { id: string };

    const body = await request.json();
    const participant_name = typeof body.participant_name === 'string' ? body.participant_name.trim().slice(0, 200) : '';
    const participant_email = typeof body.participant_email === 'string' ? body.participant_email.trim().toLowerCase() : '';
    const participant_phone = typeof body.participant_phone === 'string' ? body.participant_phone.trim().slice(0, 30) : '';
    const participant_college = typeof body.participant_college === 'string' ? body.participant_college.trim().slice(0, 200) : '';

    if (!participant_name || !participant_email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(participant_email)) {
      return NextResponse.json({ error: 'Please provide a valid email address' }, { status: 400 });
    }

    const existing = await getSignupByEmail(participant_email);
    if (existing) {
      return NextResponse.json({ error: 'This participant is already registered' }, { status: 400 });
    }

    const signup = await createSignup({
      ambassador_id: decoded.id,
      participant_name,
      participant_email,
      participant_phone: participant_phone || undefined,
      participant_college: participant_college || undefined,
      status: 'pending',
    });

    return NextResponse.json({
      message: 'Signup submitted for approval. Admin will verify and approve.',
      signup,
    });
  } catch (error) {
    console.error('Add signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
