import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: Request) {
  try {
    // Verify admin token
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { ambassadorId, status } = await request.json();

    if (!ambassadorId || !status) {
      return NextResponse.json(
        { error: 'Ambassador ID and status are required' },
        { status: 400 }
      );
    }

    if (!['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Status must be either approved or rejected' },
        { status: 400 }
      );
    }

    // Update ambassador status
    const { data: ambassador, error } = await supabase
      .from('ambassadors')
      .update({ status })
      .eq('id', ambassadorId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    // TODO: Send email notification to ambassador
    // You can integrate email service here (e.g., Resend, SendGrid)
    // Example:
    // if (status === 'approved') {
    //   await sendEmail({
    //     to: ambassador.email,
    //     subject: 'AAYAM Ambassador Application Approved!',
    //     html: `Your referral code is: ${ambassador.referral_code}`
    //   });
    // }

    return NextResponse.json({
      message: `Ambassador ${status} successfully`,
      ambassador: {
        id: ambassador.id,
        name: ambassador.name,
        email: ambassador.email,
        status: ambassador.status,
        referral_code: ambassador.referral_code,
      },
    });
  } catch (error) {
    console.error('Approve ambassador error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
