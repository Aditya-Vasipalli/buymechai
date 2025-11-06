import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';

interface GenerateUIDRequest {
  creatorId: string;
  amount: number;
  supporterName: string;
  supporterMessage: string;
  chaiTierId?: string;
  teamMemberId?: string;
  fundingGoalId?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: GenerateUIDRequest = await req.json();
    
    const { 
      creatorId, 
      amount, 
      supporterName, 
      supporterMessage, 
      chaiTierId, 
      teamMemberId, 
      fundingGoalId 
    } = body;

    // Validate required fields
    if (!creatorId || !amount || !supporterName) {
      return NextResponse.json(
        { error: 'Missing required fields: creatorId, amount, supporterName' },
        { status: 400 }
      );
    }

    // Generate a short UID that fits UPI note limits (40-45 chars max)
    // Format: BMC-[8char-timestamp]-[16char-hash] = ~30 chars total
    const timestamp = Date.now().toString().slice(-8); // Last 8 digits of timestamp
    const dataToHash = `${creatorId}_${amount}_${supporterName}_${Date.now()}`;
    const hash16 = crypto.createHash('sha256').update(dataToHash).digest('hex').substring(0, 16); // 16 chars
    
    const paymentUID = `BMC-${timestamp}-${hash16}`;
    
    console.log(`Generated short UID: ${paymentUID} (${paymentUID.length} characters)`);

    // Store pending transaction
    const { data, error } = await supabase
      .from('pending_transactions')
      .insert({
        payment_uid: paymentUID,
        creator_id: creatorId,
        team_member_id: teamMemberId || null,
        funding_goal_id: fundingGoalId || null,
        chai_tier_id: chaiTierId || null,
        supporter_name: supporterName,
        supporter_message: supporterMessage,
        amount: amount
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating pending transaction:', error);
      return NextResponse.json(
        { error: 'Failed to generate payment UID' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      paymentUID,
      expiresAt: data.expires_at,
      message: 'Payment UID generated successfully'
    });

  } catch (error) {
    console.error('Error in generate-uid API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}