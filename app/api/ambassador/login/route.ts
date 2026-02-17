import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key-change-this';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Get ambassador by email
    const { data: ambassador, error } = await supabase
      .from('ambassadors')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !ambassador) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if approved
    if (ambassador.status !== 'approved') {
      return NextResponse.json(
        { error: 'Your application is still pending admin approval' },
        { status: 403 }
      );
    }

    // Verify password
    const isValid = await bcrypt.compare(password, ambassador.password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: ambassador.id, email: ambassador.email, role: 'ambassador' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password: _, ...ambassadorData } = ambassador;

    return NextResponse.json({
      message: 'Login successful',
      token,
      ambassador: ambassadorData,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
