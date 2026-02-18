'use server';

import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    // Get token from header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret') as any;
    const ambassadorId = decoded.id;

    // Get total points for this ambassador
    const { data: pointsData, error: pointsError } = await supabase
      .from('ambassador_points')
      .select('points')
      .eq('ambassador_id', ambassadorId);

    if (pointsError) {
      return NextResponse.json({ error: 'Failed to fetch points' }, { status: 500 });
    }

    const totalPoints = (pointsData || []).reduce((sum, p) => sum + p.points, 0);

    // Get all active tasks
    const { data: tasks, error: tasksError } = await supabase
      .from('tasks')
      .select('*')
      .eq('active', true);

    if (tasksError) {
      return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
    }

    // Get ambassador's submissions
    const { data: submissions, error: submissionsError } = await supabase
      .from('task_submissions')
      .select('*')
      .eq('ambassador_id', ambassadorId);

    if (submissionsError) {
      return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
    }

    return NextResponse.json({
      tasks,
      submissions,
      totalPoints,
      pointsPerSignup: 12, // Average of 10-15
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
