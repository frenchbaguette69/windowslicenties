"use client";

import COUNTRIES from "@/data/countries";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { billingInfoAtom } from "@/context/atoms";
import { TBillingInfo } from "@/types/Checkout";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TABS } from "@/types/Checkout";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const formSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	company: z.string().optional(),
	country: z.string().min(1),
	street: z.string().min(1),
	apt: z.string().optional(),
	postcode: z.string().min(1),
	place: z.string().min(1),
	phone: z.string().optional(),
	email: z.string().email(),
	notes: z.string().optional(),
});

type InvoiceFormProps = {
	setActiveTab: (tab: string) => void;
	setIsBillingSubmitted: (submitted: boolean) => void;
};

const InvoiceForm = ({ setActiveTab, setIsBillingSubmitted }: InvoiceFormProps) => {
	const router = useRouter();
	const session = useSession();
	const [billingInfo, setBillingInfo] = useAtom(billingInfoAtom);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: billingInfo,
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		setBillingInfo(values as TBillingInfo);
		setIsBillingSubmitted(true);
		setActiveTab(TABS.PAYMENT);
	}

	const handleFormChange = () => {
		setIsBillingSubmitted(false);
	};

	const fetchBillingInfo = async () => {
		const res = await axios.get("/api/user/get-billing-info");

		if (res.data.success) {
			setBillingInfo(res.data.user);
			form.reset(res.data.user);
		}
	};

	useEffect(() => {
		if (session.data) fetchBillingInfo();
	}, [session]);

	return (
		<>
			<h3 className='text-2xl font-semibold mt-8 mb-4'>Factuurgegevens</h3>
			<Form {...form}>
				<form onChange={handleFormChange} onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<div className='flex justify-between gap-12'>
						<FormField
							control={form.control}
							name='firstName'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel>Voornaam</FormLabel>
									<FormControl>
										<Input placeholder='John' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='lastName'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel>Achternaam</FormLabel>
									<FormControl>
										<Input placeholder='Doe' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name='company'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bedrijfsnaam (optioneel)</FormLabel>
								<FormControl>
									<Input placeholder='Company' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='country'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Land/regio</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Country' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{COUNTRIES.map((country) => (
											<SelectItem key={country} value={country}>
												{country}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='street'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Straat en huisnummer</FormLabel>
								<FormControl>
									<Input placeholder='Straatnaam en huisnummer' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='apt'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder='Appartement, suite, unit enz. (optioneel)' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='postcode'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Postcode</FormLabel>
								<FormControl>
									<Input placeholder='1234 AB' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='place'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Plaats</FormLabel>
								<FormControl>
									<Input placeholder='City' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='phone'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Telefoon (optioneel)</FormLabel>
								<FormControl>
									<Input placeholder='06-12345678 (Optional)' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>E-mailadres</FormLabel>
								<FormControl>
									<Input type='email' placeholder='email@example.com' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<h3 className='text-2xl font-semibold mt-8 mb-2'>Extra informatie</h3>
					<FormField
						control={form.control}
						name='notes'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bestelnotities (optioneel)</FormLabel>
								<FormControl>
									<Input
										type='textarea'
										placeholder='Notities over je bestelling, bijvoorbeeld speciale notities voor aflevering.'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex justify-between gap-4'>
						<Button
							onClick={() => {
								router.push("/cart");
							}}
							className='bg-primary hover:bg-primary/90 uppercase'
						>
							Terug naar winkelwagen
						</Button>
						<Button type='submit' className='bg-primary hover:bg-primary/90 uppercase'>
							Volgende
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};

export default InvoiceForm;
