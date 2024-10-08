/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      background: {
        primary: "#141828",
        secondary: "#23283D",
      },
      primary: {
        100: "#2388FF",
        200: "#FF2D46",
        300: "#FFC700",
        400: "#63DE77",
      },
      secondary: {
        100: "#1777E7",
        200: "#EAF4FF",
        300: "#DE1F35",
        400: "#FFE8EA",
        500: "#e79800",
        600: "#fff9e5",
        700: "#37C972",
        800: "#e5f8e8",
      },
      Netral: {
        100: "#ffffff",
        200: "#f8faff",
        300: "#f1f3f7",
        400: "#e1e4ed",
        500: "#b4b9c9",
        600: "#6d758f",
        700: "#353e5c",
        800: "#19213d",
      },
      overlay: {
        light: {
          100: "#ffffff66",
          200: "#ffffff80",
          300: "#ffffffa6",
          400: "#ffffffcc",
        },
        dark: {
          100: "rgba(25,33,61,40%)",
          200: "rgba(25,33,61,50%)",
          300: "rgba(25,33,61,65%)",
          400: "rgba(25,33,61,80%)",
        },
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["DM_Serif_Display", "serif"],
      },
    },
  },
  plugins: []
};

