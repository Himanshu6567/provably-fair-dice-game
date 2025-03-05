/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 2s linear infinite",
        "spin-fast": "spin 500ms linear infinite",
      },
      colors: {
        dark: "#13212C",
        primary: "#344552",
        secondary: "#253643",
        green: {
          DEFAULT: "#79FB54",
          ...require("tailwindcss/colors").green,
        },
      },
    },
  },
  plugins: [],
};
