import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create the client if both environment variables are set
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any; // This allows the build to complete even without Supabase configured

// Export supabase as db for compatibility with secure database wrapper
export const db = supabase;

// Database types
export interface Profile {
  id: string;
  email: string;
  clerk_id: string;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  profile_id: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  stripe_subscription_id: string;
  stripe_customer_id: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}