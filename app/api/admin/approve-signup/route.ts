import { NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import {
  getSignupById,
  getAmbassadorById,
  updateSignup,
  updateAmbassador,
  tierFromSignupCount,
} from '@/lib/firestore-helpers';

export async function POST(request: Request) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { signupId, status } = await request.json();

    if (!signupId || !status) {
      return NextResponse.json({ error: 'Signup ID and status are required' }, { status: 400 });
    }

    if (!['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Status must be either approved or rejected' }, { status: 400 });
    }

    const signup = await getSignupById(signupId);
    if (!signup) {
      return NextResponse.json({ error: 'Signup not found' }, { status: 404 });
    }

    const ambassador = await getAmbassadorById(signup.ambassador_id);
    if (!ambassador) {
      return NextResponse.json({ error: 'Ambassador not found' }, { status: 404 });
    }

    await updateSignup(signupId, {
      status,
      approved_at: status === 'approved' ? new Date().toISOString() : undefined,
      approved_by: admin.adminId,
    });

    if (status === 'approved') {
      const newCount = (ambassador.signup_count || 0) + 1;
      const newTier = tierFromSignupCount(newCount);
      await updateAmbassador(signup.ambassador_id, {
        signup_count: newCount,
        tier: newTier,
      });
    }

    const updatedSignup = await getSignupById(signupId);

    return NextResponse.json({
      message: `Signup ${status} successfully`,
      signup: updatedSignup,
    });
  } catch (error) {
    console.error('Approve signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
