import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/db";

export async function POST(request: Request) {
	const { email, password } = await request.json();

	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await db.user.create({
		data: {
			email,
			hashedPassword,
		},
	});

	return NextResponse.json(user);
}
