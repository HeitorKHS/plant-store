import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3a8902",
        secondary: "#2b5b0c",
      },
      container: {
        center: true,
        padding: "2.500rem"
      },
    },
  },
  plugins: [],
} satisfies Config;
