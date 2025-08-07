import { supabase, Profile, Subscription } from './db';

export async function createProfile(email: string, clerkId: string): Promise<Profile | null> {
  if (!supabase) {
    console.warn('Supabase is not configured. Skipping profile creation.');
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .insert({ email, clerk_id: clerkId })
    .select()
    .single();

  if (error) {
    console.error('Error creating profile:', error);
    return null;
  }

  return data;
}

export async function getProfileByClerkId(clerkId: string): Promise<Profile | null> {
  if (!supabase) {
    console.warn('Supabase is not configured. Skipping profile fetch.');
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('clerk_id', clerkId)
    .single();

  if (error && error.code !== 'PGRST116') { // Not found error
    console.error('Error fetching profile:', error);
  }

  return data;
}

export async function createOrUpdateSubscription(
  profileId: string,
  stripeSubscriptionId: string,
  stripeCustomerId: string,
  status: Subscription['status'],
  currentPeriodEnd: Date
): Promise<Subscription | null> {
  if (!supabase) {
    console.warn('Supabase is not configured. Skipping subscription update.');
    return null;
  }

  const { data: existing } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('stripe_subscription_id', stripeSubscriptionId)
    .single();

  if (existing) {
    // Update existing subscription
    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        status,
        current_period_end: currentPeriodEnd.toISOString(),
      })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating subscription:', error);
      return null;
    }

    return data;
  } else {
    // Create new subscription
    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        profile_id: profileId,
        stripe_subscription_id: stripeSubscriptionId,
        stripe_customer_id: stripeCustomerId,
        status,
        current_period_end: currentPeriodEnd.toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating subscription:', error);
      return null;
    }

    return data;
  }
}

export async function getActiveSubscription(profileId: string): Promise<Subscription | null> {
  if (!supabase) {
    console.warn('Supabase is not configured. Skipping subscription fetch.');
    return null;
  }

  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('profile_id', profileId)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') { // Not found error
    console.error('Error fetching subscription:', error);
  }

  return data;
}

export async function cancelSubscription(stripeSubscriptionId: string): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase is not configured. Skipping subscription cancellation.');
    return false;
  }

  const { error } = await supabase
    .from('subscriptions')
    .update({ status: 'canceled' })
    .eq('stripe_subscription_id', stripeSubscriptionId);

  if (error) {
    console.error('Error canceling subscription:', error);
    return false;
  }

  return true;
}