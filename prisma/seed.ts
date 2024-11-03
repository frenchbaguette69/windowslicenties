// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	const email = process.env.ADMIN_EMAIL;
	const password = process.env.ADMIN_PASSWORD;

	if (!email || !password) {
		throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required");
	}

	// Check if an admin user already exists
	const existingAdmin = await prisma.user.findUnique({
		where: { email },
	});

	if (!existingAdmin) {
		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the admin user
		await prisma.user.create({
			data: {
				email,
				name: "Admin",
				hashedPassword,
				role: "ADMIN", // If you have a 'role' field in your user model
			},
		});

		console.log("Admin user created successfully");
	} else {
		console.log("Admin user already exists");
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (error) => {
		console.error(error);
		await prisma.$disconnect();
		process.exit(1);
	});
