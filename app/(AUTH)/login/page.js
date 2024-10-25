// app/login/page.js
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 rounded-md transition ${isSubmitting
                                ? "bg-blue-300 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                            } text-white`}
                    >
                        {isSubmitting ? "Entrando..." : "Entrar"}
                    </button>
                </form>
            </div>
        </div>
    );
}
