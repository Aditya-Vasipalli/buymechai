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

export interface PendingTransaction {
  id: string;
  payment_uid: string;
  creator_id: string;
  team_member_id?: string;
  funding_goal_id?: string;
  chai_tier_id?: string;
  supporter_name: string;
  supporter_message?: string;
  amount: number;
  expires_at: string;
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
  payment_uid?: string;
  transaction_id?: string;
  status: 'verified' | 'pending' | 'completed' | 'failed';
  payment_method: string;
  verified_at?: string;
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

// Auth helper functions
export const signUp = async (email: string, password: string, userData: { username: string, display_name: string, upi_id: string }) => {
  // First check if username is already taken
  const { data: existingUser } = await supabase
    .from('creators')
    .select('username')
    .eq('username', userData.username)
    .single();

  if (existingUser) {
    throw new Error('Username already taken');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: userData.username,
        display_name: userData.display_name,
        upi_id: userData.upi_id
      }
    }
  });

  if (error) throw error;

  // Create creator profile after successful auth signup
  if (data.user && data.session) {
    // Small delay to ensure session is established
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const { error: profileError } = await supabase
      .from('creators')
      .insert({
        id: data.user.id,
        username: userData.username,
        display_name: userData.display_name,
        bio: '',
        upi_id: userData.upi_id,
        theme_color: '#FF6B35',
        is_active: true
      });

    if (profileError) {
      console.error('Profile creation error:', profileError);
      throw new Error('Failed to create profile: ' + profileError.message);
    }
  }

  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Creator functions
export const getCreatorByUsername = async (username: string): Promise<Creator | null> => {
  const { data, error } = await supabase
    .from('creators')
    .select('*')
    .eq('username', username)
    .eq('is_active', true)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const getCreatorById = async (id: string): Promise<Creator | null> => {
  const { data, error } = await supabase
    .from('creators')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const updateCreator = async (id: string, updates: Partial<Creator>) => {
  const { data, error } = await supabase
    .from('creators')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Chai Tiers
export const getChaiTiers = async (creatorId: string): Promise<ChaiTier[]> => {
  const { data, error } = await supabase
    .from('chai_tiers')
    .select('*')
    .eq('creator_id', creatorId)
    .eq('is_active', true)
    .order('sort_order');

  if (error) throw error;
  return data || [];
};

export const createChaiTier = async (tier: Omit<ChaiTier, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('chai_tiers')
    .insert(tier)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Team Members
export const getTeamMembers = async (creatorId: string): Promise<TeamMember[]> => {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('creator_id', creatorId)
    .eq('is_active', true)
    .order('sort_order');

  if (error) throw error;
  return data || [];
};

export const createTeamMember = async (member: Omit<TeamMember, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('team_members')
    .insert(member)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Links
export const getLinks = async (creatorId: string): Promise<Link[]> => {
  const { data, error } = await supabase
    .from('links')
    .select('*')
    .eq('creator_id', creatorId)
    .eq('is_active', true)
    .order('sort_order');

  if (error) throw error;
  return data || [];
};

export const createLink = async (link: Omit<Link, 'id' | 'created_at' | 'updated_at' | 'click_count'>) => {
  const { data, error } = await supabase
    .from('links')
    .insert({ ...link, click_count: 0 })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Funding Goals
export const getFundingGoals = async (creatorId: string): Promise<FundingGoal[]> => {
  const { data, error } = await supabase
    .from('funding_goals')
    .select('*')
    .eq('creator_id', creatorId)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const createFundingGoal = async (goal: Omit<FundingGoal, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('funding_goals')
    .insert({
      ...goal,
      current_amount: goal.current_amount || 0
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Transactions
export const createTransaction = async (transaction: Omit<Transaction, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('transactions')
    .insert(transaction)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getTransactions = async (creatorId: string): Promise<Transaction[]> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('creator_id', creatorId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Analytics
export const trackEvent = async (analytics: Omit<AnalyticsEvent, 'id' | 'created_at'>) => {
  const { error } = await supabase
    .from('analytics')
    .insert(analytics);

  if (error) console.error('Analytics tracking failed:', error);
};

export const getAnalytics = async (creatorId: string, eventType?: string) => {
  let query = supabase
    .from('analytics')
    .select('*')
    .eq('creator_id', creatorId);

  if (eventType) {
    query = query.eq('event_type', eventType);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};