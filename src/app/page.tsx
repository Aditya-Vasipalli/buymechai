import Link from "next/link";
import { Coffee, Heart, Users, Target, TrendingUp, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Coffee className="w-8 h-8 text-orange-500" />
          <h1 className="text-2xl font-bold text-gray-900">BuyMeChai</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/features" className="text-gray-600 hover:text-orange-500 transition-colors">
            Features
          </Link>
          <Link href="/creators" className="text-gray-600 hover:text-orange-500 transition-colors">
            For Creators
          </Link>
          <Link href="/pricing" className="text-gray-600 hover:text-orange-500 transition-colors">
            Pricing
          </Link>
          <Link href="/login" className="text-gray-600 hover:text-orange-500 transition-colors">
            Sign In
          </Link>
          <Link href="/signup" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Support Your Favorite
            <span className="text-orange-500"> Creators</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The easiest way to receive support from your audience with UPI payments, 
            custom chai tiers, and powerful link-in-bio features.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/signup" className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
              Start Your Page
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/johndoe" className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg text-lg font-medium hover:bg-orange-50 transition-colors flex items-center gap-2">
              View Demo
              <Coffee className="w-5 h-5" />
            </Link>
          </div>

          {/* Sample Creator Card */}
          <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="h-20 bg-gradient-to-r from-orange-400 to-red-400"></div>
            <div className="p-6 text-center">
              <div className="relative -mt-12 mb-4">
                <div className="w-16 h-16 mx-auto bg-white rounded-full p-1 shadow-lg">
                  <div className="w-full h-full bg-orange-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                    J
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">John Doe</h3>
              <p className="text-gray-600 mb-4">Tech content creator</p>
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 mx-auto hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105">
                <Coffee className="w-4 h-4" />
                Buy me a chai
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">UPI Payments</h3>
            <p className="text-gray-600">
              Instant payments through UPI with dynamic QR codes for desktop and direct app integration for mobile.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Team Support</h3>
            <p className="text-gray-600">
              Let supporters choose to fund specific team members like editors, writers, or other collaborators.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Funding Goals</h3>
            <p className="text-gray-600">
              Set funding goals with progress bars to motivate your audience and track your objectives.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center">
          <div>
            <div className="text-3xl font-bold text-orange-500 mb-2">₹0</div>
            <div className="text-gray-600">Transaction Fees</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-500 mb-2">1min</div>
            <div className="text-gray-600">Setup Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-500 mb-2">100%</div>
            <div className="text-gray-600">Keep Donations</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-500 mb-2">24/7</div>
            <div className="text-gray-600">Availability</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to start receiving support?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of creators who are already using BuyMeChai to fund their passion projects.
          </p>
          <Link href="/signup" className="bg-white text-orange-500 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
            Create Your Page Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 mt-20 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Coffee className="w-6 h-6 text-orange-500" />
            <span className="text-xl font-bold text-gray-900">BuyMeChai</span>
          </div>
          <p>Made with ❤️ for creators in India</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/privacy" className="hover:text-orange-500 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-orange-500 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-orange-500 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
