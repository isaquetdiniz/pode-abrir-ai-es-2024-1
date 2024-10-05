"use client";

import { useState } from "react";
import ActivityCard from "./activity-card";
import CompanyStatusChart from "./company-chart";
import GrowthCard from "./growth-card";
import LocationCard from "./location-card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./select";
import SuccessCard from "./success-card";

export default function ChartsArea(props: {
	companiesResult: any;
	neighborhood: any;
	group: any;
	mainActivityNeighborhood: any;
	neighborhoodMainActivity: any;
	successRate: any;
	averageIncrease: any;
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
					companiesResult={props.companiesResult}
					neighborhood={props.neighborhood}
					group={props.group}
					mainActivityNeighborhood={props.mainActivityNeighborhood}
					neighborhoodMainActivity={props.neighborhoodMainActivity}
					successRate={props.successRate}
					averageIncrease={props.averageIncrease}
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
				<ActivityCard
					location={props.neighborhood.name.toUpperCase()}
					activity={props.mainActivityNeighborhood}
				/>
				<LocationCard
					location={props.neighborhoodMainActivity.toUpperCase()}
					activity={props.group.name}
				/>
				<SuccessCard
					location={props.neighborhood.name.toUpperCase()}
					activity={props.group.name}
					successRate={Math.ceil(props.successRate * 100)}
				/>
				<GrowthCard
					location={props.neighborhood.name.toUpperCase()}
					growthRate={Math.ceil(props.averageIncrease * 100)}
				/>
			</div>
		</>
	);
}

function PopulationCharts(props: {
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
				<ActivityCard
					location={props.neighborhood.name.toUpperCase()}
					activity={props.mainActivityNeighborhood}
				/>
				<LocationCard
					location={props.neighborhoodMainActivity.toUpperCase()}
					activity={props.group.name}
				/>
				<SuccessCard
					location={props.neighborhood.name.toUpperCase()}
					activity={props.group.name}
					successRate={Math.ceil(props.successRate * 100)}
				/>
				<GrowthCard
					location={props.neighborhood.name.toUpperCase()}
					growthRate={Math.ceil(props.averageIncrease * 100)}
				/>
			</div>
		</>
	);
}
