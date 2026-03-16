import { NextResponse } from 'next/server';
import { sendAmbassadorApprovalEmail } from '@/lib/email';
import { PRIMARY_SITE_URL } from '@/lib/site';
import { verifyAdminToken } from '@/lib/auth';
import { getAmbassadorById, updateAmbassador } from '@/lib/firestore-helpers';

function getAmbassadorLoginUrl(): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || PRIMARY_SITE_URL;
  return `${String(base).replace(/\/$/, '')}/ambassador/login`;
}

export async function POST(request: Request) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { ambassadorId, status } = await request.json();

    if (!ambassadorId || !status) {
      return NextResponse.json({ error: 'Ambassador ID and status are required' }, { status: 400 });
    }

    if (!['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Status must be either approved or rejected' }, { status: 400 });
    }

    const ambassador = await getAmbassadorById(ambassadorId);
    if (!ambassador) {
      return NextResponse.json({ error: 'Ambassador not found' }, { status: 404 });
    }

    await updateAmbassador(ambassadorId, { status });

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
      }
    }

    return NextResponse.json({
      message: `Ambassador ${status} successfully`,
      ambassador: {
        id: ambassador.id,
        name: ambassador.name,
        email: ambassador.email,
        status,
        referral_code: ambassador.referral_code,
      },
    });
  } catch (error) {
    console.error('Approve ambassador error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
