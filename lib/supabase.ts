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
