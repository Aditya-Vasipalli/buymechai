import Link from 'next/link';
import CreatorDashboard from '@/components/CreatorDashboard';
import { Coffee, ArrowLeft } from 'lucide-react';

export default function DashboardPage() {
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
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/johndoe" 
                className="text-gray-600 hover:text-orange-500 transition-colors"
                target="_blank"
              >
                View My Page
              </Link>
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