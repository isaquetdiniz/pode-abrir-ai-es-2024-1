import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface LocationCardProps {
  location: string;
  activity: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, activity }) => {
  return (
    <Card className="w-[168px] h-[160px] flex flex-col items-center justify-center">
      <CardHeader className="flex flex-col items-center justify-center text-center">
        <CardTitle className="text-black text-sm">{`LOCALIDADE ONDE ${activity} É PREDOMINANTE`}</CardTitle>
        <CardDescription className="text-[#FF5E03] font-bold">
          {location}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default LocationCard;
