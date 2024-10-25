import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // Permitir acesso livre ao login e rotas de autenticação
    if (pathname.startsWith("/auth/login") || pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    // Verifica se a rota é protegida (dashboard e conta)
    const protectedRoutes = ["/dashboard", "/conta/profile", "/conta/edit-profile"];

    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}
