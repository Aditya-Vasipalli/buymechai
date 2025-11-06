'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Smartphone, Monitor, Copy, CheckCircle } from 'lucide-react';

export default function PaymentHelpGuide() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const faqs = [
    {
      id: 'where-code',
      question: 'Where do I find the payment verification code?',
      answer: (
        <div className="space-y-3">
          <p>After making a UPI payment, you need to find the transaction reference code:</p>
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Step by step:</h4>
            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
              <li>Open your UPI app (Google Pay, PhonePe, Paytm, BHIM, etc.)</li>
              <li>Go to "History" or "Transactions"</li>
              <li>Find your recent payment to the creator</li>
              <li>Tap on the transaction to see details</li>
              <li>Look for "Transaction Note", "Reference", or "UTR"</li>
              <li>Copy the long code starting with "BMC_"</li>
            </ol>
          </div>
        </div>
      )
    },
    {
      id: 'not-payment-notes',
      question: 'Why doesn\'t "support xyz" in payment notes work?',
      answer: (
        <div className="space-y-3">
          <p>The verification code is <strong>not</strong> the message you type during payment.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
              <h4 className="font-medium text-red-800 mb-2">❌ This won't work:</h4>
              <p className="text-sm text-red-700">Payment notes: "support xyz"</p>
              <p className="text-xs text-red-600 mt-1">This is just a message for the recipient</p>
            </div>
            <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">✅ Use this instead:</h4>
              <p className="text-sm text-green-700 font-mono">BMC_1699123456789_abc123...</p>
              <p className="text-xs text-green-600 mt-1">Found in transaction reference/note</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'qr-not-scanning',
      question: 'QR code won\'t scan or is cut off?',
      answer: (
        <div className="space-y-3">
          <p>If the QR code popup is too big or cut off:</p>
          <div className="bg-orange-50 p-3 rounded-lg">
            <h4 className="font-medium text-orange-800 mb-2">Quick fixes:</h4>
            <ul className="text-sm text-orange-700 space-y-1 list-disc list-inside">
              <li>Zoom out your browser (Ctrl + - or Cmd + -)</li>
              <li>Use full-screen mode (F11)</li>
              <li>Scroll within the popup if needed</li>
              <li>Try on mobile - it opens UPI apps directly</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Mobile vs Desktop:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <Smartphone className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-700">Mobile:</p>
                  <p className="text-blue-600">Opens UPI app directly</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Monitor className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-700">Desktop:</p>
                  <p className="text-blue-600">Shows QR code to scan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'verification-failed',
      question: 'Verification says "Invalid payment code"?',
      answer: (
        <div className="space-y-3">
          <p>This usually happens when:</p>
          <div className="space-y-2">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
              <h4 className="font-medium text-yellow-800">Common issues:</h4>
              <ul className="text-sm text-yellow-700 mt-1 space-y-1 list-disc list-inside">
                <li>Code doesn't start with "BMC_"</li>
                <li>Code is too short (should be ~240 characters)</li>
                <li>Payment was made to wrong UPI ID</li>
                <li>Code already used for verification</li>
                <li>Payment not yet completed</li>
              </ul>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-3">
              <h4 className="font-medium text-green-800">Solutions:</h4>
              <ul className="text-sm text-green-700 mt-1 space-y-1 list-disc list-inside">
                <li>Double-check you copied the full code</li>
                <li>Wait a few minutes and try again</li>
                <li>Ensure payment was successful in your UPI app</li>
                <li>Contact the creator if payment was definitely made</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4">
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-green-500" />
        Payment Help Guide
      </h3>
      
      <div className="space-y-2">
        {faqs.map(faq => (
          <div key={faq.id} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
              className="w-full flex justify-between items-center p-3 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800 text-sm">{faq.question}</span>
              {openFAQ === faq.id ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            
            {openFAQ === faq.id && (
              <div className="px-3 pb-3 text-sm text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-700">
          <strong>Still having issues?</strong> The payment system uses UPI transaction references to verify payments. 
          This ensures security and prevents fraud while allowing instant verification.
        </p>
      </div>
    </div>
  );
}