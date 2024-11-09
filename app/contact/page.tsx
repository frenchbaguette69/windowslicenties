import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact - Windowslicenties.nl",
	description: "Wilt u contact opnemen met Windowslicenties.nl? Dan kunt u mailen naar:",
};

const Contact = () => {
	return (
		<div>
			<div className="bg-[url('/assets/images/contact-banner.png')] bg-cover bg-no-repeat text-white flex flex-col justify-center items-center text-center pt-48 pb-36 bg-center">
				<h2 className='text-4xl font-bold'>
					Contact opnemen met <br /> Windowslicenties
				</h2>
				<p className='mt-10 mb-6'>Wilt u contact opnemen met Windowslicenties.nl? Dan kunt u mailen naar:</p>
				<a href='mailto:info@windowslicenties.nl' className='font-semibold mb-2'>
					info@windowslicenties.nl
				</a>
				<p>Stel hier uw vragen over onduidelijkheden!</p>
			</div>
			<div className='flex flex-col lg:flex-row gap-8 lg:gap-16 px-12 lg:px-56 mt-16 lg:mt-32 mb-10 lg:mb-20'>
				{REASONS.map((reason, index) => (
					<div key={index} className=''>
						<h2 className='font-semibold'>{reason.question}</h2>
						<p className='mt-6 font-light'>
							{reason.answer} <a href='mailto:info@windowslicenties.nl'>info@windowslicenties.nl</a>
						</p>
					</div>
				))}
			</div>
			<div className='px-12 lg:px-56 mb-16 lg:mb-28'>
				<h2 className='font-semibold'>ALGEMENE VRAGEN?</h2>
				<p className='mt-4 font-light'>
					Voor vragen over activering, of problemen bij uw bestelling kunt u ook terugvinden op onze Veelgestelde vragen
					pagina.
				</p>
			</div>
		</div>
	);
};

export default Contact;

const REASONS = [
	{
		question: "PARTNER WORDEN?",
		answer: "Voor vragen over partner worden, stuur een email naar",
	},
	{
		question: "VRAGEN OVER ACTIVERING?",
		answer: "Voor vragen over activering, of problemen bij uw bestelling mail naar",
	},
	{
		question: "KOPEN IN BULK?",
		answer: "Voor vragen betreft aankopen in bulk of aantallen, mail",
	},
];
