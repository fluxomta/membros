// app/conta/profile/page.js
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Gravatar from "@/components/profile/Gravatar";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") return <p>Carregando...</p>;

    if (status === "unauthenticated") {
        router.replace("/login");
        return null;
    }

    const { user } = session;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md text-center">
                <Gravatar email={user.email} size={100} />
                <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600">
                    {user.mobilePhone || "Telefone não disponível"}
                </p>

                <button
                    onClick={() => router.push("/conta/edit-profile")}
                    className="btn success"
                >
                    Editar Perfil
                </button>
            </div>
        </div>
    );
}
