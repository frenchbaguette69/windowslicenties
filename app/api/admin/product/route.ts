import db from "@/db";
import { PRODUCTS } from "@/data/products";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

type ProductPayload = {
	ID: string;
	Key: string;
};

export async function POST(req: NextRequest) {
	const data = (await req.json()) as ProductPayload[];

	//validate data
	const validated = data
		.map((item) => {
			if (!item.ID || !item.Key) return false;

			const product = PRODUCTS.find((p) => p.id === item.ID);

			if (product) return { name: product.name, type: item.ID, key: item.Key };
		})
		.filter((item): item is { name: string; type: string; key: string } => item !== false && item !== undefined);

	//save to database
	if (validated.length) {
		try {
			await db.license.createMany({
				data: validated,
			});
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
				return NextResponse.json({ error: "One or more license key already exists" }, { status: 409 });
			} else return NextResponse.error();
		}
	} else return NextResponse.json({ error: "No valid products found" }, { status: 400 });

	return NextResponse.json({ success: true, data: data }, { status: 200 });
}
