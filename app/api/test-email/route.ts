import { NextResponse } from 'next/server';
import { sendAmbassadorApprovalEmail, verifyEmailConnection } from '@/lib/email';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }
  try {
    // First verify email connection
    console.log('Verifying email connection...');
    const isConnected = await verifyEmailConnection();
    
    if (!isConnected) {
      return NextResponse.json(
        { error: 'Email server connection failed. Check your SMTP credentials.' },
        { status: 500 }
      );
    }

    console.log('Email connection verified. Sending test email...');

    // Send test email
    const result = await sendAmbassadorApprovalEmail({
      name: 'Geetansh Goyal',
      email: 'aayam.fest@newtonschool.co',
      referralCode: 'AAYAMTEST01',
      loginUrl: 'http://localhost:3003/ambassador/login',
    });

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully!',
      messageId: result.messageId,
      recipient: 'aayam.fest@newtonschool.co',
    });
  } catch (error: unknown) {
    console.error('Test email failed:', error);
    return NextResponse.json(
      { error: 'Failed to send test email' },
      { status: 500 }
    );
  }
}
