import { NextResponse } from 'next/server';
import { sendAmbassadorApprovalEmail, verifyEmailConnection } from '@/lib/email';
import { verifyAdminToken } from '@/lib/auth';
import { PRIMARY_SITE_URL } from '@/lib/site';

export async function GET(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }
  try {
    const isConnected = await verifyEmailConnection();
    if (!isConnected) {
      return NextResponse.json(
        { error: 'Email server connection failed. Check your SMTP credentials.' },
        { status: 500 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || PRIMARY_SITE_URL;
    const result = await sendAmbassadorApprovalEmail({
      name: 'Test Ambassador',
      email: process.env.SMTP_USER || 'test@example.com',
      referralCode: 'AAYAMTEST01',
      loginUrl: `${baseUrl}/ambassador/login`,
    });

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully!',
      messageId: result.messageId,
      recipient: process.env.SMTP_USER || 'test@example.com',
    });
  } catch (error: unknown) {
    console.error('Test email failed:', error);
    return NextResponse.json(
      { error: 'Failed to send test email' },
      { status: 500 }
    );
  }
}
