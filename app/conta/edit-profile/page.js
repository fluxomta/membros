// app/conta/edit-profile/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

import Notification from "@/components/General/Notification";

export default function EditProfilePage() {
    const { session, status, update } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobilePhone: "",
    });
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("success");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (session?.user) {
            const { name, email, mobilePhone = "" } = session.user;
            const [firstName = "", lastName = ""] = name.split(" ");
            setFormData({ firstName, lastName, email, mobilePhone });
        }
    }, [session]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const updateUser = async (updatedData) => {
        const userId = session?.user?.id;

        if (!userId) {
            console.error("User ID não encontrado.");
            throw new Error("Usuário não autenticado.");
        }

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_FUSIONAUTH_BASE_URL}/api/user/${userId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: process.env.NEXT_PUBLIC_FUSIONAUTH_AUTH_TOKEN,
                    },
                    body: JSON.stringify({
                        user: updatedData,
                        applicationId: process.env.NEXT_PUBLIC_FUSIONAUTH_APPLICATION_ID,
                    }),
                }
            );

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Erro ao atualizar:", errorData);
                throw new Error(errorData.message || "Erro ao atualizar usuário.");
            }

            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Erro ao atualizar:", error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsSubmitting(true);

        try {
            const filteredData = Object.fromEntries(
                Object.entries(formData).filter(([_, value]) => value)
            );

            // Adiciona um delay artificial de 2 segundos
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const updatedUser = await updateUser(filteredData);

            await update({
                user: {
                    ...session.user,
                    name: `${updatedUser.user.firstName} ${updatedUser.user.lastName}`,
                    mobilePhone: updatedUser.user.mobilePhone,
                },
            });

            setMessage("Perfil atualizado com sucesso!");
            setMessageType("success");
        } catch (error) {
            setMessage("Erro ao atualizar perfil. Tente novamente.");
            setMessageType("error");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 rounded-md transition ${isSubmitting
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                            } text-white flex items-center justify-center`}
                    >
                        {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                    </button>
                </form>
                <Link
                    href="/conta/profile"
                    className="mt-4 block w-full bg-gray-500 text-white py-2 rounded-md text-center hover:bg-gray-600 transition"
                >
                    Voltar ao Perfil
                </Link>
            </div>
            <Notification
                message={message}
                type={messageType}
                onClose={() => setMessage("")}
            />
        </div>
    );
}
