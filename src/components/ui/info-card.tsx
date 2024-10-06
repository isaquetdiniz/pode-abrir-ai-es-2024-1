import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type InfoCardProps = {
  title: string;
  info: string | number;
};

export default function InfoCard({ title, info }: InfoCardProps) {
  return (
    <Card className="w-[12vw] h-[16vh] flex flex-col items-center justify-center">
      <CardHeader className="flex flex-col items-center justify-center text-center">
        <CardTitle className="text-black text-base">{title}</CardTitle>
        <CardDescription className="text-[#FF5E03] font-bold text-2xl">
          {info}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
