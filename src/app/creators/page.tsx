import Link from 'next/link';
import { Coffee, ArrowLeft, Users, TrendingUp, Target, Heart, Zap, Shield, Globe } from 'lucide-react';

export default function CreatorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-orange-500 hover:text-orange-600">
          <ArrowLeft className="w-5 h-5" />
          <Coffee className="w-6 h-6" />
          <span className="font-bold text-lg">BuyMeChai</span>
        </Link>
        <Link href="/signup" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
          Get Started
        </Link>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Built for
            <span className="text-orange-500"> Indian Creators</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The most creator-friendly platform in India. Zero fees, instant UPI payments, 
            and powerful tools to grow your community.
          </p>
          <Link href="/signup" className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg inline-block">
            Start Your Journey
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Zero Platform Fees</h3>
            <p className="text-gray-600">
              Keep 100% of what you earn. No hidden charges, no commission cuts. 
              Your supporters' money goes directly to you.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Instant UPI Payments</h3>
            <p className="text-gray-600">
              Supporters pay instantly through any UPI app. No delays, no payment gateway hassles. 
              Money reaches your account immediately.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Team Support</h3>
            <p className="text-gray-600">
              Let your audience support your entire team - editors, writers, designers. 
              Transparent funding for everyone who helps create.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Funding Goals</h3>
            <p className="text-gray-600">
              Set goals for equipment, projects, or milestones. Visual progress bars 
              motivate your community to help you achieve them.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-indigo-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Link-in-Bio</h3>
            <p className="text-gray-600">
              One beautiful page for all your links. YouTube, Instagram, website, products - 
              everything your audience needs in one place.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Analytics</h3>
            <p className="text-gray-600">
              Understand your audience with detailed analytics. Track clicks, donations, 
              and engagement to grow strategically.
            </p>
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-white rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                A
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Arjun - Tech YouTuber</h3>
              <p className="text-gray-600 mb-4">
                "Raised ₹50,000 for my new camera setup in just 2 weeks. 
                The UPI integration made it so easy for my audience to support."
              </p>
              <div className="text-orange-500 font-semibold">₹50K+ raised</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                P
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Priya - Art Creator</h3>
              <p className="text-gray-600 mb-4">
                "My team support feature helped my editor and designer get recognized too. 
                We're all growing together now!"
              </p>
              <div className="text-orange-500 font-semibold">3 team members supported</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                R
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Rahul - Podcaster</h3>
              <p className="text-gray-600 mb-4">
                "The link-in-bio feature replaced 3 different tools I was using. 
                Everything my audience needs is now in one place."
              </p>
              <div className="text-orange-500 font-semibold">1000+ link clicks/month</div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-500 font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Sign Up</h3>
              <p className="text-gray-600 text-sm">Create your account with username and UPI ID</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-500 font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Customize</h3>
              <p className="text-gray-600 text-sm">Set up your profile, goals, and links</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-500 font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Share</h3>
              <p className="text-gray-600 text-sm">Share your BuyMeChai link with your audience</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-500 font-bold">4</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Receive</h3>
              <p className="text-gray-600 text-sm">Get instant UPI payments from supporters</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Earning?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of creators already using BuyMeChai
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-white text-orange-500 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors">
              Create Free Account
            </Link>
            <Link href="/johndoe" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:text-orange-500 transition-colors">
              View Demo Page
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 mt-20 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Coffee className="w-6 h-6 text-orange-500" />
            <span className="text-xl font-bold text-gray-900">BuyMeChai</span>
          </div>
          <p>Empowering creators across India 🇮🇳</p>
        </div>
      </footer>
    </div>
  );
}