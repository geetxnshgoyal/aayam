'use server';

import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret') as any;
    const ambassadorId = decoded.id;
    const { pointsNeeded = 12 } = await request.json(); // Default 12 points for 1 signup

    // Get total points for this ambassador
    const { data: pointsData, error: pointsError } = await supabase
      .from('ambassador_points')
      .select('points')
      .eq('ambassador_id', ambassadorId);

    if (pointsError) {
      return NextResponse.json({ error: 'Failed to fetch points' }, { status: 500 });
    }

    const totalPoints = (pointsData || []).reduce((sum, p) => sum + p.points, 0);

    if (totalPoints < pointsNeeded) {
      return NextResponse.json(
        {
          error: `Insufficient points. You have ${totalPoints} points, need ${pointsNeeded}`,
          currentPoints: totalPoints,
          needed: pointsNeeded,
        },
        { status: 400 }
      );
    }

    // Deduct points
    const { error: deductError } = await supabase
      .from('ambassador_points')
      .insert({
        ambassador_id: ambassadorId,
        points: -pointsNeeded,
        source: 'conversion',
      });

    if (deductError) {
      return NextResponse.json({ error: 'Failed to deduct points' }, { status: 500 });
    }

    // Add signup count
    const { data: ambassador, error: fetchError } = await supabase
      .from('ambassadors')
      .select('signup_count')
      .eq('id', ambassadorId)
      .single();

    if (fetchError || !ambassador) {
      return NextResponse.json({ error: 'Failed to fetch ambassador' }, { status: 500 });
    }

    const { error: updateError } = await supabase
      .from('ambassadors')
      .update({ signup_count: (ambassador.signup_count || 0) + 1 })
      .eq('id', ambassadorId);

    if (updateError) {
      return NextResponse.json({ error: 'Failed to add signup' }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Successfully converted points to signup!',
      newPoints: totalPoints - pointsNeeded,
      signupAdded: 1,
    });
  } catch (error) {
    console.error('Error converting points:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
