import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/ui/navbar";
import { PrismaClient } from "@prisma/client";
import dynamic from "next/dynamic";
import { ConsultationForm } from "./form";

export default async function Page() {
	const { neighborhoods, groups } = await getNeighborhoodsAndGroups();

	return (
		<main className="flex flex-col items-center justify-center w-screen h-screen">
			<Navbar className="fixed top-0 w-full" />
			<MapWithNoSSR />
			<Card className="relative w-[460px] h-[600px]">
				<CardHeader>
					<CardTitle className="text-xl">
						Para começar, precisamos de algumas informações sobre seu novo
						negócio
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-6">
					<ConsultationForm neighborhoods={neighborhoods} groups={groups} />
				</CardContent>
			</Card>
		</main>
	);
}

async function getNeighborhoodsAndGroups() {
	const prisma = new PrismaClient();

	const [neighborhoods, groups] = await Promise.all([
		prisma.neighborhood.findMany({
			select: {
				name: true,
			},
		}),
		prisma.group.findMany({
			select: {
				name: true,
			},
		}),
	]);

	return {
		neighborhoods,
		groups,
	};
}

const MapWithNoSSR = dynamic(() => import("./map"), {
	ssr: false,
	loading: () => <p>Mapa está carregando...</p>,
});

const TWELVE_HOURS = 60 * 60 * 12;
export const revalidate = TWELVE_HOURS;
