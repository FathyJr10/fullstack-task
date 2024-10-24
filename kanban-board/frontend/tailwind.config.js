/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paleBlue: '#B9D0DF', // Define the name 'customPaleBlue' or any name you prefer
      },
    },
  },
  plugins: [],
}

