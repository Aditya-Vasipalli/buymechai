import Link from 'next/link';
import { Coffee, ArrowLeft, Check, X, Star, Zap, Shield } from 'lucide-react';

export default function PricingPage() {
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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Simple, Transparent
            <span className="text-orange-500"> Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            No hidden fees, no surprises. Keep 100% of what you earn.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">₹0</div>
              <p className="text-gray-600">Forever free</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Unlimited donations</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">UPI payments</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Custom chai tiers</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Link-in-bio page</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Basic analytics</span>
              </li>
              <li className="flex items-center gap-3">
                <X className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">Custom domain</span>
              </li>
              <li className="flex items-center gap-3">
                <X className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">Advanced analytics</span>
              </li>
              <li className="flex items-center gap-3">
                <X className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">Priority support</span>
              </li>
            </ul>

            <Link href="/signup" className="w-full block text-center bg-gray-100 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              Get Started
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-orange-500 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Star className="w-4 h-4" />
                Most Popular
              </div>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">₹199</div>
              <p className="text-gray-600">per month</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Everything in Free</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Custom domain</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Advanced analytics</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Team management</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Funding goals</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Email support</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Custom themes</span>
              </li>
              <li className="flex items-center gap-3">
                <X className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">White-label solution</span>
              </li>
            </ul>

            <Link href="/signup" className="w-full block text-center bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105">
              Start Pro Trial
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">Custom</div>
              <p className="text-gray-600">For large creators</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Everything in Pro</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">White-label solution</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Dedicated account manager</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Custom integrations</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Priority support</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Advanced security</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">SLA guarantee</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Bulk user management</span>
              </li>
            </ul>

            <Link href="/contact" className="w-full block text-center bg-gray-100 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Feature Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Features</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Free</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Pro</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">UPI Payments</td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Monthly Donation Limit</td>
                  <td className="text-center py-3 px-4 text-gray-700">Unlimited</td>
                  <td className="text-center py-3 px-4 text-gray-700">Unlimited</td>
                  <td className="text-center py-3 px-4 text-gray-700">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Platform Fee</td>
                  <td className="text-center py-3 px-4 text-green-600 font-semibold">0%</td>
                  <td className="text-center py-3 px-4 text-green-600 font-semibold">0%</td>
                  <td className="text-center py-3 px-4 text-green-600 font-semibold">0%</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Custom Domain</td>
                  <td className="text-center py-3 px-4"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Advanced Analytics</td>
                  <td className="text-center py-3 px-4"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Team Members</td>
                  <td className="text-center py-3 px-4 text-gray-700">3</td>
                  <td className="text-center py-3 px-4 text-gray-700">Unlimited</td>
                  <td className="text-center py-3 px-4 text-gray-700">Unlimited</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Do you charge any fees on donations?</h3>
              <p className="text-gray-600">No, we don't charge any platform fees. You keep 100% of what you earn. The only costs are standard UPI transaction fees (usually ₹0 for most transactions).</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I use my existing UPI ID?</h3>
              <p className="text-gray-600">Yes! You can use any valid UPI ID from any bank or payment app. No need to create new accounts.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is there a limit on how much I can receive?</h3>
              <p className="text-gray-600">No limits from our side. UPI transaction limits depend on your bank/payment app settings (usually ₹1 lakh per day).</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I cancel my Pro subscription anytime?</h3>
              <p className="text-gray-600">Yes, you can cancel anytime. Your Pro features will remain active until the end of your billing period.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">We offer a 30-day money-back guarantee for Pro subscriptions if you're not satisfied with the service.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Start Earning Today</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of creators who trust BuyMeChai
          </p>
          <Link href="/signup" className="bg-white text-orange-500 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors inline-block">
            Create Free Account
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
          <p>Transparent pricing, zero hidden fees 💰</p>
        </div>
      </footer>
    </div>
  );
}