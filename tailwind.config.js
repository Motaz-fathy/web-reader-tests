/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bbc: {
          red: "#B80000",
          darkred: "#8F0000",
          black: "#141414",
          dark: "#222222",
          gray: "#545658",
          lightgray: "#F2F2F2",
          border: "#E6E8EA",
          hover: "#F6F6F6",
        },
      },
      fontFamily: {
        cairo: ["var(--font-cairo)", "sans-serif"],
        ibm: ["var(--font-ibm-plex-arabic)", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 8px rgba(0, 0, 0, 0.06)",
        card: "0 4px 20px rgba(0, 0, 0, 0.08)",
        floating: "0 12px 36px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};
