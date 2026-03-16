import { getDb, COLLECTIONS, docToData } from './firebase';
import type { Ambassador, Signup, Task, TaskSubmission, AmbassadorPoints } from './db-types';
import { FieldValue } from 'firebase-admin/firestore';

export type Tier = 'none' | 'bronze' | 'silver' | 'gold' | 'platinum';

export function tierFromSignupCount(count: number): Tier {
  if (count >= 100) return 'platinum';
  if (count >= 50) return 'gold';
  if (count >= 25) return 'silver';
  if (count >= 10) return 'bronze';
  return 'none';
}

/** Ambassador CRUD */
export async function getAmbassadorById(id: string): Promise<(Ambassador & { id: string }) | null> {
  const snap = await getDb().collection(COLLECTIONS.ambassadors).doc(id).get();
  const data = docToData<Omit<Ambassador, 'id'>>(snap);
  if (!data) return null;
  return { ...data, created_at: data.created_at || '', id: data.id };
}

export async function getAmbassadorByEmail(email: string): Promise<(Ambassador & { id: string }) | null> {
  const snap = await getDb()
    .collection(COLLECTIONS.ambassadors)
    .where('email', '==', email.toLowerCase())
    .limit(1)
    .get();
  if (snap.empty) return null;
  const data = docToData<Omit<Ambassador, 'id'>>(snap.docs[0]);
  if (!data) return null;
  const created = (snap.docs[0].data() as any).created_at;
  return {
    ...data,
    created_at: typeof created?.toDate === 'function' ? created.toDate().toISOString() : (created || ''),
    id: data.id,
  };
}

export async function getAmbassadorByReferralCode(code: string): Promise<(Ambassador & { id: string }) | null> {
  const snap = await getDb()
    .collection(COLLECTIONS.ambassadors)
    .where('referral_code', '==', code.toUpperCase())
    .where('status', '==', 'approved')
    .limit(1)
    .get();
  if (snap.empty) return null;
  const data = docToData<Omit<Ambassador, 'id'>>(snap.docs[0]);
  if (!data) return null;
  const created = (snap.docs[0].data() as any).created_at;
  return {
    ...data,
    created_at: typeof created?.toDate === 'function' ? created.toDate().toISOString() : (created || ''),
    id: data.id,
  };
}

export async function referralCodeExists(code: string): Promise<boolean> {
  const snap = await getDb()
    .collection(COLLECTIONS.ambassadors)
    .where('referral_code', '==', code)
    .limit(1)
    .get();
  return !snap.empty;
}

export async function createAmbassador(data: Omit<Ambassador, 'id' | 'created_at'>): Promise<Ambassador & { id: string }> {
  const ref = getDb().collection(COLLECTIONS.ambassadors).doc();
  const now = new Date().toISOString();
  await ref.set({
    ...data,
    created_at: now,
  });
  return { ...data, id: ref.id, created_at: now } as Ambassador & { id: string };
}

export async function updateAmbassador(id: string, updates: Partial<Ambassador>): Promise<void> {
  await getDb().collection(COLLECTIONS.ambassadors).doc(id).update(updates);
}

export async function getAllAmbassadors(): Promise<(Ambassador & { id: string })[]> {
  const snap = await getDb()
    .collection(COLLECTIONS.ambassadors)
    .orderBy('created_at', 'desc')
    .get();
  return snap.docs.map((d) => {
    const data = d.data();
    const created = data.created_at;
    return {
      ...docToData<Omit<Ambassador, 'id'>>(d)!,
      created_at: typeof created?.toDate === 'function' ? created.toDate().toISOString() : (created || ''),
    };
  });
}

/** Signup CRUD */
export async function getSignupByEmail(email: string): Promise<Signup | null> {
  const snap = await getDb()
    .collection(COLLECTIONS.signups)
    .where('participant_email', '==', email.toLowerCase())
    .limit(1)
    .get();
  if (snap.empty) return null;
  const d = snap.docs[0];
  const data = d.data();
  const reg = data.registered_at;
  return {
    ...docToData<Omit<Signup, 'id'>>(d)!,
    registered_at: typeof reg?.toDate === 'function' ? reg.toDate().toISOString() : (reg || ''),
  };
}

