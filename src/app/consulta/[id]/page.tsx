import { Button } from "@/components/ui/button";
import ChartsArea from "@/components/ui/charts-area";
import Navbar from "@/components/ui/navbar";
import { PrismaClient } from "@prisma/client";
import { addYears, endOfYear, format, startOfYear } from "date-fns";
import dynamic from "next/dynamic";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
	const { id } = params;
	const [neighborhoodCode, groupCode] = id.split("-");

	const { neighborhood, group } = await getNeighborhoodAndGroup(
		neighborhoodCode,
		groupCode,
	);

	const [
		companiesResult,
		companies,
		mainActivityNeighborhood,
		neighborhoodMainActivity,
		successRate,
		averageIncrease,
	] = await Promise.all([
		getCompaniesNeighborhoodAndGroupResult(neighborhoodCode, groupCode),
		getCompaniesByNeighborhoodAndGroup(neighborhoodCode, groupCode),
		getMainActivityNeighborhood(neighborhoodCode),
		getNeighborhoodMainActivity(groupCode),
		getActivitySuccessRateInNeighborhood(neighborhoodCode, groupCode),
		getCompaniesNeighborhoodAverageIncrease(neighborhoodCode),
	]);

	return (
		<>
			<Navbar className="fixed top-0 w-full" />
			<main className="flex min-h-screen flex-row items-center justify-between p-24">
				<MapWithNoSSR companies={companies} />
				<Link className="self-start" href={"/consulta"}>
					<Button className="bg-[#FF5E03] self-start">Voltar</Button>
				</Link>
				<ChartsArea
					companiesResult={companiesResult}
					neighborhood={neighborhood}
					group={group}
					mainActivityNeighborhood={mainActivityNeighborhood}
					neighborhoodMainActivity={neighborhoodMainActivity}
					successRate={successRate}
					averageIncrease={averageIncrease}
				/>
			</main>
		</>
	);
}

async function getNeighborhoodAndGroup(
	neighborhoodCode: string,
	groupCode: string,
) {
	const prisma = new PrismaClient();

	const [neighborhoodFound, groupFound] = await Promise.all([
		prisma.neighborhood.findUnique({ where: { code: neighborhoodCode } }),
		prisma.group.findUnique({ where: { code: groupCode } }),
	]);

	if (!neighborhoodFound || !groupFound) {
		redirect("/404");
	}

	return {
		neighborhood: neighborhoodFound,
		group: groupFound,
	};
}

