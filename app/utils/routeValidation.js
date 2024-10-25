// utils/routeValidation.js

const noLayoutRoutes = [
    "/login",
    "/cadastre-se",
    "/esqueci-a-senha",
    "/confirmar-senha",
];

export function shouldShowLayout(pathname) {
    // Retorna true se a rota atual não está nas rotas sem layout
    return !noLayoutRoutes.includes(pathname);
}
