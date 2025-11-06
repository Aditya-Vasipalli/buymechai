'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Creator, ChaiTier, TeamMember, FundingGoal, Link as SocialLink, supabase } from '@/lib/supabase';
import { UPIService } from '@/lib/upi';
import { TeamTab, LinksTab, GoalsTab, AnalyticsTab } from '@/components/DashboardTabs';
import { 
  Coffee, 
  Users, 
  Target, 
  TrendingUp, 
  Plus, 
  Edit2, 
  Save, 
  X,
  User,
  ExternalLink
} from 'lucide-react';

export default function CreatorDashboard() {
  const { creator } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'chai' | 'team' | 'links' | 'goals' | 'analytics'>('overview');
  const [chaiTiers, setChaiTiers] = useState<ChaiTier[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [fundingGoals, setFundingGoals] = useState<FundingGoal[]>([]);
  const [loading, setLoading] = useState(true);

  // Load all data when component mounts or creator changes
  useEffect(() => {
    if (creator) {
      loadAllData();
    }
  }, [creator]);

  const loadAllData = async () => {
    if (!creator) return;
    
    setLoading(true);
    try {
      await Promise.all([
        loadChaiTiers(),
        loadTeamMembers(), 
        loadLinks(),
        loadFundingGoals()
      ]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadChaiTiers = async () => {
    const { data } = await supabase
      .from('chai_tiers')
      .select('*')
      .eq('creator_id', creator!.id)
      .eq('is_active', true)
      .order('sort_order');
    
    if (data) setChaiTiers(data);
  };

  const loadTeamMembers = async () => {
    const { data } = await supabase
      .from('team_members')
      .select('*')
      .eq('creator_id', creator!.id)
      .eq('is_active', true)
      .order('sort_order');
    
    if (data) setTeamMembers(data);
  };

  const loadLinks = async () => {
    const { data } = await supabase
      .from('links')
      .select('*')
      .eq('creator_id', creator!.id)
      .eq('is_active', true)
      .order('sort_order');
    
    if (data) setLinks(data);
  };

  const loadFundingGoals = async () => {
    const { data } = await supabase
      .from('funding_goals')
      .select('*')
      .eq('creator_id', creator!.id)
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (data) setFundingGoals(data);
  };

  if (!creator || loading) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'chai', label: 'Chai Tiers', icon: Coffee },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'links', label: 'Links', icon: ExternalLink },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  ] as const;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab creator={creator} chaiTiers={chaiTiers} teamMembers={teamMembers} links={links} fundingGoals={fundingGoals} onTabChange={setActiveTab} />;
      case 'profile':
        return <ProfileTab creator={creator} onUpdate={loadAllData} />;
      case 'chai':
        return <ChaiTiersTab creator={creator} chaiTiers={chaiTiers} onUpdate={loadChaiTiers} />;
      case 'team':
        return <TeamTab creator={creator} teamMembers={teamMembers} onUpdate={loadTeamMembers} />;
      case 'links':
        return <LinksTab creator={creator} links={links} onUpdate={loadLinks} />;
      case 'goals':
        return <GoalsTab creator={creator} fundingGoals={fundingGoals} onUpdate={loadFundingGoals} />;
      case 'analytics':
        return <AnalyticsTab creator={creator} />;
      default:
        return <OverviewTab creator={creator} chaiTiers={chaiTiers} teamMembers={teamMembers} links={links} fundingGoals={fundingGoals} onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar */}
      <div className="lg:w-64 bg-white rounded-lg border border-gray-200 p-4">
        <div className="space-y-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-orange-50 text-orange-600 border border-orange-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6">
        {renderTabContent()}
      </div>
    </div>
  );
}

