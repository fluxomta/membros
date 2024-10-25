/// app/layout.js
"use client";

import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="pt_BR">
      <body>
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
