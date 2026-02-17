import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(request: Request) {
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

    // Fetch all ambassadors
    const { data: ambassadors, error: ambassadorsError } = await supabase
      .from('ambassadors')
      .select('*')
      .order('created_at', { ascending: false });

    if (ambassadorsError) {
      throw ambassadorsError;
    }

    // Fetch all signups with ambassador info
    const { data: signups, error: signupsError } = await supabase
      .from('signups')
      .select(`
        *,
        ambassadors (
          name,
          referral_code
        )
      `)
      .order('registered_at', { ascending: false });

    if (signupsError) {
      throw signupsError;
    }

    // Calculate stats
    const stats = {
      totalAmbassadors: ambassadors.length,
      pendingAmbassadors: ambassadors.filter(a => a.status === 'pending').length,
      approvedAmbassadors: ambassadors.filter(a => a.status === 'approved').length,
      rejectedAmbassadors: ambassadors.filter(a => a.status === 'rejected').length,
      totalSignups: signups.length,
      tierDistribution: {
        bronze: ambassadors.filter(a => a.tier === 'bronze').length,
        silver: ambassadors.filter(a => a.tier === 'silver').length,
        gold: ambassadors.filter(a => a.tier === 'gold').length,
        platinum: ambassadors.filter(a => a.tier === 'platinum').length,
      }
    };

    // Remove passwords from ambassadors
    const sanitizedAmbassadors = ambassadors.map(({ password, ...rest }) => rest);

    return NextResponse.json({
      ambassadors: sanitizedAmbassadors,
      signups,
      stats,
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
