import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface VerifyUIDRequest {
  paymentUID: string;
  creatorId: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: VerifyUIDRequest = await req.json();
    
    const { paymentUID, creatorId } = body;

    // Validate required fields
    if (!paymentUID || !creatorId) {
      return NextResponse.json(
        { error: 'Missing required fields: paymentUID, creatorId' },
        { status: 400 }
      );
    }

    // Check if UID exists and belongs to the creator
    const { data: pendingTransaction, error: fetchError } = await supabase
      .from('pending_transactions')
      .select('*')
      .eq('payment_uid', paymentUID)
      .eq('creator_id', creatorId)
      .gt('expires_at', new Date().toISOString()) // Not expired
      .single();

    if (fetchError || !pendingTransaction) {
      return NextResponse.json(
        { error: 'Invalid or expired payment UID' },
        { status: 400 }
      );
    }

    // Check if this UID has already been verified
    const { data: existingTransaction } = await supabase
      .from('transactions')
      .select('id')
      .eq('payment_uid', paymentUID)
      .single();

    if (existingTransaction) {
      return NextResponse.json(
        { error: 'This payment UID has already been verified' },
        { status: 400 }
      );
    }

    // Create verified transaction
    const { data: newTransaction, error: insertError } = await supabase
      .from('transactions')
      .insert({
        creator_id: pendingTransaction.creator_id,
        team_member_id: pendingTransaction.team_member_id,
        funding_goal_id: pendingTransaction.funding_goal_id,
        chai_tier_id: pendingTransaction.chai_tier_id,
        supporter_name: pendingTransaction.supporter_name,
        supporter_message: pendingTransaction.supporter_message,
        amount: pendingTransaction.amount,
        payment_uid: paymentUID,
        status: 'verified',
        verified_at: new Date().toISOString()
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating verified transaction:', insertError);
      return NextResponse.json(
        { error: 'Failed to verify payment' },
        { status: 500 }
      );
    }

    // Update funding goal progress if applicable
    if (pendingTransaction.funding_goal_id) {
      const { error: updateError } = await supabase.rpc(
        'increment_funding_goal', 
        { 
          goal_id: pendingTransaction.funding_goal_id, 
          amount: pendingTransaction.amount 
        }
      );

      if (updateError) {
        console.error('Error updating funding goal:', updateError);
        // Don't fail the transaction, just log the error
      }
    }

    // Clean up pending transaction
    await supabase
      .from('pending_transactions')
      .delete()
      .eq('id', pendingTransaction.id);

    return NextResponse.json({
      success: true,
      transaction: newTransaction,
      message: 'Payment verified successfully!'
    });

  } catch (error) {
    console.error('Error in verify-uid API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}