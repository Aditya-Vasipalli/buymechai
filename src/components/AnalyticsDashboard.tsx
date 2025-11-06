'use client';

import { useState, useEffect } from 'react';
import { Creator, supabase } from '@/lib/supabase';
import { UPIService } from '@/lib/upi';
import { 
  TrendingUp, 
  Eye, 
  MousePointer, 
  Heart, 
  Calendar,
  Users,
  DollarSign,
  ExternalLink,
  Download
} from 'lucide-react';

interface AnalyticsData {
  totalViews: number;
  totalClicks: number;
  totalDonations: number;
  totalDonationAmount: number;
  topLinks: Array<{
    title: string;
    clicks: number;
    url: string;
  }>;
  recentDonations: Array<{
    amount: number;
    supporter_name?: string;
    supporter_message?: string;
    created_at: string;
  }>;
  dailyStats: Array<{
    date: string;
    views: number;
    clicks: number;
    donations: number;
  }>;
}

interface AnalyticsDashboardProps {
  creator: Creator;
}

export default function AnalyticsDashboard({ creator }: AnalyticsDashboardProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    fetchAnalytics();
  }, [creator.id, dateRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - (dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90));

      // Fetch page views
      const { data: viewsData } = await supabase
        .from('analytics')
        .select('created_at')
        .eq('creator_id', creator.id)
        .eq('event_type', 'page_view')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());

      // Fetch link clicks with link details
      const { data: clicksData } = await supabase
        .from('analytics')
        .select(`
          created_at,
          links (
            title,
            url,
            click_count
          )
        `)
        .eq('creator_id', creator.id)
        .eq('event_type', 'link_click')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());

      // Fetch donations/transactions
      const { data: donationsData } = await supabase
        .from('transactions')
        .select('amount, supporter_name, supporter_message, created_at')
        .eq('creator_id', creator.id)
        .eq('status', 'completed')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString())
        .order('created_at', { ascending: false });

      // Fetch top links
      const { data: topLinksData } = await supabase
        .from('links')
        .select('title, url, click_count')
        .eq('creator_id', creator.id)
        .eq('is_active', true)
        .order('click_count', { ascending: false })
        .limit(5);

      // Process daily stats
      const dailyStatsMap: Record<string, { views: number; clicks: number; donations: number }> = {};
      
      // Initialize all dates in range
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        dailyStatsMap[dateStr] = { views: 0, clicks: 0, donations: 0 };
      }

      // Count views by date
      viewsData?.forEach(view => {
        const dateStr = view.created_at.split('T')[0];
        if (dailyStatsMap[dateStr]) {
          dailyStatsMap[dateStr].views++;
        }
      });

      // Count clicks by date
      clicksData?.forEach(click => {
        const dateStr = click.created_at.split('T')[0];
        if (dailyStatsMap[dateStr]) {
          dailyStatsMap[dateStr].clicks++;
        }
      });

      // Count donations by date
      donationsData?.forEach(donation => {
        const dateStr = donation.created_at.split('T')[0];
        if (dailyStatsMap[dateStr]) {
          dailyStatsMap[dateStr].donations++;
        }
      });

      const dailyStats = Object.entries(dailyStatsMap).map(([date, stats]) => ({
        date,
        ...stats
      }));

      const analyticsData: AnalyticsData = {
        totalViews: viewsData?.length || 0,
        totalClicks: clicksData?.length || 0,
        totalDonations: donationsData?.length || 0,
        totalDonationAmount: donationsData?.reduce((sum, d) => sum + d.amount, 0) || 0,
        topLinks: topLinksData?.map(link => ({
          title: link.title,
          clicks: link.click_count,
          url: link.url
        })) || [],
        recentDonations: donationsData?.slice(0, 10) || [],
        dailyStats
      };

      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    if (!analytics) return;
    
    const csvData = [
      ['Date', 'Page Views', 'Link Clicks', 'Donations'],
      ...analytics.dailyStats.map(stat => [
        stat.date,
        stat.views.toString(),
        stat.clicks.toString(),
        stat.donations.toString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `buymechai-analytics-${creator.username}-${dateRange}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center p-12">
        <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">No Analytics Data</h3>
        <p className="text-gray-500">Analytics data will appear once you start receiving traffic.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          Analytics Dashboard
        </h2>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as '7d' | '30d' | '90d')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</p>
            </div>
            <Eye className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Clicks</p>
              <p className="text-2xl font-bold">{analytics.totalClicks.toLocaleString()}</p>
            </div>
            <MousePointer className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Donations</p>
              <p className="text-2xl font-bold">{analytics.totalDonations.toLocaleString()}</p>
            </div>
            <Heart className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Earned</p>
              <p className="text-2xl font-bold">
                {UPIService.formatCurrency(analytics.totalDonationAmount)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Links */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            Top Links
          </h3>
          {analytics.topLinks.length > 0 ? (
            <div className="space-y-3">
              {analytics.topLinks.map((link, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate text-gray-900">{link.title}</h4>
                    <p className="text-sm text-gray-700 truncate">{link.url}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-semibold text-gray-900">{link.clicks.toLocaleString()}</p>
                    <p className="text-xs text-gray-700">clicks</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700 text-center py-4">No link clicks yet</p>
          )}
        </div>

        {/* Recent Donations */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Recent Donations
          </h3>
          {analytics.recentDonations.length > 0 ? (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {analytics.recentDonations.map((donation, index) => (
                <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">
                        {donation.supporter_name || 'Anonymous'}
                      </span>
                      <span className="text-sm text-gray-700">
                        {new Date(donation.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {donation.supporter_message && (
                      <p className="text-sm text-gray-600 italic">
                        "{donation.supporter_message}"
                      </p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-semibold text-green-600">
                      {UPIService.formatCurrency(donation.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700 text-center py-4">No donations yet</p>
          )}
        </div>
      </div>

      {/* Daily Chart */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Daily Activity</h3>
        <div className="space-y-4">
          {analytics.dailyStats.map((stat, index) => {
            const maxValue = Math.max(
              ...analytics.dailyStats.map(s => Math.max(s.views, s.clicks, s.donations))
            );
            return (
              <div key={index} className="flex items-center gap-4">
                <div className="w-20 text-sm text-gray-600">
                  {new Date(stat.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Views: {stat.views}</span>
                    <div 
                      className="h-1 bg-blue-500 rounded"
                      style={{ width: `${(stat.views / maxValue) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Clicks: {stat.clicks}</span>
                    <div 
                      className="h-1 bg-green-500 rounded"
                      style={{ width: `${(stat.clicks / maxValue) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Donations: {stat.donations}</span>
                    <div 
                      className="h-1 bg-red-500 rounded"
                      style={{ width: `${(stat.donations / maxValue) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}