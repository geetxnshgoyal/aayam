import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '@/lib/auth';
import {
  getAmbassadorPoints,
  getAmbassadorById,
  addAmbassadorPoints,
  updateAmbassador,
  tierFromSignupCount,
} from '@/lib/firestore-helpers';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, getJwtSecret(), { algorithms: ['HS256'] }) as { id: string };
    const ambassadorId = decoded.id;
    const body = await request.json();
    const rawPoints = body.pointsNeeded ?? 12;
    const pointsNeeded = Math.max(1, Math.min(1000, Math.floor(Number(rawPoints))));

    const totalPoints = await getAmbassadorPoints(ambassadorId);

    if (totalPoints < pointsNeeded) {
      return NextResponse.json(
        {
          error: `Insufficient points. You have ${totalPoints} points, need ${pointsNeeded}`,
          currentPoints: totalPoints,
          needed: pointsNeeded,
        },
        { status: 400 }
      );
    }

    await addAmbassadorPoints(ambassadorId, -pointsNeeded, 'conversion');

    const ambassador = await getAmbassadorById(ambassadorId);
    if (!ambassador) {
      return NextResponse.json({ error: 'Failed to fetch ambassador' }, { status: 500 });
    }

    const newCount = (ambassador.signup_count || 0) + 1;
    const newTier = tierFromSignupCount(newCount);
    await updateAmbassador(ambassadorId, {
      signup_count: newCount,
      tier: newTier,
    });

    return NextResponse.json({
      message: 'Successfully converted points to signup!',
      newPoints: totalPoints - pointsNeeded,
      signupAdded: 1,
    });
  } catch (error) {
    console.error('Error converting points:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
