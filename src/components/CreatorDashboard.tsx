'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Creator, ChaiTier, TeamMember, FundingGoal, Link as SocialLink } from '@/lib/supabase';
import { 
  Coffee, 
  Users, 
  Target, 
  TrendingUp, 
  Plus, 
  Edit3, 
  Eye, 
  Link as LinkIcon, 
  Heart,
  IndianRupee,
  Calendar,
  BarChart3,
  Settings,
  Bell,
  User,
  ExternalLink,
  Edit2,
  Save,
  X
} from 'lucide-react';

// Mock creator data removed - now using real auth context

export default function CreatorDashboard() {
  const { creator } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'chai' | 'team' | 'links' | 'goals' | 'analytics'>('overview');
  const [chaiTiers, setChaiTiers] = useState<ChaiTier[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [links, setLinks] = useState<SocialLink[]>([]);

  if (!creator) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading creator data...</p>
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
        return <OverviewTab creator={creator} />;
      case 'profile':
        return <ProfileTab creator={creator} onUpdate={() => {}} />;
      case 'chai':
        return <ChaiTiersTab creator={creator} chaiTiers={chaiTiers} onUpdate={() => {}} />;
      case 'team':
        return <TeamTab creator={creator} teamMembers={teamMembers} onUpdate={() => {}} />;
      case 'links':
        return <LinksTab creator={creator} links={links} onUpdate={() => {}} />;
      case 'goals':
        return <GoalsTab creator={creator} />;
      case 'analytics':
        return <AnalyticsTab creator={creator} />;
      default:
        return <OverviewTab creator={creator} />;
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

function OverviewTab({ creator }: { creator: Creator }) {
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
          <h3 className="font-semibold text-blue-800 mb-2">Quick Stats</h3>
          <div className="space-y-2 text-blue-600">
            <p>0 Total Views</p>
            <p>0 Total Donations</p>
            <p>₹0 Total Earned</p>
          </div>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Getting Started</h3>
          <ul className="text-green-600 text-sm space-y-1">
            <li>✓ Create your profile</li>
            <li>• Set up chai tiers</li>
            <li>• Add your links</li>
            <li>• Share your page</li>
          </ul>
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <Coffee className="w-6 h-6 text-orange-500 mb-2" />
            <h3 className="font-medium">Add Chai Tier</h3>
            <p className="text-sm text-gray-600">Create pricing options</p>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <Users className="w-6 h-6 text-blue-500 mb-2" />
            <h3 className="font-medium">Add Team Member</h3>
            <p className="text-sm text-gray-600">Support your team</p>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <ExternalLink className="w-6 h-6 text-green-500 mb-2" />
            <h3 className="font-medium">Add Link</h3>
            <p className="text-sm text-gray-600">Share your content</p>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <Target className="w-6 h-6 text-purple-500 mb-2" />
            <h3 className="font-medium">Create Goal</h3>
            <p className="text-sm text-gray-600">Set funding target</p>
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ creator, onUpdate }: { creator: Creator; onUpdate: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    display_name: creator.display_name,
    bio: creator.bio || '',
    upi_id: creator.upi_id,
    theme_color: creator.theme_color,
  });

  const handleSave = async () => {
    // In a real app, this would update the database
    // const updatedCreator = { ...creator, ...formData };
    // TODO: Implement actual profile update
    onUpdate();
    setIsEditing(false);
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
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
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
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={formData.theme_color}
                  onChange={(e) => setFormData({ ...formData, theme_color: e.target.value })}
                  className="w-12 h-12 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  value={formData.theme_color}
                  onChange={(e) => setFormData({ ...formData, theme_color: e.target.value })}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div 
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: creator.theme_color }}
                />
                <span>{creator.theme_color}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Page URL</label>
            <p className="p-3 bg-gray-50 rounded-lg text-gray-600">
              buymechai.dev/{creator.username}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Profile Picture</label>
            <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-2">Upload profile picture</p>
              <button className="text-orange-500 hover:text-orange-600">
                Choose File
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Banner Image</label>
            <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <p className="text-gray-600 mb-2">Upload banner image</p>
              <button className="text-orange-500 hover:text-orange-600">
                Choose File
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChaiTiersTab({ creator, chaiTiers, onUpdate }: { creator: Creator; chaiTiers: ChaiTier[]; onUpdate: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Chai Tiers</h2>
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Tier
        </button>
      </div>
      
      <div className="text-center py-12">
        <Coffee className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">No chai tiers yet</h3>
        <p className="text-gray-700 mb-4">Create different pricing tiers for your supporters</p>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
          Create Your First Tier
        </button>
      </div>
    </div>
  );
}

function TeamTab({ creator, teamMembers, onUpdate }: { creator: Creator; teamMembers: TeamMember[]; onUpdate: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Team Members</h2>
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>
      
      <div className="text-center py-12">
        <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">No team members yet</h3>
        <p className="text-gray-700 mb-4">Add your team members to receive direct support</p>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
          Add Your First Member
        </button>
      </div>
    </div>
  );
}

function LinksTab({ creator, links, onUpdate }: { creator: Creator; links: SocialLink[]; onUpdate: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Links</h2>
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Link
        </button>
      </div>
      
      <div className="text-center py-12">
        <ExternalLink className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">No links yet</h3>
        <p className="text-gray-700 mb-4">Add links to your social media, website, and content</p>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
          Add Your First Link
        </button>
      </div>
    </div>
  );
}

function GoalsTab({ creator }: { creator: Creator }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Funding Goals</h2>
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Goal
        </button>
      </div>
      
      <div className="text-center py-12">
        <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">No goals yet</h3>
        <p className="text-gray-700 mb-4">Set funding goals to motivate your supporters</p>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
          Create Your First Goal
        </button>
      </div>
    </div>
  );
}

function AnalyticsTab({ creator }: { creator: Creator }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Page Views</h3>
          <p className="text-2xl font-bold text-gray-900">0</p>
          <p className="text-sm text-gray-500">Last 30 days</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Chais</h3>
          <p className="text-2xl font-bold text-gray-900">0</p>
          <p className="text-sm text-gray-500">All time</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Revenue</h3>
          <p className="text-2xl font-bold text-gray-900">₹0</p>
          <p className="text-sm text-gray-500">All time</p>
        </div>
      </div>
      
      <div className="text-center py-12">
        <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">No analytics data yet</h3>
        <p className="text-gray-700">Start sharing your page to see analytics</p>
      </div>
    </div>
  );
}