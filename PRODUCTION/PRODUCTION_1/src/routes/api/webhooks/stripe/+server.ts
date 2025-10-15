import { error, json } from '@sveltejs/kit';
import { stripe } from '$lib/server/stripe';
import { db } from '$lib/server/db';
import { users, subscriptions } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import type { RequestHandler } from './$types';
import { generateId } from 'lucia';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.text();
	const signature = request.headers.get('stripe-signature');

	if (!signature) {
		throw error(400, 'Missing stripe-signature header');
	}

	let event;

	try {
		event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
	} catch (err) {
		console.error('Webhook signature verification failed:', err);
		throw error(400, 'Invalid signature');
	}

	// Handle the event
	try {
		switch (event.type) {
			case 'checkout.session.completed': {
				const session = event.data.object;
				const userId = session.metadata?.userId || session.client_reference_id;

				if (!userId) {
					console.error('No userId in checkout session');
					break;
				}

				// Get subscription details
				const subscriptionId = session.subscription as string;
				const subscription = await stripe.subscriptions.retrieve(subscriptionId);

				// Determine tier from price ID
				let tier: string = 'free';
				const priceId = subscription.items.data[0]?.price.id;

				if (priceId?.includes('starter')) tier = 'starter';
				else if (priceId?.includes('professional')) tier = 'professional';
				else if (priceId?.includes('enterprise')) tier = 'enterprise';

				// Update user
				await db
					.update(users)
					.set({
						subscriptionTier: tier,
						subscriptionStatus: 'active',
						stripeCustomerId: session.customer as string
					})
					.where(eq(users.id, userId));

				// Create subscription record
				await db.insert(subscriptions).values({
					id: generateId(15),
					userId,
					stripeSubscriptionId: subscriptionId,
					planId: tier,
					status: 'active',
					currentPeriodStart: new Date(subscription.current_period_start * 1000),
					currentPeriodEnd: new Date(subscription.current_period_end * 1000),
					cancelAtPeriodEnd: false
				});

				console.log(`Subscription created for user ${userId}: ${tier}`);
				break;
			}

			case 'customer.subscription.updated': {
				const subscription = event.data.object;
				const customerId = subscription.customer as string;

				// Find user by customer ID
				const user = await db.query.users.findFirst({
					where: eq(users.stripeCustomerId, customerId)
				});

				if (!user) {
					console.error('User not found for customer:', customerId);
					break;
				}

				// Update subscription status
				const status = subscription.status;
				const cancelAtPeriodEnd = subscription.cancel_at_period_end;

				await db
					.update(users)
					.set({
						subscriptionStatus: status
					})
					.where(eq(users.id, user.id));

				await db
					.update(subscriptions)
					.set({
						status,
						cancelAtPeriodEnd,
						currentPeriodStart: new Date(subscription.current_period_start * 1000),
						currentPeriodEnd: new Date(subscription.current_period_end * 1000)
					})
					.where(eq(subscriptions.stripeSubscriptionId, subscription.id));

				console.log(`Subscription updated for user ${user.id}: ${status}`);
				break;
			}

			case 'customer.subscription.deleted': {
				const subscription = event.data.object;
				const customerId = subscription.customer as string;

				// Find user by customer ID
				const user = await db.query.users.findFirst({
					where: eq(users.stripeCustomerId, customerId)
				});

				if (!user) {
					console.error('User not found for customer:', customerId);
					break;
				}

				// Downgrade to free
				await db
					.update(users)
					.set({
						subscriptionTier: 'free',
						subscriptionStatus: 'canceled'
					})
					.where(eq(users.id, user.id));

				await db
					.update(subscriptions)
					.set({
						status: 'canceled'
					})
					.where(eq(subscriptions.stripeSubscriptionId, subscription.id));

				console.log(`Subscription canceled for user ${user.id}`);
				break;
			}

			case 'invoice.payment_failed': {
				const invoice = event.data.object;
				const customerId = invoice.customer as string;

				// Find user by customer ID
				const user = await db.query.users.findFirst({
					where: eq(users.stripeCustomerId, customerId)
				});

				if (!user) {
					console.error('User not found for customer:', customerId);
					break;
				}

				// Update subscription status
				await db
					.update(users)
					.set({
						subscriptionStatus: 'past_due'
					})
					.where(eq(users.id, user.id));

				console.log(`Payment failed for user ${user.id}`);
				// TODO: Send email notification
				break;
			}

			default:
				console.log(`Unhandled event type: ${event.type}`);
		}
	} catch (err) {
		console.error('Error processing webhook:', err);
		throw error(500, 'Webhook processing failed');
	}

	return json({ received: true });
};

