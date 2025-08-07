'use server';

import { auth } from '@clerk/nextjs/server';
import { secureDb } from '@/lib/db-secure';

export async function checkUserSubscription(): Promise<{
  hasActiveSubscription: boolean;
  subscription?: any;
}> {
  const { userId } = await auth();
  
  if (!userId) {
    return { hasActiveSubscription: false };
  }

  const profile = await secureDb.getUserByClerkId(userId);
  
  if (!profile) {
    return { hasActiveSubscription: false };
  }

  const subscription = await secureDb.getActiveSubscription(profile.id);
  
  return {
    hasActiveSubscription: !!subscription,
    subscription,
  };
}