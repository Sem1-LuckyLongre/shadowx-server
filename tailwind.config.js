/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
        spin: "spin 1s linear infinite", // Ensure default spin is defined
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      colors: {
        primary: {
          500: "#6366f1",
          600: "#4f46e5",
        },
        dark: {
          700: "#1e293b",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("autofill", "&:-webkit-autofill");
    },
  ],
};
