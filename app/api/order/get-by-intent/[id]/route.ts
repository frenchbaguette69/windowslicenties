import { NextRequest, NextResponse } from "next/server";
import db from "@/db";

export const GET = async (request: NextRequest, { params }: any) => {
	const { id } = await params;

	if (!id || typeof id !== "string") return NextResponse.json({ error: "Invalid payment intent" }, { status: 400 });

	const order = await db.order.findUnique({
		where: {
			paymentIntentId: id,
		},
		include: {
			license: true,
		},
	});

	if (!order) {
		return NextResponse.json({ error: "Order not found" }, { status: 404 });
	}

	if (!order.paid) return NextResponse.json({ status: "pending", message: "Collecting payment..." });

	if (!order.license || order.license.length === 0)
		return NextResponse.json({ status: "pending", message: "Generating license..." });

	return NextResponse.json({ status: "success", order });
};
