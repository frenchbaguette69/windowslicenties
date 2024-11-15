import React, { Suspense } from "react";
import AuthForm from "@/components/AuthForm";

const SignupPage = () => {
	return (
		<div className='w-full mx-auto flex items-center justify-center py-6 lg:py-24'>
			<Suspense fallback={<div>Loading...</div>}>
				<AuthForm isRegister={true} />
			</Suspense>
		</div>
	);
};

export default SignupPage;
