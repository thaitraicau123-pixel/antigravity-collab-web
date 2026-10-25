import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ide: {
          bg: "#0B0F19",
          surface: "#111827",
          panel: "#161F30",
          border: "#1F293D",
          borderHover: "#374151",
          editor: "#1E1E1E",
        },
      },
    },
  },
  plugins: [],
};
export default config;
