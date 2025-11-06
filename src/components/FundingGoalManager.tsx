'use client';

import { useState, useEffect } from 'react';
import { FundingGoal, Creator, supabase } from '@/lib/supabase';
import { UPIService } from '@/lib/upi';
import { Target, Calendar, TrendingUp, Plus, Edit2, Trash2 } from 'lucide-react';

interface FundingGoalCardProps {
  goal: FundingGoal;
  creator: Creator;
  isOwner?: boolean;
  onUpdate?: () => void;
}

export function FundingGoalCard({ goal, creator, isOwner = false, onUpdate }: FundingGoalCardProps) {
  const progress = (goal.current_amount / goal.target_amount) * 100;
  const isExpired = goal.deadline && new Date(goal.deadline) < new Date();
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{goal.title}</h3>
          {goal.description && (
            <p className="text-gray-600 text-sm mb-3">{goal.description}</p>
          )}
        </div>
        {isOwner && (
          <div className="flex gap-2 ml-4">
            <button className="p-1 text-gray-400 hover:text-blue-500 transition-colors">
              <Edit2 className="w-4 h-4" />
            </button>
            <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>
              {UPIService.formatCurrency(goal.current_amount)} / {UPIService.formatCurrency(goal.target_amount)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="h-3 rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.min(progress, 100)}%`,
                backgroundColor: creator.theme_color 
              }}
            />
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {progress.toFixed(1)}% complete
          </div>
        </div>

        {/* Deadline */}
        {goal.deadline && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4" />
            <span className={`${isExpired ? 'text-red-500' : 'text-gray-600'}`}>
              {isExpired ? 'Expired on' : 'Deadline:'} {new Date(goal.deadline).toLocaleDateString()}
            </span>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
          <span>Goal created {new Date(goal.created_at).toLocaleDateString()}</span>
          {progress >= 100 && (
            <span className="text-green-600 font-medium">✓ Completed!</span>
          )}
        </div>
      </div>
    </div>
  );
}

interface FundingGoalManagerProps {
  creator: Creator;
  isOwner?: boolean;
}

export default function FundingGoalManager({ creator, isOwner = false }: FundingGoalManagerProps) {
  const [goals, setGoals] = useState<FundingGoal[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
  }, [creator.id]);

  const fetchGoals = async () => {
    try {
      const { data, error } = await supabase
        .from('funding_goals')
        .select('*')
        .eq('creator_id', creator.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGoals(data || []);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Target className="w-5 h-5" />
          Funding Goals
        </h2>
        {isOwner && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Goal
          </button>
        )}
      </div>

      {goals.length === 0 ? (
        <div className="text-center py-12">
          <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No funding goals yet</h3>
          <p className="text-gray-500">
            {isOwner 
              ? 'Create your first funding goal to start raising money for your projects.'
              : 'This creator hasn\'t set up any funding goals yet.'
            }
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {goals.map(goal => (
            <FundingGoalCard 
              key={goal.id} 
              goal={goal} 
              creator={creator} 
              isOwner={isOwner}
              onUpdate={fetchGoals}
            />
          ))}
        </div>
      )}

      {/* Create Goal Modal */}
      {isCreateModalOpen && (
        <CreateGoalModal 
          creator={creator}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={() => {
            setIsCreateModalOpen(false);
            fetchGoals();
          }}
        />
      )}
    </div>
  );
}

interface CreateGoalModalProps {
  creator: Creator;
  onClose: () => void;
  onSuccess: () => void;
}

function CreateGoalModal({ creator, onClose, onSuccess }: CreateGoalModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target_amount: '',
    deadline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.target_amount) return;

    setIsSubmitting(true);
    try {
      const targetAmountInPaise = UPIService.rupeesToPaise(parseFloat(formData.target_amount));
      
      const { error } = await supabase
        .from('funding_goals')
        .insert({
          creator_id: creator.id,
          title: formData.title,
          description: formData.description || null,
          target_amount: targetAmountInPaise,
          deadline: formData.deadline || null
        });

      if (error) throw error;
      onSuccess();
    } catch (error) {
      console.error('Error creating goal:', error);
      alert('Failed to create goal. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Create Funding Goal</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Goal Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., New Microphone Setup"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Explain what this goal is for..."
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Target Amount (₹) *</label>
            <input
              type="number"
              value={formData.target_amount}
              onChange={(e) => setFormData({ ...formData, target_amount: e.target.value })}
              placeholder="5000"
              min="1"
              step="1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Deadline (optional)</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.title || !formData.target_amount}
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Goal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}