# Ambassador Tasks & Points System

## Database Setup

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Tasks Table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  points_min INTEGER NOT NULL,
  points_max INTEGER NOT NULL,
  required_proof VARCHAR(20), -- 'link', 'screenshot', 'video', 'text'
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Ambassador Points Table
CREATE TABLE ambassador_points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ambassador_id UUID REFERENCES ambassadors(id) ON DELETE CASCADE NOT NULL,
  points INTEGER NOT NULL,
  source VARCHAR(50), -- 'task', 'signup', 'admin'
  reference_id UUID, -- task_id or signup_id
  created_at TIMESTAMP DEFAULT NOW()
);

-- Task Submissions Table
CREATE TABLE task_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ambassador_id UUID REFERENCES ambassadors(id) ON DELETE CASCADE NOT NULL,
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE NOT NULL,
  proof_link VARCHAR(500),
  proof_screenshot VARCHAR(500),
  status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
  points_awarded INTEGER,
  admin_notes TEXT,
  submitted_at TIMESTAMP DEFAULT NOW(),
  reviewed_at TIMESTAMP,
  reviewed_by UUID REFERENCES admin_users(id)
);

-- Insert Default Tasks
INSERT INTO tasks (name, description, points_min, points_max, required_proof) VALUES
('Post Instagram Reel', 'Create and post a 15-30 second Instagram reel promoting AAYAM', 5, 10, 'link'),
('Post Instagram Story', 'Share a story about AAYAM on Instagram', 2, 5, 'screenshot'),
('Create TikTok Video', 'Make a TikTok promoting AAYAM', 8, 15, 'link'),
('Campus Poster Campaign', 'Post digital or physical posters on campus', 5, 8, 'screenshot'),
('WhatsApp Group Promotion', 'Share AAYAM in campus WhatsApp groups', 3, 6, 'text'),
('Share Referral Link', 'Share your unique referral code with 5+ people', 4, 7, 'text'),
('Create YouTube Short', 'Upload a YouTube Short about AAYAM', 10, 15, 'link'),
('Write Blog Post', 'Write a blog post about AAYAM (min 500 words)', 15, 20, 'link');

-- Create Indexes
CREATE INDEX idx_ambassador_points_ambassador ON ambassador_points(ambassador_id);
CREATE INDEX idx_task_submissions_ambassador ON task_submissions(ambassador_id);
CREATE INDEX idx_task_submissions_status ON task_submissions(status);

-- Function to get total points for an ambassador
CREATE OR REPLACE FUNCTION get_ambassador_total_points(amb_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN COALESCE(SUM(points), 0) FROM ambassador_points WHERE ambassador_id = amb_id;
END;
$$ LANGUAGE plpgsql;

-- Function to convert points to signup (10-15 points = 1 signup)
CREATE OR REPLACE FUNCTION convert_points_to_signup(amb_id UUID, points_required INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
  total_points INTEGER;
BEGIN
  total_points := get_ambassador_total_points(amb_id);
  
  IF total_points >= points_required THEN
    -- Deduct points
    INSERT INTO ambassador_points (ambassador_id, points, source)
    VALUES (amb_id, -points_required, 'conversion');
    
    -- Add signup count
    UPDATE ambassadors SET signup_count = signup_count + 1 WHERE id = amb_id;
    
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql;
```

## Points System

- **Posting a Reel**: 5-10 points
- **Posting a Story**: 2-5 points  
- **TikTok Video**: 8-15 points
- **Campus Posters**: 5-8 points
- **WhatsApp Promotion**: 3-6 points
- **Share Referral Link**: 4-7 points
- **YouTube Short**: 10-15 points
- **Blog Post**: 15-20 points

## Conversion Rate
- **10-15 points = 1 verified signup**

Admin reviews task submissions and awards points. Points can be converted to signups which count towards tier progression.
