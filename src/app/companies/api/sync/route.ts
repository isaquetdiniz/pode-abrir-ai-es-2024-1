import { type NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest): Promise<NextResponse> {
	// Verify if data was updated
	// Get data from Prefeitura do Recife
	// Save in DB
	const mainPage = await fetch(
		"http://dados.recife.pe.gov.br/dataset/empresas-da-cidade-do-recife",
	);
	const html = await mainPage.text();
	const dates = html.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}-0300/g);

	if (!dates) {
		return new NextResponse("Last update date not found", { status: 500 });
	}

	const [openCompanies, closedCompanies] = await Promise.all([
		fetch(
			"http://dados.recife.pe.gov.br/dataset/eb9b8a72-6e51-4da2-bc2b-9d83e1f198b9/resource/87fc9349-312c-4dcb-a311-1c97365bd9f5/download/empresasativender.csv",
			{ cache: "no-store" },
		),
		fetch(
			"http://dados.recife.pe.gov.br/dataset/eb9b8a72-6e51-4da2-bc2b-9d83e1f198b9/resource/edc40277-c83f-4fa3-bfa5-1b85881921d8/download/empresasinativender.csv",
			{ cache: "no-store" },
		),
	]);

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

	console.log(openCompaniesInfo[10], closedCompaniesInfo[10]);

	const addresses = [];
	const groups = [];
	const companies = [];

	return new NextResponse("Synced Successfully", { status: 200 });
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
