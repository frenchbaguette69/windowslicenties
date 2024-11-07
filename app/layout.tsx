import { NextAuthProvider } from "@/context/NextAuthProvider";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "./components/NavBar";
import type { Metadata } from "next";
import { Provider } from "jotai";
import "./globals.css";
import Footer from "./components/Footer";

export const metadata: Metadata = {
	title: "Windows 11 kopen - Windows 10 kopen - Windowslicenties.nl",
	description:
		"Windows 10 kopen? Office 2019 kopen? Windows 10 kopen eenvoudig bij Windowslicenties.nl ✓ Goedkoop, veilig en snel ✓ Direct per mail geleverd ✓ Legaal",
};

type Props = {
	children: React.ReactNode;
	session: any;
};

export default function RootLayout({ children, session }: Props) {
	return (
		<html lang='nl'>
			<body>
				<NextAuthProvider session={session}>
					<Provider>
						<NavBar />
						{children}
						<Footer />
					</Provider>
					<Toaster />
				</NextAuthProvider>
			</body>
		</html>
	);
}
