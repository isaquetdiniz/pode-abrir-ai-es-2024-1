import { CompanyStatusChart } from "./companychart";
import ActivityCard from "./activityCard";
import LocationCard from "./locationCard";
import SuccessCard from "./successCard";
import GrowthCard from "./growthCard";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <CompanyStatusChart size="sm" />
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
        style={{ width: "362px" }}
      >
        <ActivityCard location="BOA VIAGEM" activity="OFICINAS" />
        <LocationCard location="VÁRZEA" activity="GASTRONOMIA" />
        <SuccessCard
          location="BOA VIAGEM"
          activity="GASTRONOMIA"
          successRate={52}
        />
        <GrowthCard location="BOA VIAGEM" growthRate={4} />
      </div>
    </div>
  );
}
