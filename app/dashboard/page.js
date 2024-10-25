// app/dashboard/page.js
"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Loading from "@/components/General/Loading";

export default function DashboardPage() {
    const { session, status } = useAuth();
    const router = useRouter();

    // Bloqueia a renderização até que o status da sessão seja verificado
    if (status === "loading") return <Loading />;

    if (status === "unauthenticated") {
        router.replace("/login");
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold">Bem-vindo à Dashboard!</h1>
                <p>Conteúdo da Dashboard aqui.</p>
            </div>
        </div>
    );
}
