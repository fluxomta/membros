// app/login/page.js
"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Notification from "@/components/General/Notification";

export default function LoginPage() {
    const { data: session, status } = useSession();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState("");
    const router = useRouter();

    // Verifica se já existe uma sessão ativa
    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/dashboard");
        }
    }, [status, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const res = await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password,
        });

        if (res?.error) {
            setError("Credenciais inválidas. Tente novamente.");
        } else {
            router.push("/dashboard");
        }

        setIsSubmitting(false);
    };

    return (
        <>
            {/* Notificação global (se houver) */}
            {notification && <Notification message={notification} />}

            <div className="text-md pb-2 text-center text-white">
                Realize o login para acessar o Dashboard.
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col bg-white shadow-xl p-6 md:p-10 2xl:p-12 3xl:p-14 rounded-md border border-primary-700/50"
                data-bitwarden-watching="1"
            >
                <div className="pb-2">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-base font-medium text-primary-300"
                    >
                        Email
                    </label>
                    <div className="relative text-gray-400">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                            required
                        />
                    </div>
                </div>
                <div className="pb-6">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-base font-medium text-primary-300"
                    >
                        Password
                    </label>
                    <div className="relative text-gray-400">
                        <input
                            type="password"
                            name="password"
                            placeholder="Senha"
                            value={formData.password}
                            onChange={handleChange}
                            className="mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full text-white bg-primary-500 hover:ring-2 focus:outline-none hover:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center mb-6 rounded-md transition ${isSubmitting ? "cursor-not-allowed" : ""
                        }`}
                >
                    {isSubmitting ? "Entrando..." : "Entrar"}
                </button>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <div className="text-sm font-light text-[#1f1f1f] text-center">
                    <Link
                        href="/cadastre-se"
                        className="font-medium text-primary-500 hover:underline"
                    >
                        Criar Conta
                    </Link>
                </div>
            </form>
        </>
    );
}
