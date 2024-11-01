"use client";

import React, { useState } from "react";
import Papa from "papaparse";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import axios from "axios";

type Product = {
	type: string;
	license: string;
};

const Product = () => {
	const [products, setProducts] = useState<Product[]>([]);

	const parseProducts = (file: File) => {
		Papa.parse(file, {
			header: true,
			complete: (result) => {
				const data = result.data as Product[];

				//make sure it has product id and key
				// const validated = data.filter((item) => item.type && item.license);
				const validated = data.map((item) => ({ type: item.Timestamp, license: item.Fingerprint }));
				setProducts(validated);
			},
		});
	};

	const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;

		if (files && files.length > 0) {
			parseProducts(files[0]);
		}
	};

	const handleSave = async () => {
		//save to database
		console.log("Products", products);
		const res = await axios.post("/api/admin/product", products);

		console.log(res.data);
	};

	console.log(products);

	return (
		<div>
			<div className='flex justify-between gap-5'>
				<Input type='file' accept='.csv' onChange={handleUpload} />
				<Button onClick={handleSave}>Upload</Button>
			</div>
			<Table>
				<TableCaption>A list of your products</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Type</TableHead>
						<TableHead>License</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map((product, index) => (
						<TableRow key={index}>
							<TableCell>{product.type}</TableCell>
							<TableCell>{product.license}</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell>Total</TableCell>
						<TableCell>{products.length}</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
};

export default Product;
