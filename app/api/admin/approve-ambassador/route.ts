import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import jwt from 'jsonwebtoken';
import { sendAmbassadorApprovalEmail } from '@/lib/email';

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

    // Send approval email
    if (status === 'approved') {
      try {
        const loginUrl = process.env.NODE_ENV === 'production'
          ? 'https://aayamfest.com/ambassador/login'
          : 'http://localhost:3003/ambassador/login';

        await sendAmbassadorApprovalEmail({
          name: ambassador.name,
          email: ambassador.email,
          referralCode: ambassador.referral_code,
          loginUrl,
        });
        
        console.log(`Approval email sent to ${ambassador.email}`);
      } catch (emailError) {
        console.error('Failed to send approval email:', emailError);
        // Don't fail the approval if email fails
      }
    }

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
