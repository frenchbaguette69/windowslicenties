"use client";

import React from "react";
import Image from "next/image";

import { X } from "lucide-react";
import { useAtom } from "jotai";
import { cartAtom } from "@/context/atoms";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Cart = () => {
	const router = useRouter();
	const [cartItems, setCartItems] = useAtom(cartAtom);

	const handleChangeQuantity = (id: string, quantity: number) => {
		const items = cartItems.map((item) => {
			if (item.product.id === id) {
				return { product: item.product, quantity };
			}
			return item;
		});
		setCartItems(items);
		localStorage.setItem("cart", JSON.stringify(items));
	};

	const removeFromCart = (id: string) => {
		const items = cartItems.filter((item) => item.product.id !== id);
		setCartItems(items);
		localStorage.setItem("cart", JSON.stringify(items));
	};

	return (
		<div className='my-20 px-32'>
			<h2 className='text-6xl font-bold text-center'>Winkelwagen</h2>
			<div className='flex w-full mt-12 gap-12'>
				<div className='w-2/3 flex flex-col gap-2'>
					{cartItems.map((item) => (
						<div key={item.product.id} className='my-5'>
							<div className='flex items-center justify-between mb-6 px-4'>
								<X className='cursor-pointer' size={16} onClick={() => removeFromCart(item.product.id)} />
								<Image src={item.product.imgsrc} alt={item.product.name} width={120} height={120} />
								<h4 className='font-bold text-lg w-28'>{item.product.name}</h4>
								<p className='text-gray-400 font-semibold text-lg'>
									&#8364;{item.product.discount_price.split(".").join(",")}
								</p>
								<Input
									value={item.quantity}
									className='w-16'
									type='number'
									min={1}
									onChange={(e) => handleChangeQuantity(item.product.id, parseInt(e.target.value))}
								/>
								<p className='text-lg'>&#8364;{(parseFloat(item.product.discount_price) * item.quantity).toFixed(2)}</p>
							</div>
							<Separator />
						</div>
					))}
				</div>
				<div className='w-1/3'>
					<div className='bg-gray-50 px-6 py-10 font-semibold'>
						<h4>Totalen winkelwagen</h4>
						<Separator className='my-4' />
						<div>
							<p className='flex justify-between w-3/4'>
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
							<p className='flex justify-between w-3/4 items-center'>
								<span>Totaal</span>
								<span className='text-2xl'>
									&#8364;
									{cartItems
										.reduce((acc, item) => acc + parseFloat(item.product.discount_price) * item.quantity, 0)
										.toFixed(2)}
								</span>
							</p>
							<p className='flex justify-between w-3/4 items-center mt-2'>
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
							<Button onClick={() => router.push("/checkout")} className='mt-8 bg-primary hover:bg-primary/90 w-full'>
								Doorgaan naar afrekenen
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
