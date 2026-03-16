import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import {
  getPendingSubmissions,
  getSubmissionById,
  updateTaskSubmission,
  addAmbassadorPoints,
} from '@/lib/firestore-helpers';

export async function GET(request: NextRequest) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const submissions = await getPendingSubmissions();

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { submissionId, status, pointsAwarded, notes } = await request.json();

    if (!submissionId || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const points = status === 'approved' && pointsAwarded != null
      ? Math.max(0, Math.min(1000, Math.floor(Number(pointsAwarded))))
      : undefined;
    const adminNotes = typeof notes === 'string' ? notes.slice(0, 500) : undefined;

    const submission = await getSubmissionById(submissionId);
    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    await updateTaskSubmission(submissionId, {
      status,
      points_awarded: points,
      admin_notes: adminNotes,
      reviewed_at: new Date().toISOString(),
      reviewed_by: admin.adminId,
    });

    if (status === 'approved' && points) {
      await addAmbassadorPoints(
        submission.ambassador_id,
        points,
        'task',
        submission.task_id
      );
    }

    return NextResponse.json({
      message: `Task ${status === 'approved' ? 'approved' : 'rejected'} successfully`,
      submission: { ...submission, status, points_awarded: points },
    });
  } catch (error) {
    console.error('Error reviewing submission:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
