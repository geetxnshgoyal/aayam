'use server';

import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify admin token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret') as any;
    if (!decoded.isAdmin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Get pending submissions with task and ambassador info
    const { data: submissions, error } = await supabase
      .from('task_submissions')
      .select(
        `
        *,
        task:task_id(name, points_min, points_max),
        ambassador:ambassador_id(name, email)
      `
      )
      .eq('status', 'pending')
      .order('submitted_at', { ascending: true });

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
    }

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret') as any;
    if (!decoded.isAdmin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { submissionId, status, pointsAwarded, notes } = await request.json();

    if (!submissionId || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    // Get submission
    const { data: submission, error: fetchError } = await supabase
      .from('task_submissions')
      .select('*')
      .eq('id', submissionId)
      .single();

    if (fetchError || !submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    // Update submission
    const { error: updateError } = await supabase
      .from('task_submissions')
      .update({
        status,
        points_awarded: status === 'approved' ? pointsAwarded : null,
        admin_notes: notes,
        reviewed_at: new Date().toISOString(),
        reviewed_by: decoded.id,
      })
      .eq('id', submissionId);

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 });
    }

    // If approved, add points to ambassador
    if (status === 'approved' && pointsAwarded) {
      const { error: pointsError } = await supabase
        .from('ambassador_points')
        .insert({
          ambassador_id: submission.ambassador_id,
          points: pointsAwarded,
          source: 'task',
          reference_id: submission.task_id,
        });

      if (pointsError) {
        console.error('Error adding points:', pointsError);
      }
    }

    return NextResponse.json({
      message: `Task ${status === 'approved' ? 'approved' : 'rejected'} successfully`,
      submission,
    });
  } catch (error) {
    console.error('Error reviewing submission:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
