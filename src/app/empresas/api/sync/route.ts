import { PrismaClient } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest): Promise<NextResponse> {
	const prisma = new PrismaClient();

	const lastUpdate = await prisma.sync.findFirst({
		where: {
			state: "COMPLETED",
			status: "SUCCESS",
		},
		select: {
			createdAt: true,
		},
		orderBy: { createdAt: "desc" },
	});

	const mainPage = await fetch(MAIN_PAGE_URL);
	const html = await mainPage.text();
	const dates = html.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}-0300/g);

	if (!dates) {
		return new NextResponse("Last update date not found!", { status: 500 });
	}

	if (lastUpdate && lastUpdate?.createdAt >= new Date(dates[0])) {
		return new NextResponse("Already synced!", { status: 200 });
	}

	const info = {
		MAIN_PAGE_URL,
		OPEN_COMPANIES_CSV_URL,
		CLOSED_COMPANIES_CSV_URL,
	};

	const sync = await prisma.sync.create({
		data: {
			state: "RUNNING",
			status: "SUCCESS",
			url: MAIN_PAGE_URL,
			info: JSON.stringify(info),
		},
	});

	try {
		const [openCompanies, closedCompanies] = await Promise.all([
			fetch(OPEN_COMPANIES_CSV_URL, { cache: "no-store" }),
			fetch(CLOSED_COMPANIES_CSV_URL, { cache: "no-store" }),
		]);

		console.log("Fetched data!");

		const openCompaniesText = await openCompanies.text();
		const openCompaniesCsvLines = openCompaniesText.split("\r\n");
		const openCompaniesHeaderLine = openCompaniesCsvLines.shift();

		if (!openCompaniesHeaderLine) {
			return new NextResponse("Header for open companies not found", {
				status: 500,
			});
		}

		const closedCompaniesText = await closedCompanies.text();
		const closedCompaniesCsvLines = closedCompaniesText.split("\r\n");
		const closedCompaniesHeaderLine = closedCompaniesCsvLines.shift();

		if (!closedCompaniesHeaderLine) {
			return new NextResponse("Header for closed companies not found", {
				status: 500,
			});
		}

		const openCompaniesInfo = csvToJSON(
			openCompaniesHeaderLine,
			openCompaniesCsvLines,
		) as CompanyInfo[];

		const closedCompaniesInfo = csvToJSON(
			closedCompaniesHeaderLine,
			closedCompaniesCsvLines,
		) as CompanyInfo[];

		const groups: Record<string, string> = {};
		const cnaes: Record<string, { name: string; group: string }> = {};
		const neighborhoods: Record<string, string> = {};
		const streets: Record<string, { name: string; neighborhood: string }> = {};
		const companies: Record<
			string,
			{
				socialReason: string;
				fantasyName: string;
				situation: string;
				openDate: Date;
				closeDate?: Date;
				street: string;
				number?: string;
				batchNumber?: string;
				lat?: number;
				lng?: number;
				bother: boolean;
			}
		> = {};
		const companiesCnaes: Record<
			string,
			{
				cod: string;
				mainActivity: boolean;
				predominantActivity: boolean;
				sanitaryActivity: boolean;
			}[]
		> = {};

		const companiesInfos = [...openCompaniesInfo, ...closedCompaniesInfo];

		for (const companyInfo of companiesInfos) {
			const {
				cnpj,
				razao_social,
				nome_fantasia,
				situacao_empresa,
				data_abertura_empresa,
				data_encerramento,
				numero_lote,
				numero_residencia,
				latitude,
				longitude,
				cod_grupo,
				nome_grupo,
				cnae,
				desc_atividade,
				cod_bairro,
				nome_bairro,
				cod_logradouro,
				nome_logradouro,
				incomodo,
				atividade_principal,
				atividade_predominante,
				atividade_vig_sanitaria,
			} = companyInfo;

			if (cod_grupo && !groups[cod_grupo]) {
				groups[cod_grupo] = nome_grupo;
			}

			if (cnae && cod_grupo && !cnaes[cnae]) {
				cnaes[cnae] = { name: desc_atividade, group: cod_grupo };
			}

			if (cod_bairro && !neighborhoods[cod_bairro]) {
				neighborhoods[cod_bairro] = nome_bairro;
			}

			if (cod_logradouro && cod_bairro && !streets[cod_logradouro]) {
				streets[cod_logradouro] = {
					name: nome_logradouro,
					neighborhood: cod_bairro,
				};
			}

			if (cnpj && !companies[cnpj]) {
				companies[cnpj] = {
					socialReason: razao_social,
					fantasyName: nome_fantasia,
					situation: situacao_empresa,
					openDate: new Date(data_abertura_empresa),
					street: cod_logradouro,
					bother: incomodo === "S",
					...(data_encerramento && { closeDate: new Date(data_encerramento) }),
					...(numero_lote !== "" && { number: numero_lote }),
					...(numero_residencia !== "" && { batchNumber: numero_residencia }),
					...(latitude !== "" && { lat: Number(latitude) }),
					...(longitude !== "" && { lng: Number(longitude) }),
				};
			}

			if (cnpj && companies[cnpj]) {
				companies[cnpj] = {
					...companies[cnpj],
					situation: situacao_empresa,
					...(data_encerramento && { closeDate: new Date(data_encerramento) }),
				};
			}

			if (cnpj && cnae && companiesCnaes[cnpj]) {
				companiesCnaes[cnpj] = [
					...companiesCnaes[cnpj],
					{
						cod: cnae,
						mainActivity: atividade_principal === "S",
						predominantActivity: atividade_predominante === "S",
						sanitaryActivity: atividade_vig_sanitaria === "S",
					},
				];
			}

			if (cnpj && cnae && !companiesCnaes[cnpj]) {
				companiesCnaes[cnpj] = [
					{
						cod: cnae,
						mainActivity: atividade_principal === "S",
						predominantActivity: atividade_predominante === "S",
						sanitaryActivity: atividade_vig_sanitaria === "S",
					},
				];
			}
		}

		const groupsValues = Object.entries(groups)
			.map(([key, value]) => `('${key}', '${value}')`)
			.join(",");
		const createGroupsQuery = `INSERT INTO groups (code, name) VALUES ${groupsValues} ON CONFLICT DO NOTHING;`;
		await prisma.$executeRawUnsafe(createGroupsQuery);
		console.log("Groups created!");

		const cnaesValues = Object.entries(cnaes)
			.map(([key, value]) => `('${key}', '${value.name}', '${value.group}')`)
			.join(",");
		const createCnaesQuery = `INSERT INTO cnaes (code, name, group_code) VALUES ${cnaesValues} ON CONFLICT DO NOTHING;`;
		await prisma.$executeRawUnsafe(createCnaesQuery);
		console.log("Cnaes created!");

		const neighborhoodsValues = Object.entries(neighborhoods)
			.map(([key, value]) => `('${key}', '${value}')`)
			.join(",");
		const createNeighborhoodsQuery = `INSERT INTO neighborhoods (code, name) VALUES ${neighborhoodsValues} ON CONFLICT DO NOTHING;`;
		await prisma.$executeRawUnsafe(createNeighborhoodsQuery);
		console.log("Neighborhoods created!");

		const streetsValues = Object.entries(streets)
			.map(
				([key, value]) =>
					`('${key}', '${value.name.replaceAll("'", "")}', '${value.neighborhood}')`,
			)
			.join(",");
		const createStreetsQuery = `INSERT INTO streets (code, name, neighborhood_code) VALUES ${streetsValues} ON CONFLICT DO NOTHING;`;
		await prisma.$executeRawUnsafe(createStreetsQuery);
		console.log("Streets created!");

		const totalCompanies = Object.entries(companies).length;
		console.log("Total companies", totalCompanies);

		const companies1Values = Object.entries(companies)
			.slice(0, totalCompanies / 3)
			.map(
				([key, value]) =>
					`('${key}', '${value.socialReason}', '${value.fantasyName}', '${value.situation}', '${value.openDate.toISOString()}', '${value.closeDate?.toISOString() || null}', ${value.bother}, '${value.number || null}', '${value.batchNumber || null}', ${value.lat || null}, ${value.lng || null}, '${value.street}')`,
			)
			.join(",")
			.replaceAll("'null'", "null");
		const createCompanies1Query = `INSERT INTO companies (cnpj, social_reason, fantasy_name, situation, open_date, close_date, bother, number, batch_number, lat, lng, street_code) VALUES ${companies1Values} ON CONFLICT (cnpj) DO UPDATE SET situation = companies.situation, close_date = companies.close_date;`;
		await prisma.$executeRawUnsafe(createCompanies1Query);
		console.log("Companies 1 created!");

		const companiesValues = Object.entries(companies)
			.slice(totalCompanies / 3, 2 * (totalCompanies / 3))
			.map(
				([key, value]) =>
					`('${key}', '${value.socialReason}', '${value.fantasyName}', '${value.situation}', '${value.openDate.toISOString()}', '${value.closeDate?.toISOString() || null}', ${value.bother}, '${value.number || null}', '${value.batchNumber || null}', ${value.lat || null}, ${value.lng || null}, '${value.street}')`,
			)
			.join(",")
			.replaceAll("'null'", "null");
		const createCompaniesQuery = `INSERT INTO companies (cnpj, social_reason, fantasy_name, situation, open_date, close_date, bother, number, batch_number, lat, lng, street_code) VALUES ${companiesValues} ON CONFLICT (cnpj) DO UPDATE SET situation = companies.situation, close_date = companies.close_date;`;
		await prisma.$executeRawUnsafe(createCompaniesQuery);
		console.log("Companies 2 created!");

		const companies3Values = Object.entries(companies)
			.slice(2 * (totalCompanies / 3))
			.map(
				([key, value]) =>
					`('${key}', '${value.socialReason}', '${value.fantasyName}', '${value.situation}', '${value.openDate.toISOString()}', '${value.closeDate?.toISOString() || null}', ${value.bother}, '${value.number || null}', '${value.batchNumber || null}', ${value.lat || null}, ${value.lng || null}, '${value.street}')`,
			)
			.join(",")
			.replaceAll("'null'", "null");
		const createCompanies3Query = `INSERT INTO companies (cnpj, social_reason, fantasy_name, situation, open_date, close_date, bother, number, batch_number, lat, lng, street_code) VALUES ${companies3Values} ON CONFLICT (cnpj) DO UPDATE SET situation = companies.situation, close_date = companies.close_date;`;
		await prisma.$executeRawUnsafe(createCompanies3Query);
		console.log("Companies 3 created!");

		const totalCompaniesCnaes = Object.entries(companiesCnaes).length;
		console.log("Total companies cnaes", totalCompaniesCnaes);

		const companiesCnaesValues = Object.entries(companiesCnaes)
			.slice(0, totalCompaniesCnaes / 3)
			.flatMap(([key, value]) =>
				value.map(
					(item) =>
						`('${key}', '${item.cod}', ${item.mainActivity}, ${item.predominantActivity}, ${item.sanitaryActivity})`,
				),
			)
			.join(",");
		const createCompaniesCnaesQuery = `INSERT INTO companies_cnaes (company_cnpj, cnae_code, main_activity, predominant_activity, sanitary_activity) VALUES ${companiesCnaesValues} ON CONFLICT DO NOTHING;`;
		await prisma.$executeRawUnsafe(createCompaniesCnaesQuery);
		console.log("Companies Cnaes 1 created!");

		const companiesCnaes2Values = Object.entries(companiesCnaes)
			.slice(totalCompaniesCnaes / 3, 2 * (totalCompaniesCnaes / 3))
			.flatMap(([key, value]) =>
				value.map(
					(item) =>
						`('${key}', '${item.cod}', ${item.mainActivity}, ${item.predominantActivity}, ${item.sanitaryActivity})`,
				),
			)
			.join(",");
		const createCompaniesCnaes2Query = `INSERT INTO companies_cnaes (company_cnpj, cnae_code, main_activity, predominant_activity, sanitary_activity) VALUES ${companiesCnaes2Values} ON CONFLICT DO NOTHING;`;
		await prisma.$executeRawUnsafe(createCompaniesCnaes2Query);
		console.log("Companies Cnaes 2 created!");

		const companiesCnaes3Values = Object.entries(companiesCnaes)
			.slice(2 * (totalCompaniesCnaes / 3))
			.flatMap(([key, value]) =>
				value.map(
					(item) =>
						`('${key}', '${item.cod}', ${item.mainActivity}, ${item.predominantActivity}, ${item.sanitaryActivity})`,
				),
			)
			.join(",");
		const createCompaniesCnaes3Query = `INSERT INTO companies_cnaes (company_cnpj, cnae_code, main_activity, predominant_activity, sanitary_activity) VALUES ${companiesCnaes3Values} ON CONFLICT DO NOTHING;`;
		await prisma.$executeRawUnsafe(createCompaniesCnaes3Query);
		console.log("Companies Cnaes 3 created!");

		await prisma.sync.update({
			where: { id: sync.id },
			data: {
				state: "COMPLETED",
				status: "SUCCESS",
				info: JSON.stringify({ ...info, totalCompaniesCnaes, totalCompanies }),
			},
		});

		return new NextResponse("Synced Successfully", { status: 200 });
	} catch (error) {
		await prisma.sync.update({
			where: { id: sync.id },
			data: {
				state: "COMPLETED",
				status: "ERROR",
				info: JSON.stringify({ ...info, error }),
			},
		});

		return new NextResponse("Sync failed!", { status: 500 });
	}
}

