'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export default function DebugPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const { user, creator, loading } = useAuth();
  
  const addLog = (message: string) => {
    console.log(message);
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    addLog('Debug component mounted');
    
    // Test 1: Check Supabase connection
    const testConnection = async () => {
      try {
        addLog('Testing Supabase connection...');
        const { data, error } = await supabase.from('creators').select('count').limit(1);
        if (error) {
          addLog(`❌ Supabase error: ${error.message}`);
        } else {
          addLog('✅ Supabase connection working');
        }
      } catch (err) {
        addLog(`❌ Connection failed: ${err}`);
      }
    };

    // Test 2: Check auth state
    const testAuth = async () => {
      try {
        addLog('Checking auth session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          addLog(`❌ Auth error: ${error.message}`);
        } else {
          addLog(`✅ Auth session: ${session?.user?.email || 'No user'}`);
        }
      } catch (err) {
        addLog(`❌ Auth check failed: ${err}`);
      }
    };

    testConnection();
    testAuth();
  }, []);

  // Monitor auth context changes
  useEffect(() => {
    addLog(`Auth Context - Loading: ${loading}, User: ${user?.email || 'none'}, Creator: ${creator?.username || 'none'}`);
  }, [loading, user, creator]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Debug Information</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Auth Status */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Auth Status</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Loading:</strong> {loading.toString()}</p>
              <p><strong>User Email:</strong> {user?.email || 'Not logged in'}</p>
              <p><strong>Creator Username:</strong> {creator?.username || 'No creator'}</p>
              <p><strong>Creator Display Name:</strong> {creator?.display_name || 'No creator'}</p>
            </div>
          </div>

          {/* Environment */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Environment</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30)}...</p>
              <p><strong>App URL:</strong> {process.env.NEXT_PUBLIC_APP_URL}</p>
              <p><strong>Node Env:</strong> {process.env.NODE_ENV}</p>
            </div>
          </div>
        </div>

        {/* Debug Logs */}
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h2 className="text-lg font-semibold mb-4">Debug Logs</h2>
          <div className="bg-gray-100 p-4 rounded text-sm font-mono max-h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-gray-500">No logs yet...</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Tests */}
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h2 className="text-lg font-semibold mb-4">Quick Tests</h2>
          <div className="space-x-4">
            <button
              onClick={async () => {
                addLog('Testing manual query...');
                try {
                  const { data, error } = await supabase.from('creators').select('*').limit(1);
                  addLog(`Query result: ${data ? 'Success' : 'No data'}, Error: ${error?.message || 'None'}`);
                } catch (err) {
                  addLog(`Query failed: ${err}`);
                }
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Test Query
            </button>
            
            <button
              onClick={() => {
                addLog('Current URL: ' + window.location.href);
                addLog('User Agent: ' + navigator.userAgent);
              }}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Log Browser Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}