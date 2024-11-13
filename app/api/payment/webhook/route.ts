import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Guest, License, Order } from "@prisma/client";

import db from "@/db";
import Stripe from "stripe";

const resend = new Resend(process.env.RESEND_API_KEY!);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
	const sig = request.headers.get("stripe-signature")!;
	const body = await request.text();

	let event;

	try {
		event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
	} catch (err: any) {
		return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
	}

	// Handle the event
	switch (event.type) {
		case "payment_intent.succeeded":
			const paymentIntent = event.data.object;

			// Fulfill the purchase...
			const order = await db.order.findUnique({
				where: {
					paymentIntentId: paymentIntent.id,
				},
				include: {
					guest: true,
				},
			});

			if (!order) {
				console.error(`Order not found for payment intent ${paymentIntent.id}`);
				return NextResponse.json({ received: true, error: "Order not found" }, { status: 400 });
			}

			await db.order.update({
				where: {
					id: order.id,
				},
				data: {
					paid: true,
				},
			});

			return deliverOrder(order);
		// ... handle other event types
		default:
			console.log(`Unhandled event type ${event.type}`);

			return NextResponse.json({ received: true, error: "Unhandled event type" }, { status: 200 });
	}
}

interface deliverOrderProps extends Order {
	guest: Guest;
}

const deliverOrder = async (order: deliverOrderProps) => {
	const items = await db.orderItem.findMany({
		where: {
			orderId: order.id,
		},
	});

	const products = [] as License[];

	for await (let item of items) {
		const licenses = await db.license.findMany({
			where: {
				type: item.productId,
				sold: false,
			},
			take: item.quantity,
		});
		products.push(...licenses);
	}

	if (products.length < items.reduce((a, b) => a + b.quantity, 0)) {
		console.error("Not enough licenses available");
		return NextResponse.json({ received: true, error: "Not enough licenses available" }, { status: 400 });
	}

	await db.license.updateMany({
		where: {
			id: {
				in: products.map((product) => product.id),
			},
		},
		data: {
			sold: true,
			orderId: order.id,
		},
	});

	const res = await sendEmail({ user: order.guest, products });

	if (res.error) {
		console.error("Error sending email", res.error);
		return NextResponse.json({ received: true, error: "Error sending email", data: res.error }, { status: 200 });
	}

	await db.order.update({
		where: {
			id: order.id,
		},
		data: {
			delivered: true,
		},
	});

	return NextResponse.json({ received: true, success: true });
};

type sendMailProps = {
	products: License[];
	user: Guest;
};

const sendEmail = async ({ user, products }: sendMailProps) => {
	const HTML = getHTML({ user, products });

	return await resend.emails.send({
		from: process.env.FROM_ADDRESS || "onboarding@resend.dev",
		to: user.email,
		subject: "Your purchase is complete!",
		html: HTML,
	});
};

export const config = {
	api: {
		bodyParser: false,
	},
};

export const getHTML = ({ user, products }: sendMailProps) => `
<div style="font-family: Arial, sans-serif; color: #333">
	<div style="max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden">
		<!-- Header -->
		<div style="background-color: #009ddc; padding: 20px; text-align: center">
			<img src="${
				process.env.NEXTAUTH_URL
			}/WINDOWSlicenties.png" alt="windowslicenties logo" style="max-width: 150px; margin-bottom: 10px" />
			<h1 style="color: #fff; margin: 0; font-size: 24px">Thank You for Your Purchase!</h1>
		</div>

		<!-- Body -->
		<div style="padding: 20px">
			<p>Hi ${user.firstName},</p>
			<p>Thank you for your purchase! Here are your licenses:</p>
			<ul style="padding: 0 20px">
				${products
					.map(
						(product) => `
				<li>${product.type}: <strong>${product.key}</strong></li>
				`
					)
					.join("")}
			</ul>
			<p style="margin-top: 20px">
				If you have any questions, feel free to reach out to us at
				<a href="mailto:support@yourcompany.com" style="color: #009ddc">support@yourcompany.com</a>.
			</p>
		</div>

		<!-- Footer -->
		<div style="background-color: #f8f8f8; padding: 15px; text-align: center; font-size: 12px; color: #777">
			<p style="margin: 0">&copy; ${new Date().getFullYear()} Windowslicenties. All rights reserved.</p>
		</div>
	</div>
</div>
`;
