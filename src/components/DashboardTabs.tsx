'use client';

import React, { useState, useEffect } from 'react';
import { Creator, ChaiTier, TeamMember, FundingGoal, Link as SocialLink, supabase } from '@/lib/supabase';
import { UPIService } from '@/lib/upi';
import { 
  Coffee, 
  Users, 
  Target, 
  Plus, 
  Edit2, 
  X,
  ExternalLink,
  Globe,
  Youtube,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Github,
  Music,
  ShoppingBag
} from 'lucide-react';

// Team Tab Component
export function TeamTab({ creator, teamMembers, onUpdate }: { creator: Creator; teamMembers: TeamMember[]; onUpdate: () => void }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    upi_id: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const memberData = {
      creator_id: creator.id,
      name: formData.name,
      role: formData.role,
      upi_id: formData.upi_id,
      sort_order: teamMembers.length
    };

    try {
      if (editingMember) {
        const { error } = await supabase
          .from('team_members')
          .update(memberData)
          .eq('id', editingMember.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('team_members')
          .insert(memberData);
        
        if (error) throw error;
      }

      setFormData({ name: '', role: '', upi_id: '' });
      setShowAddForm(false);
      setEditingMember(null);
      onUpdate();
    } catch (error) {
      console.error('Error saving team member:', error);
      alert('Failed to save team member');
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      upi_id: member.upi_id
    });
    setShowAddForm(true);
  };

  const handleDelete = async (member: TeamMember) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;
    
    try {
      const { error } = await supabase
        .from('team_members')
        .update({ is_active: false })
        .eq('id', member.id);
      
      if (error) throw error;
      onUpdate();
    } catch (error) {
      console.error('Error removing team member:', error);
      alert('Failed to remove team member');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Team Members</h2>
        <button 
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      {teamMembers.length > 0 ? (
        <div className="grid gap-4">
          {teamMembers.map(member => (
            <div key={member.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
                <p className="text-sm text-orange-600">{member.upi_id}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(member)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(member)}
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
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No team members yet</h3>
          <p className="text-gray-500 mb-4">Add team members to share donations</p>
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            Add Your First Member
          </button>
        </div>
      )}

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingMember ? 'Edit Member' : 'Add Team Member'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Video Editor"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">UPI ID</label>
                <input
                  type="text"
                  value={formData.upi_id}
                  onChange={(e) => setFormData({ ...formData, upi_id: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="john@paytm"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
                >
                  {editingMember ? 'Update' : 'Add'} Member
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingMember(null);
                    setFormData({ name: '', role: '', upi_id: '' });
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

// Links Tab Component
export function LinksTab({ creator, links, onUpdate }: { creator: Creator; links: SocialLink[]; onUpdate: () => void }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    icon: 'ExternalLink'
  });

  const getIconOptions = () => [
    { value: 'Globe', label: 'Website', icon: <Globe className="w-4 h-4" /> },
    { value: 'Youtube', label: 'YouTube', icon: <Youtube className="w-4 h-4" /> },
    { value: 'Instagram', label: 'Instagram', icon: <Instagram className="w-4 h-4" /> },
    { value: 'Twitter', label: 'Twitter', icon: <Twitter className="w-4 h-4" /> },
    { value: 'Facebook', label: 'Facebook', icon: <Facebook className="w-4 h-4" /> },
    { value: 'Linkedin', label: 'LinkedIn', icon: <Linkedin className="w-4 h-4" /> },
    { value: 'Github', label: 'GitHub', icon: <Github className="w-4 h-4" /> },
    { value: 'Music', label: 'Music', icon: <Music className="w-4 h-4" /> },
    { value: 'ShoppingBag', label: 'Shop', icon: <ShoppingBag className="w-4 h-4" /> },
    { value: 'ExternalLink', label: 'Other', icon: <ExternalLink className="w-4 h-4" /> }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const linkData = {
      creator_id: creator.id,
      title: formData.title,
      url: formData.url,
      description: formData.description,
      icon: formData.icon,
      sort_order: links.length
    };

    try {
      if (editingLink) {
        const { error } = await supabase
          .from('links')
          .update(linkData)
          .eq('id', editingLink.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('links')
          .insert(linkData);
        
        if (error) throw error;
      }

      setFormData({ title: '', url: '', description: '', icon: 'ExternalLink' });
      setShowAddForm(false);
      setEditingLink(null);
      onUpdate();
    } catch (error) {
      console.error('Error saving link:', error);
      alert('Failed to save link');
    }
  };

  const handleEdit = (link: SocialLink) => {
    setEditingLink(link);
    setFormData({
      title: link.title,
      url: link.url,
      description: link.description || '',
      icon: link.icon || 'ExternalLink'
    });
    setShowAddForm(true);
  };

  const handleDelete = async (link: SocialLink) => {
    if (!confirm('Are you sure you want to delete this link?')) return;
    
    try {
      const { error } = await supabase
        .from('links')
        .update({ is_active: false })
        .eq('id', link.id);
      
      if (error) throw error;
      onUpdate();
    } catch (error) {
      console.error('Error deleting link:', error);
      alert('Failed to delete link');
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-4 h-4" />;
      case 'Youtube': return <Youtube className="w-4 h-4" />;
      case 'Instagram': return <Instagram className="w-4 h-4" />;
      case 'Twitter': return <Twitter className="w-4 h-4" />;
      case 'Facebook': return <Facebook className="w-4 h-4" />;
      case 'Linkedin': return <Linkedin className="w-4 h-4" />;
      case 'Github': return <Github className="w-4 h-4" />;
      case 'Music': return <Music className="w-4 h-4" />;
      case 'ShoppingBag': return <ShoppingBag className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Links</h2>
        <button 
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Link
        </button>
      </div>

      {links.length > 0 ? (
        <div className="grid gap-4">
          {links.map(link => (
            <div key={link.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                {getIconComponent(link.icon || 'ExternalLink')}
                <div>
                  <h3 className="font-medium">{link.title}</h3>
                  <p className="text-sm text-gray-600">{link.url}</p>
                  {link.description && (
                    <p className="text-sm text-gray-500">{link.description}</p>
                  )}
                  <p className="text-xs text-orange-600">{link.click_count} clicks</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(link)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(link)}
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
          <ExternalLink className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No links yet</h3>
          <p className="text-gray-500 mb-4">Add links to your social media and other content</p>
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            Add Your First Link
          </button>
        </div>
      )}

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingLink ? 'Edit Link' : 'Add New Link'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="My YouTube Channel"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="https://youtube.com/@example"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description (optional)</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Check out my latest videos"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Icon</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                >
                  {getIconOptions().map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
                >
                  {editingLink ? 'Update' : 'Add'} Link
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingLink(null);
                    setFormData({ title: '', url: '', description: '', icon: 'ExternalLink' });
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

// Goals Tab Component
export function GoalsTab({ 
  creator, 
  fundingGoals, 
  onUpdate 
}: { 
  creator: Creator; 
  fundingGoals: FundingGoal[]; 
  onUpdate: () => void; 
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<FundingGoal | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target_amount: '',
    deadline: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const goalData = {
      creator_id: creator.id,
      title: formData.title,
      description: formData.description,
      target_amount: UPIService.rupeesToPaise(parseFloat(formData.target_amount)),
      deadline: formData.deadline || null
    };

    try {
      if (editingGoal) {
        const { error } = await supabase
          .from('funding_goals')
          .update(goalData)
          .eq('id', editingGoal.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('funding_goals')
          .insert(goalData);
        
        if (error) throw error;
      }

      setFormData({ title: '', description: '', target_amount: '', deadline: '' });
      setShowAddForm(false);
      setEditingGoal(null);
      onUpdate();
    } catch (error) {
      console.error('Error saving goal:', error);
      alert('Failed to save goal');
    }
  };

  const handleEdit = (goal: FundingGoal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      description: goal.description || '',
      target_amount: UPIService.paiseToRupees(goal.target_amount).toString(),
      deadline: goal.deadline || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = async (goal: FundingGoal) => {
    if (!confirm('Are you sure you want to delete this goal?')) return;
    
    try {
      const { error } = await supabase
        .from('funding_goals')
        .update({ is_active: false })
        .eq('id', goal.id);
      
      if (error) throw error;
      onUpdate();
    } catch (error) {
      console.error('Error deleting goal:', error);
      alert('Failed to delete goal');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Funding Goals</h2>
        <button 
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Goal
        </button>
      </div>

      {fundingGoals.length > 0 ? (
        <div className="grid gap-4">
          {fundingGoals.map(goal => {
            const progress = (goal.current_amount / goal.target_amount) * 100;
            return (
              <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium">{goal.title}</h3>
                    {goal.description && (
                      <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button 
                      onClick={() => handleEdit(goal)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(goal)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{UPIService.formatCurrency(goal.current_amount)}</span>
                    <span>{UPIService.formatCurrency(goal.target_amount)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{progress.toFixed(1)}% complete</span>
                    {goal.deadline && (
                      <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No goals yet</h3>
          <p className="text-gray-500 mb-4">Set funding goals to motivate your supporters</p>
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            Create Your First Goal
          </button>
        </div>
      )}

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingGoal ? 'Edit Goal' : 'Add Funding Goal'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="New Microphone"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description (optional)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Help me buy a professional microphone for better audio quality"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Target Amount (₹)</label>
                <input
                  type="number"
                  value={formData.target_amount}
                  onChange={(e) => setFormData({ ...formData, target_amount: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="8000"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Deadline (optional)</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
                >
                  {editingGoal ? 'Update' : 'Create'} Goal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingGoal(null);
                    setFormData({ title: '', description: '', target_amount: '', deadline: '' });
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

// Analytics Tab Component
export function AnalyticsTab({ creator }: { creator: Creator }) {
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    totalDonations: 0,
    totalEarned: 0,
    recentTransactions: [] as any[]
  });
  const [loading, setLoading] = useState(true);

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      // Get page views from analytics table
      const { data: viewsData } = await supabase
        .from('analytics')
        .select('id')
        .eq('creator_id', creator.id)
        .eq('event_type', 'page_view');

      // Get verified transactions
      const { data: transactionsData } = await supabase
        .from('transactions')
        .select('id, amount, supporter_name, verified_at, chai_tier_id')
        .eq('creator_id', creator.id)
        .eq('status', 'verified')
        .order('verified_at', { ascending: false })
        .limit(10);

      const totalEarned = transactionsData?.reduce((sum, t) => sum + t.amount, 0) || 0;

      setAnalytics({
        totalViews: viewsData?.length || 0,
        totalDonations: transactionsData?.length || 0,
        totalEarned,
        recentTransactions: transactionsData || []
      });

    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (creator) {
      loadAnalytics();
    }
  }, [creator]);

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Analytics</h2>
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Total Views</h3>
          <p className="text-2xl font-bold text-blue-600">{analytics.totalViews.toLocaleString()}</p>
          <p className="text-sm text-blue-600">Page visits</p>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Total Donations</h3>
          <p className="text-2xl font-bold text-green-600">{analytics.totalDonations.toLocaleString()}</p>
          <p className="text-sm text-green-600">Verified payments</p>
        </div>
        
        <div className="bg-orange-50 p-6 rounded-lg">
          <h3 className="font-semibold text-orange-800 mb-2">Total Earned</h3>
          <p className="text-2xl font-bold text-orange-600">{UPIService.formatCurrency(analytics.totalEarned)}</p>
          <p className="text-sm text-orange-600">All time earnings</p>
        </div>
      </div>

      {analytics.recentTransactions.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold mb-4">Recent Donations</h3>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {analytics.recentTransactions.map((transaction, index) => (
                <div key={transaction.id} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">
                      {transaction.supporter_name || 'Anonymous'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.verified_at).toLocaleDateString()} at{' '}
                      {new Date(transaction.verified_at).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      {UPIService.formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            📊
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">No donations yet</h3>
          <p className="text-gray-500">Share your page to start receiving support!</p>
        </div>
      )}
    </div>
  );
}