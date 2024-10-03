import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type * as React from "react";

interface SuccessCardProps {
	location: string;
	activity: string;
	successRate: number;
}

const SuccessCard: React.FC<SuccessCardProps> = ({
	location,
	activity,
	successRate,
}) => {
	return (
		<Card className="w-[168px] h-[160px] flex flex-col items-center justify-center">
			<CardHeader className="flex flex-col items-center justify-center text-center">
				<CardTitle className="text-black text-sm">{`TAXA DE SUCESSO DE ${activity} EM ${location}`}</CardTitle>
				<CardDescription className="text-[#FF5E03] font-bold">
					{`${successRate}%`}
				</CardDescription>
			</CardHeader>
		</Card>
	);
};

export default SuccessCard;
