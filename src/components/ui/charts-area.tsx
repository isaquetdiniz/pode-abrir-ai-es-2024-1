"use client";

import ActivityCard from "./activity-card";
import CompanyStatusChart from "./company-chart";
import GrowthCard from "./growth-card";
import LocationCard from "./location-card";
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
	return (
		<div className="flex flex-col items-center">
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
		</div>
	);
}
