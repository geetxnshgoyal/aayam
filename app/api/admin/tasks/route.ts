import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import { getAllTasks, createTask, updateTask } from '@/lib/firestore-helpers';

export async function GET(request: NextRequest) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tasks = await getAllTasks();
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const name = String(body.name || '').trim().slice(0, 200);
    const description = String(body.description || '').trim().slice(0, 1000);
    const instructions = String(body.instructions || '').trim().slice(0, 5000);
    const submission_proof = String(body.submission_proof || '').trim().slice(0, 1000);
    const points_criteria = String(body.points_criteria || '').trim().slice(0, 1000);
    const example_caption = String(body.example_caption || '').trim().slice(0, 1000);
    const points_min = Math.max(0, Math.min(1000, Math.floor(Number(body.points_min) || 0)));
    const points_max = Math.max(0, Math.min(1000, Math.floor(Number(body.points_max) || 0)));
    const required_proof = ['link', 'screenshot', 'video', 'text'].includes(body.required_proof)
      ? body.required_proof
      : 'link';
    const active = body.active !== false;

    if (!name) {
      return NextResponse.json({ error: 'Task name is required' }, { status: 400 });
    }

    const task = await createTask({
      name,
      description: description || undefined,
      instructions: instructions || undefined,
      submission_proof: submission_proof || undefined,
      points_criteria: points_criteria || undefined,
      example_caption: example_caption || undefined,
      points_min,
      points_max: Math.max(points_min, points_max),
      required_proof,
      active,
    });

    return NextResponse.json({ message: 'Task created', task }, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    const allowed: Record<string, unknown> = {};
    if (updates.name != null) allowed.name = String(updates.name).trim().slice(0, 200);
    if (updates.description != null) allowed.description = String(updates.description).trim().slice(0, 1000);
    if (updates.instructions != null) allowed.instructions = String(updates.instructions).trim().slice(0, 5000);
    if (updates.submission_proof != null) allowed.submission_proof = String(updates.submission_proof).trim().slice(0, 1000);
    if (updates.points_criteria != null) allowed.points_criteria = String(updates.points_criteria).trim().slice(0, 1000);
    if (updates.example_caption != null) allowed.example_caption = String(updates.example_caption).trim().slice(0, 1000);
    if (updates.points_min != null) allowed.points_min = Math.max(0, Math.min(1000, Math.floor(Number(updates.points_min))));
    if (updates.points_max != null) allowed.points_max = Math.max(0, Math.min(1000, Math.floor(Number(updates.points_max))));
    if (['link', 'screenshot', 'video', 'text'].includes(updates.required_proof)) allowed.required_proof = updates.required_proof;
    if (typeof updates.active === 'boolean') allowed.active = updates.active;

    if (Object.keys(allowed).length === 0) {
      return NextResponse.json({ error: 'No valid updates provided' }, { status: 400 });
    }

    await updateTask(id, allowed as Partial<import('@/lib/db-types').Task>);
    return NextResponse.json({ message: 'Task updated' });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
