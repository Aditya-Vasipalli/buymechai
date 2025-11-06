import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const creatorId = url.searchParams.get('creatorId');

    if (!creatorId) {
      return NextResponse.json({ error: 'Missing creatorId parameter' }, { status: 400 });
    }

    // Get all pending transactions for debugging
    const { data: allTransactions, error: allError } = await supabase
      .from('pending_transactions')
      .select('*')
      .eq('creator_id', creatorId);

    // Get unused transactions
    const { data: unusedTransactions, error: unusedError } = await supabase
      .from('pending_transactions')
      .select('*')
      .eq('creator_id', creatorId)
      .neq('is_used', true);

    // Get non-expired transactions
    const { data: validTransactions, error: validError } = await supabase
      .from('pending_transactions')
      .select('*')
      .eq('creator_id', creatorId)
      .gt('expires_at', new Date().toISOString())
      .neq('is_used', true);

    return NextResponse.json({
      creatorId,
      debug: {
        allTransactions: {
          count: allTransactions?.length || 0,
          data: allTransactions,
          error: allError
        },
        unusedTransactions: {
          count: unusedTransactions?.length || 0,
          data: unusedTransactions,
          error: unusedError
        },
        validTransactions: {
          count: validTransactions?.length || 0,
          data: validTransactions,
          error: validError
        }
      }
    });

  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
}