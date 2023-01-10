/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "f-red": "#da0037",
        "s-red": "#b0002c",
      },
    },
  },
  plugins: [],
};
