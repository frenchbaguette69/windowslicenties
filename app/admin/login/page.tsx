import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const Login = () => {
	return (
		<div className='flex items-center justify-center mt-24'>
			<div className='w-80 lg:w-50'>
				<h2 className='text-4xl font-medium text-center'>Admin Login</h2>
				<form className='mt-12 space-y-6'>
					<div className='flex flex-col gap-2'>
						<label>Email</label>
						<Input type='email' />
					</div>
					<div className='flex flex-col gap-2'>
						<label>Password</label>
						<Input type='password' />
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
