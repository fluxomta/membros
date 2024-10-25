"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Notification from "@/components/General/Notification";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        mobilePhone: "",
    });
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsSubmitting(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_FUSIONAUTH_BASE_URL}/api/user/registration`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: process.env.NEXT_PUBLIC_FUSIONAUTH_AUTH_TOKEN,
                    },
                    body: JSON.stringify({
                        user: {
                            email: formData.email,
                            password: formData.password,
                            confirmPassword: formData.confirmPassword,
                            mobilePhone: formData.mobilePhone,
                        },
                        registration: {
                            applicationId: process.env.NEXT_PUBLIC_FUSIONAUTH_APPLICATION_ID,
                        },
                        skipVerification: false,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                const errorMessages = Object.entries(data.fieldErrors)
                    .map(([field, errors]) =>
                        errors.map((error) => `${field}: ${error.message}`).join(", ")
                    )
                    .join("; ");
                setMessage(errorMessages);
            } else {
                // Redirecionar para a página de login com uma mensagem
                router.push("/login?message=Confirme seu cadastro no email enviado");
            }
        } catch (error) {
            setMessage("Erro interno. Tente novamente mais tarde.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Cadastre-se</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmar Senha"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                    <input
                        type="text"
                        name="mobilePhone"
                        placeholder="Telefone"
                        value={formData.mobilePhone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md"
                    />
                    {message && <Notification message={message} />}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 rounded-md transition ${isSubmitting ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                            } text-white`}
                    >
                        {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                    </button>
                </form>
            </div>
        </div>
    );
}
