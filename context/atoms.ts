import { atom } from "jotai";

import { Product } from "@/types/Product";

type CartItem = {
	product: Product;
	quantity: number;
};

export const cartAtom = atom<CartItem[]>([]);