const csvToJSON = (headerLine: string, csvLines: string[]) => {
	const header = headerLine.split(";");

	const csvLinesFormatted = csvLines.map((line) => {
		const lineSplitted = line.split(";");
		const entries = header.map((item, index) => [
			item,
			lineSplitted[index]?.trim(),
		]);

		return Object.fromEntries(entries);
	});

	return csvLinesFormatted;
};

type CompanyInfo = {
	cnpj: string;
	razao_social: string;
	nome_fantasia: string;
	cod_logradouro: string;
	nome_logradouro: string;
	numero_residencia: string;
	numero_lote: string;
	cod_bairro: string;
	nome_bairro: string;
	situacao_empresa: string;
	data_abertura_empresa: string;
	data_encerramento: string;
	cod_grupo: string;
	nome_grupo: string;
	cnae: string;
	desc_atividade: string;
	atividade_principal: string;
	atividade_vig_sanitaria: string;
	atividade_predominante: string;
	incomodo: string;
	latitude: string;
	longitude: string;
};

const MAIN_PAGE_URL = process.env.MAIN_PAGE_URL as string;
const OPEN_COMPANIES_CSV_URL = process.env.OPEN_COMPANIES_CSV_URL as string;
const CLOSED_COMPANIES_CSV_URL = process.env.CLOSED_COMPANIES_CSV_URL as string;
