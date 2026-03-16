/**
 * Shared database entity types (Firestore).
 */

export interface Ambassador {
  id: string;
  name: string;
  email: string;
  phone?: string;
  college?: string;
  year?: string;
  referral_code: string;
  status: 'pending' | 'approved' | 'rejected';
  signup_count: number;
  tier: 'none' | 'bronze' | 'silver' | 'gold' | 'platinum';
  created_at: string;
  approved_at?: string;
  password?: string;
}

export interface Signup {
  id: string;
  ambassador_id: string;
  participant_name: string;
  participant_email: string;
  participant_phone?: string;
  participant_college?: string;
  registered_at: string;
  status?: 'pending' | 'approved' | 'rejected';
  approved_at?: string | null;
  approved_by?: string | null;
}

export interface Task {
  id: string;
  name: string;
  description?: string;
  /** Detailed task instructions for ambassadors */
  instructions?: string;
  /** What proof ambassadors must submit (e.g. "Submit the link to your Instagram post/story") */
  submission_proof?: string;
  /** How points are awarded (e.g. "Story shared → 10–20 points, Post/Reel → 30–50 points") */
  points_criteria?: string;
  /** Optional example caption or template for social tasks */
  example_caption?: string;
  points_min: number;
  points_max: number;
  required_proof: 'link' | 'screenshot' | 'video' | 'text';
  active: boolean;
  created_at: string;
}

export interface TaskSubmission {
  id: string;
  ambassador_id: string;
  task_id: string;
  proof_link?: string;
  proof_screenshot?: string;
  status: 'pending' | 'approved' | 'rejected';
  points_awarded?: number;
  admin_notes?: string;
  submitted_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
  task?: Task;
}

export interface AmbassadorPoints {
  id: string;
  ambassador_id: string;
  points: number;
  source: 'task' | 'signup' | 'admin' | 'conversion';
  reference_id?: string;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  password: string;
}
