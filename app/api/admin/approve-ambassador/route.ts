import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import jwt from 'jsonwebtoken';
import { sendAmbassadorApprovalEmail } from '@/lib/email';
import { PRIMARY_SITE_URL } from '@/lib/site';

import { getJwtSecret, getAdminTokenFromRequest } from '@/lib/auth';

function getAmbassadorLoginUrl(): string {
  // Always use production domain for approval emails (users open from anywhere)
  const base = process.env.NEXT_PUBLIC_SITE_URL || PRIMARY_SITE_URL;
  return `${String(base).replace(/\/$/, '')}/ambassador/login`;
}

export async function POST(request: Request) {
  try {
    const token = getAdminTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
      jwt.verify(token, getJwtSecret());
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
      const loginUrl = getAmbassadorLoginUrl();
      const referralCode = ambassador.referral_code || 'N/A';
      try {
        await sendAmbassadorApprovalEmail({
          name: ambassador.name || 'Ambassador',
          email: ambassador.email,
          referralCode,
          loginUrl,
        });
        console.log(`Approval email sent to ${ambassador.email}`);
      } catch (emailError) {
        console.error('Failed to send approval email:', emailError);
        // Don't fail the approval; log for debugging
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
