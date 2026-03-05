import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";

// Configuração da fonte Montserrat
const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["400", "700", "900"], 
});

export const metadata: Metadata = {
  title: "Cuattro | Tecnologia Interativa para Varejo e PDV",
  description: "Soluções Lift & Learn e sensores inteligentes para transformar a experiência de compra no varejo físico.",
  keywords: ["Varejo Inteligente", "Lift & Learn", "Tecnologia PDV", "Cuattro"],
  openGraph: {
    title: "Cuattro - Inovação no Ponto de Venda",
    description: "Transforme produtos em vendedores digitais.",
    images: ["/og-image.jpg"], 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      {/* Aplicando a classe da fonte no body para todo o site herdar */}
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  );
}