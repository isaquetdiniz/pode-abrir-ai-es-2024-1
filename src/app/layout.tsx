import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Posso abrir aí?",
	description:
		"Tudo que você precisa para entender onde vai abrir o seu negócio",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
