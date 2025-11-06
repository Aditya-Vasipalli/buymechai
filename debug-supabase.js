// Test Supabase connection
// Run this in browser console to debug

import { supabase } from '@/lib/supabase';

// Test 1: Check connection
console.log('Testing Supabase connection...');

supabase
  .from('creators')
  .select('id, username, display_name')
  .limit(1)
  .then(({ data, error }) => {
    if (error) {
      console.error('❌ Supabase Error:', error);
    } else {
      console.log('✅ Supabase Working:', data);
    }
  });

// Test 2: Check auth
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('❌ Auth Error:', error);
  } else {
    console.log('✅ Auth Session:', data.session?.user?.email || 'No user');
  }
});

// Test 3: Check table exists
supabase
  .rpc('version')
  .then(({ data, error }) => {
    if (error) {
      console.error('❌ Database Error:', error);
    } else {
      console.log('✅ Database Connected:', data);
    }
  });