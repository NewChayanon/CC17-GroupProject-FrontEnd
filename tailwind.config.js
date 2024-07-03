/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#20831E",
        secondary: "#FFD850",
        tertiary: "#806030",
        graybg: "#F2F2F2",
        graylighttext: "#8D8D8D",
        graydarktext: "#545454",
        graylighticon: "#CCCCCC",
        absolutewhite: "#FFFFFF",
        absoluteblack: "#000000",
        darkgreen: "#1F6F1D",
        vividgreen: "#20831E",
        lightgreen: "#2E9D2B",
        darkyellow: "#EBC12B",
        vividyellow: "#FFD850",
        lightyellow: "#FDE078",
        darkbrown: "#564300",
        vividbrown: "#0806300",
        lightbrown: "#AC8704",
        verylightyellow: "#FFF3C7",
      },
    },
  },
  plugins: [require("daisyui")],
};
