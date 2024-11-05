import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import db from "@/db";

export const GET = async (req: NextRequest) => {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

	if (!token || !token.email) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const email = token.email;

	const user = await db.guest.findUnique({
		where: {
			email,
		},
	});

	if (!user) {
		return NextResponse.json({ error: "User information not found" }, { status: 404 });
	}

	return NextResponse.json({ success: true, user });
};
