import React from "react";
import Image from "next/image";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import AddToCart from "@/components/AddToCart";

import { PRODUCTS } from "@/data/products";
import { Separator } from "@/components/ui/separator";
import { Lock, Mail, Slash, ThumbsUp } from "lucide-react";

const Product = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	const product = PRODUCTS.find((item) => item.id === id);

	if (!product) {
		return <div>Product not found</div>;
	}

	return (
		<div className='my-20'>
			<div className='flex flex-col lg:flex-row gap-20 w-full justify-between px-20 lg:px-64'>
				<div className='flex-1 flex justify-center items-start'>
					<Image className='object-contain' src={product.imgsrc} alt={product.name} width={500} height={500} />
				</div>
				<div className='flex-1 flex flex-col gap-5'>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href='/'>Home</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator>
								<Slash />
							</BreadcrumbSeparator>
							<BreadcrumbItem>
								<BreadcrumbLink href={`/product/${product.id}`}>{product.name}</BreadcrumbLink>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
					<h1 className='text-3xl font-bold'>{product.title}</h1>
					<div className='flex gap-2 text-2xl font-semibold'>
						<span className='text-gray-400 line-through'>&#8364;{product.price.split(".").join(",")}</span>
						<span className='text-primary'>&#8364;{product.discount_price.split(".").join(",")} incl. BTW</span>
					</div>
					<div className='font-extralight' dangerouslySetInnerHTML={{ __html: product.summary }}></div>
					<div className='text-[#b3af54]'>Op voorraad</div>
					<AddToCart product={product} />
					<Separator className='mt-4' />
					<ul className='ml-6 flex flex-col gap-2'>
						{FEATURES.map((feature, index) => (
							<li key={index} className='flex gap-12 font-extralight'>
								<span className='text-white'>{feature.icon}</span>
								<span>{feature.text}</span>
							</li>
						))}
					</ul>
					<Separator />
					<div className='text-gray-400 text-xs font-semibold uppercase leading-6'>TAGS: {product.tags.join(", ")}</div>
				</div>
			</div>
		</div>
	);
};

export default Product;

const FEATURES = [
	{ icon: <Mail fill='#009cde' />, text: "DIRECT per mail geleverd" },
	{ icon: <Lock fill='#009cde' />, text: "Veilig & Snel betalen" },
	{ icon: <ThumbsUp fill='#009cde' />, text: "100% Activatie Garantie" },
];

export const generateStaticParams = async () =>
	PRODUCTS.map((item) => ({
		id: item.id,
	}));

export const dynamicParams = false;
