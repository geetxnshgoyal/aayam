import * as nodemailer from 'nodemailer';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface AmbassadorApprovalEmailData {
  name: string;
  email: string;
  referralCode: string;
  loginUrl: string;
}

export async function sendAmbassadorApprovalEmail(data: AmbassadorApprovalEmailData) {
  const { name, email, referralCode, loginUrl } = data;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #0A0B16;
          color: #ffffff;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: linear-gradient(135deg, #180C16 0%, #0A0B16 100%);
          padding: 40px;
          border-radius: 16px;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 36px;
          font-weight: bold;
          color: #FF1744;
        }
        .title {
          font-size: 28px;
          font-weight: bold;
          color: #ffffff;
          margin: 20px 0;
        }
        .content {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(86, 15, 40, 0.3);
          border-radius: 12px;
          padding: 30px;
          margin: 20px 0;
        }
        .highlight {
          background: linear-gradient(90deg, #200934 0%, #560F28 100%);
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          margin: 20px 0;
        }
        .highlight p {
          color: #ffffff;
        }
        .referral-code {
          font-size: 32px;
          font-weight: bold;
          font-family: 'Courier New', monospace;
          color: #FF1744;
          letter-spacing: 2px;
        }
        .button {
          display: inline-block;
          background: linear-gradient(90deg, #200934 0%, #560F28 100%);
          color: #ffffff;
          text-decoration: none;
          padding: 15px 40px;
          border-radius: 8px;
          font-weight: bold;
          margin: 20px 0;
        }
        .info-box {
          background: rgba(255, 23, 68, 0.1);
          border-left: 4px solid #FF1744;
          padding: 15px;
          margin: 15px 0;
          border-radius: 4px;
        }
        .info-box h3 {
          color: #FF1744;
          margin-top: 0;
        }
        .info-box p,
        .info-box ol,
        .info-box ul {
          color: #ffffff;
        }
        .info-box li {
          color: #ffffff;
        }
        .content h2 {
          color: #ffffff;
        }
        .content p {
          color: #ffffff;
          line-height: 1.8;
        }
        .content ol,
        .content ul {
          color: #ffffff;
        }
        .content li {
          color: #ffffff;
        }
        strong {
          color: #FF1744;
        }
        .footer {
          text-align: center;
          color: #999;
          font-size: 14px;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .footer p {
          color: #999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">AAYAM 2026</div>
          <div class="title">🎉 Congratulations!</div>
        </div>

        <div class="content">
          <h2>Hi ${name},</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            We're thrilled to inform you that your application for the <strong>AAYAM 2026 Ambassador Program</strong> has been <span style="color: #00FF00; font-weight: bold;">APPROVED</span>! 🚀
          </p>

          <div class="highlight">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #ccc;">Your Unique Referral Code</p>
            <div class="referral-code">${referralCode}</div>
          </div>

          <div class="info-box">
            <h3 style="margin-top: 0; color: #FF1744;">📋 Next Steps:</h3>
            <ol style="line-height: 1.8;">
              <li><strong>Login to your dashboard</strong> using the credentials you registered with</li>
              <li><strong>Share your referral code</strong> with students across colleges</li>
              <li><strong>Track your signups</strong> and watch your tier grow</li>
              <li><strong>Earn rewards</strong> as you reach higher tiers</li>
            </ol>
          </div>

          <div style="text-align: center;">
            <a href="${loginUrl}" class="button">Access Your Dashboard →</a>
          </div>

          <div class="info-box">
            <h3 style="margin-top: 0; color: #FF1744;">🏆 Tier Rewards:</h3>
            <ul style="line-height: 1.8;">
              <li><strong>Bronze (10+ signups):</strong> Certificate + Stickers</li>
              <li><strong>Silver (25+ signups):</strong> T-shirt + Tech Swag + LinkedIn Badge</li>
              <li><strong>Gold (50+ signups):</strong> Premium Goodie + LOR + Mentor Session</li>
              <li><strong>Platinum (100+ signups):</strong> Full Merch + All-Access Pass + Featured on Website</li>
            </ul>
          </div>

          <p style="font-size: 16px; line-height: 1.6;">
            Start sharing your code today and let's make AAYAM 2026 the biggest tech fest ever! 💪
          </p>

          <p style="margin-top: 30px;">
            Best regards,<br>
            <strong>Team AAYAM 2026</strong><br>
            Newton School of Technology
          </p>
        </div>

        <div class="footer">
          <p>AAYAM 2026 | March 14-15, 2026</p>
          <p style="font-size: 12px; color: #666;">
            This is an automated email. Please do not reply to this address.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
    Hi ${name},

    Congratulations! Your application for the AAYAM 2026 Ambassador Program has been APPROVED!

    Your Unique Referral Code: ${referralCode}

    Next Steps:
    1. Login to your dashboard: ${loginUrl}
    2. Share your referral code with students
    3. Track your signups and tier progress
    4. Earn amazing rewards!

    Tier Rewards:
    - Bronze (10+ signups): Certificate + Stickers
    - Silver (25+ signups): T-shirt + Tech Swag + LinkedIn Badge
    - Gold (50+ signups): Premium Goodie + LOR + Mentor Session
    - Platinum (100+ signups): Full Merch + All-Access Pass + Featured on Website

    Start sharing your code today!

    Best regards,
    Team AAYAM 2026
    Newton School of Technology
  `;

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"AAYAM 2026" <noreply@aayam.com>',
      to: email,
      subject: '🎉 You\'re Approved! AAYAM 2026 Ambassador Program',
      text: textContent,
      html: htmlContent,
    });

    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Test email connection
export async function verifyEmailConnection() {
  try {
    await transporter.verify();
    console.log('Email server is ready to send messages');
    return true;
  } catch (error) {
    console.error('Email server connection failed:', error);
    return false;
  }
}
