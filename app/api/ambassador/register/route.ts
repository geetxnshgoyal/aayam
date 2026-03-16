import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getAmbassadorByEmail, referralCodeExists, createAmbassador } from '@/lib/firestore-helpers';

function generateReferralCode() {
  return 'AAYAM' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = body.password;
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const college = typeof body.college === 'string' ? body.college.trim() : '';
    const year = body.year;

    if (!name || !email || !password || !phone || !college || !year) {
      return NextResponse.json({ error: 'All required fields must be provided' }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const existing = await getAmbassadorByEmail(email);
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let referralCode = generateReferralCode();
    while (await referralCodeExists(referralCode)) {
      referralCode = generateReferralCode();
    }

    const data = await createAmbassador({
      name: name.slice(0, 200),
      email,
      password: hashedPassword,
      phone: phone.slice(0, 30),
      college: college.slice(0, 200),
      year: String(year),
      referral_code: referralCode,
      status: 'pending',
      signup_count: 0,
      tier: 'none',
    });

    return NextResponse.json(
      {
        message: 'Registration successful! Please wait for admin approval.',
        ambassador: {
          name: data.name,
          email: data.email,
          status: data.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
