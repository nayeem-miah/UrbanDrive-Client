/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Poppins font
        lato: ['Lato', 'sans-serif'],       // Lato font
      },
    },
  },
  plugins: [],
}