// Overview Tab
function OverviewTab({ 
  creator, 
  chaiTiers, 
  teamMembers, 
  links, 
  fundingGoals,
  onTabChange
}: { 
  creator: Creator;
  chaiTiers: ChaiTier[];
  teamMembers: TeamMember[];
  links: SocialLink[];
  fundingGoals: FundingGoal[];
  onTabChange: (tab: 'overview' | 'profile' | 'chai' | 'team' | 'links' | 'goals' | 'analytics') => void;
}) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-orange-50 p-6 rounded-lg">
          <h3 className="font-semibold text-orange-800 mb-2">Your Page</h3>
          <p className="text-orange-600 mb-4">buymechai.dev/{creator.username}</p>
          <a 
            href={`/${creator.username}`}
            target="_blank"
            className="text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            View Page <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Setup Progress</h3>
          <div className="space-y-2 text-blue-600 text-sm">
            <p>✅ Profile created</p>
            <p>{chaiTiers.length > 0 ? '✅' : '⏳'} Chai tiers: {chaiTiers.length}</p>
            <p>{links.length > 0 ? '✅' : '⏳'} Links: {links.length}</p>
            <p>{fundingGoals.length > 0 ? '✅' : '⏳'} Goals: {fundingGoals.length}</p>
          </div>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Quick Stats</h3>
          <div className="space-y-1 text-green-600 text-sm">
            <p>{chaiTiers.length} Chai Tiers</p>
            <p>{teamMembers.length} Team Members</p>
            <p>{links.length} Links</p>
            <p>{fundingGoals.length} Active Goals</p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => onTabChange('chai')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors"
          >
            <Coffee className="w-6 h-6 text-orange-500 mb-2" />
            <h3 className="font-medium">Add Chai Tier</h3>
            <p className="text-sm text-gray-600">Create pricing options</p>
          </button>
          
          <button 
            onClick={() => onTabChange('team')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors"
          >
            <Users className="w-6 h-6 text-blue-500 mb-2" />
            <h3 className="font-medium">Add Team Member</h3>
            <p className="text-sm text-gray-600">Support your team</p>
          </button>
          
          <button 
            onClick={() => onTabChange('links')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors"
          >
            <ExternalLink className="w-6 h-6 text-green-500 mb-2" />
            <h3 className="font-medium">Add Link</h3>
            <p className="text-sm text-gray-600">Share your content</p>
          </button>
          
          <button 
            onClick={() => onTabChange('goals')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors"
          >
            <Target className="w-6 h-6 text-purple-500 mb-2" />
            <h3 className="font-medium">Create Goal</h3>
            <p className="text-sm text-gray-600">Set funding target</p>
          </button>
        </div>
      </div>
    </div>
  );
}

// Profile Tab
function ProfileTab({ creator, onUpdate }: { creator: Creator; onUpdate: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    display_name: creator.display_name,
    bio: creator.bio || '',
    upi_id: creator.upi_id,
    theme_color: creator.theme_color,
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('creators')
        .update(formData)
        .eq('id', creator.id);

      if (error) throw error;
      
      onUpdate();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Profile Settings</h2>
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Display Name</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.display_name}
                onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            ) : (
              <p className="p-3 bg-gray-50 rounded-lg">{creator.display_name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            {isEditing ? (
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-none"
                placeholder="Tell people about yourself..."
              />
            ) : (
              <p className="p-3 bg-gray-50 rounded-lg min-h-[100px]">{creator.bio || 'No bio added yet.'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">UPI ID</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.upi_id}
                onChange={(e) => setFormData({ ...formData, upi_id: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                placeholder="yourname@upi"
              />
            ) : (
              <p className="p-3 bg-gray-50 rounded-lg">{creator.upi_id}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Theme Color</label>
            {isEditing ? (
              <input
                type="color"
                value={formData.theme_color}
                onChange={(e) => setFormData({ ...formData, theme_color: e.target.value })}
                className="w-20 h-10 border border-gray-300 rounded-lg"
              />
            ) : (
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-lg border border-gray-300"
                  style={{ backgroundColor: creator.theme_color }}
                />
                <span className="text-gray-600">{creator.theme_color}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium mb-2">Preview</h3>
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <h4 className="font-semibold text-lg">{formData.display_name}</h4>
            <p className="text-gray-600 text-sm mt-1">@{creator.username}</p>
            {formData.bio && (
              <p className="text-gray-700 mt-2 text-sm">{formData.bio}</p>
            )}
            <button 
              className="mt-3 px-4 py-2 rounded-lg text-white text-sm"
              style={{ backgroundColor: formData.theme_color }}
            >
              Buy me a chai
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Chai Tiers Tab with full CRUD
function ChaiTiersTab({ creator, chaiTiers, onUpdate }: { creator: Creator; chaiTiers: ChaiTier[]; onUpdate: () => void }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTier, setEditingTier] = useState<ChaiTier | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: '',
    emoji: '☕'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const tierData = {
      creator_id: creator.id,
      name: formData.name,
      description: formData.description,
      amount: UPIService.rupeesToPaise(parseFloat(formData.amount)),
      emoji: formData.emoji,
      sort_order: chaiTiers.length
    };

    try {
      if (editingTier) {
        const { error } = await supabase
          .from('chai_tiers')
          .update(tierData)
          .eq('id', editingTier.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('chai_tiers')
          .insert(tierData);
        
        if (error) throw error;
      }

      setFormData({ name: '', description: '', amount: '', emoji: '☕' });
      setShowAddForm(false);
      setEditingTier(null);
      onUpdate();
    } catch (error) {
      console.error('Error saving tier:', error);
      alert('Failed to save tier');
    }
  };

  const handleEdit = (tier: ChaiTier) => {
    setEditingTier(tier);
    setFormData({
      name: tier.name,
      description: tier.description || '',
      amount: UPIService.paiseToRupees(tier.amount).toString(),
      emoji: tier.emoji
    });
    setShowAddForm(true);
  };

  const handleDelete = async (tier: ChaiTier) => {
    if (!confirm('Are you sure you want to delete this tier?')) return;
    
    try {
      const { error } = await supabase
        .from('chai_tiers')
        .update({ is_active: false })
        .eq('id', tier.id);
      
      if (error) throw error;
      onUpdate();
    } catch (error) {
      console.error('Error deleting tier:', error);
      alert('Failed to delete tier');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Chai Tiers</h2>
        <button 
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Tier
        </button>
      </div>

      {chaiTiers.length > 0 ? (
        <div className="grid gap-4">
          {chaiTiers.map(tier => (
            <div key={tier.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">{tier.emoji} {tier.name}</h3>
                <p className="text-sm text-gray-600">{tier.description}</p>
                <p className="font-semibold text-orange-600">{UPIService.formatCurrency(tier.amount)}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(tier)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(tier)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Coffee className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No chai tiers yet</h3>
          <p className="text-gray-500 mb-4">Create different pricing tiers for your supporters</p>
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            Create Your First Tier
          </button>
        </div>
      )}

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingTier ? 'Edit Tier' : 'Add New Tier'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g., Regular Chai"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Optional description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g., 50"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Emoji</label>
                <input
                  type="text"
                  value={formData.emoji}
                  onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="☕"
                  maxLength={2}
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
                >
                  {editingTier ? 'Update' : 'Create'} Tier
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingTier(null);
                    setFormData({ name: '', description: '', amount: '', emoji: '☕' });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}