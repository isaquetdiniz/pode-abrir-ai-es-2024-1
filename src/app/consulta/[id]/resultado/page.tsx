"use client";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("@/components/ui/map"), {
	ssr: false,
	loading: () => <p>Mapa está carregando...</p>,
});

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1>Posso abrir aí?</h1>
			<MapWithNoSSR />
		</main>
	);
}
