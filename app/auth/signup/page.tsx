import AuthForm from "@/components/AuthForm";
import React from "react";

const SignupPage = () => {
	return (
		<div className='w-full mx-auto flex items-center justify-center py-6 lg:py-24'>
			<AuthForm isRegister={true} />
		</div>
	);
};

export default SignupPage;
