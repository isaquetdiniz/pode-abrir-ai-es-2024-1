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
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export default function CompanyStatusChart(props: {
	companies: { year: string; opened: number; closed: number }[];
}) {
	return (
		<ChartContainer
			className="min-h-[200px] w-full"
			config={{
				opened: { color: "#FF5E03" },
				closed: { color: "#B90A0A" },
			}}
		>
			<ResponsiveContainer width="100%" height="100%">
				<ComposedChart data={props?.companies}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="year" />
					<YAxis />
					<Tooltip content={<ChartTooltipContent />} />
					<Bar dataKey="opened" name="Abertas" fill="#FF5E03" />
					<Bar dataKey="closed" name="Fechadas" fill="#B90A0A" />
					<ChartLegend />
				</ComposedChart>
			</ResponsiveContainer>
		</ChartContainer>
	);
}
