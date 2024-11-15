import React, { Suspense } from "react";
import AuthForm from "@/components/AuthForm";

const SigninPage = () => {
	return (
		<div className='w-full mx-auto flex items-center justify-center py-6 lg:py-24'>
			<Suspense fallback={<div>Loading...</div>}>
				<AuthForm />
			</Suspense>
		</div>
	);
};

export default SigninPage;
