/// app/layout.js
"use client";

import "./globals.css";
import { Montserrat } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Carregando a fonte com variações de peso e estilos
const montserrat = Montserrat({
  subsets: ["latin"], // Suporte para caracteres latinos
  weight: ["400", "700"], // Pesos que você deseja usar
  variable: "--font-montserrat", // Nome da variável CSS para acesso no Tailwind
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt_BR">
      <body className={montserrat.variable}>
        <AuthProvider>
          <Header />
          <div className="h-screen">
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
