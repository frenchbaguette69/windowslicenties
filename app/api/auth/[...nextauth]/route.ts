import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import db from "@/db";

const authOptions = {
	adapter: PrismaAdapter(db),
	theme: {
		colorScheme: "light", // "auto" | "dark" | "light"
		brandColor: "#009cde", // Hex color code
		logo: `${process.env.NEXTAUTH_URL}/WINDOWSlicenties.png`, // Absolute URL to image
	},
	session: {
		strategy: "jwt",
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const user = await db.user.findUnique({
					where: { email: credentials?.email },
				});

				if (user && user.hashedPassword) {
					const isPasswordValid = await bcrypt.compare(credentials!.password, user.hashedPassword);
					if (isPasswordValid) {
						// console.log("returning user");
						// console.log({ user });
						return user;
					}
				}
				return null;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }: { token: any; user: any }) {
			user && (token.user = user);

			return token;
		},
		async session({ session, token }: { session: any; token: any }) {
			// console.log({ token });
			const user = token?.user;
			if (session?.user) {
				session.user.id = user.id;
				session.user.role = user.role; // Include role in session
			}
			return session;
		},
	},
};

// @ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
