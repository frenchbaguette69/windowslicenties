// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

async function adminMiddleware(request: NextRequest) {
	const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
	//@ts-ignore
	if (!token || token.user?.role !== "ADMIN") {
		return NextResponse.redirect(process.env.NEXTAUTH_URL + "/api/auth/signin");
	}

	return NextResponse.next();
}

async function adminAPIMiddleware(request: NextRequest) {
	const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
	//@ts-ignore
	if (!token || token.user?.role !== "ADMIN") {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	return NextResponse.next();
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (pathname.startsWith("/admin")) return adminMiddleware(request);

	if (pathname.startsWith("/api/admin")) return adminAPIMiddleware(request);

	return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
	matcher: ["/admin/:path*", "/api/admin/:path*"],
};
