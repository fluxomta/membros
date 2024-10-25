// (AUTH)/layout.js
"use client";
import "../globals.css";
import Image from "next/image";

export default function AuthLayout({ children }) {
    return (
        <div className="auth-bg min-h-screen flex items-center justify-center bg-primary-500">
            <div className="text-primary-500 flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14">
                <div className="flex flex-col justify-center items-center gap-3 pb-4">
                    <div>
                        <Image
                            src="/logo-fluxo.webp"
                            width={170}
                            height={38}
                            alt="Logo Fluxo MTA"
                            priority
                        />
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}
