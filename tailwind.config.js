/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pblack: "#1A1A1A",
        pyellow: "#FFFF62",
        pgray: "#282828",
        plightgray: "#797979",
      },
      fontFamily: {
        plight: ["Programme-Light", "Roboto-Light"],
        pregular: ["Programme-Regular", "Roboto-Regular"],
        pbold: ["Programme-Bold", "Roboto-Bold"],
      },
    },
  },
  plugins: [],
};
