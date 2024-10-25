"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAuth(redirectTo = "/login") {
    const { data: session, status, update } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace(redirectTo);
        }
    }, [status, router, redirectTo]);

    return { session, status, update };
}
