const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./common/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        "512": "512px",
        main: "calc(100vh + 200px)",
      },
      keyframes: {
        "move-right": {
          from: { transform: "translate3d(-50px, 0, 0)" },
          to: {
            transform: "translate3d(50px, 0, 0)",
          },
          "0%": { opacity: "0" },
          "25%": { opacity: ".2" },
          "50%": { opacity: ".5" },
          "75%": { opacity: ".7" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "move-right": "move-right 2s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
export default config;
