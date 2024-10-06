import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center justify-between min-h-screen">
        <section
          className="relative w-full h-[90vh] flex flex-col items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/capa-Recife-antigo.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-[#D9D9D9] opacity-80"></div>

          <div className="relative text-center p-6 rounded-md">
            <Image
              src="/images/logo_projeto.png"
              alt="Posso Abrir Aí logo"
              width={376}
              height={120}
              className="mx-auto"
            />
            <p className="text-lg mt-2 text-[#3C3C3C] font-bold">
              Entenda onde você vai abrir o seu negócio.
            </p>
          </div>

          <div className="relative mt-8">
            <Link href="/consulta">
              <Button className="w-[240px] h-[50px] bg-[#FF5E03] text-white rounded-lg text-lg">
                Entrar no portal
              </Button>
            </Link>
          </div>
        </section>

        <section className="w-full h-screen py-12 text-center flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-4">Conheça o Posso abrir aí?</h2>
          <div className="w-full max-w-2xl mx-auto">
            <div className="w-full h-[300px] bg-gray-200 rounded-lg flex items-center justify-center">
              <span>Video Placeholder</span>
            </div>
            <p className="mt-6 text-lg text-[#3C3C3C]">
              Posso abrir aí? é uma poderosa ferramenta para análise do
              ecossistema empreendedor recifense. Com ela é possível entender o
              perfil de consumo e concorrentes em uma localidade antes de abrir
              o negócio.
            </p>
          </div>
        </section>

        <div className="fixed bottom-4 right-4">
          <a
            href="https://wa.me/your-whatsapp-number"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp size={60} color="#25D366" />
          </a>
        </div>
      </main>

      <footer className="bg-[#FF5E03] text-white py-6 text-center">
        <p>© 2024 Prefeitura do Recife</p>
        <Link href="/about" className="underline">
          Conheça o Posso abrir aí?
        </Link>
      </footer>
    </>
  );
}
