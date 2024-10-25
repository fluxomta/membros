import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_FUSIONAUTH_BASE_URL}/api/login`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: process.env.NEXT_PUBLIC_FUSIONAUTH_AUTH_TOKEN,
                        },
                        body: JSON.stringify({
                            loginId: credentials.email,
                            password: credentials.password,
                            applicationId: process.env.NEXT_PUBLIC_FUSIONAUTH_APPLICATION_ID,
                        }),
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    console.error("[NextAuth] Erro ao autenticar:", data);
                    throw new Error(data.message || "Credenciais inválidas.");
                }

                console.log("[NextAuth] Dados recebidos:", data);

                return {
                    id: data.user.id,
                    name: `${data.user.firstName} ${data.user.lastName}`,
                    email: data.user.email,
                    mobilePhone: data.user.mobilePhone,
                    roles: data.user.registrations[0]?.roles || [],
                    accessToken: data.token,
                    refreshToken: data.refreshToken,
                    expiresAt: Date.now() + 60 * 60 * 1000,
                };
            },
        }),
    ],
    pages: {
        signIn: "/login",           // Página de login
        newUser: "/cadastre-se",     // Redirecionamento para novos usuários
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, // A sessão expira em 1 hora
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            console.log("[NextAuth] Callback JWT disparado.");

            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.mobilePhone = user.mobilePhone;
                token.roles = user.roles;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.expiresAt = user.expiresAt;
            }

            if (trigger === "update" && session?.user) {
                token.name = session.user.name;
                token.mobilePhone = session.user.mobilePhone;
            }

            return token;
        },
        async session({ session, token }) {
            console.log("[NextAuth] Callback Session disparado.");

            session.user = {
                id: token.id,
                name: token.name,
                email: token.email,
                mobilePhone: token.mobilePhone,
                roles: token.roles,
            };
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            session.expiresAt = token.expiresAt;

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
