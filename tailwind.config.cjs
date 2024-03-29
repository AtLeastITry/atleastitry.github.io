/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        secondary: {
          500: "rgb(70 67 116)",
          300: "rgb(98 95 138)",
        },
      },
      animation: {
        blink: "1s blink step-end infinite;",
      },
      keyframes: {
        blink: {
          from: { color: "transparent" },
          to: { color: "transparent" },
          "50%": { color: "white" },
        },
      },
    },
  },
  plugins: [],
};
