"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { signIn } from "next-auth/react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

type AuthFormProps = {
	isRegister?: boolean;
};

const AuthForm = ({ isRegister = false }: AuthFormProps) => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isRegister) {
			try {
				const res = await axios.post("/api/auth/signup", { email, password });

				if (!res.data.success) {
					toast({
						variant: "destructive",
						title: res.data.message ? res.data.message : "Something went wrong",
						description: "Controleer uw gegevens en probeer het opnieuw.",
					});
				} else {
					toast({
						title: "Account created",
						description: "You can now sign in with your credentials.",
					});
					router.push("/auth/signin");
				}
			} catch (error) {
				toast({
					variant: "destructive",
					title: "An error occurred",
					description: "Please try again later.",
				});
			}
		} else {
			// Sign in user
			const result = await signIn("credentials", {
				email,
				password,
				redirect: true,
				callbackUrl: callbackUrl || "/",
			});

			if (result?.error) {
				toast({
					variant: "destructive",
					title: "Invalid credentials",
					description: "Controleer uw gegevens en probeer het opnieuw.",
				});
			}
		}
	};

	return (
		<Card className='lg:w-1/4 max-w-80'>
			<CardHeader>
				<Button
					variant='outline'
					className='text-primary-500'
					onClick={() => signIn("google", { redirect: true, callbackUrl: callbackUrl || "/" })}
				>
					<Image src='https://authjs.dev/img/providers/google.svg' alt='google' width={20} height={20} />
					Sign in with Google
				</Button>
				<div className='flex gap-2 items-center text-gray-400 font-extralight'>
					<Separator className='flex-1' />
					or
					<Separator className='flex-1' />
				</div>
			</CardHeader>
			<CardContent>
				<form className='flex flex-col gap-2' onSubmit={handleSubmit}>
					<Label>Email</Label>
					<Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
					<Label>Password</Label>
					<Input
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button type='submit' className='mt-4 bg-primary hover:bg-primary/90'>
						{isRegister ? "Create my account" : "Sign in with credentials"}
					</Button>
				</form>
			</CardContent>
			<CardFooter className='flex justify-center'>
				<Link href={isRegister ? "/auth/signin" : "/auth/signup"}>
					<p className='font-light text-sm hover:underline cursor-pointer text-center'>
						{isRegister ? "Heb je al een account? Meld je aan" : "Nog geen account? Maak dan een account aan"}
					</p>
				</Link>
			</CardFooter>
		</Card>
	);
};

export default AuthForm;
