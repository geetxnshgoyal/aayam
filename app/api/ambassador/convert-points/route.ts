import { NextRequest, NextResponse } from 'next/server';
import { verifyAmbassadorToken } from '@/lib/auth';
import {
  getAmbassadorPoints,
  convertPointsToSignupOnce,
  POINTS_PER_SIGNUP,
} from '@/lib/firestore-helpers';

export async function POST(request: NextRequest) {
  try {
    const auth = verifyAmbassadorToken(request);
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const ambassadorId = auth.id;

    const converted = await convertPointsToSignupOnce(ambassadorId, POINTS_PER_SIGNUP);

    if (converted === 0) {
      const totalPoints = await getAmbassadorPoints(ambassadorId);
      return NextResponse.json(
        {
          error: `Insufficient points. You have ${totalPoints} points, need ${POINTS_PER_SIGNUP} to convert`,
          currentPoints: totalPoints,
          needed: POINTS_PER_SIGNUP,
        },
        { status: 400 }
      );
    }

    const newPoints = await getAmbassadorPoints(ambassadorId);

    return NextResponse.json({
      message: 'Successfully converted points to signup!',
      newPoints,
      signupAdded: 1,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Convert points error:', msg, error);
    return NextResponse.json({ error: 'Failed to convert points. Try again.' }, { status: 500 });
  }
}
