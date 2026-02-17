-- Migration: Add status field to signups table for admin approval
-- Run this in Supabase SQL Editor

-- Add status column to signups table
ALTER TABLE signups 
ADD COLUMN status VARCHAR(20) DEFAULT 'pending';

-- Add approved_at and approved_by columns for tracking
ALTER TABLE signups
ADD COLUMN approved_at TIMESTAMP,
ADD COLUMN approved_by UUID REFERENCES admin_users(id);

-- Create index for status filtering
CREATE INDEX idx_signups_status ON signups(status);

-- Update existing signups to approved (for backwards compatibility)
UPDATE signups SET status = 'approved' WHERE status IS NULL OR status = 'pending';

-- Comments
COMMENT ON COLUMN signups.status IS 'Status: pending, approved, rejected';
COMMENT ON COLUMN signups.approved_at IS 'Timestamp when signup was approved';
COMMENT ON COLUMN signups.approved_by IS 'Admin user who approved the signup';
