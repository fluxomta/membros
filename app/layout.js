///app/layout.js
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";

export const metadata = {
  title: "Minha Aplicação",
  description: "Exemplo com Next.js 14 e NextAuth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt_BR">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
