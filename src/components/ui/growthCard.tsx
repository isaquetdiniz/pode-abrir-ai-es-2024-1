import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type * as React from "react";

interface GrowthCardProps {
	location: string;
	growthRate: number;
}

const GrowthCard: React.FC<GrowthCardProps> = ({ location, growthRate }) => {
	return (
		<Card className="w-[168px] h-[160px] flex flex-col items-center justify-center">
			<CardHeader className="flex flex-col items-center justify-center text-center">
				<CardTitle className="text-black text-sm">{`MÉDIA DE CRESCIMENTO DE EMPRESAS EM ${location}`}</CardTitle>
				<CardDescription className="text-[#FF5E03] font-bold">
					{`${growthRate}%`}
				</CardDescription>
			</CardHeader>
		</Card>
	);
};

export default GrowthCard;
