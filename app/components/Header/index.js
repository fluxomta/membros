"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";

import RightSideDrawer from "./RightSideDrawer";
import Backdrop from "./Backdrop";
import Icons from "@/components/General/Icons";

export default function Header() {
    const { session } = useAuth(); // Hook de autenticação
    const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);

    const toggleRightDrawer = () => {
        setIsRightDrawerOpen((prev) => !prev); // Alterna o estado do drawer
    };

    const closeDrawer = () => setIsRightDrawerOpen(false); // Fecha o drawer

    if (!session?.user) return null; // Renderiza apenas se o usuário estiver autenticado

    return (
        <>
            <header className="bg-primary-500 shadow-md p-4 flex justify-between items-center z-20 fixed w-full h-16">

                {/* Logo */}
                <h1 className="text-xl font-bold text-white">
                    <Link href="/dashboard">
                        <Image
                            src="/logo-fluxo.webp"
                            width={170}
                            height={38}
                            alt="Logo Fluxo MTA"
                            priority
                        />
                    </Link>
                </h1>

                {/* Botão para abrir o Right Drawer */}
                <button
                    className={`text-white font-bold flex items-center rounded-md p-2 border border-primary-400 
                    ${isRightDrawerOpen ? "bg-primary-700" : "hover:bg-primary-700"} transition`}
                    onClick={toggleRightDrawer}
                >
                    <Icons.RightDrawer height={24} width={24} className="mr-2" /> Conta
                </button>
            </header>

            {/* Backdrop */}
            <Backdrop isVisible={isRightDrawerOpen} onClick={closeDrawer} />

            {/* RightSideDrawer */}
            <RightSideDrawer
                isOpen={isRightDrawerOpen}
                onClose={closeDrawer}
                user={session.user}
            />
        </>
    );
}
