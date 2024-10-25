// app/api/user/route.js
export async function POST(req) {
    try {
        const data = await req.json();

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_FUSIONAUTH_BASE_URL}/api/user/registration`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: process.env.NEXT_PUBLIC_FUSIONAUTH_AUTH_TOKEN,
                },
                body: JSON.stringify({
                    user: data.user,
                    registration: {
                        applicationId: process.env.NEXT_PUBLIC_FUSIONAUTH_APPLICATION_ID,
                    },
                    skipVerification: false,
                }),
            }
        );

        const responseData = await res.json();

        if (!res.ok) {
            const errorMessages = Object.entries(responseData.fieldErrors)
                .map(([field, errors]) =>
                    errors.map((error) => `${field}: ${error.message}`).join(", ")
                )
                .join("; ");

            console.error("[API] Erros ao criar usuário:", errorMessages);
            return new Response(JSON.stringify({ message: errorMessages }), {
                status: 400,
            });
        }

        console.log("[API] Usuário criado com sucesso:", responseData);
        return new Response(JSON.stringify(responseData), { status: 201 });

    } catch (error) {
        console.error("[API] Erro interno:", error);
        return new Response(
            JSON.stringify({ message: "Erro interno no servidor" }),
            { status: 500 }
        );
    }
}
