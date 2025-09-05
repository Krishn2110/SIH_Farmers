/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        zoomIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        slowZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        zoomIn: "zoomIn 1s ease-out forwards",   // one-time zoom on load
        slowZoom: "slowZoom 20s ease-in-out infinite alternate", // continuous bg zoom
      },
    },
  },
  plugins: [],
}
