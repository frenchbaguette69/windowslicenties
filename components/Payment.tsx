import { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAtomValue } from "jotai";
import { billingInfoAtom, cartAtom } from "@/context/atoms";
import { Button } from "./ui/button";

import axios from "axios";
import { Separator } from "./ui/separator";
import { Spinner } from "./ui/spinner";

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
		<div className='flex flex-col-reverse lg:flex-row gap-5'>
			{clientSecret ? (
				<Elements stripe={stripePromise} options={{ clientSecret }}>
					<CheckoutForm />
				</Elements>
			) : (
				<div className='flex lg:w-2/3 items-center justify-center'>
					<Spinner />
				</div>
			)}
			<Cart />
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
		<form className='mt-4 lg:w-2/3' onSubmit={handleSubmit}>
			<PaymentElement />
			<Button
				disabled={!stripe || !elements || loading || success}
				className='bg-primary hover:bg-primary/90 uppercase w-full mt-6'
				type='submit'
			>
				Bestelling plaatsen en betalen
			</Button>
		</form>
	);
};

const Cart = () => {
	const cartItems = useAtomValue(cartAtom);

	return (
		<div className='lg:w-1/3 px-8 py-6 bg-gray-50 mt-2 mb-6'>
			<div className='flex flex-col gap-4 text-sm'>
				<div>
					<div className='flex justify-between'>
						<h3 className='font-semibold uppercase'>Product</h3>
						<h3 className='font-semibold uppercase'>Subtotaal</h3>
					</div>
					<Separator className='mt-4' />
				</div>
				{cartItems.map((item) => (
					<div key={item.product.id} className=''>
						<div className='flex items-center justify-between'>
							<p className=''>
								{item.product.name} x {item.quantity}
							</p>
							<p>&#8364;{(parseFloat(item.product.discount_price) * item.quantity).toFixed(2)}</p>
						</div>
						<Separator className='mt-2' />
					</div>
				))}
			</div>
			<div>
				<div className='bg-gray-50 pt-10 pb-5 font-semibold'>
					<div>
						<p className='flex justify-between'>
							<span>Subtotaal</span>
							<span>
								&#8364;
								{cartItems
									.reduce((acc, item) => acc + parseFloat(item.product.discount_price) * item.quantity, 0)
									.toFixed(2)}
							</span>
						</p>
					</div>
					<Separator className='my-4' />
					<div>
						<p className='flex justify-between items-center'>
							<span>Totaal</span>
							<span className='text-2xl'>
								&#8364;
								{cartItems
									.reduce((acc, item) => acc + parseFloat(item.product.discount_price) * item.quantity, 0)
									.toFixed(2)}
							</span>
						</p>
						<p className='flex justify-between items-center mt-2'>
							<span></span>
							<span className='text-xs text-gray-400'>
								(inclusief &#8364;
								{(
									cartItems.reduce((acc, item) => acc + parseFloat(item.product.discount_price) * item.quantity, 0) *
									0.21
								).toFixed(2)}{" "}
								BTW)
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
