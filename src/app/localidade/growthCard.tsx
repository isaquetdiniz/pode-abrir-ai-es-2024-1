import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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
