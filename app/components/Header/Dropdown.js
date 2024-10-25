// components/Header/Dropdown.js
"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Dropdown({ user, isOpen, closeDropdown }) {
    if (!isOpen) return null;

    const handleSignOut = () => {
        closeDropdown();
        signOut({ callbackUrl: "/login" });
    };

    return (
        <div className="absolute right-0 mt-2 w-full bg-white shadow-lg rounded-md overflow-hidden z-50">
            <Link
                href="/conta/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={closeDropdown}
            >
                Perfil
            </Link>
            <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
            >
                Sair
            </button>
        </div>
    );
}
