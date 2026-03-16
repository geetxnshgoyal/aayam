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
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          background-color: #050813;
          color: #f0f4f8;
          margin: 0;
          padding: 24px;
          line-height: 1.6;
        }
        .container {
          max-width: 560px;
          margin: 0 auto;
          background: #0c1220;
          border: 4px solid #0a0a0f;
          box-shadow: 8px 8px 0 #0a0a0f;
          padding: 40px;
        }
        .header {
          text-align: center;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 3px solid;
          border-image: linear-gradient(90deg, #00b4d8, #e6399b) 1;
        }
        .logo {
          font-size: 32px;
          font-weight: 800;
          font-family: 'Courier New', monospace;
          letter-spacing: 0.1em;
          background: linear-gradient(90deg, #00b4d8, #e6399b, #ff7a4f);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .title {
          font-size: 24px;
          font-weight: bold;
          color: #ffd60a;
          margin: 16px 0 0;
          font-family: 'Courier New', monospace;
        }
        .content {
          background: #131b2e;
          border: 2px solid #2a3f5c;
          padding: 28px;
          margin: 24px 0;
        }
        .content h2 {
          color: #f0f4f8;
          font-size: 20px;
          margin-top: 0;
        }
        .content p {
          color: #b8cde0;
          font-size: 15px;
          line-height: 1.7;
        }
        .highlight {
          background: rgba(0, 180, 216, 0.12);
          border: 2px solid #00b4d8;
          padding: 20px;
          text-align: center;
          margin: 24px 0;
          box-shadow: 6px 6px 0 rgba(230, 57, 155, 0.2);
        }
        .highlight p {
          margin: 0 0 8px 0;
          font-size: 12px;
          color: #7a9bb5;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }
        .referral-code {
          font-size: 28px;
          font-weight: bold;
          font-family: 'Courier New', monospace;
          color: #ffd60a;
          letter-spacing: 4px;
        }
        .button {
          display: inline-block;
          background: #ff7a4f;
          border: 3px solid #ffd60a;
          color: #0a0a0f;
          text-decoration: none;
          padding: 14px 36px;
          font-weight: 700;
          font-family: 'Courier New', monospace;
          letter-spacing: 0.05em;
          margin: 24px 0;
          box-shadow: 6px 6px 0 #e6399b;
        }
        .button:hover {
          background: #ff8f6a;
        }
        .info-box {
          background: rgba(230, 57, 155, 0.12);
          border-left: 4px solid #e6399b;
          padding: 16px 20px;
          margin: 20px 0;
        }
        .info-box h3 {
          color: #e6399b;
          margin: 0 0 12px 0;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .info-box ol, .info-box ul {
          margin: 0;
          padding-left: 20px;
          color: #b8cde0;
        }
        .info-box li {
          margin-bottom: 8px;
        }
        strong {
          color: #00b4d8;
        }
        .approved-badge {
          color: #37e0ff;
          font-weight: bold;
        }
        .footer {
          text-align: center;
          color: #7a9bb5;
          font-size: 13px;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #1e2d42;
        }
        .footer p {
          margin: 4px 0;
          color: #7a9bb5;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">AAYAM 2026</div>
          <div class="title">Congratulations!</div>
        </div>

        <div class="content">
          <h2>Hi ${name},</h2>
          <p>
            We're thrilled to inform you that your application for the <strong>AAYAM 2026 Ambassador Program</strong> has been <span class="approved-badge">APPROVED</span>!
          </p>

          <div class="highlight">
            <p>Your Unique Referral Code</p>
            <div class="referral-code">${referralCode}</div>
          </div>

          <div class="info-box">
            <h3>Next Steps</h3>
            <ol>
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
            <h3>Tier Rewards</h3>
            <ul>
              <li><strong>Bronze (10+ signups):</strong> Certificate + Stickers</li>
              <li><strong>Silver (25+ signups):</strong> T-shirt + Tech Swag + LinkedIn Badge</li>
              <li><strong>Gold (50+ signups):</strong> Premium Goodie + LOR + Mentor Session</li>
              <li><strong>Platinum (100+ signups):</strong> Full Merch + All-Access Pass + Featured on Website</li>
            </ul>
          </div>

          <p>
            Start sharing your code today and let's make AAYAM 2026 the biggest tech fest ever!
          </p>

          <p style="margin-top: 28px;">
            Best regards,<br>
            <strong>Team AAYAM 2026</strong><br>
            Newton School of Technology
          </p>
        </div>

        <div class="footer">
          <p>AAYAM 2026 | April 24-25, 2026</p>
          <p style="font-size: 11px; color: #5a7a95;">
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
