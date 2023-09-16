/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      animation: {
        blink: "1s blink step-end infinite;",
      },
      keyframes: {
        blink: {
          from: { color: "transparent" },
          to: { color: "transparent" },
          "50%": { color: "white"},
        },
      },
    },
  },
  plugins: [],
};
