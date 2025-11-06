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

    // Trim whitespace from pasted UID
    const trimmedUID = paymentUID.trim();

    // Get all pending transactions for this creator (not expired and not used)
    const { data: pendingTransactions, error: fetchError } = await supabase
      .from('pending_transactions')
      .select('*')
      .eq('creator_id', creatorId)
      .gt('expires_at', new Date().toISOString()) // Not expired
      .is('is_used', null) // Not yet used
      .order('created_at', { ascending: false }); // Most recent first

    if (fetchError) {
      console.error('Error fetching pending transactions:', fetchError);
      return NextResponse.json(
        { error: 'Failed to check pending transactions' },
        { status: 500 }
      );
    }

    if (!pendingTransactions || pendingTransactions.length === 0) {
      return NextResponse.json(
        { error: 'No pending transactions found for this creator' },
        { status: 400 }
      );
    }

    // Find matching UID in any pending transaction
    const matchingTransaction = pendingTransactions.find(
      transaction => transaction.payment_uid === trimmedUID
    );

    if (!matchingTransaction) {
      return NextResponse.json(
        { error: 'Payment code not found. Make sure you copied the correct code from your transaction details.' },
        { status: 400 }
      );
    }

    // Mark this transaction as used (instead of deleting)
    const { error: markUsedError } = await supabase
      .from('pending_transactions')
      .update({ 
        is_used: true,
        used_at: new Date().toISOString()
      })
      .eq('id', matchingTransaction.id);

    if (markUsedError) {
      console.error('Error marking transaction as used:', markUsedError);
      return NextResponse.json(
        { error: 'Failed to update transaction status' },
        { status: 500 }
      );
    }

    // Create verified transaction
    const { data: newTransaction, error: insertError } = await supabase
      .from('transactions')
      .insert({
        creator_id: matchingTransaction.creator_id,
        team_member_id: matchingTransaction.team_member_id,
        funding_goal_id: matchingTransaction.funding_goal_id,
        chai_tier_id: matchingTransaction.chai_tier_id,
        supporter_name: matchingTransaction.supporter_name,
        supporter_message: matchingTransaction.supporter_message,
        amount: matchingTransaction.amount,
        payment_uid: trimmedUID,
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
    if (matchingTransaction.funding_goal_id) {
      const { error: updateError } = await supabase.rpc(
        'increment_funding_goal', 
        { 
          goal_id: matchingTransaction.funding_goal_id, 
          amount: matchingTransaction.amount 
        }
      );

      if (updateError) {
        console.error('Error updating funding goal:', updateError);
        // Don't fail the transaction, just log the error
      }
    }

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