/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Playfair: ["Playfair Display", "sans-serif"],
        Merri: ["Merriweather", "serif"],
        Open: ["Open Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"], // Poppins font
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        primary: "#593cfb",
        second: "#6463eb",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};

