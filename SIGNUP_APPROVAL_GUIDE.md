# Signup Approval System - Implementation Guide

## Overview
The AAYAM Ambassador system now includes a **Signup Approval Workflow** and **Bulk CSV Upload** feature for better control and verification of participant registrations.

---

## 🔄 Signup Approval Workflow

### How It Works:

1. **Ambassador Adds Signup**
   - Ambassador logs into dashboard
   - Fills out participant details (name, email, phone, college)
   - Submits signup → Status: **PENDING**
   - Message: "Signup submitted for approval. Admin will verify and approve."

2. **Admin Reviews Signup**
   - Admin sees signup in "Pending Signups" tab
   - Can verify if participant actually registered
   - Options:
     - ✅ **Approve** → Credits signup to ambassador + increments count
     - ❌ **Reject** → Removes invalid signup

3. **Count Updates**
   - Ambassador's `signup_count` only increases when admin approves
   - Tier progression happens only with approved signups
   - Fair and verified tracking

---

## 📊 Bulk CSV Upload

### Purpose:
Upload participant data from event registration forms (Google Forms, etc.) and automatically distribute signups to ambassadors based on referral codes.

### CSV Format:
```csv
referral_code,participant_name,participant_email,participant_phone,participant_college
AAYAM123456,John Doe,john@email.com,9876543210,ABC College
AAYAM789012,Jane Smith,jane@email.com,8765432109,XYZ University
AAYAM456789,Bob Wilson,bob@email.com,7654321098,DEF Institute
```

### Steps:

1. **Navigate to Admin Dashboard**
   - Login as admin
   - Click **"Bulk Upload"** tab

2. **Upload CSV File**
   - Must have header row
   - Required columns: `referral_code`, `participant_name`, `participant_email`
   - Optional: `participant_phone`, `participant_college`

3. **Processing**
   - System validates each row:
     - ✅ Checks if referral code exists and belongs to approved ambassador
     - ✅ Checks for duplicate emails
     - ✅ Validates data format
   - Auto-approves bulk uploads (pre-verified by admin)
   - Credits signups to correct ambassadors
   - Updates signup counts and tiers

4. **Results**
   - Shows success/failed count
   - Lists errors with row numbers
   - Provides detailed error messages

---

## 🗄️ Database Changes

### SQL Migration:
Run this in Supabase SQL Editor:

```sql
-- Add status field to signups table
ALTER TABLE signups 
ADD COLUMN status VARCHAR(20) DEFAULT 'pending';

-- Add approval tracking
ALTER TABLE signups
ADD COLUMN approved_at TIMESTAMP,
ADD COLUMN approved_by UUID REFERENCES admin_users(id);

-- Create index
CREATE INDEX idx_signups_status ON signups(status);

-- Update existing signups
UPDATE signups SET status = 'approved' WHERE status IS NULL;
```

---

## 📱 Admin Dashboard Tabs

1. **Pending Ambassadors** - Approve/reject new ambassadors
2. **Approved Ambassadors** - View active ambassadors
3. **All Ambassadors** - Complete list
4. **Pending Signups** ⭐ NEW - Review and approve participant signups
5. **Approved Signups** ⭐ NEW - View verified signups
6. **Bulk Upload** ⭐ NEW - Upload CSV files

---

## 🔐 API Endpoints

### 1. Approve/Reject Signup
```typescript
POST /api/admin/approve-signup
Headers: Authorization: Bearer <admin_token>
Body: { signupId: string, status: 'approved' | 'rejected' }
```

### 2. Bulk Upload
```typescript
POST /api/admin/bulk-upload-signups
Headers: Authorization: Bearer <admin_token>
Body: { 
  signups: Array<{
    referral_code: string;
    participant_name: string;
    participant_email: string;
    participant_phone?: string;
    participant_college?: string;
  }>
}
```

---

## 🎯 Use Cases

### Scenario 1: Ambassador Self-Entry
1. Ambassador gets participant email after event
2. Adds to dashboard manually
3. Admin verifies with registration database
4. Approves → Count increases

### Scenario 2: Google Form Signups
1. Create Google Form with referral code field
2. Participants fill during registration
3. Export responses as CSV
4. Admin uploads to bulk upload page
5. System auto-distributes to ambassadors

### Scenario 3: Event Check-in
1. Collect signup sheets with referral codes
2. Data entry team creates CSV
3. Upload all at once
4. Ambassadors see updated counts immediately

---

## ✅ Benefits

1. **Prevents Fraud** - Admin verifies all signups
2. **Fair Tracking** - Only real participants count
3. **Batch Processing** - Handle hundreds of signups instantly
4. **Data Integrity** - Duplicate detection, validation
5. **Audit Trail** - Track who approved what and when

---

## 🚀 Testing

### Test Signup Approval:
1. Login as ambassador (existing credentials)
2. Add a test signup
3. Logout → Login as admin
4. Go to "Pending Signups"
5. Verify and approve

### Test Bulk Upload:
1. Create test CSV with your ambassador referral codes
2. Login as admin
3. Go to "Bulk Upload" tab
4. Upload file
5. Check results
6. Verify ambassador counts updated

---

## 📝 Notes

- Bulk uploads are auto-approved (admin pre-verifies CSV data)
- Manual ambassador entries require approval (prevents self-inflation)
- Email must be unique across all signups
- Referral codes are case-insensitive
- Only approved ambassadors can receive signups

---

## 🔄 Migration Steps

1. **Run SQL migration** in Supabase
2. **Restart dev server** (changes already applied in code)
3. **Test with sample data**
4. **Deploy to production** when ready

---

## 📧 Future Enhancements (Optional)

- Email notifications to ambassadors when signup approved
- Bulk rejection with reason codes
- Export approved signups to Excel
- Real-time validation during CSV upload
- Duplicate detection across multiple CSVs

---

Made with ❤️ for AAYAM 2026
