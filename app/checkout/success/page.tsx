// @ts-nocheck
"use client";

import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { Spinner } from "@/components/ui/spinner";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Success = () => {
	const searchParams = useSearchParams();
	const [loading, setLoading] = useState(true);
	const [loadingMessage, setLoadingMessage] = useState("Collecting payment...");

	const [products, setProducts] = useState([]);

	const paymentIntent = searchParams.get("payment_intent");
	const redirectStatus = searchParams.get("redirect_status");

	//request every 5 seconds to check if payment is succeeded
	useEffect(() => {
		if (!paymentIntent || redirectStatus !== "succeeded") return;

		const interval = setInterval(async () => {
			try {
				const res = await axios.get(`/api/order/get-by-intent/${paymentIntent}`);

				const data = await res.data;

				if (data.status === "success") {
					setLoading(false);
					clearInterval(interval);
					setProducts(data.order.license);
					console.log(data);
				} else if (data.status === "pending") {
					setLoadingMessage(data.message);
					console.log(data);
				}
			} catch (error) {
				console.error(error);
				toast({ variant: "destructive", description: "An error occurred. Please contact support." });
				setLoadingMessage("Something went wrong. Please contact support.");
				clearInterval(interval);
			}
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	if (loading)
		return (
			<div className='flex flex-col gap-6 w-full items-center justify-center min-h-screen'>
				<Spinner size='large' />
				<p className='ml-4'>{loadingMessage}</p>
			</div>
		);

	return (
		<div className='px-12 lg:px-24 py-6 lg:py-12'>
			<Table>
				<TableCaption>We have sent you the license keys via email as well. Please check your inbox</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Product</TableHead>
						<TableHead>License Key</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map((product, index) => (
						<TableRow key={index}>
							<TableCell>{product.name}</TableCell>
							<TableCell>{product.key}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

const Page = () => (
	<Suspense fallback=''>
		<Success />
	</Suspense>
);

export default Page;
