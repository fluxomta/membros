"use client";

import { useSession, signOut } from "next-auth/react"; // Incluímos signOut como fallback
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
    const { data: session, status, update } = useSession(); // Adicionando `update` para atualizar a sessão
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobilePhone: "",
    });

    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Adiciona um log para verificar o que tem na sessão
    useEffect(() => {
        console.log("[EditProfilePage] Sessão recebida:", session); // Verificar se o userId está presente

        if (session?.user) {
            const { name, email, mobilePhone = "", id } = session.user; // Obtém id do usuário
            const [firstName = "", lastName = ""] = name.split(" ");
            setFormData({
                firstName,
                lastName,
                email,
                mobilePhone,
            });
        }
    }, [session]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const filterEmptyFields = (data) => {
        return Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== "")
        );
    };

    const updateUser = async (updatedData) => {
        // Obtemos o userId diretamente da sessão
        const userId = session?.user?.id;

        if (!userId) {
            console.error("[EditProfilePage] Erro: userId não encontrado na sessão.");
            throw new Error("Usuário não autenticado.");
        }

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_FUSIONAUTH_BASE_URL}/api/user/${userId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${process.env.NEXT_PUBLIC_FUSIONAUTH_AUTH_TOKEN}`,
                    },
                    body: JSON.stringify({
                        user: updatedData,
                        applicationId: process.env.NEXT_PUBLIC_FUSIONAUTH_APPLICATION_ID,
                    }),
                }
            );

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({
                    message: "Erro desconhecido",
                }));
                console.error("[EditProfilePage] Erro ao atualizar:", errorData);
                throw new Error(errorData.message || "Erro ao atualizar usuário.");
            }

            const data = await res.json();
            console.log("[EditProfilePage] Usuário atualizado com sucesso:", data);
            return data;
        } catch (error) {
            console.error("[EditProfilePage] Erro ao atualizar:", error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsSubmitting(true);

        try {
            const filteredData = filterEmptyFields(formData);
            const updatedUser = await updateUser(filteredData);

            await update({
                user: {
                    ...session.user,
                    name: `${updatedUser.user.firstName} ${updatedUser.user.lastName}`,
                    mobilePhone: updatedUser.user.mobilePhone,
                },
            });

            setMessage("Perfil atualizado com sucesso!");
        } catch (error) {
            setMessage("Erro ao atualizar perfil. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === "loading") return <p>Carregando...</p>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 text-black">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Editar Perfil</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Nome"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Sobrenome"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                        disabled
                    />
                    <input
                        type="text"
                        name="mobilePhone"
                        placeholder="Telefone"
                        value={formData.mobilePhone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md"
                    />
                    {message && (
                        <p
                            className={`text-center text-sm mt-2 ${message.includes("sucesso")
                                ? "text-green-500"
                                : "text-red-500"
                                }`}
                        >
                            {message}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 rounded-md transition ${isSubmitting
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                            } text-white`}
                    >
                        {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                    </button>
                </form>
                <button
                    onClick={() => router.push("/conta/profile")}
                    className="mt-4 w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition"
                >
                    Voltar ao Perfil
                </button>
            </div>
        </div>
    );
}
