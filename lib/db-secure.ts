/**
 * Secure database operations with SQL injection prevention
 * Provides parameterized queries and input validation for Supabase
 */

import { supabase, Profile, Subscription } from '@/lib/db';
import { sanitizeText } from '@/lib/utils/security';
import { z } from 'zod';

// Database schema validation aligned with Supabase tables
const dbSchemas = {
  profile: z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    clerk_id: z.string().min(1),
    name: z.string().max(100).optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
  }),
  
  chatSession: z.object({
    id: z.string().uuid(),
    user_id: z.string().uuid().optional(),
    messages: z.array(z.any()),
    context: z.record(z.any()).optional(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
  
  subscription: z.object({
    id: z.string().uuid(),
    profile_id: z.string().uuid(),
    stripe_subscription_id: z.string(),
    stripe_customer_id: z.string(),
    status: z.enum(['active', 'canceled', 'past_due', 'trialing']),
    current_period_end: z.string(),
  }),
};

export class SecureDatabase {
  /**
   * Check if Supabase is configured
   */
  private isConfigured(): boolean {
    if (!supabase) {
      console.warn('[SecureDB] Supabase is not configured. Skipping database operation.');
      return false;
    }
    return true;
  }

  /**
   * Log security events for monitoring
   */
  private logOperation(operation: string, table: string, sanitizedParams?: Record<string, any>): void {
    console.log(`[SecureDB] ${operation} on ${table}`, sanitizedParams ? { params: sanitizedParams } : {});
  }

  /**
   * Sanitize parameters for logging (remove sensitive data)
   */
  private sanitizeForLog(params: Record<string, any>): Record<string, any> {
    const sanitized = { ...params };
    // Remove sensitive fields from logs
    delete sanitized.password;
    delete sanitized.token;
    delete sanitized.secret;
    
    // Sanitize string values
    Object.keys(sanitized).forEach(key => {
      if (typeof sanitized[key] === 'string') {
        sanitized[key] = sanitized[key].substring(0, 50) + (sanitized[key].length > 50 ? '...' : '');
      }
    });
    
    return sanitized;
  }

  /**
   * Safely create or update user profile
   */
  async createUserProfile(email: string, clerkId: string, name?: string): Promise<Profile | null> {
    if (!this.isConfigured()) return null;

    // Validate inputs
    const validation = z.object({
      email: z.string().email(),
      clerkId: z.string().min(1),
      name: z.string().max(100).optional(),
    }).safeParse({ email, clerkId, name });

    if (!validation.success) {
      throw new Error(`Invalid input: ${validation.error.message}`);
    }

    const sanitizedData = {
      email: sanitizeText(validation.data.email),
      clerk_id: sanitizeText(validation.data.clerkId),
      name: validation.data.name ? sanitizeText(validation.data.name) : null,
    };

    this.logOperation('CREATE/UPDATE', 'profiles', this.sanitizeForLog(sanitizedData));

    try {
      // Try to update existing profile first
      const { data: existing } = await supabase
        .from('profiles')
        .select('*')
        .eq('clerk_id', sanitizedData.clerk_id)
        .single();

      if (existing) {
        // Update existing profile
        const { data, error } = await supabase
          .from('profiles')
          .update({
            email: sanitizedData.email,
            name: sanitizedData.name || existing.name, // Keep existing name if not provided
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id)
          .select()
          .single();

        if (error) {
          console.error('[SecureDB] Error updating profile:', error);
          throw new Error('Profile update failed');
        }

        return data;
      } else {
        // Create new profile
        const { data, error } = await supabase
          .from('profiles')
          .insert({
            email: sanitizedData.email,
            clerk_id: sanitizedData.clerk_id,
            name: sanitizedData.name,
          })
          .select()
          .single();

        if (error) {
          console.error('[SecureDB] Error creating profile:', error);
          throw new Error('Profile creation failed');
        }

        return data;
      }
    } catch (error) {
      console.error('[SecureDB] Profile operation failed:', error);
      throw new Error('Database operation failed');
    }
  }

  /**
   * Safely retrieve user by Clerk ID
   */
  async getUserByClerkId(clerkId: string): Promise<Profile | null> {
    if (!this.isConfigured()) return null;

    const validation = z.string().min(1).safeParse(clerkId);
    if (!validation.success) {
      throw new Error('Invalid clerk ID');
    }

    const sanitizedClerkId = sanitizeText(validation.data);
    this.logOperation('SELECT', 'profiles', { clerk_id: '***' });

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('clerk_id', sanitizedClerkId)
        .single();

      if (error && error.code !== 'PGRST116') { // Not found error
        console.error('[SecureDB] Error fetching profile:', error);
        throw new Error('Profile fetch failed');
      }

      return data || null;
    } catch (error) {
      console.error('[SecureDB] Get user operation failed:', error);
      throw new Error('Database operation failed');
    }
  }

  /**
   * Safely create chat session
   */
  async createChatSession(userId?: string, context?: Record<string, any>): Promise<any> {
    if (!this.isConfigured()) return null;

    const validation = z.object({
      userId: z.string().uuid().optional(),
      context: z.record(z.any()).optional(),
    }).safeParse({ userId, context });

    if (!validation.success) {
      throw new Error(`Invalid input: ${validation.error.message}`);
    }

    const sanitizedData = {
      user_id: validation.data.userId || null,
      messages: [],
      context: validation.data.context || {},
    };

    this.logOperation('CREATE', 'chat_sessions', this.sanitizeForLog(sanitizedData));

    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .insert(sanitizedData)
        .select()
        .single();

      if (error) {
        console.error('[SecureDB] Error creating chat session:', error);
        throw new Error('Chat session creation failed');
      }

      return data;
    } catch (error) {
      console.error('[SecureDB] Create chat session operation failed:', error);
      throw new Error('Database operation failed');
    }
  }

  /**
   * Safely retrieve chat session
   */
  async getChatSession(sessionId: string): Promise<any> {
    if (!this.isConfigured()) return null;

    const validation = z.string().uuid().safeParse(sessionId);
    if (!validation.success) {
      throw new Error('Invalid session ID format');
    }

    this.logOperation('SELECT', 'chat_sessions', { id: '***' });

    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('id', validation.data)
        .single();

      if (error && error.code !== 'PGRST116') { // Not found error
        console.error('[SecureDB] Error fetching chat session:', error);
        throw new Error('Chat session fetch failed');
      }

      return data || null;
    } catch (error) {
      console.error('[SecureDB] Get chat session operation failed:', error);
      throw new Error('Database operation failed');
    }
  }

  /**
   * Safely update chat session messages
   */
  async updateChatSession(sessionId: string, messages: any[], context?: Record<string, any>): Promise<any> {
    if (!this.isConfigured()) return null;

    const validation = z.object({
      sessionId: z.string().uuid(),
      messages: z.array(z.any()),
      context: z.record(z.any()).optional(),
    }).safeParse({ sessionId, messages, context });

    if (!validation.success) {
      throw new Error(`Invalid input: ${validation.error.message}`);
    }

    const updateData: any = {
      messages: validation.data.messages,
      updated_at: new Date().toISOString(),
    };

    if (validation.data.context) {
      updateData.context = validation.data.context;
    }

    this.logOperation('UPDATE', 'chat_sessions', { 
      sessionId: '***', 
      messageCount: messages.length 
    });

    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .update(updateData)
        .eq('id', validation.data.sessionId)
        .select()
        .single();

      if (error) {
        console.error('[SecureDB] Error updating chat session:', error);
        throw new Error('Chat session update failed');
      }

      return data;
    } catch (error) {
      console.error('[SecureDB] Update chat session operation failed:', error);
      throw new Error('Database operation failed');
    }
  }

  /**
   * Safely create or update subscription
   */
  async createOrUpdateSubscription(
    profileId: string,
    stripeSubscriptionId: string,
    stripeCustomerId: string,
    status: Subscription['status'],
    currentPeriodEnd: Date
  ): Promise<Subscription | null> {
    if (!this.isConfigured()) return null;

    const validation = z.object({
      profileId: z.string().uuid(),
      stripeSubscriptionId: z.string().min(1),
      stripeCustomerId: z.string().min(1),
      status: z.enum(['active', 'canceled', 'past_due', 'trialing']),
      currentPeriodEnd: z.date(),
    }).safeParse({
      profileId,
      stripeSubscriptionId,
      stripeCustomerId,
      status,
      currentPeriodEnd,
    });

    if (!validation.success) {
      throw new Error(`Invalid input: ${validation.error.message}`);
    }

    const sanitizedData = {
      profile_id: validation.data.profileId,
      stripe_subscription_id: sanitizeText(validation.data.stripeSubscriptionId),
      stripe_customer_id: sanitizeText(validation.data.stripeCustomerId),
      status: validation.data.status,
      current_period_end: validation.data.currentPeriodEnd.toISOString(),
    };

    this.logOperation('CREATE/UPDATE', 'subscriptions', this.sanitizeForLog(sanitizedData));

    try {
      // Check for existing subscription
      const { data: existing } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('stripe_subscription_id', sanitizedData.stripe_subscription_id)
        .single();

      if (existing) {
        // Update existing subscription
        const { data, error } = await supabase
          .from('subscriptions')
          .update({
            status: sanitizedData.status,
            current_period_end: sanitizedData.current_period_end,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id)
          .select()
          .single();

        if (error) {
          console.error('[SecureDB] Error updating subscription:', error);
          throw new Error('Subscription update failed');
        }

        return data;
      } else {
        // Create new subscription
        const { data, error } = await supabase
          .from('subscriptions')
          .insert(sanitizedData)
          .select()
          .single();

        if (error) {
          console.error('[SecureDB] Error creating subscription:', error);
          throw new Error('Subscription creation failed');
        }

        return data;
      }
    } catch (error) {
      console.error('[SecureDB] Subscription operation failed:', error);
      throw new Error('Database operation failed');
    }
  }

  /**
   * Safely get active subscription by profile ID
   */
  async getActiveSubscription(profileId: string): Promise<any> {
    if (!this.isConfigured()) return null;

    const validation = z.string().uuid().safeParse(profileId);
    if (!validation.success) {
      throw new Error('Invalid profile ID format');
    }

    this.logOperation('SELECT', 'subscriptions', { profile_id: '***' });

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('profile_id', validation.data)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') { // Not found error
        console.error('[SecureDB] Error fetching active subscription:', error);
        throw new Error('Active subscription fetch failed');
      }

      return data || null;
    } catch (error) {
      console.error('[SecureDB] Get active subscription operation failed:', error);
      throw new Error('Database operation failed');
    }
  }

  /**
   * Safely cancel subscription
   */
  async cancelSubscription(stripeSubscriptionId: string): Promise<Subscription | null> {
    if (!this.isConfigured()) return null;

    const validation = z.string().min(1).safeParse(stripeSubscriptionId);
    if (!validation.success) {
      throw new Error('Invalid subscription ID');
    }

    const sanitizedId = sanitizeText(validation.data);
    this.logOperation('UPDATE', 'subscriptions', { stripe_subscription_id: '***' });

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .update({
          status: 'canceled',
          updated_at: new Date().toISOString(),
        })
        .eq('stripe_subscription_id', sanitizedId)
        .select()
        .single();

      if (error) {
        console.error('[SecureDB] Error canceling subscription:', error);
        throw new Error('Subscription cancellation failed');
      }

      return data;
    } catch (error) {
      console.error('[SecureDB] Cancel subscription operation failed:', error);
      throw new Error('Database operation failed');
    }
  }

  /**
   * Safely log security events
   */
  async logSecurityEvent(
    event: string,
    ip: string,
    userAgent?: string,
    userId?: string,
    details?: Record<string, any>
  ): Promise<any> {
    if (!this.isConfigured()) return null;

    const validation = z.object({
      event: z.string().max(100),
      ip: z.string().ip(),
      userAgent: z.string().max(500).optional(),
      userId: z.string().uuid().optional(),
      details: z.record(z.any()).optional(),
    }).safeParse({ event, ip, userAgent, userId, details });

    if (!validation.success) {
      throw new Error(`Invalid security log data: ${validation.error.message}`);
    }

    const sanitizedData = {
      event: sanitizeText(validation.data.event),
      ip_address: validation.data.ip,
      user_agent: validation.data.userAgent ? sanitizeText(validation.data.userAgent) : null,
      user_id: validation.data.userId || null,
      details: validation.data.details || null,
    };

    this.logOperation('CREATE', 'security_logs', { 
      event: sanitizedData.event, 
      ip: '***' 
    });

    try {
      const { data, error } = await supabase
        .from('security_logs')
        .insert(sanitizedData)
        .select()
        .single();

      if (error) {
        console.error('[SecureDB] Error logging security event:', error);
        throw new Error('Security logging failed');
      }

      return data;
    } catch (error) {
      console.error('[SecureDB] Security log operation failed:', error);
      throw new Error('Database operation failed');
    }
  }
}

// Export singleton instance
export const secureDb = new SecureDatabase();

// Re-export database schemas for external validation
export { dbSchemas };