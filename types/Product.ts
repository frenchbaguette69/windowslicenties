export type Product = {
	id: string;
	name: string;
	title: string;
	summary: string;
	imgsrc: string;
	price: string;
	discount_price: string;
	description: string;
	extra: {
		EAN?: string;
		Brand?: string;
	};
	tags: string[];
};
