'use client';

import { useState, useEffect } from 'react';
import { Creator, Link, ChaiTier, TeamMember, FundingGoal, supabase } from '@/lib/supabase';
import { UPIService } from '@/lib/upi';
import BuyChaiButton from '@/components/BuyChaiButton';
import { 
  ExternalLink, 
  MapPin, 
  Calendar, 
  Users, 
  Target, 
  TrendingUp,
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
import Image from 'next/image';

interface CreatorPageProps {
  username: string;
}

const getIconForLink = (icon?: string, url?: string) => {
  if (icon) {
    switch (icon.toLowerCase()) {
      case 'youtube': return <Youtube className="w-5 h-5" />;
      case 'instagram': return <Instagram className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
      case 'facebook': return <Facebook className="w-5 h-5" />;
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'github': return <Github className="w-5 h-5" />;
      case 'globe': return <Globe className="w-5 h-5" />;
      case 'music': return <Music className="w-5 h-5" />;
      case 'shoppingbag': return <ShoppingBag className="w-5 h-5" />;
      default: return <ExternalLink className="w-5 h-5" />;
    }
  }
  
  // Auto-detect based on URL
  if (url) {
    const domain = url.toLowerCase();
    if (domain.includes('youtube')) return <Youtube className="w-5 h-5" />;
    if (domain.includes('instagram')) return <Instagram className="w-5 h-5" />;
    if (domain.includes('twitter') || domain.includes('x.com')) return <Twitter className="w-5 h-5" />;
    if (domain.includes('facebook')) return <Facebook className="w-5 h-5" />;
    if (domain.includes('linkedin')) return <Linkedin className="w-5 h-5" />;
    if (domain.includes('github')) return <Github className="w-5 h-5" />;
    if (domain.includes('spotify') || domain.includes('music')) return <Music className="w-5 h-5" />;
  }
  
  return <ExternalLink className="w-5 h-5" />;
};

export default function CreatorPage({ username }: CreatorPageProps) {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [chaiTiers, setChaiTiers] = useState<ChaiTier[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [fundingGoals, setFundingGoals] = useState<FundingGoal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCreatorData();
  }, [username]);

  const fetchCreatorData = async () => {
    try {
      // Fetch creator
      const { data: creatorData, error: creatorError } = await supabase
        .from('creators')
        .select('*')
        .eq('username', username)
        .eq('is_active', true)
        .single();

      if (creatorError) {
        console.error('Error fetching creator:', creatorError);
        return;
      }

      setCreator(creatorData);

      // Fetch links
      const { data: linksData } = await supabase
        .from('links')
        .select('*')
        .eq('creator_id', creatorData.id)
        .eq('is_active', true)
        .order('sort_order');

      setLinks(linksData || []);

      // Fetch chai tiers
      const { data: chaiTiersData } = await supabase
        .from('chai_tiers')
        .select('*')
        .eq('creator_id', creatorData.id)
        .eq('is_active', true)
        .order('sort_order');

      setChaiTiers(chaiTiersData || []);

      // Fetch team members
      const { data: teamMembersData } = await supabase
        .from('team_members')
        .select('*')
        .eq('creator_id', creatorData.id)
        .eq('is_active', true)
        .order('sort_order');

      setTeamMembers(teamMembersData || []);

      // Fetch funding goals
      const { data: fundingGoalsData } = await supabase
        .from('funding_goals')
        .select('*')
        .eq('creator_id', creatorData.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      setFundingGoals(fundingGoalsData || []);

      // Track page view
      await supabase
        .from('analytics')
        .insert({
          creator_id: creatorData.id,
          event_type: 'page_view',
          user_agent: navigator.userAgent,
          referrer: document.referrer
        });

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = async (link: Link) => {
    try {
      // Track click
      await supabase
        .from('analytics')
        .insert({
          creator_id: creator!.id,
          link_id: link.id,
          event_type: 'link_click',
          user_agent: navigator.userAgent,
          referrer: document.referrer
        });

      // Update click count
      await supabase
        .from('links')
        .update({ 
          click_count: link.click_count + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', link.id);

      // Open link
      window.open(link.url, '_blank');
    } catch (error) {
      console.error('Error tracking link click:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Creator not found</h1>
          <p className="text-gray-600">The creator you're looking for doesn't exist or is inactive.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg, ${creator.theme_color}20, ${creator.theme_color}10)`
      }}
    >
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header with Banner */}
        {creator.banner_url && (
          <div className="h-32 bg-gradient-to-r from-gray-200 to-gray-300 relative">
            <Image
              src={creator.banner_url}
              alt={`${creator.display_name} banner`}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Profile Section */}
        <div className="p-6 text-center">
          {/* Profile Picture */}
          <div className="relative -mt-16 mb-4">
            <div className="w-24 h-24 mx-auto bg-white rounded-full p-1 shadow-lg">
              {creator.profile_picture_url ? (
                <Image
                  src={creator.profile_picture_url}
                  alt={creator.display_name}
                  width={88}
                  height={88}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div 
                  className="w-full h-full rounded-full flex items-center justify-center text-white text-2xl font-bold"
                  style={{ backgroundColor: creator.theme_color }}
                >
                  {creator.display_name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Name and Bio */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{creator.display_name}</h1>
          {creator.bio && (
            <p className="text-gray-600 mb-6 leading-relaxed">{creator.bio}</p>
          )}

          {/* Buy Chai Button */}
          <BuyChaiButton 
            creator={creator}
            chaiTiers={chaiTiers}
            teamMembers={teamMembers}
            className="mb-8"
          />
        </div>

        {/* Funding Goals */}
        {fundingGoals.length > 0 && (
          <div className="px-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Current Goals
            </h2>
            {fundingGoals.map(goal => {
              const progress = (goal.current_amount / goal.target_amount) * 100;
              return (
                <div key={goal.id} className="bg-gray-50 rounded-lg p-4 mb-3">
                  <h3 className="font-medium mb-2">{goal.title}</h3>
                  {goal.description && (
                    <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                  )}
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>
                      {UPIService.formatCurrency(goal.current_amount)} / {UPIService.formatCurrency(goal.target_amount)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all"
                      style={{ 
                        width: `${Math.min(progress, 100)}%`,
                        backgroundColor: creator.theme_color 
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {progress.toFixed(1)}% complete
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Team Members */}
        {teamMembers.length > 0 && (
          <div className="px-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team
            </h2>
            <div className="space-y-2">
              {teamMembers.map(member => (
                <div key={member.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  {member.avatar_url ? (
                    <Image
                      src={member.avatar_url}
                      alt={member.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                      style={{ backgroundColor: creator.theme_color }}
                    >
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {links.length > 0 && (
          <div className="px-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Links</h2>
            <div className="space-y-3">
              {links.map(link => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link)}
                  className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left border border-gray-200 hover:border-gray-300"
                >
                  <div className="flex items-center gap-3">
                    {getIconForLink(link.icon, link.url)}
                    <div className="flex-1">
                      <h3 className="font-medium">{link.title}</h3>
                      {link.description && (
                        <p className="text-sm text-gray-600">{link.description}</p>
                      )}
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-8 text-center text-gray-500">
          <p className="text-sm">
            Powered by <span className="font-medium">BuyMeChai</span>
          </p>
        </div>
      </div>
    </div>
  );
}