"use client";

import React, { useState } from "react";

import { cartAtom } from "@/context/atoms";
import { useToast } from "@/hooks/use-toast";
import { useAtom } from "jotai";

import { Product as TProduct } from "@/types/Product";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";

const AddToCart = ({ product }: { product: TProduct }) => {
	const [quantity, setQuantity] = useState(1);
	const [cartItems, setCartItems] = useAtom(cartAtom);
	const { toast } = useToast();

	const addToCart = () => {
		if (cartItems.find((item) => item.product.id === product.id)) {
			const items = cartItems.map((item) => {
				if (item.product.id === product.id) {
					return { product, quantity: item.quantity + quantity };
				}
				return item;
			});
			setCartItems(items);
			localStorage.setItem("cart", JSON.stringify(items));
		} else {
			const items = [...cartItems, { product, quantity }];
			setCartItems(items);
			localStorage.setItem("cart", JSON.stringify(items));
		}

		toast({
			title: `“${product.name}” is toegevoegd aan je winkelwagen.`,
			action: (
				<Link href='/cart'>
					<Button className='bg-primary hover:bg-primary/90'>Bekijk winkelwagen</Button>
				</Link>
			),
		});
	};

	return (
		<div className='flex gap-4 items-center flex-wrap'>
			<Input
				value={quantity}
				className='w-16'
				type='number'
				min={1}
				onChange={(e) => setQuantity(parseInt(e.target.value))}
			/>
			<Button onClick={addToCart} className='bg-primary hover:bg-primary/90 uppercase'>
				Toevoegen aan winkelwagen
			</Button>
		</div>
	);
};

export default AddToCart;
