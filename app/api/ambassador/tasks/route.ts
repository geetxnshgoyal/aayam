import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '@/lib/auth';
import { getAmbassadorPoints, getActiveTasks, getSubmissionsByAmbassadorId } from '@/lib/firestore-helpers';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, getJwtSecret(), { algorithms: ['HS256'] }) as { id: string };
    const ambassadorId = decoded.id;

    const totalPoints = await getAmbassadorPoints(ambassadorId);
    const tasks = await getActiveTasks();
    const submissions = await getSubmissionsByAmbassadorId(ambassadorId);

    return NextResponse.json({
      tasks,
      submissions,
      totalPoints,
      pointsPerSignup: 12,
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
