// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#002664",
        accent: "#FFCC00",
        softgray: "#F7F7F7",
        textdark: "#1F1E1B",
        bglight: "#FBFBFA",
        greylight: "#948F90",
        greymid: "#656160",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        pumarket: {
          primary: "#002664",
          secondary: "#FFCC00",
          accent: "#FFCC00",
          neutral: "#FBFBFA",
          "base-100": "#FFFFFF",
          info: "#948F90",
          error: "#DC2626",
        },
      },
    ],
    defaultTheme: "pumarket",
  },
};
