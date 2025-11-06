'use client';

import { useState } from 'react';
import { Check, Copy, Clock, AlertCircle } from 'lucide-react';

interface PaymentVerificationProps {
  creatorId: string;
  onVerificationSuccess: () => void;
}

export default function PaymentVerification({ creatorId, onVerificationSuccess }: PaymentVerificationProps) {
  const [paymentUID, setPaymentUID] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const handleVerification = async () => {
    if (!paymentUID.trim()) {
      setMessage({ type: 'error', text: 'Please enter a payment code' });
      return;
    }

    // Basic validation - check if it looks like our UID format
    if (!paymentUID.startsWith('BMC_') || paymentUID.length < 200) {
      setMessage({ type: 'error', text: 'Invalid payment code format' });
      return;
    }

    setIsVerifying(true);
    setMessage(null);

    try {
      const response = await fetch('/api/payment/verify-uid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentUID: paymentUID.trim(),
          creatorId
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage({ type: 'error', text: data.error || 'Verification failed' });
        return;
      }

      setMessage({ type: 'success', text: 'Payment verified successfully! 🎉' });
      setPaymentUID('');
      
      // Call the success callback to refresh data
      setTimeout(() => {
        onVerificationSuccess();
        setMessage(null);
      }, 2000);

    } catch (error) {
      console.error('Verification error:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsVerifying(false);
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setPaymentUID(text);
      setMessage({ type: 'info', text: 'Pasted from clipboard' });
      setTimeout(() => setMessage(null), 2000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to access clipboard' });
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-green-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Verify Payment</h3>
          <p className="text-sm text-gray-600">
            Paste the payment code from your UPI transaction note to verify donation
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <h4 className="font-medium text-yellow-800 mb-1">🔍 Where to find your payment code:</h4>
          <ul className="text-xs text-yellow-700 space-y-1">
            <li>• Open your UPI app (GPay, PhonePe, Paytm, etc.)</li>
            <li>• Go to transaction history and find your recent payment</li>
            <li>• Look for "Transaction Note" or "Reference" (NOT payment notes)</li>
            <li>• Copy the long code starting with "BMC_"</li>
          </ul>
        </div>
        
        <div className="relative">
          <textarea
            value={paymentUID}
            onChange={(e) => setPaymentUID(e.target.value)}
            placeholder="Paste your payment code here (starts with BMC_...)"
            rows={4}
            className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 resize-none text-xs font-mono"
          />
          <button
            onClick={pasteFromClipboard}
            className="absolute top-2 right-2 p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
            title="Paste from clipboard"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>

        {message && (
          <div className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-700 border border-green-200'
              : message.type === 'error'
              ? 'bg-red-100 text-red-700 border border-red-200'
              : 'bg-blue-100 text-blue-700 border border-blue-200'
          }`}>
            {message.type === 'success' && <Check className="w-4 h-4" />}
            {message.type === 'error' && <AlertCircle className="w-4 h-4" />}
            {message.type === 'info' && <Clock className="w-4 h-4" />}
            {message.text}
          </div>
        )}

        <button
          onClick={handleVerification}
          disabled={!paymentUID.trim() || isVerifying}
          className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isVerifying ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              Verify Payment
            </>
          )}
        </button>
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-700">
          <strong>How it works:</strong> Each UPI payment includes a unique verification code in the transaction reference/note field (visible in your UPI app's transaction history). 
          This code confirms the payment was made and updates the creator's funding progress. The code is different from any notes you typed during payment.
        </p>
      </div>
    </div>
  );
}
