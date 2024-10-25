// app/conta/profile/page.js
"use client";

import useAuth from "@/hooks/useAuth";
import Loading from "@/components/General/Loading";
import Link from "next/link";

export default function ProfilePage() {
    const { session, status } = useAuth();

    if (status === "loading") return <Loading />;

    const { user } = session;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 text-black">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Meu Perfil</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                        <p className="w-full px-4 py-2 border rounded-md bg-gray-100">
                            {user.name.split(" ")[0]}
                        </p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Sobrenome</label>
                        <p className="w-full px-4 py-2 border rounded-md bg-gray-100">
                            {user.name.split(" ").slice(1).join(" ")}
                        </p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="w-full px-4 py-2 border rounded-md bg-gray-100">
                            {user.email}
                        </p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Telefone</label>
                        <p className="w-full px-4 py-2 border rounded-md bg-gray-100">
                            {user.mobilePhone || "Telefone não disponível"}
                        </p>
                    </div>
                </div>
                <Link
                    href="/conta/edit-profile"
                    className="mt-4 block w-full bg-blue-500 text-white py-2 rounded-md text-center hover:bg-blue-600 transition"
                >
                    Editar Perfil
                </Link>
            </div>
        </div>
    );
}
