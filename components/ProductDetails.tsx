import React from "react";
import { Product } from "@/types/Product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const TABS = {
	DESCRIPTION: "description",
	INFORMATION: "information",
	REVIEWS: "reviews",
};

const ProductDetails = ({ product }: { product: Product }) => {
	return (
		<div className='flex justify-center w-full mt-16 lg:mt-32'>
			<Tabs defaultValue={TABS.DESCRIPTION} className='flex flex-col items-center lg:w-2/3 px-6 lg:px-24'>
				<TabsList className='mb-12'>
					<TabsTrigger value={TABS.DESCRIPTION}>Beschrijving</TabsTrigger>
					<TabsTrigger value={TABS.INFORMATION}>Extra informatie</TabsTrigger>
					<TabsTrigger value={TABS.REVIEWS}>Beoordelingen</TabsTrigger>
				</TabsList>
				<TabsContent value={TABS.DESCRIPTION}>
					<div className='rich-text' dangerouslySetInnerHTML={{ __html: product.description }} />
				</TabsContent>
				<TabsContent value={TABS.INFORMATION}>
					<div className='flex flex-col gap-6 w-full'>
						{Object.entries(product.extra).map(([key, value]) => (
							<div key={key} className='flex justify-between w-full gap-32'>
								<span className='font-semibold'>{key}</span>
								<span className='text-gray-500'>{value}</span>
							</div>
						))}
					</div>
				</TabsContent>
				<TabsContent value={TABS.REVIEWS}>{/* <Payment /> */}Beoordelingen</TabsContent>
			</Tabs>
		</div>
	);
};

export default ProductDetails;
