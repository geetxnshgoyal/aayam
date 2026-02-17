import { NextResponse } from 'next/server';
import { sendAmbassadorApprovalEmail, verifyEmailConnection } from '@/lib/email';

export async function GET() {
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
      email: 'goyalgeetansh@gmail.com',
      referralCode: 'AAYAMTEST01',
      loginUrl: 'http://localhost:3003/ambassador/login',
    });

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully!',
      messageId: result.messageId,
      recipient: 'goyalgeetansh@gmail.com',
    });
  } catch (error: any) {
    console.error('Test email failed:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send test email',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
