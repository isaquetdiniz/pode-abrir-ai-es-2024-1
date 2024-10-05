"use client";

import {
	ChartContainer,
	ChartLegend,
	ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import {
	Bar,
	CartesianGrid,
	ComposedChart,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export default function AgesChart(props: {
	ages: { age: number; total: number }[];
}) {
	return (
		<ChartContainer
			className="min-h-[200px] w-full"
			config={{
				total: { color: "#FF5E03" },
			}}
		>
			<ComposedChart data={props?.ages}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="age" />
				<YAxis />
				<Tooltip content={<ChartTooltipContent />} />
				<Bar dataKey="total" name="Total" fill="#FF5E03" />
				<ChartLegend />
			</ComposedChart>
		</ChartContainer>
	);
}