export async function getSignupsByAmbassadorId(ambassadorId: string): Promise<Signup[]> {
  const snap = await getDb()
    .collection(COLLECTIONS.signups)
    .where('ambassador_id', '==', ambassadorId)
    .get();
  const signups = snap.docs.map((d) => {
    const data = d.data();
    const reg = data.registered_at;
    return {
      ...docToData<Omit<Signup, 'id'>>(d)!,
      registered_at: typeof reg?.toDate === 'function' ? reg.toDate().toISOString() : (reg || ''),
    };
  });
  return signups.sort((a, b) => (b.registered_at || '').localeCompare(a.registered_at || ''));
}

export async function getAllSignups(): Promise<Signup[]> {
  const snap = await getDb()
    .collection(COLLECTIONS.signups)
    .orderBy('registered_at', 'desc')
    .get();
  return snap.docs.map((d) => {
    const data = d.data();
    const reg = data.registered_at;
    return {
      ...docToData<Omit<Signup, 'id'>>(d)!,
      registered_at: typeof reg?.toDate === 'function' ? reg.toDate().toISOString() : (reg || ''),
    };
  });
}

export async function createSignup(data: Omit<Signup, 'id' | 'registered_at'>): Promise<Signup & { id: string }> {
  const ref = getDb().collection(COLLECTIONS.signups).doc();
  const now = new Date().toISOString();
  await ref.set({
    ...data,
    registered_at: now,
  });
  return { ...data, id: ref.id, registered_at: now } as Signup & { id: string };
}

export async function getSignupById(id: string): Promise<Signup | null> {
  const snap = await getDb().collection(COLLECTIONS.signups).doc(id).get();
  const data = docToData<Omit<Signup, 'id'>>(snap);
  if (!data) return null;
  const raw = snap.data();
  const reg = raw?.registered_at;
  return {
    ...data,
    registered_at: typeof reg?.toDate === 'function' ? reg.toDate().toISOString() : (reg || ''),
  };
}

export async function updateSignup(id: string, updates: Partial<Signup>): Promise<void> {
  await getDb().collection(COLLECTIONS.signups).doc(id).update(updates);
}

/** Tasks */
export async function getActiveTasks(): Promise<(Task & { id: string })[]> {
  const snap = await getDb()
    .collection(COLLECTIONS.tasks)
    .where('active', '==', true)
    .get();
  return snap.docs.map((d) => {
    const data = d.data();
    const created = data.created_at;
    return {
      ...docToData<Omit<Task, 'id'>>(d)!,
      created_at: typeof created?.toDate === 'function' ? created.toDate().toISOString() : (created || ''),
    };
  });
}

export async function getTaskById(id: string): Promise<(Task & { id: string }) | null> {
  const snap = await getDb().collection(COLLECTIONS.tasks).doc(id).get();
  const data = docToData<Omit<Task, 'id'>>(snap);
  if (!data) return null;
  const raw = snap.data();
  const created = raw?.created_at;
  return {
    ...data,
    created_at: typeof created?.toDate === 'function' ? created.toDate().toISOString() : (created || ''),
  };
}

export async function getAllTasks(): Promise<(Task & { id: string })[]> {
  const snap = await getDb()
    .collection(COLLECTIONS.tasks)
    .orderBy('created_at', 'desc')
    .get();
  return snap.docs.map((d) => {
    const data = d.data();
    const created = data.created_at;
    return {
      ...docToData<Omit<Task, 'id'>>(d)!,
      created_at: typeof created?.toDate === 'function' ? created.toDate().toISOString() : (created || ''),
    };
  });
}

