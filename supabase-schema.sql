-- BuyMeChai Database Schema

-- Creators table
CREATE TABLE creators (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    bio TEXT,
    profile_picture_url TEXT,
    banner_url TEXT,
    upi_id VARCHAR(100) NOT NULL,
    theme_color VARCHAR(7) DEFAULT '#FF6B6B',
    custom_domain VARCHAR(100) UNIQUE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chai tiers/packages
CREATE TABLE chai_tiers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    creator_id UUID REFERENCES creators(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    amount INTEGER NOT NULL, -- Amount in paise (₹1 = 100 paise)
    emoji VARCHAR(10) DEFAULT '☕',
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Funding goals
CREATE TABLE funding_goals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    creator_id UUID REFERENCES creators(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    target_amount INTEGER NOT NULL, -- Amount in paise
    current_amount INTEGER DEFAULT 0,
    deadline DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team members
CREATE TABLE team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    creator_id UUID REFERENCES creators(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    upi_id VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions/donations
CREATE TABLE transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    creator_id UUID REFERENCES creators(id) ON DELETE CASCADE,
    team_member_id UUID REFERENCES team_members(id) ON DELETE SET NULL,
    funding_goal_id UUID REFERENCES funding_goals(id) ON DELETE SET NULL,
    chai_tier_id UUID REFERENCES chai_tiers(id) ON DELETE SET NULL,
    supporter_name VARCHAR(100),
    supporter_message TEXT,
    amount INTEGER NOT NULL, -- Amount in paise
    transaction_id VARCHAR(100), -- External payment gateway transaction ID
    status VARCHAR(20) DEFAULT 'pending', -- pending, completed, failed
    payment_method VARCHAR(20) DEFAULT 'upi',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Links (for link-in-bio)
CREATE TABLE links (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    creator_id UUID REFERENCES creators(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    description TEXT,
    icon VARCHAR(50), -- Icon name from Lucide or other icon library
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    click_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics
CREATE TABLE analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    creator_id UUID REFERENCES creators(id) ON DELETE CASCADE,
    link_id UUID REFERENCES links(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL, -- 'page_view', 'link_click', 'donation', etc.
    user_agent TEXT,
    referrer TEXT,
    ip_address INET,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_creators_username ON creators(username);
CREATE INDEX idx_creators_custom_domain ON creators(custom_domain);
CREATE INDEX idx_transactions_creator_id ON transactions(creator_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_links_creator_id ON links(creator_id);
CREATE INDEX idx_analytics_creator_id ON analytics(creator_id);
CREATE INDEX idx_analytics_created_at ON analytics(created_at);

-- Row Level Security (RLS) policies
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE chai_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE funding_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Policies for public read access to creator profiles
CREATE POLICY "Public creator profiles" ON creators FOR SELECT USING (is_active = true);
CREATE POLICY "Public chai tiers" ON chai_tiers FOR SELECT USING (is_active = true);
CREATE POLICY "Public funding goals" ON funding_goals FOR SELECT USING (is_active = true);
CREATE POLICY "Public team members" ON team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public links" ON links FOR SELECT USING (is_active = true);

-- Policies for inserting transactions (donations)
CREATE POLICY "Anyone can donate" ON transactions FOR INSERT WITH CHECK (true);

-- Policies for analytics (public insert for tracking)
CREATE POLICY "Public analytics insert" ON analytics FOR INSERT WITH CHECK (true);

-- Sample data for testing
INSERT INTO creators (username, display_name, bio, upi_id, theme_color) VALUES
('johndoe', 'John Doe', 'Tech content creator sharing coding tutorials and reviews', 'johndoe@paytm', '#FF6B6B'),
('techsavvy', 'Tech Savvy', 'Gadget reviewer and tech enthusiast', 'techsavvy@phonepe', '#4ECDC4');

-- Sample chai tiers
INSERT INTO chai_tiers (creator_id, name, description, amount, emoji) VALUES
((SELECT id FROM creators WHERE username = 'johndoe'), 'Regular Chai', 'Buy me a regular chai', 5000, '☕'),
((SELECT id FROM creators WHERE username = 'johndoe'), 'Masala Chai', 'Buy me a special masala chai', 7500, '🫖'),
((SELECT id FROM creators WHERE username = 'johndoe'), 'Chai & Samosa', 'Chai with some snacks', 10000, '🥟');

-- Sample funding goal
INSERT INTO funding_goals (creator_id, title, description, target_amount) VALUES
((SELECT id FROM creators WHERE username = 'johndoe'), 'New Microphone', 'Help me buy a professional microphone for better audio quality', 800000);

-- Sample team members
INSERT INTO team_members (creator_id, name, role, upi_id) VALUES
((SELECT id FROM creators WHERE username = 'johndoe'), 'Jane Smith', 'Video Editor', 'janesmith@gpay'),
((SELECT id FROM creators WHERE username = 'johndoe'), 'Mike Johnson', 'Content Writer', 'mikejohnson@paytm');

-- Sample links
INSERT INTO links (creator_id, title, url, icon, sort_order) VALUES
((SELECT id FROM creators WHERE username = 'johndoe'), 'YouTube Channel', 'https://youtube.com/@johndoe', 'Youtube', 1),
((SELECT id FROM creators WHERE username = 'johndoe'), 'Instagram', 'https://instagram.com/johndoe', 'Instagram', 2),
((SELECT id FROM creators WHERE username = 'johndoe'), 'Twitter', 'https://twitter.com/johndoe', 'Twitter', 3),
((SELECT id FROM creators WHERE username = 'johndoe'), 'Personal Website', 'https://johndoe.dev', 'Globe', 4);