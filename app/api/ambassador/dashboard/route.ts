import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key-change-this';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    // Get ambassador data
    const { data: ambassador, error: ambassadorError } = await supabase
      .from('ambassadors')
      .select('*')
      .eq('id', decoded.id)
      .single();

    if (ambassadorError || !ambassador) {
      return NextResponse.json(
        { error: 'Ambassador not found' },
        { status: 404 }
      );
    }

    // Get signups for this ambassador
    const { data: signups, error: signupsError } = await supabase
      .from('signups')
      .select('*')
      .eq('ambassador_id', decoded.id)
      .order('registered_at', { ascending: false });

    if (signupsError) {
      console.error('Error fetching signups:', signupsError);
    }

    // Remove password from ambassador data
    const { password: _, ...ambassadorData } = ambassador;

    return NextResponse.json({
      ambassador: ambassadorData,
      signups: signups || [],
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
