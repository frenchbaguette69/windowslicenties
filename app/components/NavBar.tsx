"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMail, FiTag, FiCreditCard, FiMenu } from "react-icons/fi";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Logo from "@/public/WINDOWSlicenties.png";

const NavBar = () => {
	const [open, setOpen] = useState(false);

	return (
		<div>
			{/* Eerste sticky balk met icoontjes en tekst */}
			<div className='h-10 top-0 sticky bg-[#009cde] flex items-center justify-center'>
				<div className='container'>
					<div className='flex justify-center md:justify-between text-center items-center h-full font-semibold'>
						{/* Col 1 */}
						<div className='flex items-center justify-center gap-2 h-full'>
							<FiMail className='text-white text-xl' />
							<h2 className='text-white'>Binnen 1 minuut licentie in jouw mailbox</h2>
						</div>
						{/* Col 2 */}
						<div className='items-center justify-center gap-2 h-full md:flex hidden'>
							<FiTag className='text-white text-xl' />
							<h2 className='text-white'>Goedkoopste van de NL-BE</h2>
						</div>
						{/* Col 3 */}
						<div className='items-center justify-center gap-2 h-full  md:flex hidden'>
							<FiCreditCard className='text-white text-xl' />
							<h2 className='text-white'>Veilig betalen met iDEAL en Creditcard</h2>
						</div>
					</div>
				</div>
			</div>

			{/* Tweede sticky balk met logo en navigatie */}
			<div className='h-16 top-10 sticky bg-white shadow-md'>
				<div className='container flex justify-between items-center h-full'>
					{/* Logo */}
					<div className='flex items-center'>
						<Link href='/'>
							<Image src={Logo} alt='Windowslicenties.nl' height={75} width={150} />
						</Link>
					</div>

					{/* Navigatie voor desktop */}
					<nav className='hidden md:flex gap-6 font-semibold'>
						<Link href='/product/windows-10-kopen' className='text-gray-700'>
							Windows 10
						</Link>
						<Link href='/product/windows-11-pro-licentie-productcode' className='text-gray-700'>
							Windows 11
						</Link>
						<Link href='/product/microsoft-office-2019-licentie-kopen' className='text-gray-700'>
							Office 365
						</Link>
						<Link href='#contact' className='text-gray-700'>
							Contact
						</Link>
					</nav>

					{/* Login knop voor desktop */}
					<div className='hidden md:block'>
						<Button variant='secondary'>Aanmelden</Button>
					</div>

					{/* Hamburger menu voor mobiel */}
					<div className='md:hidden'>
						<Sheet open={open} onOpenChange={setOpen}>
							<SheetTrigger asChild>
								{/* Hamburger icoon groter maken */}
								<Button variant='ghost'>
									<FiMenu className='text-3xl' /> {/* Veranderd naar text-3xl voor een groter icoon */}
								</Button>
							</SheetTrigger>
							<SheetContent side='left'>
								<nav className='flex flex-col space-y-4 mt-6'>
									<Link href='#windows10' className='text-gray-700'>
										Windows 10
									</Link>
									<Link href='#windows11' className='text-gray-700'>
										Windows 11
									</Link>
									<Link href='#office365' className='text-gray-700'>
										Office 365
									</Link>
									<Link href='#contact' className='text-gray-700'>
										Contact
									</Link>
								</nav>
								<div className='mt-6'>
									<Button variant='secondary'>Aanmelden</Button>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
