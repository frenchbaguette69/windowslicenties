import Image from "next/image";
import React from "react";
import Windows11 from "@/public/Windows_11_Pro.webp";
import { Button } from "@/components/ui/button";
import trustpilot from "@/public/trustpilot.png";
import Link from "next/link";

const Hero = () => {
	return (
		<div>
			<div className='container mt-5 md:mt-20'>
				<div className='flex flex-col md:flex-row justify-between'>
					<div className='md:w-1/2'>
						<h1 className='text-4xl md:text-5xl font-bold mt-5 md:mt-20'>
							Windows 11 key, Windows 10 kopen en office licenties
						</h1>
						<p className='mt-3 md:mt-10 max-w-sm text-xl'>
							Bestel gemakkelijk uw Windows 11 key, of Windows 11 Pro key. Binnen 1 minuut na uw bestelling in uw
							mailbox. Wij bieden naast dit ook nog Windows 10 licenties en Office licenties.
						</p>
						<Button className='mt-5'>Online bestellen</Button>

						{/* Trustpilot Image wrapped in a Next.js Link */}
						<Link href='https://www.trustpilot.com/review/windowslicenties.nl' passHref>
							<Image
								className='mt-5'
								src={trustpilot}
								alt='trustpilot reviews windowslicenties.nl'
								width={400}
								height={250}
							/>
						</Link>
					</div>
					<div className='mt-5 md:mt-0 md:w-1/2 flex justify-center'>
						<Image
							className='object-contain'
							loading='eager'
							src={Windows11}
							alt='Windows 11 Pro key'
							height={1000}
							width={600}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
