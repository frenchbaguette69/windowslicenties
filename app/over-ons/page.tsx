import { Check } from "lucide-react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Over Windowslicenties.nl - Windowslicenties.nl",
	description: "Waarom een Windows 10 licentie kopen bij Windowslicenties.nl?",
};

const About = () => {
	return (
		<div>
			<div className="bg-[url('/assets/images/contact-banner.png')] bg-cover bg-no-repeat text-white flex flex-col justify-center items-center text-center pt-48 pb-36 bg-center">
				<h2 className='text-4xl font-bold'>Over Windowslicenties.nl</h2>
				<p className='mt-10 mb-20'>Waarom een Windows 10 licentie kopen bij Windowslicenties.nl?</p>
				<div className='flex flex-col lg:flex-row w-2/3 gap-12 lg:gap-6'>
					<div className='flex flex-col items-center font-semibold gap-2'>
						<Check size={36} />
						<h4>Software direct per mail, binnen 5 minuten geleverd, 24/7</h4>
					</div>
					<div className='flex flex-col items-center font-semibold gap-2'>
						<Check size={36} />
						<h4>100% Officiële en legitieme Microsoft & Windows productcodes</h4>
					</div>
					<div className='flex flex-col items-center font-semibold gap-2'>
						<Check size={36} />
						<h4>Veilig & Snel betalen, incl. Activatie Garantie</h4>
					</div>
				</div>
			</div>
			<div className='flex flex-col px-12 lg:px-64 mt-16 mb-20'>
				<p className='font-semibold mb-16'>
					Koop goedkoop, veilig en snel een Windows 10 of Microsoft Office 2019 licentie van Windowslicenties.nl. Wij
					zijn gespecialiseerd in het leveren van goedkope licenties voor Windows 10 & Microsoft Office 2019. Deze
					worden direct, digitaal per mail geleverd. <br /> Een digitale Microsoft licentie (ESD) is goedkoper, beter
					voor het milieu en is direct leverbaar! Bespaar op verpakkingsmateriaal en op verzendkosten.
				</p>
				<div>
					{REASONS.map((reason, index) => (
						<div key={index} className=' mt-4'>
							<h2 className='font-semibold'>{reason.question}</h2>
							<p className='mt-2 font-extralight'>
								{reason.answer} <a href='mailto:info@windowslicenties.nl'>info@windowslicenties.nl</a>
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default About;

const REASONS = [
	{
		question: "WAAROM EEN GOEDKOPE WINDOWS OF OFFICE LICENTIE KOPEN BIJ WINDOWSLICENTIES.NL?",
		answer:
			"Bij ons koop je een Windows licentie als je goedkoop uit wilt zijn. Uit een scala van opgekochte gebruikte en ongebruikte windows PC’s en laptops met licenties, koopt u er een of meerdere. Deze windows licenties worden door ons beheerd en aan u geleverd. Een Windows licentie die u koopt is van u, levenslang. De laptops en PC’s waar deze licenties eerst op geactiveerd zijn, zijn vernietigd of defect. Een goedkope windows licentie is binnen enkele minuten eigendom van u!",
	},
	{
		question: "DIGITAAL WINDOWS 10 & MICROSOFT OFFICE 2019 KOPEN",
		answer:
			"Een digitale Microsoft (Windows) licentie (ESD) is goedkoper, beter voor het milieu en is direct leverbaar! Bespaar op verpakkingsmateriaal en op verzendkosten. Bij Windowslicenties.nl koop je alleen 100% officiële en legitieme Microsoft Windows productcodes en Microsoft Office 2019 Pro Plus productcodes.",
	},
	{
		question: "BETROUWBAAR WINDOWS 10 & MICROSOFT OFFICE 2019 KOPEN",
		answer:
			"U kunt veilig, snel en betrouwbaar betalen met PayPal bij de aanschaf van uw nieuwe Windows licentie. Paypal kunt u aan uw bank koppelen of opwaarderen met iDeal, voor de aanschaf van deze Windows licenties.",
	},
	{
		question: "HULP BIJ ACTIVATIE & 100% ACTIVATIE GARANTIE!",
		answer:
			"Ook bieden wij hulp bij de activatie van uw Windows licentie. Aarzel niet! Stuur direct een mailtje naar info@windowslicenties.nl als u problemen ondervindt met de Windows licentie activering! Wij zorgen er altijd voor dat uw computer 100% geactiveerd wordt met de Windows 10 Pro licentie die u heeft aangeschaft.",
	},
];
