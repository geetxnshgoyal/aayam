import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

interface CSVRow {
  referral_code: string;
  participant_name: string;
  participant_email: string;
  participant_phone?: string;
  participant_college?: string;
}

export async function POST(request: Request) {
  try {
    // Verify admin token
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { signups } = await request.json();

    if (!signups || !Array.isArray(signups) || signups.length === 0) {
      return NextResponse.json(
        { error: 'Signups array is required' },
        { status: 400 }
      );
    }

    const results = {
      success: 0,
      failed: 0,
      errors: [] as Array<{ row: number; error: string; data: any }>,
    };

    // Process each signup
    for (let i = 0; i < signups.length; i++) {
      const row = signups[i] as CSVRow;

      try {
        // Validate required fields
        if (!row.referral_code || !row.participant_name || !row.participant_email) {
          results.failed++;
          results.errors.push({
            row: i + 1,
            error: 'Missing required fields (referral_code, participant_name, participant_email)',
            data: row,
          });
          continue;
        }

        // Find ambassador by referral code
        const { data: ambassador, error: ambassadorError } = await supabase
          .from('ambassadors')
          .select('id, signup_count')
          .eq('referral_code', row.referral_code.toUpperCase())
          .eq('status', 'approved') // Only approved ambassadors
          .single();

        if (ambassadorError || !ambassador) {
          results.failed++;
          results.errors.push({
            row: i + 1,
            error: `Invalid or unapproved referral code: ${row.referral_code}`,
            data: row,
          });
          continue;
        }

        // Check for duplicate email
        const { data: existing } = await supabase
          .from('signups')
          .select('id')
          .eq('participant_email', row.participant_email)
          .single();

        if (existing) {
          results.failed++;
          results.errors.push({
            row: i + 1,
            error: `Participant already registered: ${row.participant_email}`,
            data: row,
          });
          continue;
        }

        // Insert signup with approved status (bulk upload is pre-verified)
        const { error: insertError } = await supabase
          .from('signups')
          .insert([
            {
              ambassador_id: ambassador.id,
              participant_name: row.participant_name,
              participant_email: row.participant_email,
              participant_phone: row.participant_phone || null,
              participant_college: row.participant_college || null,
              status: 'approved', // Auto-approve bulk uploads
              approved_at: new Date().toISOString(),
            },
          ]);

        if (insertError) {
          results.failed++;
          results.errors.push({
            row: i + 1,
            error: insertError.message,
            data: row,
          });
          continue;
        }

        // Update ambassador signup count
        const { error: updateError } = await supabase
          .from('ambassadors')
          .update({ signup_count: ambassador.signup_count + 1 })
          .eq('id', ambassador.id);

        if (updateError) {
          console.error(`Failed to update count for ambassador ${ambassador.id}:`, updateError);
        }

        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push({
          row: i + 1,
          error: error instanceof Error ? error.message : 'Unknown error',
          data: row,
        });
      }
    }

    return NextResponse.json({
      message: `Bulk upload completed: ${results.success} successful, ${results.failed} failed`,
      results,
    });
  } catch (error) {
    console.error('Bulk upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
