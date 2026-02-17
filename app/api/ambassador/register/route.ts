import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

function generateReferralCode() {
  return 'AAYAM' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, phone, college, year, whyAmbassador } = body;

    // Validate required fields
    if (!name || !email || !password || !phone || !college || !year) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from('ambassadors')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate unique referral code
    let referralCode = generateReferralCode();
    let codeExists = true;
    
    while (codeExists) {
      const { data } = await supabase
        .from('ambassadors')
        .select('id')
        .eq('referral_code', referralCode)
        .single();
      
      if (!data) {
        codeExists = false;
      } else {
        referralCode = generateReferralCode();
      }
    }

    // Insert ambassador
    const { data, error } = await supabase
      .from('ambassadors')
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          phone,
          college,
          year,
          referral_code: referralCode,
          status: 'pending',
          signup_count: 0,
          tier: 'none',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create ambassador' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Registration successful! Please wait for admin approval.',
        ambassador: {
          name: data.name,
          email: data.email,
          status: data.status,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
