"use client";
import { Header } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
	BackgroundContainer,
	ContentContainer,
	ContentText,
	HomeScreenContainer,
	LoginButton,
} from "./styles";

export default function LoginPage() {
	return (
		<BackgroundContainer>
			<Header loginPage={true} />
			<HomeScreenContainer>
				<ContentContainer>
					<Image
						src="/images/logo_projeto.png"
						alt="Posso abrir aí?"
						width={376}
						height={120}
					/>
					<ContentText>Entenda onde você vai abrir o seu negócio.</ContentText>
					<Link href="./consulta" passHref>
						<LoginButton>Entrar no portal</LoginButton>
					</Link>
				</ContentContainer>
			</HomeScreenContainer>
		</BackgroundContainer>
	);
}
