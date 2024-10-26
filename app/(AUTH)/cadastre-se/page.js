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
        <>
            <div className="text-md pb-2 text-center text-white">
                Cadastro
            </div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col bg-white shadow-xl p-6 md:p-10 2xl:p-12 3xl:p-14 rounded-md border border-primary-700/50"
                data-bitwarden-watching="1"
            >
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    value={formData.password}
                    onChange={handleChange}
                    className="mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar Senha"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                    required
                />
                <input
                    type="text"
                    name="mobilePhone"
                    placeholder="Telefone"
                    value={formData.mobilePhone}
                    onChange={handleChange}
                    className="mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                />
                {message && <Notification message={message} />}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full text-white bg-primary-500 hover:ring-2 focus:outline-none hover:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center mb-6 rounded-md transition ${isSubmitting ? "cursor-not-allowed" : ""
                        }`}
                >
                    {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                </button>
            </form>
        </>
    );
}
