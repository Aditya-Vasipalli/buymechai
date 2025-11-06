import Link from 'next/link';
import { Coffee, ArrowLeft, Smartphone, Monitor, Users, Target, TrendingUp, Globe, Zap, Shield, Heart, Bell } from 'lucide-react';

export default function FeaturesPage() {
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
            Powerful Features for
            <span className="text-orange-500"> Modern Creators</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Everything you need to monetize your content, engage your audience, 
            and grow your creator business in India.
          </p>
          <Link href="/signup" className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg inline-block">
            Try All Features Free
          </Link>
        </div>

        {/* UPI Payment Features */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">UPI-Powered Payments</h2>
            <p className="text-xl text-gray-600">The fastest, most convenient way to receive support in India</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Mobile Deep Links</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  On mobile devices, clicking "Buy me a chai" directly opens the user's preferred UPI app 
                  with all payment details pre-filled. No QR scanning needed!
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Google Pay integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>PhonePe support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Paytm compatibility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>BHIM & bank apps</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Monitor className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Dynamic QR Codes</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Desktop users get transaction-specific QR codes that can be scanned with any UPI app. 
                  Each QR code contains exact payment details for seamless transactions.
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Instant QR generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Pre-filled payment details</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Universal UPI compatibility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Secure transactions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Creator Features */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Creator-Focused Tools</h2>
            <p className="text-xl text-gray-600">Built specifically for content creators and their unique needs</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Coffee className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Custom Chai Tiers</h3>
              <p className="text-gray-600 mb-4">
                Create personalized support tiers like "₹50 for Masala Chai" or "₹100 for Chai & Samosa". 
                Make donations fun and relatable for your Indian audience.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Unlimited tier options</li>
                <li>• Custom names & emojis</li>
                <li>• Flexible pricing</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Team Support</h3>
              <p className="text-gray-600 mb-4">
                Let supporters choose to fund specific team members like video editors, writers, 
                or designers. Transparent funding for your entire creative team.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Unlimited team members</li>
                <li>• Individual UPI IDs</li>
                <li>• Role-based organization</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Funding Goals</h3>
              <p className="text-gray-600 mb-4">
                Set clear goals like "New Camera - ₹50,000" with visual progress bars. 
                Motivate your audience to help you reach important milestones.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Visual progress tracking</li>
                <li>• Deadline management</li>
                <li>• Goal descriptions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Link-in-Bio Features */}
        <div className="mb-20">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-indigo-500" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">Powerful Link-in-Bio</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Replace multiple tools with one beautiful page. Everything your audience needs 
                  to connect with you, support you, and consume your content.
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>YouTube links</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span>Instagram profile</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Twitter/X account</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Spotify podcasts</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Amazon storefront</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Personal website</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span>Course platforms</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      <span>Any custom link</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">
                      J
                    </div>
                    <h4 className="font-semibold text-gray-900">John Doe</h4>
                    <p className="text-sm text-gray-600">Tech Content Creator</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-700">
                      🎥 YouTube Channel
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-700">
                      📸 Instagram Profile
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-700">
                      🐦 Twitter Account
                    </div>
                    <div className="bg-orange-500 text-white rounded-lg p-3 text-sm font-medium text-center">
                      ☕ Buy me a chai
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics & Management */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Analytics & Management</h2>
            <p className="text-xl text-gray-600">Understand your audience and grow strategically</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Detailed Analytics</h3>
              <p className="text-gray-600 mb-4">
                Track page views, link clicks, donation patterns, and supporter behavior. 
                Make data-driven decisions to grow your creator business.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Real-time visitor tracking</li>
                <li>• Link performance metrics</li>
                <li>• Donation analytics</li>
                <li>• Audience insights</li>
                <li>• Export capabilities</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Creator Dashboard</h3>
              <p className="text-gray-600 mb-4">
                Manage everything from one beautiful dashboard. Update your profile, 
                add team members, create goals, and track your growth.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Intuitive interface</li>
                <li>• Bulk operations</li>
                <li>• Real-time updates</li>
                <li>• Mobile responsive</li>
                <li>• Quick actions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">More Features</h2>
            <p className="text-xl text-gray-600">Everything else you need to succeed as a creator</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <Zap className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Instant Notifications</h4>
              <p className="text-sm text-gray-600">Get notified immediately when someone supports you</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Supporter Messages</h4>
              <p className="text-sm text-gray-600">Receive encouraging messages along with donations</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <Bell className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Smart Reminders</h4>
              <p className="text-sm text-gray-600">Automated reminders to update content and engage fans</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Try All Features?</h3>
          <p className="text-xl mb-8 opacity-90">
            Start with our free plan and upgrade when you're ready
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-white text-orange-500 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors">
              Start Free Account
            </Link>
            <Link href="/pricing" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:text-orange-500 transition-colors">
              View Pricing
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
          <p>Powerful features for modern creators ⚡</p>
        </div>
      </footer>
    </div>
  );
}