export async function createTask(data: Omit<Task, 'id' | 'created_at'>): Promise<Task & { id: string }> {
  const ref = getDb().collection(COLLECTIONS.tasks).doc();
  const now = new Date().toISOString();
  await ref.set({
    ...data,
    created_at: now,
  });
  return { ...data, id: ref.id, created_at: now } as Task & { id: string };
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<void> {
  await getDb().collection(COLLECTIONS.tasks).doc(id).update(updates);
}

/** Ambassador points */
export async function getAmbassadorPoints(ambassadorId: string): Promise<number> {
  const snap = await getDb()
    .collection(COLLECTIONS.ambassador_points)
    .where('ambassador_id', '==', ambassadorId)
    .get();
  return snap.docs.reduce((sum, d) => sum + (d.data().points || 0), 0);
}

export async function addAmbassadorPoints(
  ambassadorId: string,
  points: number,
  source: 'task' | 'signup' | 'admin' | 'conversion',
  referenceId?: string
): Promise<void> {
  await getDb().collection(COLLECTIONS.ambassador_points).add({
    ambassador_id: ambassadorId,
    points,
    source,
    reference_id: referenceId || null,
    created_at: FieldValue.serverTimestamp(),
  });
}

/** Task submissions */
export async function getSubmissionsByAmbassadorId(ambassadorId: string): Promise<TaskSubmission[]> {
  const snap = await getDb()
    .collection(COLLECTIONS.task_submissions)
    .where('ambassador_id', '==', ambassadorId)
    .get();
  return snap.docs.map((d) => {
    const data = d.data();
    const sub = data.submitted_at;
    return {
      ...docToData<Omit<TaskSubmission, 'id'>>(d)!,
      submitted_at: typeof sub?.toDate === 'function' ? sub.toDate().toISOString() : (sub || ''),
    };
  });
}

export async function getPendingSubmissions(): Promise<(TaskSubmission & { task?: Task; ambassador?: { name: string; email: string } })[]> {
  const snap = await getDb()
    .collection(COLLECTIONS.task_submissions)
    .where('status', '==', 'pending')
    .orderBy('submitted_at', 'asc')
    .get();
  const results: (TaskSubmission & { task?: Task; ambassador?: { name: string; email: string } })[] = [];
  for (const d of snap.docs) {
    const data = d.data();
    const sub = data.submitted_at;
    const submission: TaskSubmission & { id: string } = {
      ...docToData<Omit<TaskSubmission, 'id'>>(d)!,
      submitted_at: typeof sub?.toDate === 'function' ? sub.toDate().toISOString() : (sub || ''),
    };
    const task = await getTaskById(data.task_id);
    const ambassador = await getAmbassadorById(data.ambassador_id);
    results.push({
      ...submission,
      task: task || undefined,
      ambassador: ambassador ? { name: ambassador.name, email: ambassador.email } : undefined,
    });
  }
  return results;
}

export async function getSubmissionById(id: string): Promise<(TaskSubmission & { id: string }) | null> {
  const snap = await getDb().collection(COLLECTIONS.task_submissions).doc(id).get();
  const data = docToData<Omit<TaskSubmission, 'id'>>(snap);
  if (!data) return null;
  const raw = snap.data();
  const sub = raw?.submitted_at;
  return {
    ...data,
    submitted_at: typeof sub?.toDate === 'function' ? sub.toDate().toISOString() : (sub || ''),
  };
}

export async function createTaskSubmission(data: Omit<TaskSubmission, 'id' | 'submitted_at'>): Promise<TaskSubmission & { id: string }> {
  const ref = getDb().collection(COLLECTIONS.task_submissions).doc();
  const now = new Date().toISOString();
  await ref.set({
    ...data,
    submitted_at: now,
  });
  return { ...data, id: ref.id, submitted_at: now } as TaskSubmission & { id: string };
}

export async function updateTaskSubmission(id: string, updates: Partial<TaskSubmission>): Promise<void> {
  await getDb().collection(COLLECTIONS.task_submissions).doc(id).update(updates);
}

export async function hasSubmissionToday(ambassadorId: string, taskId: string): Promise<boolean> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().slice(0, 10); // YYYY-MM-DD
  const snap = await getDb()
    .collection(COLLECTIONS.task_submissions)
    .where('ambassador_id', '==', ambassadorId)
    .where('task_id', '==', taskId)
    .get();
  return snap.docs.some((d) => {
    const sub = d.data().submitted_at;
    const dateStr = typeof sub?.toDate === 'function' ? sub.toDate().toISOString().slice(0, 10) : String(sub || '').slice(0, 10);
    return dateStr === todayStr;
  });
}
