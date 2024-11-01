import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const data = await req.json();
	console.log({ data });

	//validate data
	// const validated = data.filter((item) => item.type && item.license);

	//save to database

	return NextResponse.json(data);
}
