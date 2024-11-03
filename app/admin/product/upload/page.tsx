"use client";

import Papa from "papaparse";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

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
import { useSession } from "next-auth/react";

type Product = {
	ID: string;
	Key: string;
};

const Product = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [validUpload, setValidUpload] = useState(false);
	const { data: session } = useSession();
	const { toast } = useToast();

	// @ts-ignore
	if (!session || session.user?.role !== "ADMIN") {
		return null;
	}

	const parseProducts = (file: File) => {
		Papa.parse(file, {
			header: true,
			complete: (result) => {
				const data = result.data as Product[];

				//make sure it has product id and key
				const validated = data.filter((item) => {
					if (!item.ID || !item.Key) return false;

					const productExists = PRODUCTS.find((product) => product.id === item.ID);
					if (!productExists) return false;

					return true;
				});

				if (validated.length === 0) {
					toast({
						variant: "destructive",
						title: "No valid products found",
					});
					return;
				}
				setProducts(validated);
				setValidUpload(true);
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
		setValidUpload(false);

		//save to database
		try {
			await axios.post("/api/admin/product", products);
			toast({
				variant: "default",
				title: "Product keys uploaded successfully",
			});
		} catch (error) {
			const res = error instanceof AxiosError && error!.response;
			setValidUpload(true);
			toast({
				variant: "destructive",
				title: (res && res?.data!.error) || "Error uploading products",
			});
			return;
		}
	};

	return (
		<div className='px-12 py-8'>
			<div className='flex justify-between gap-5'>
				<div>
					<strong>Note: </strong> Please upload a csv file containing <strong>ID</strong> and <strong>Key</strong>. E.G.
					[ID: windows-10-kopen, Key: 12345678]
				</div>
				<div className='flex gap-2'>
					<Input type='file' accept='.csv' onChange={handleUpload} />
					<Button disabled={!validUpload} className='bg-primary hover:bg-primary/90' onClick={handleSave}>
						<SaveIcon />
						Upload
					</Button>
				</div>
			</div>
			<Table>
				<TableCaption>A list of your products</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>ID</TableHead>
						<TableHead>Key</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map((product, index) => (
						<TableRow key={index}>
							<TableCell>{product.ID}</TableCell>
							<TableCell>{product.Key}</TableCell>
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
