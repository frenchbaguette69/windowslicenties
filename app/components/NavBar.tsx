"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMail, FiTag, FiCreditCard, FiMenu } from "react-icons/fi";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Logo from "@/public/WINDOWSlicenties.png";

import { signOut, useSession } from "next-auth/react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOutIcon, ShoppingCart } from "lucide-react";
import { useAtom } from "jotai";
import { cartAtom } from "@/context/atoms";

const NavBar = () => {
	const [open, setOpen] = useState(false);
	const { data: session, status } = useSession();

	const [cartItems, setCartItems] = useAtom(cartAtom);

	useEffect(() => {
		const cart = localStorage.getItem("cart");
		if (cart) {
			setCartItems(JSON.parse(cart));
		}
	}, []);

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
						<Link href='/contact' className='text-gray-700'>
							Contact
						</Link>
					</nav>

					{/* Login knop voor desktop */}
					<div className='hidden md:flex md:gap-5 md:items-center'>
						<Link href='/cart'>
							<div className='flex gap-1 text-sm'>
								<ShoppingCart size={18} />
								{cartItems.length}
							</div>
						</Link>
						{session ? (
							<DropdownMenu>
								<DropdownMenuTrigger>
									<Avatar>
										<AvatarImage src={session.user?.image || undefined} />
										<AvatarFallback>U</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									{/* <DropdownMenuItem>Profile</DropdownMenuItem>
									<DropdownMenuSeparator /> */}
									<DropdownMenuItem className='cursor-pointer' onClick={() => signOut()}>
										<LogOutIcon />
										Log out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Link href='/api/auth/signin'>
								<Button variant='secondary'>Aanmelden</Button>
							</Link>
						)}
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
									<Link href='/product/windows-10-kopen' className='text-gray-700'>
										Windows 10
									</Link>
									<Link href='/product/windows-11-pro-licentie-productcode' className='text-gray-700'>
										Windows 11
									</Link>
									<Link href='/product/microsoft-office-2019-licentie-kopen' className='text-gray-700'>
										Office 365
									</Link>
									<Link href='/contact' className='text-gray-700'>
										Contact
									</Link>
								</nav>
								<div className='mt-6'>
									<Link href='/cart'>
										<div className='flex gap-1 text-sm'>
											<ShoppingCart size={18} />
											{cartItems.length}
										</div>
									</Link>
									{session ? (
										<DropdownMenu>
											<DropdownMenuTrigger>
												<Avatar>
													<AvatarImage src={session.user?.image || undefined} />
													<AvatarFallback>U</AvatarFallback>
												</Avatar>
											</DropdownMenuTrigger>
											<DropdownMenuContent>
												{/* <DropdownMenuItem>Profile</DropdownMenuItem>
												<DropdownMenuSeparator /> */}
												<DropdownMenuItem className='cursor-pointer' onClick={() => signOut()}>
													<LogOutIcon />
													Log out
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									) : (
										<Link href='/api/auth/signin'>
											<Button variant='secondary'>Aanmelden</Button>
										</Link>
									)}
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
