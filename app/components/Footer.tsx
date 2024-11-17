import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
	return (
		<div className='bg-[#2c2d2c] text-[#808080] text-sm'>
			<div className='px-10 lg:px-20 py-10 lg:py-20'>
				<div className='flex flex-col lg:flex-row justify-between gap-12'>
					<div className='flex flex-col gap-4 flex-1'>
						<Image src='/windowslicenties-footer-logo.webp' alt='logo' width={200} height={50} />
						<div>
							Windowslicenties.nl levert Windows 10 & 11 licenties. Goedkoop Windows 10 kopen, veilig en snel betalen,
							direct per mail geleverd.
						</div>
					</div>
					<div className='flex-1'>
						<div className='text-primary mb-6 uppercase font-semibold'>Waarom Windowslicenties.nl?</div>
						<ul>
							{FEATURES.map((feature, index) => (
								<li key={index} className='flex gap-2 items-center font-extralight'>
									<Check size={14} color='green' /> {feature}
								</li>
							))}
						</ul>
					</div>
					<div className='flex-1'>
						<div className='text-primary mb-6 uppercase font-semibold'>Klantenservice</div>
						<ul className='flex flex-col gap-2'>
							{LINKS.map((link, index) => (
								<li key={index} className='flex gap-2 items-center font-semibold'>
									<Link href={link.href}>{link.title}</Link>
								</li>
							))}
						</ul>
					</div>
					<div className='flex-1'>
						<div className='text-primary mb-6 uppercase font-semibold'>Veilig & makkelijk betalen</div>
						<Image className='my-6' src='/payment-methods.webp' alt='payment methods' width={280} height={120} />
						<a href='https://www.windowslicenties.nl'>Windowslicenties.nl</a>
						<p>KvK: 94741964</p>
					</div>
				</div>
			</div>
			<Separator className='bg-[#808080]' />
			<div className='px-10 lg:px-20 py-10 lg:py-20 flex flex-col gap-8'>
				<div className='flex flex-col lg:flex-row justify-center gap-3 lg:gap-6 text-center'>
					{ENDLINKS.map((link, index) => (
						<div>
							<Link key={index} href={link.href}>
								<span className='text-primary'>{link.title}</span>
							</Link>
							{index !== ENDLINKS.length - 1 && <span className='text-primary ml-6 invisible lg:visible'>|</span>}
						</div>
					))}
				</div>
				{/* <p className='text-center text-xs'>
					Windowslicenties is dé licentieshop van Nederland. Wij leveren ook licenties aan zakelijke klanten op factuur.
					Wij zijn niet verbonden met de softwareontwikkelaars door overeenkomsten. De productcodes die je bij ons
					koopt, zijn overtollig of worden opnieuw uitgegeven volgens de uitspraak in het UsedSoft-arrest.
					Prijswijzigingen en typefouten zijn onder voorbehoud. Neem contact met ons op via info@windowslicenties.nl als
					u problemen ondervindt!
				</p> */}
			</div>
		</div>
	);
};

export default Footer;

const FEATURES = ["Levering in één minuut", "100% activatiegarantie", "Nederlandse helpdesk", "Veilig & snel betalen"];
const LINKS = [
	{ title: "Over Windowslicenties.nl", href: "/over-ons" },
	{ title: "Contact", href: "/contact" },
	{ title: "Algemene Voorwaarden", href: "/algemene-voorwaarden" },
	{ title: "Privacy policy", href: "/privacy-policy" },
];
const ENDLINKS = [
	{ title: "Over Windowslicenties", href: "/over-ons" },
	{ title: "Neem contact op", href: "/contact" },
	{ title: "Algemene Voorwaarden", href: "/algemene-voorwaarden" },
	{ title: "Privacy policy", href: "/privacy-policy" },
];
