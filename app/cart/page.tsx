"use client";

import React, { useEffect } from "react";
import Image from "next/image";

import { X } from "lucide-react";
import { useAtom } from "jotai";
import { cartAtom } from "@/context/atoms";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
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

	useEffect(() => {
		const cart = localStorage.getItem("cart");
		if (cart) {
			setCartItems(JSON.parse(cart));
		}
	}, []);

	return (
		<div className='mt-20 px-32'>
			<h2 className='text-6xl font-bold text-center'>Winkelwagen</h2>
			<div className='flex w-full mt-12'>
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
								<p className='text-lg'>&#8364;{(parseInt(item.product.discount_price) * item.quantity).toFixed(2)}</p>
							</div>
							<Separator />
						</div>
					))}
				</div>
				<div className='w-1/3'></div>
			</div>
		</div>
	);
};

export default Cart;
