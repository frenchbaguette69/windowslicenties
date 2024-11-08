import { PRODUCTS } from "@/data/products";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Check, ShoppingCart } from "lucide-react";
import { Separator } from "./ui/separator";
import AddToCart from "./AddToCart";

const Products = () => {
	return (
		<div>
			{PRODUCTS.map((product, index) => (
				<div key={index}>
					<div className={`flex flex-col lg:flex-row ${index % 2 !== 0 && "lg:flex-row-reverse"}`}>
						<div className='lg:w-1/2 bg-primary flex flex-col justify-center items-center gap-8 text-white py-12 lg:py-24'>
							<h2 className='font-semibold text-2xl mb-6'>{product.name}</h2>
							<Image src={product.imgsrc} alt={product.name} width={400} height={300} />
							<div className='flex gap-2 text-2xl font-semibold'>
								<span className='text-gray-600 line-through'>&#8364;{product.price.split(".").join(",")}</span>
								<p className='text-white'>
									<span className='text-black'>&#8364;{product.discount_price.split(".").join(",")} </span>
									<span className='text-xs font-light'>incl. BTW</span>
								</p>
							</div>
							<AddToCart product={product} showQuantity={false} />
						</div>
						<div
							className={`lg:w-1/2 bg-[#fcfcfc] flex flex-col py-12 px-6 lg:px-12 lg:py-24 ${
								index % 2 !== 0 && "lg:pl-32"
							}`}
						>
							<h1 className='text-3xl font-bold'>{product.title}</h1>
							<div className='flex gap-2 text-2xl font-bold mt-2 mb-8'>
								<span className='text-gray-400 line-through self-end'>&#8364;{product.price.split(".").join(",")}</span>
								<span className='text-primary text-3xl'>&#8364;{product.discount_price.split(".").join(",")} </span>
							</div>
							<div>
								<div className='text-sm font-bold mb-4'>Beschrijving</div>
								<div dangerouslySetInnerHTML={{ __html: product.summary }} />
							</div>
							<Link href={`/product/${product.id}`}>
								<Button size='lg' className='flex gap-2 bg-primary hover:bg-primary/90 mt-8 mb-4 text-left'>
									<ShoppingCart /> NU KOPEN
								</Button>
							</Link>
							<Image src='/payment-methods.webp' alt='payment methods' width={280} height={120} />
							<ul className='my-8 flex flex-col gap-4'>
								{FEATURES.map((feature, index) => (
									<li key={index} className='flex gap-2 items-center font-light'>
										<Check size={14} color='green' /> {feature}
									</li>
								))}
							</ul>
						</div>
					</div>
					{index !== PRODUCTS.length - 1 && <Separator />}
				</div>
			))}
		</div>
	);
};

export default Products;

const FEATURES = ["Software direct per mail", "100% officiëel en legitiem", "Veilig & Snel, incl. Activatie Garantie"];
