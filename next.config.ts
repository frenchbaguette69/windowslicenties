import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	env: {
		NEXT_PUBLIC_STRIPE_KEY: process.env.STRIPE_PUBLIC_KEY,
		NEXT_PUBLIC_PAYMENT_SUCCESS_URL: process.env.NEXT_PUBLIC_PAYMENT_SUCCESS_URL,
	},
};

export default nextConfig;
