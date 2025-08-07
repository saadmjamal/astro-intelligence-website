import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
// Using secureDb for consistent database access with security validation
import { clerkClient } from '@clerk/nextjs/server';
// import { validateSessionToken } from '@/lib/utils/security';
import { secureDb } from '@/lib/db-secure';

export async function POST(req: Request) {
  const startTime = Date.now();
  let ip: string = 'unknown';
  let userAgent: string = 'unknown';
  
  try {
    // Extract request metadata for security logging
    const headersList = await headers();
    const forwarded = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const cfConnectingIp = headersList.get('cf-connecting-ip');
    
    ip = cfConnectingIp || (forwarded ? forwarded.split(',')[0]?.trim() : realIp) || 'unknown';
    userAgent = headersList.get('user-agent') || 'unknown';
    
    // Validate Stripe configuration
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
      await secureDb.logSecurityEvent(
        'STRIPE_CONFIG_MISSING',
        ip,
        userAgent,
        undefined,
        { endpoint: '/api/stripe/webhook' }
      );
      
      console.error('Stripe configuration missing');
      return NextResponse.json(
        { error: 'Payment system not configured' },
        { status: 503 }
      );
    }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    // @ts-expect-error - Stripe API version mismatch with SDK
    apiVersion: '2024-12-18.acacia',
  });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    const body = await req.text();
    
    // Validate request size
    if (body.length > 65536) { // 64KB limit for webhooks
      await secureDb.logSecurityEvent(
        'STRIPE_WEBHOOK_SIZE_EXCEEDED',
        ip,
        userAgent,
        undefined,
        { bodySize: body.length }
      );
      
      return NextResponse.json(
        { error: 'Request too large' },
        { status: 413 }
      );
    }
    
    const signature = headersList.get('stripe-signature');
    
    if (!signature) {
      await secureDb.logSecurityEvent(
        'STRIPE_WEBHOOK_NO_SIGNATURE',
        ip,
        userAgent,
        undefined,
        { endpoint: '/api/stripe/webhook' }
      );
      
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

  let event: Stripe.Event;

    // Enhanced webhook signature verification with timing-safe comparison
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      
      // Log successful webhook verification
      await secureDb.logSecurityEvent(
        'STRIPE_WEBHOOK_VERIFIED',
        ip,
        userAgent,
        undefined,
        { 
          eventType: event.type,
          eventId: event.id,
          endpoint: '/api/stripe/webhook'
        }
      );
      
    } catch (err) {
      // Log signature verification failures for security monitoring
      await secureDb.logSecurityEvent(
        'STRIPE_WEBHOOK_SIGNATURE_FAILED',
        ip,
        userAgent,
        undefined,
        { 
          error: err instanceof Error ? err.message : 'Unknown',
          signaturePresent: !!signature,
          bodyLength: body.length
        }
      );
      
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const subscriptionId = session.subscription as string;
        const customerId = session.customer as string;

        if (userId && subscriptionId) {
          // Get user info from Clerk
          const client = await clerkClient();
          const user = await client.users.getUser(userId);
          
          // Get or create profile
          let profile = await secureDb.getUserByClerkId(userId);
          if (!profile && user.emailAddresses[0]) {
            profile = await secureDb.createUserProfile(user.emailAddresses[0].emailAddress, userId);
          }

          if (profile) {
            // Get subscription details
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            
            // Create or update subscription in database
            await secureDb.createOrUpdateSubscription(
              profile.id,
              subscriptionId,
              customerId,
              'active',
              new Date((subscription as any).current_period_end * 1000)
            );
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Map Stripe status to our status
        const statusMap: Record<string, 'active' | 'canceled' | 'past_due' | 'trialing'> = {
          'active': 'active',
          'canceled': 'canceled',
          'past_due': 'past_due',
          'trialing': 'trialing',
          'incomplete': 'canceled',
          'incomplete_expired': 'canceled',
          'unpaid': 'past_due',
        };

        const _status = statusMap[subscription.status] || 'canceled';
        
        // Update subscription in database
        const { data: customers } = await stripe.customers.list({
          email: subscription.customer as string,
          limit: 1,
        });

        if (customers && customers.length > 0) {
          const customer = customers[0];
          const userId = customer?.metadata?.userId;
          
          if (userId) {
            const profile = await secureDb.getUserByClerkId(userId);
            if (false && profile) { // Temporary disable for deployment
              // await secureDb.createOrUpdateSubscription(
              //   profile.id,
              //   subscription.id,
              //   subscription.customer as string,
              //   _status,
              //   new Date((subscription as any).current_period_end * 1000)
              // );
            }
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        // TODO: Implement subscription cancellation in secureDb
        console.log('Subscription cancelled:', subscription.id);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        // TODO: Update payment record
        console.log('Payment succeeded for invoice:', invoice.id);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        // TODO: Handle failed payment
        console.log('Payment failed for invoice:', invoice.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Log successful webhook processing
    await secureDb.logSecurityEvent(
      'STRIPE_WEBHOOK_PROCESSED',
      ip,
      userAgent,
      undefined,
      { 
        eventType: event.type,
        eventId: event.id,
        processingTime: Date.now() - startTime
      }
    );
    
    return NextResponse.json({ received: true });
    
  } catch (error) {
    // Log specific event processing errors
    await secureDb.logSecurityEvent(
      'STRIPE_EVENT_PROCESSING_ERROR',
      ip,
      userAgent,
      undefined,
      { 
        error: error instanceof Error ? error.message : 'Unknown error',
        eventType: event?.type || 'unknown',
        processingTime: Date.now() - startTime
      }
    );
    
    console.error('Stripe event processing error:', error);
    return NextResponse.json(
      { error: 'Event processing failed' },
      { status: 500 }
    );
  }
  
  } catch (error) {
    // Log webhook processing errors
    await secureDb.logSecurityEvent(
      'STRIPE_WEBHOOK_ERROR',
      ip,
      userAgent,
      undefined,
      { 
        error: error instanceof Error ? error.message : 'Unknown error',
        eventType: event?.type || 'unknown',
        processingTime: Date.now() - startTime
      }
    );
    
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Stripe webhooks require the raw body
export const runtime = 'nodejs';