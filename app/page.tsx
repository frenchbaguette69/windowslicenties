import Hero from "./components/Hero";
import Products from "@/components/Products";

export default function Home() {
	return (
		<div>
			<Hero />
			<div className='bg-[#009cde] mt-20'>
				<div className='container'>
					<h2 className='text-4xl font-semibold text-white py-10'>Onze best verkochte producten</h2>
				</div>
			</div>
			<Products />
		</div>
	);
}
