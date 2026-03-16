import { NextRequest, NextResponse } from 'next/server';
import { verifyAmbassadorToken } from '@/lib/auth';
import { getAmbassadorById, getSignupsByAmbassadorId } from '@/lib/firestore-helpers';

export async function GET(request: NextRequest) {
  try {
    const auth = verifyAmbassadorToken(request);
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const ambassador = await getAmbassadorById(auth.id);
    if (!ambassador) {
      return NextResponse.json({ error: 'Ambassador not found' }, { status: 404 });
    }

    const signups = await getSignupsByAmbassadorId(auth.id);

    const { password: _, ...ambassadorData } = ambassador;

    return NextResponse.json({
      ambassador: ambassadorData,
      signups,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
