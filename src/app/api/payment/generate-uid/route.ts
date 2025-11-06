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

    // Generate a very long UID (240 characters - near UPI note limit)
    // Format: BMC_[timestamp]_[random32]_[hash64]_[random64]_[checksum48]
    const timestamp = Date.now().toString();
    const random32 = crypto.randomBytes(16).toString('hex'); // 32 chars
    const hash64 = crypto.createHash('sha256').update(`${creatorId}_${amount}_${timestamp}`).digest('hex').substring(0, 64); // 64 chars
    const random64 = crypto.randomBytes(32).toString('hex'); // 64 chars
    const checksum = crypto.createHash('md5').update(`${timestamp}_${random32}_${hash64}_${random64}`).digest('hex').substring(0, 24); // 24 chars
    
    const paymentUID = `BMC_${timestamp}_${random32}_${hash64}_${random64}_${checksum}`;

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