import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Creator {
  id: string;
  username: string;
  display_name: string;
  bio?: string;
  profile_picture_url?: string;
  banner_url?: string;
  upi_id: string;
  theme_color: string;
  custom_domain?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChaiTier {
  id: string;
  creator_id: string;
  name: string;
  description?: string;
  amount: number; // Amount in paise
  emoji: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface FundingGoal {
  id: string;
  creator_id: string;
  title: string;
  description?: string;
  target_amount: number;
  current_amount: number;
  deadline?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  creator_id: string;
  name: string;
  role: string;
  upi_id: string;
  avatar_url?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface Transaction {
  id: string;
  creator_id: string;
  team_member_id?: string;
  funding_goal_id?: string;
  chai_tier_id?: string;
  supporter_name?: string;
  supporter_message?: string;
  amount: number;
  transaction_id?: string;
  status: 'pending' | 'completed' | 'failed';
  payment_method: string;
  created_at: string;
  completed_at?: string;
}

export interface Link {
  id: string;
  creator_id: string;
  title: string;
  url: string;
  description?: string;
  icon?: string;
  is_active: boolean;
  sort_order: number;
  click_count: number;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsEvent {
  id: string;
  creator_id: string;
  link_id?: string;
  event_type: string;
  user_agent?: string;
  referrer?: string;
  ip_address?: string;
  metadata?: any;
  created_at: string;
}