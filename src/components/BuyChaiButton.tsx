'use client';

import { useState } from 'react';
import { ChaiTier, Creator, TeamMember } from '@/lib/supabase';
import { UPIService, UPIPaymentParams } from '@/lib/upi';
import { Coffee, Heart, Users, X } from 'lucide-react';
import Image from 'next/image';

interface BuyChaiButtonProps {
  creator: Creator;
  chaiTiers?: ChaiTier[];
  teamMembers?: TeamMember[];
  className?: string;
}

export default function BuyChaiButton({ 
  creator, 
  chaiTiers = [], 
  teamMembers = [],
  className = ''
}: BuyChaiButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<ChaiTier | null>(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [supporterName, setSupporterName] = useState<string>('');
  const [supporterMessage, setSupporterMessage] = useState<string>('');
  const [paymentData, setPaymentData] = useState<{
    type: 'redirect' | 'qr';
    data: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!selectedTier && !customAmount) return;
    
    setIsProcessing(true);
    
    try {
      const amount = selectedTier 
        ? UPIService.paiseToRupees(selectedTier.amount)
        : parseFloat(customAmount);
      
      const recipient = selectedTeamMember || creator;
      const transactionNote = selectedTier 
        ? `${selectedTier.name} from ${creator.display_name}`
        : `Support for ${creator.display_name}`;
      
      const paymentParams: UPIPaymentParams = {
        upiId: recipient.upi_id,
        amount,
        merchantName: selectedTeamMember ? selectedTeamMember.name : creator.display_name,
        transactionNote,
        transactionRef: `BMC_${Date.now()}`
      };

      const result = await UPIService.initiatePayment(paymentParams);
      
      if (result.type === 'redirect') {
        // On mobile - redirect to UPI app
        window.location.href = result.data;
      } else {
        // On desktop - show QR code
        setPaymentData(result);
      }
      
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTierSelect = (tier: ChaiTier) => {
    setSelectedTier(tier);
    setCustomAmount('');
  };

  const handleCustomAmount = (amount: string) => {
    setCustomAmount(amount);
    setSelectedTier(null);
  };

  const getSelectedAmount = () => {
    if (selectedTier) {
      return UPIService.formatCurrency(selectedTier.amount);
    }
    if (customAmount) {
      return UPIService.formatCurrency(UPIService.rupeesToPaise(parseFloat(customAmount)));
    }
    return null;
  };

  if (paymentData?.type === 'qr') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Scan QR Code</h3>
            <button
              onClick={() => setPaymentData(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mb-4">
            <Image
              src={paymentData.data}
              alt="UPI QR Code"
              width={200}
              height={200}
              className="mx-auto rounded-lg"
            />
          </div>
          
          <p className="text-sm text-gray-600 mb-2">
            Scan with any UPI app to pay {getSelectedAmount()}
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
            {UPIService.getUPIApps().map(app => (
              <span key={app.name} className="bg-gray-100 px-2 py-1 rounded">
                {app.name}
              </span>
            ))}
          </div>
          
          <button
            onClick={() => {
              setPaymentData(null);
              setIsOpen(false);
            }}
            className="mt-4 w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg ${className}`}
        style={{ backgroundColor: creator.theme_color }}
      >
        <Coffee className="w-5 h-5" />
        Buy me a chai
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Support {creator.display_name}</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Chai Tiers */}
            {chaiTiers.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Coffee className="w-4 h-4" />
                  Choose a chai
                </h3>
                <div className="space-y-2">
                  {chaiTiers.map(tier => (
                    <button
                      key={tier.id}
                      onClick={() => handleTierSelect(tier)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                        selectedTier?.id === tier.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">{tier.emoji} {tier.name}</span>
                          {tier.description && (
                            <p className="text-sm text-gray-600">{tier.description}</p>
                          )}
                        </div>
                        <span className="font-semibold">
                          {UPIService.formatCurrency(tier.amount)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Amount */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Or enter custom amount</h3>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  min="1"
                  step="1"
                />
              </div>
            </div>

            {/* Team Member Selection */}
            {teamMembers.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Support team member (optional)
                </h3>
                <select
                  value={selectedTeamMember?.id || ''}
                  onChange={(e) => {
                    const member = teamMembers.find(m => m.id === e.target.value);
                    setSelectedTeamMember(member || null);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                >
                  <option value="">Support {creator.display_name} directly</option>
                  {teamMembers.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.name} - {member.role}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Supporter Details */}
            <div className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your name (optional)</label>
                <input
                  type="text"
                  placeholder="Anonymous supporter"
                  value={supporterName}
                  onChange={(e) => setSupporterName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message (optional)</label>
                <textarea
                  placeholder="Say something nice..."
                  value={supporterMessage}
                  onChange={(e) => setSupporterMessage(e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={(!selectedTier && !customAmount) || isProcessing}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Heart className="w-5 h-5" />
                  Pay {getSelectedAmount() || '₹0'}
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}