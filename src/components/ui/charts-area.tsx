"use client";

import { useState } from "react";
import AgesChart from "./ages-chart";
import CompanyStatusChart from "./company-chart";
import InfoCard from "./info-card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./select";

export default function ChartsArea(props: {
	companiesResult: any;
	neighborhood: any;
	group: any;
	mainActivityNeighborhood: any;
	neighborhoodMainActivity: any;
	successRate: any;
	averageIncrease: any;
	populationAge: any;
	recifePopulationSalaryMean: any;
	populationSalaryMean: any;
	populationIncreaseMean: any;
	populationGender: any;
}) {
	const [chartsType, setChartsType] = useState("neighborhood");

	return (
		<div className="flex flex-col items-center">
			<Select
				onValueChange={(value) => setChartsType(value)}
				defaultValue={"neighborhood"}
			>
				<SelectTrigger className="w-[380px]">
					<SelectValue placeholder="Selecione o tipo de informação" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value={"neighborhood"} key={"neighborhood"}>
						{"Dados da localidade"}
					</SelectItem>
					<SelectItem value={"population"} key={"population"}>
						{"Dados da população"}
					</SelectItem>
				</SelectContent>
			</Select>

			{chartsType === "neighborhood" ? (
				<CompaniesCharts
					companiesResult={props.companiesResult}
					neighborhood={props.neighborhood}
					group={props.group}
					mainActivityNeighborhood={props.mainActivityNeighborhood}
					neighborhoodMainActivity={props.neighborhoodMainActivity}
					successRate={props.successRate}
					averageIncrease={props.averageIncrease}
				/>
			) : (
				<PopulationCharts
					populationAge={props.populationAge}
					recifePopulationSalaryMean={props.recifePopulationSalaryMean}
					populationSalaryMean={props.populationSalaryMean}
					populationIncreaseMean={props.populationIncreaseMean}
					populationGender={props.populationGender}
				/>
			)}
		</div>
	);
}

function CompaniesCharts(props: {
	companiesResult: any;
	neighborhood: any;
	group: any;
	mainActivityNeighborhood: any;
	neighborhoodMainActivity: any;
	successRate: any;
	averageIncrease: any;
}) {
	return (
		<>
			<div className="mb-4">
				<CompanyStatusChart companies={props.companiesResult} />
			</div>
			<div
				className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
				style={{ width: "362px" }}
			>
				<InfoCard
					title={`ATIVIDADE PREDOMINANTE EM ${props.neighborhood.name.toUpperCase()}`}
					info={props.mainActivityNeighborhood}
				/>
				<InfoCard
					title={`LOCALIDADE ONDE ${props.group.name} É PREDOMINANTE`}
					info={props.neighborhoodMainActivity.toUpperCase()}
				/>
				<InfoCard
					title={`TAXA DE SUCESSO DE ${props.group.name} EM ${props.neighborhood.name.toUpperCase()}`}
					info={`${Math.ceil(props.successRate * 100)}%`}
				/>
				<InfoCard
					title={`MÉDIA DE CRESCIMENTO DE EMPRESAS EM ${props.neighborhood.name.toUpperCase()}`}
					info={`${Math.ceil(props.averageIncrease * 100)}%`}
				/>
			</div>
		</>
	);
}

function PopulationCharts(props: {
	populationAge: any;
	recifePopulationSalaryMean: any;
	populationSalaryMean: any;
	populationIncreaseMean: any;
	populationGender: any;
}) {
	return (
		<>
			<div className="mb-4">
				<AgesChart ages={props.populationAge} />
			</div>
			<div
				className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
				style={{ width: "362px" }}
			>
				<InfoCard
					title="SALÁRIO MÉDIO DOS TRABALHADORES FORMAIS (2022)"
					info={`${Intl.NumberFormat("pt-BR", { style: "decimal" }).format(props.recifePopulationSalaryMean)} SALÁRIOS MÍNIMOS`}
				/>{" "}
				<InfoCard
					title="RENDIMENTO NOMINAL MÉDIO"
					info={Intl.NumberFormat("pt-BR", {
						currency: "BRL",
						style: "currency",
					}).format(props.populationSalaryMean)}
				/>
				<InfoCard
					title="MÉDIA DE CRESCIMENTO POPULACIONAL"
					info={`${Math.ceil(props.populationIncreaseMean * 100)}%`}
				/>
				<InfoCard title="SEXO DA POPULAÇÃO" info={props.populationGender} />
			</div>
		</>
	);
}
