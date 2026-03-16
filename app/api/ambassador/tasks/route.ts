import { NextRequest, NextResponse } from 'next/server';
import { verifyAmbassadorToken } from '@/lib/auth';
import { getAmbassadorPoints, getActiveTasks, getSubmissionsByAmbassadorId } from '@/lib/firestore-helpers';

export async function GET(request: NextRequest) {
  try {
    const auth = verifyAmbassadorToken(request);
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const ambassadorId = auth.id;

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
