import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
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
}

export interface Signup {
  id: string;
  ambassador_id: string;
  participant_name: string;
  participant_email: string;
  participant_phone?: string;
  participant_college?: string;
  registered_at: string;
}

export interface Task {
  id: string;
  name: string;
  description?: string;
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

