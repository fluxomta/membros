"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Aguarda o status da sessão

    if (session) {
      // Se a sessão existe, redireciona para a dashboard
      router.replace("/dashboard");
    } else {
      // Se não existe sessão, redireciona para a página de login
      router.replace("/login");
    }
  }, [session, status, router]);

  return <p>Redirecionando...</p>; // Exibe uma mensagem temporária enquanto redireciona
}
