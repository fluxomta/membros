/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E0E0E0",
          100: "#C9C9C9",
          200: "#9E9E9E",
          300: "#757575",
          400: "#4A4A4A",
          500: "#1F1F1F",
          600: "#1A1A1A",
          700: "#121212",
          800: "#0D0D0D",
          900: "#050505",
          950: "#030303",
        },
      },
    },
  },
  plugins: [],
};
