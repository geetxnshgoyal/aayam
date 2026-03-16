import { NextRequest, NextResponse } from 'next/server';
import { verifyAmbassadorToken } from '@/lib/auth';
import {
  getTaskById,
  hasSubmissionToday,
  createTaskSubmission,
} from '@/lib/firestore-helpers';

export async function POST(request: NextRequest) {
  try {
    const auth = verifyAmbassadorToken(request);
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const ambassadorId = auth.id;

    let body: { taskId?: string; proofLink?: string; proofScreenshot?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    const { taskId, proofLink, proofScreenshot } = body;

    if (!taskId) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    const task = await getTaskById(taskId);
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    if (task.required_proof === 'link' && !proofLink) {
      return NextResponse.json({ error: 'Link proof required for this task' }, { status: 400 });
    }

    if (task.required_proof === 'screenshot' && !proofScreenshot) {
      return NextResponse.json({ error: 'Screenshot proof required for this task' }, { status: 400 });
    }

    const safeHttpUrl = (v: unknown): string | undefined => {
      if (typeof v !== 'string') return undefined;
      const s = v.trim().slice(0, 2048);
      if (!s || /^javascript:/i.test(s)) return undefined;
      if (/^https?:\/\//i.test(s)) return s;
      if (/^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}(\/.*)?$/i.test(s)) return `https://${s}`;
      return undefined;
    };
    const safeImageUrl = (v: unknown): string | undefined => {
      if (typeof v !== 'string') return undefined;
      const s = v.trim().slice(0, 50000);
      if (!s || /^javascript:/i.test(s)) return undefined;
      if (/^https?:\/\//i.test(s)) return s;
      if (/^data:image\/(png|jpeg|jpg|gif|webp);base64,/i.test(s)) return s;
      return undefined;
    };

    const safeProofLink = proofLink ? safeHttpUrl(proofLink) : undefined;
    const safeProofScreenshot = proofScreenshot ? safeImageUrl(proofScreenshot) : undefined;

    if (task.required_proof === 'link' && !safeProofLink) {
      return NextResponse.json({ error: 'Invalid proof link. Use a valid http(s) URL.' }, { status: 400 });
    }

    if (task.required_proof === 'screenshot' && !safeProofScreenshot) {
      return NextResponse.json({ error: 'Invalid proof. Use http(s) URL or base64 image (png/jpeg/gif/webp).' }, { status: 400 });
    }

    const alreadySubmitted = await hasSubmissionToday(ambassadorId, taskId);
    if (alreadySubmitted) {
      return NextResponse.json({ error: 'You can only submit this task once per day' }, { status: 400 });
    }

    const submission = await createTaskSubmission({
      ambassador_id: ambassadorId,
      task_id: taskId,
      proof_link: safeProofLink,
      proof_screenshot: safeProofScreenshot,
      status: 'pending',
    });

    return NextResponse.json({
      message: 'Task submitted successfully! Awaiting admin review.',
      submission,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    console.error('Submit task error:', msg, stack);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
