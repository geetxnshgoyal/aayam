import { NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import { getAllAmbassadors, getAllSignups } from '@/lib/firestore-helpers';
import { getAmbassadorById } from '@/lib/firestore-helpers';

export async function GET(request: Request) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const ambassadors = await getAllAmbassadors();
    const signups = await getAllSignups();

    // Enrich signups with ambassador info (Firestore has no joins)
    const signupsWithAmbassador = await Promise.all(
      signups.map(async (s) => {
        const ambassador = await getAmbassadorById(s.ambassador_id);
        return {
          ...s,
          ambassadors: ambassador ? { name: ambassador.name, referral_code: ambassador.referral_code } : null,
        };
      })
    );

    const stats = {
      totalAmbassadors: ambassadors.length,
      pendingAmbassadors: ambassadors.filter((a) => a.status === 'pending').length,
      approvedAmbassadors: ambassadors.filter((a) => a.status === 'approved').length,
      rejectedAmbassadors: ambassadors.filter((a) => a.status === 'rejected').length,
      totalSignups: signups.length,
      tierDistribution: {
        bronze: ambassadors.filter((a) => a.tier === 'bronze').length,
        silver: ambassadors.filter((a) => a.tier === 'silver').length,
        gold: ambassadors.filter((a) => a.tier === 'gold').length,
        platinum: ambassadors.filter((a) => a.tier === 'platinum').length,
      },
    };

    const sanitizedAmbassadors = ambassadors.map(({ password, ...rest }) => rest);

    return NextResponse.json({
      ambassadors: sanitizedAmbassadors,
      signups: signupsWithAmbassador,
      stats,
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
