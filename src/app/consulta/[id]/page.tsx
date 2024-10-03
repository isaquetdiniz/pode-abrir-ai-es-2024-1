import { PrismaClient } from "@prisma/client";
import dynamic from "next/dynamic";

export default async function Page({ params }: { params: { id: string } }) {
	const { id } = params;
	const [neighborhoodCode, groupCode] = id.split("-");

	const companies = await getCompaniesByNeighborhoodAndGroup(
		neighborhoodCode,
		groupCode,
	);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<MapWithNoSSR companies={companies} />
		</main>
	);
}

async function getCompaniesByNeighborhoodAndGroup(
	neighborhoodCode: string,
	groupCode: string,
) {
	const prisma = new PrismaClient();

	const companies = (await prisma.company.findMany({
		where: {
			situation: "ATIVO",
			lat: { not: null },
			lng: { not: null },
			street: {
				neighborhoodCode,
			},
			cnaes: {
				some: {
					mainActivity: true,
					cnae: {
						groupCode,
					},
				},
			},
		},
		select: {
			cnpj: true,
			socialReason: true,
			fantasyName: true,
			openDate: true,
			lat: true,
			lng: true,
		},
	})) as {
		cnpj: string;
		socialReason: string;
		fantasyName: string;
		openDate: Date;
		lat: number;
		lng: number;
	}[];

	return companies;
}

const MapWithNoSSR = dynamic(() => import("@/components/ui/map"), {
	ssr: false,
	loading: () => <p>Mapa está carregando...</p>,
});

const TWELVE_HOURS = 60 * 60 * 12;
export const revalidate = TWELVE_HOURS;
