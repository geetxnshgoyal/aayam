'use server';

import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret') as any;
    const ambassadorId = decoded.id;
    const { taskId, proofLink, proofScreenshot } = await request.json();

    if (!taskId) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    // Get task to check required proof type
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', taskId)
      .single();

    if (taskError || !task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Validate proof based on task requirement
    if (task.required_proof === 'link' && !proofLink) {
      return NextResponse.json({ error: 'Link proof required for this task' }, { status: 400 });
    }

    if (task.required_proof === 'screenshot' && !proofScreenshot) {
      return NextResponse.json({ error: 'Screenshot proof required for this task' }, { status: 400 });
    }

    // Check if already submitted this task today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data: existingSubmission, error: existingError } = await supabase
      .from('task_submissions')
      .select('*')
      .eq('ambassador_id', ambassadorId)
      .eq('task_id', taskId)
      .gte('submitted_at', today.toISOString());

    if (existingSubmission && existingSubmission.length > 0) {
      return NextResponse.json(
        { error: 'You can only submit this task once per day' },
        { status: 400 }
      );
    }

    // Create submission
    const { data: submission, error: submitError } = await supabase
      .from('task_submissions')
      .insert({
        ambassador_id: ambassadorId,
        task_id: taskId,
        proof_link: proofLink,
        proof_screenshot: proofScreenshot,
        status: 'pending',
      })
      .select()
      .single();

    if (submitError) {
      console.error('Submission error:', submitError);
      return NextResponse.json({ error: 'Failed to submit task' }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Task submitted successfully! Awaiting admin review.',
      submission,
    });
  } catch (error) {
    console.error('Error submitting task:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
