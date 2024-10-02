import Image from "next/image";
import { FaSignInAlt } from "react-icons/fa";
import {
	ArrowIcon,
	ContentContainer,
	HeaderContainer,
	LoginTextContainer,
	LogoContainer,
	ProfileContainer,
	ProfileIcon,
	TextWrapper,
} from "./styles";

interface HeaderProps {
	loginPage: boolean;
}

const Header = ({ loginPage }: HeaderProps) => {
	return (
		<HeaderContainer>
			<LogoContainer>
				{loginPage ? (
					<Image
						src="/images/logo_prefeitura.png"
						alt="Prefeitura do Recife"
						width={190}
						height={55}
					/>
				) : (
					<Image
						src="/images/logo_projeto.png"
						alt="Posso abrir aí?"
						width={192}
						height={72}
					/>
				)}
			</LogoContainer>

			{loginPage ? (
				<LoginTextContainer>
					<p>Conheça o Posso abrir aí?</p>
					<TextWrapper>
						<FaSignInAlt size={16} />
						<p>Entrar</p>
					</TextWrapper>
				</LoginTextContainer>
			) : (
				<ProfileContainer>
					<Image
						src="/images/logo_prefeitura.png"
						alt="Prefeitura do Recife"
						width={190}
						height={55}
					/>
					<ContentContainer>
						<ProfileIcon />
						<p>Olá, PEDRO</p>
						<ArrowIcon />
					</ContentContainer>
				</ProfileContainer>
			)}
		</HeaderContainer>
	);
};

export default Header;