async function getCompaniesNeighborhoodAndGroupResult(
	neighborhoodCode: string,
	groupCode: string,
) {
	const prisma = new PrismaClient();

	const result: Record<string, { opened: number; closed: number }> = {};

	const max = 5;
	const now = new Date();

	for (let i = 0; i <= max; i += 1) {
		const year = addYears(now, -i);
		const formattedYear = format(year, "yyyy");

		const initialYear = startOfYear(year);
		const finalYear = endOfYear(year);

		const [openedCount, closedCount] = await Promise.all([
			prisma.company.count({
				where: {
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
					openDate: {
						lte: finalYear,
						gte: initialYear,
					},
				},
			}),
			prisma.company.count({
				where: {
					situation: "BAIXADO",
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
					closeDate: {
						lte: finalYear,
						gte: initialYear,
					},
				},
			}),
		]);

		result[formattedYear] = { opened: openedCount, closed: closedCount };
	}

	return Object.entries(result).flatMap(([key, value]) => ({
		year: key,
		opened: value.opened,
		closed: value.closed,
	}));
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

async function getMainActivityNeighborhood(neighborhoodCode: string) {
	const prisma = new PrismaClient();

	const [cnaesWithGroup, cnaesCount] = await Promise.all([
		prisma.cnae.findMany({
			select: {
				code: true,
				group: {
					select: {
						name: true,
					},
				},
			},
		}),
		prisma.companyCnae.groupBy({
			by: ["cnaeCode"],
			where: {
				company: {
					situation: "ATIVO",
					street: {
						neighborhoodCode,
					},
				},
				mainActivity: true,
			},
			_count: true,
		}),
	]);

	const cnaesWithGroupObject = Object.fromEntries(
		cnaesWithGroup.map(({ code, group }) => [code, group.name]),
	);

	const groupWithCount: Record<string, number> = {};
	for (const cnaeCount of cnaesCount) {
		const group = cnaesWithGroupObject[cnaeCount.cnaeCode];

		const groupExistsInResult = groupWithCount[group];

		if (!groupExistsInResult) {
			groupWithCount[group] = cnaeCount._count;
			continue;
		}

		groupWithCount[group] += cnaeCount._count;
	}

	let maxGroupName = "";
	let max = -1;

	for (const [group, count] of Object.entries(groupWithCount)) {
		if (count > max) {
			max = count;
			maxGroupName = group;
		}
	}

	return maxGroupName;
}

async function getNeighborhoodMainActivity(groupCode: string) {
	const prisma = new PrismaClient();

	const [streetsWithNeighborhood, streetsCount] = await Promise.all([
		prisma.street.findMany({
			select: {
				code: true,
				neighborhood: {
					select: {
						name: true,
					},
				},
			},
		}),
		prisma.company.groupBy({
			by: ["streetCode"],
			where: {
				situation: "ATIVO",
				cnaes: {
					some: {
						mainActivity: true,
						cnae: {
							groupCode,
						},
					},
				},
			},
			_count: true,
		}),
	]);

	const streetsWithNeighborhoodObject = Object.fromEntries(
		streetsWithNeighborhood.map(({ code, neighborhood }) => [
			code,
			neighborhood.name,
		]),
	);

	const neighborhoodWithCount: Record<string, number> = {};
	for (const streetCount of streetsCount) {
		const neighborhood = streetsWithNeighborhoodObject[streetCount.streetCode];

		const neighborhoodExistsInResult = neighborhoodWithCount[neighborhood];

		if (!neighborhoodExistsInResult) {
			neighborhoodWithCount[neighborhood] = streetCount._count;
			continue;
		}

		neighborhoodWithCount[neighborhood] += streetCount._count;
	}

	let maxNeighborhoodName = "";
	let max = -1;

	for (const [neighborhood, count] of Object.entries(neighborhoodWithCount)) {
		if (count > max) {
			max = count;
			maxNeighborhoodName = neighborhood;
		}
	}

	return maxNeighborhoodName;
}

async function getActivitySuccessRateInNeighborhood(
	neighborhoodCode: string,
	groupCode: string,
) {
	const prisma = new PrismaClient();

	const [openCompanies, closedCompanies] = await Promise.all([
		prisma.company.count({
			where: {
				situation: "ATIVO",
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
		}),
		prisma.company.count({
			where: {
				situation: "BAIXADO",
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
		}),
	]);

	const successRate = openCompanies / closedCompanies;

	return successRate;
}

async function getCompaniesNeighborhoodAverageIncrease(
	neighborhoodCode: string,
) {
	const prisma = new PrismaClient();

	const now = new Date();
	const lastYear = addYears(now, -1);

	const [lastYearCount, actualYearCount] = await Promise.all([
		prisma.company.count({
			where: {
				situation: "ATIVO",
				street: {
					neighborhoodCode,
				},
				openDate: {
					lte: lastYear,
				},
			},
		}),
		prisma.company.count({
			where: {
				situation: "ATIVO",
				street: {
					neighborhoodCode,
				},
				openDate: {
					gte: lastYear,
				},
			},
		}),
	]);

	return actualYearCount / lastYearCount;
}

const MapWithNoSSR = dynamic(() => import("@/components/ui/map"), {
	ssr: false,
	loading: () => <p>Mapa está carregando...</p>,
});

const TWELVE_HOURS = 60 * 60 * 12;
export const revalidate = TWELVE_HOURS;
