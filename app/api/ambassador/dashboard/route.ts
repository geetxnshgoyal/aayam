import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '@/lib/auth';
import { getAmbassadorById, getSignupsByAmbassadorId } from '@/lib/firestore-helpers';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, getJwtSecret(), { algorithms: ['HS256'] }) as { id: string };

    const ambassador = await getAmbassadorById(decoded.id);
    if (!ambassador) {
      return NextResponse.json({ error: 'Ambassador not found' }, { status: 404 });
    }

    const signups = await getSignupsByAmbassadorId(decoded.id);

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
