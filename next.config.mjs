/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.gravatar.com',
                pathname: '/avatar/**',
            },
        ],
    },
    env: {
        NEXT_PUBLIC_FUSIONAUTH_BASE_URL: process.env.NEXT_PUBLIC_FUSIONAUTH_BASE_URL,
        NEXT_PUBLIC_FUSIONAUTH_AUTH_TOKEN: process.env.NEXT_PUBLIC_FUSIONAUTH_AUTH_TOKEN,
        NEXT_PUBLIC_FUSIONAUTH_APPLICATION_ID: process.env.NEXT_PUBLIC_FUSIONAUTH_APPLICATION_ID,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    },
};

export default nextConfig;
