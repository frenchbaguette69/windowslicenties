"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await signIn("credentials", {
			email,
			password,
			redirect: false,
		});
	};

	return (
		<div className='flex items-center justify-center mt-24'>
			<div className='w-80 lg:w-50'>
				<h2 className='text-4xl font-medium text-center'>Admin Login</h2>
				<form className='mt-12 space-y-6' onSubmit={handleLogin}>
					<div className='flex flex-col gap-2'>
						<label>Email</label>
						<Input name='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div className='flex flex-col gap-2'>
						<label>Password</label>
						<Input name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
					</div>
					<Button type='submit' className='w-full bg-primary hover:bg-primary/90'>
						Login
					</Button>
				</form>
			</div>
		</div>
	);
};

export default Login;
