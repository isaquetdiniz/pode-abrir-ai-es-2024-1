import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { PrismaClient } from "@prisma/client";
import dynamic from "next/dynamic";

export default async function Page() {
	const { neighborhoods, groups } = await getNeighborhoodsAndGroups();

	return (
		<main className="flex flex-col items-center justify-center w-screen h-screen">
			<MapWithNoSSR />
			<Card className="flex flex-col items-center relative w-[460px] h-[600px] space-y-8">
				<CardHeader>
					<CardTitle className="text-xl">
						Para começar, precisamos de algumas informações sobre seu novo
						negócio
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-12">
					<div className="space-y-3">
						<p className="text-lg">Qual será a atividade da sua empresa?</p>
						<CardDescription className="text-sm text-justify">
							A atividade que uma empresa atua é o setor ou área específica em
							que ela oferece produtos ou serviços, como comércio, indústria,
							tecnologia ou serviços especializados.
						</CardDescription>
						<Select>
							<SelectTrigger className="w-[380px]">
								<SelectValue placeholder="Selecione a atividade" />
							</SelectTrigger>
							<SelectContent>
								{groups.map(({ name }) => (
									<SelectItem value={name} key={name}>
										{name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-3">
						<p className="text-lg">Qual será a localidade da sua empresa?</p>
						<CardDescription className="text-sm text-justify">
							A escolha de um lugar para a abertura de um empreendimento é
							crucial no momento da elaboração da análise de viabilidade de um
							negócio.
						</CardDescription>
						<Select>
							<SelectTrigger className="w-[380px]">
								<SelectValue placeholder="Selecione a localidade" />
							</SelectTrigger>
							<SelectContent>
								{neighborhoods.map(({ name }) => (
									<SelectItem value={name} key={name}>
										{name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</CardContent>
				<CardFooter>
					<Button className="w-[280px] h-[45px]">Analisar</Button>
				</CardFooter>
			</Card>
		</main>
	);
}

async function getNeighborhoodsAndGroups() {
	const prisma = new PrismaClient();

	const [neighborhoods, groups] = await Promise.all([
		prisma.neighborhood.findMany({
			select: {
				name: true,
			},
		}),
		prisma.group.findMany({
			select: {
				name: true,
			},
		}),
	]);

	return {
		neighborhoods,
		groups,
	};
}

const MapWithNoSSR = dynamic(() => import("./map"), {
	ssr: false,
	loading: () => <p>Mapa está carregando...</p>,
});

const TWELVE_HOURS = 60 * 60 * 12;
export const revalidate = TWELVE_HOURS;
