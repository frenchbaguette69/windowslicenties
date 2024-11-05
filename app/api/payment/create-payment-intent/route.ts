import { PRODUCTS } from "@/data/products";
import { NextRequest, NextResponse } from "next/server";
import { TBillingInfo } from "@/types/Checkout";

import Stripe from "stripe";
import db from "@/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type CartItem = {
	id: string;
	quantity: string;
};

type IntentPayload = {
	orders: CartItem[];
	userData: TBillingInfo;
};

export async function POST(req: NextRequest) {
	const data = (await req.json()) as IntentPayload;

	const orders = data.orders
		.map((item) => {
			const product = PRODUCTS.find((product) => product.id === item.id);

			if (!product) return undefined;

			return {
				product: {
					id: product.id,
					discount_price: product.discount_price,
				},
				quantity: item.quantity,
			};
		})
		.filter((item): item is { product: any; quantity: string } => item !== undefined);

	if (orders.length === 0 || orders.length !== data.orders.length)
		return NextResponse.json({ error: "Invalid products" }, { status: 400 });

	const orderItems = orders.map((item) => ({
		productId: item.product.id,
		quantity: parseInt(item.quantity),
		price: parseFloat(item.product.discount_price),
		total: parseFloat(item.product.discount_price) * parseInt(item.quantity),
	}));

	// max 2 decimal points
	const amount = orderItems.reduce((acc, item) => Number((acc + item.total).toFixed(2)), 0);

	// check if the guest is a repeated buyer
	const guest = await db.guest.findFirst({
		where: {
			email: data.userData.email,
		},
	});

	let guestId = null;

	if (guest) {
		await db.guest.update({
			where: { id: guest.id },
			data: { ...data.userData },
		});
		guestId = guest.id;
	} else {
		const g = await db.guest.create({ data: { ...data.userData } });
		guestId = g.id;
	}

	// create an order in db
	const order = await db.order.create({
		data: {
			amount,
			guestId,
			items: {
				createMany: { data: orderItems },
			},
		},
	});

	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount * 100,
			currency: "eur",
			receipt_email: data.userData.email,
			metadata: {
				orderId: order.id,
			},
			automatic_payment_methods: {
				enabled: true,
			},
		});

		await db.order.update({
			where: {
				id: order.id,
			},
			data: {
				paymentIntentId: paymentIntent.id,
			},
		});

		return NextResponse.json({ success: true, clientSecret: paymentIntent.client_secret, order }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 });
	}
}
