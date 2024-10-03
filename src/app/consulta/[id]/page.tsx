import dynamic from "next/dynamic";

export default async function Page({ params }: { params: { id: string } }) {
	const { id } = params;
	const [neighborhoodCode, groupCode] = id.split("-");

	console.log(neighborhoodCode, groupCode);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1>Posso abrir aí?</h1>
			<MapWithNoSSR />
		</main>
	);
}

const MapWithNoSSR = dynamic(() => import("@/components/ui/map"), {
	ssr: false,
	loading: () => <p>Mapa está carregando...</p>,
});

const TWELVE_HOURS = 60 * 60 * 12;
export const revalidate = TWELVE_HOURS;
