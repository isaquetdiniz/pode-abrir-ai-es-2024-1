import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<Navbar />
			<main className="flex min-h-screen flex-col justify-between p-24">
				<h1>HOME - Posso abrir aí?</h1>
				<Link href={"/consulta"}>
					<Button className="w-[280px] h-[45px] bg-[#FF5E03] rounded-lg">
						Analisar
					</Button>
				</Link>
			</main>
		</>
	);
}
