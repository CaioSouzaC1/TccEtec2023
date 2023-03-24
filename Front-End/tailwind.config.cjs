/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "f-red": "#da0037",
        "s-red": "#b0002c",
        "f-black": "#171717",
        "s-black": "#242424",
        "f-gray": "#444444",
        "s-gray": "#282828",
        "f-blue": "#0c4a88",
      },
    },
  },
  plugins: [],
};
