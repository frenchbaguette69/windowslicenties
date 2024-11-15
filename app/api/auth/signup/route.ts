import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/db";

export async function POST(request: Request) {
	const { email, password } = await request.json();

	if (!email || !password) {
		return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 });
	}

	if (!email.includes("@")) {
		return NextResponse.json({ success: false, message: "Invalid email" }, { status: 400 });
	}

	const user = await db.user.findUnique({
		where: {
			email,
		},
	});

	if (user) {
		return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	await db.user.create({
		data: {
			email,
			hashedPassword,
		},
	});

	return NextResponse.json({ success: true, message: "Successfully registered" });
}
