/// app/layout.js
"use client";

import "./globals.css";
import { Montserrat } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt_BR">
      <body className={`${montserrat.variable} bg-white`}>
        <AuthProvider>
          <Header />
          <div className="h-lvh">
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
