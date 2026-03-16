import { NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import {
  getAmbassadorByReferralCode,
  getSignupByEmail,
  createSignup,
  updateAmbassador,
  tierFromSignupCount,
} from '@/lib/firestore-helpers';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = { name: 200, email: 254, phone: 30, college: 200 };

interface CSVRow {
  referral_code: string;
  participant_name: string;
  participant_email: string;
  participant_phone?: string;
  participant_college?: string;
}

export async function POST(request: Request) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { signups } = await request.json();

    if (!signups || !Array.isArray(signups) || signups.length === 0) {
      return NextResponse.json({ error: 'Signups array is required' }, { status: 400 });
    }

    const results = {
      success: 0,
      failed: 0,
      errors: [] as Array<{ row: number; error: string }>,
    };

    for (let i = 0; i < signups.length; i++) {
      const row = signups[i] as CSVRow;

      try {
        if (!row.referral_code || !row.participant_name || !row.participant_email) {
          results.failed++;
          results.errors.push({ row: i + 1, error: 'Missing required fields (referral_code, participant_name, participant_email)' });
          continue;
        }

        const email = String(row.participant_email).trim().toLowerCase().slice(0, MAX_LEN.email);
        if (!EMAIL_REGEX.test(email)) {
          results.failed++;
          results.errors.push({ row: i + 1, error: 'Invalid email format' });
          continue;
        }

        const ambassador = await getAmbassadorByReferralCode(row.referral_code.toUpperCase());
        if (!ambassador) {
          results.failed++;
          results.errors.push({ row: i + 1, error: `Invalid or unapproved referral code: ${row.referral_code}` });
          continue;
        }

        const existing = await getSignupByEmail(email);
        if (existing) {
          results.failed++;
          results.errors.push({ row: i + 1, error: 'Participant already registered' });
          continue;
        }

        const participant_name = String(row.participant_name).trim().slice(0, MAX_LEN.name);
        const participant_phone = row.participant_phone ? String(row.participant_phone).trim().slice(0, MAX_LEN.phone) : undefined;
        const participant_college = row.participant_college ? String(row.participant_college).trim().slice(0, MAX_LEN.college) : undefined;

        await createSignup({
          ambassador_id: ambassador.id,
          participant_name,
          participant_email: email,
          participant_phone,
          participant_college,
          status: 'approved',
          approved_at: new Date().toISOString(),
        });

        const newCount = (ambassador.signup_count || 0) + 1;
        const newTier = tierFromSignupCount(newCount);
        await updateAmbassador(ambassador.id, {
          signup_count: newCount,
          tier: newTier,
        });

        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push({
          row: i + 1,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      message: `Bulk upload completed: ${results.success} successful, ${results.failed} failed`,
      results,
    });
  } catch (error) {
    console.error('Bulk upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
