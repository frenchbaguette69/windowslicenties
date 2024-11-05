import { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAtomValue } from "jotai";
import { billingInfoAtom, cartAtom } from "@/context/atoms";
import { Button } from "./ui/button";

import axios from "axios";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export default function Payment({ amount = 1000 }) {
	const [clientSecret, setClientSecret] = useState(null);

	const userData = useAtomValue(billingInfoAtom);
	const cartItems = useAtomValue(cartAtom);

	useEffect(() => {
		const createIntent = async () => {
			const orders = cartItems.map((item) => ({
				id: item.product.id,
				quantity: item.quantity,
			}));

			// Fetch PaymentIntent client secret from backend
			const res = await axios.post("/api/payment/create-payment-intent", { orders, userData });
			const { clientSecret } = await res.data;

			clientSecret && setClientSecret(clientSecret);
		};
		createIntent();
	}, []);

	return (
		<div>
			{clientSecret && (
				<Elements stripe={stripePromise} options={{ clientSecret }}>
					<CheckoutForm />
				</Elements>
			)}
		</div>
	);
}

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setLoading(true);
		setError(null);

		if (!stripe || !elements) return;

		//confirm payment with the payment element
		const result = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: process.env.NEXT_PUBLIC_PAYMENT_SUCCESS_URL!,
			},
		});

		if (result.error) {
			// Show error to your customer (for example, payment details incomplete)
			console.log(result.error.message);
			setError(result.error?.message || "An error occurred");
		} else {
			setSuccess(true);
		}

		setLoading(false);
	};

	return (
		<form className='mt-4' onSubmit={handleSubmit}>
			<PaymentElement />
			<Button
				disabled={!stripe || !elements || loading || success}
				className='bg-primary hover:bg-primary/90 uppercase w-full my-4'
				type='submit'
			>
				Bestelling plaatsen en betalen
			</Button>
		</form>
	);
};
