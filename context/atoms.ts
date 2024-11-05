import { atom } from "jotai";

import { CartItem, Product } from "@/types/Product";
import { TBillingInfo } from "@/types/Checkout";

const initBillingInfo = {
	firstName: "",
	lastName: "",
	company: "",
	country: "Netherlands",
	street: "",
	apt: "",
	postcode: "",
	place: "",
	phone: "",
	email: "",
	notes: "",
};

export const cartAtom = atom<CartItem[]>([]);

export const billingInfoAtom = atom<TBillingInfo>(initBillingInfo);
