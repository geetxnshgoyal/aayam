import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

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
    
    let adminId: string;
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      adminId = decoded.id;
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { signupId, status } = await request.json();

    if (!signupId || !status) {
      return NextResponse.json(
        { error: 'Signup ID and status are required' },
        { status: 400 }
      );
    }

    if (!['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Status must be either approved or rejected' },
        { status: 400 }
      );
    }

    // Get signup details before updating
    const { data: signup, error: fetchError } = await supabase
      .from('signups')
      .select('*, ambassadors!inner(id, name, signup_count)')
      .eq('id', signupId)
      .single();

    if (fetchError || !signup) {
      return NextResponse.json(
        { error: 'Signup not found' },
        { status: 404 }
      );
    }

    // Update signup status
    const { data: updatedSignup, error: updateError } = await supabase
      .from('signups')
      .update({
        status,
        approved_at: status === 'approved' ? new Date().toISOString() : null,
        approved_by: adminId,
      })
      .eq('id', signupId)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    // If approved, increment ambassador's signup count
    if (status === 'approved') {
      const { error: countError } = await supabase
        .from('ambassadors')
        .update({
          signup_count: (signup.ambassadors as any).signup_count + 1,
        })
        .eq('id', signup.ambassador_id);

      if (countError) {
        console.error('Failed to update signup count:', countError);
      }
    }

    return NextResponse.json({
      message: `Signup ${status} successfully`,
      signup: updatedSignup,
    });
  } catch (error) {
    console.error('Approve signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
