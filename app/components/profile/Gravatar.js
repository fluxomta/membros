// components/profile/Gravatar.js
"use client"; // Este componente é um cliente

import Image from 'next/image';
import md5 from "crypto-js/md5";
import { useSession } from "next-auth/react"; // Importando o hook useSession
import Loading from "@/components/General/Loading";


export default function Gravatar({ size = 80, alt = "User Avatar" }) {
    const { data: session, status } = useSession(); // Obtém os dados da sessão

    if (status === "loading") return <Loading />;


    const email = session?.user?.email || ""; // Recupera o email do usuário
    const hash = md5(email.trim().toLowerCase()); // Cria o hash do email
    const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`; // Monta a URL do Gravatar

    return (
        <Image
            src={gravatarUrl}
            alt={alt}
            width={size}
            height={size}
            className="rounded-full"
            priority // Carrega a imagem com prioridade
        />
    );
}
