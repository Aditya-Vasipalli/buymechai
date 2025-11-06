'use client';

import Link from 'next/link';
import CreatorDashboard from '@/components/CreatorDashboard';
import { Coffee, ArrowLeft, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, creator, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signup');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !creator) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-orange-500 hover:text-orange-600">
                <ArrowLeft className="w-5 h-5" />
                <Coffee className="w-6 h-6" />
                <span className="font-bold text-lg">BuyMeChai</span>
              </Link>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600">Welcome, {creator.display_name}!</span>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href={`/${creator.username}`} 
                className="text-gray-600 hover:text-orange-500 transition-colors"
                target="_blank"
              >
                View My Page
              </Link>
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <CreatorDashboard />
      </main>
    </div>
  );
}