// components/Header/index.js
"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { shouldShowLayout } from "@/utils/routeValidation";
import useAuth from "@/hooks/useAuth";

import Avatar from "./Avatar";
import UserInfo from "./UserInfo";
import Dropdown from "./Dropdown";

export default function Header() {
    const { session, status } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const dropdownRef = useRef(null); // Referência para o dropdown

    // Verifica se o layout deve ser mostrado
    if (!shouldShowLayout(pathname)) return null;

    const toggleDropdown = () => setIsOpen(!isOpen);
    const closeDropdown = () => setIsOpen(false); // Função para fechar o dropdown

    // Fecha o dropdown ao clicar fora dele
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-primary-500 shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold">
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
                {session?.user && (
                    <div className="relative" ref={dropdownRef}>
                        <div
                            onClick={toggleDropdown}
                            className="flex items-center text-white space-x-3 cursor-pointer bg-primary-600 hover:bg-primary-700 transition-all p-2 rounded-md"
                        >
                            <Avatar email={session.user.email} />
                            <UserInfo user={session.user} />
                        </div>
                        <Dropdown user={session.user} isOpen={isOpen} closeDropdown={closeDropdown} />
                    </div>
                )}
            </div>
        </header>
    );
}
