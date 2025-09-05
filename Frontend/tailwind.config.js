/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
<<<<<<< HEAD
    extend: {fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
      },},
=======
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
>>>>>>> 64d327245bea35fed88497cf346800dd067dc679
  },
  plugins: [],
}
