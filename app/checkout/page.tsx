"use client";

import React, { useState } from "react";

import Payment from "@/components/Payment";
import InvoiceForm from "@/components/InvoiceForm";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TABS } from "@/types/Checkout";

const Checkout = () => {
	const [activeTab, setActiveTab] = useState(TABS.BILLING);
	const [isBillingSubmitted, setIsBillingSubmitted] = useState(false);

	return (
		<div className='my-20 px-32'>
			<h2 className='text-6xl font-bold text-center'>Afrekenen</h2>
			<Tabs
				defaultValue='billing'
				className='flex flex-col w-full mt-5'
				value={activeTab}
				onValueChange={(v) => setActiveTab(v)}
			>
				<TabsList>
					<TabsTrigger className='w-full' value={TABS.BILLING}>
						Facturering & Verzending
					</TabsTrigger>
					<TabsTrigger disabled={!isBillingSubmitted} className='w-full' value={TABS.PAYMENT}>
						Bestelling & Betaling
					</TabsTrigger>
				</TabsList>
				<TabsContent value={TABS.BILLING}>
					<InvoiceForm setActiveTab={setActiveTab} setIsBillingSubmitted={setIsBillingSubmitted} />
				</TabsContent>
				<TabsContent value={TABS.PAYMENT}>
					<Payment />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Checkout;
