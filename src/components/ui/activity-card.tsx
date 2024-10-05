import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type * as React from "react";

interface ActivityCardProps {
	location: string;
	activity: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ location, activity }) => {
	return (
		<Card className="w-[168px] h-[160px] flex flex-col items-center justify-center">
			<CardHeader className="flex flex-col items-center justify-center text-center">
				<CardTitle className="text-black text-sm">{`ATIVIDADE PREDOMINANTE EM ${location}`}</CardTitle>
				<CardDescription className="text-[#FF5E03] font-bold">
					{activity}
				</CardDescription>
			</CardHeader>
		</Card>
	);
};

export default ActivityCard;
