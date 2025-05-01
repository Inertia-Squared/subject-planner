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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        '2xs': '0.7rem'
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'gradient-fast': 'gradient 2s linear infinite '
      },

      keyframes: {
        'gradient': {
          to: { 'background-position': '200% center' },
        }
      }
    },
  },
  plugins: [
    require('tailwindcss-animated'),
  ],
} satisfies Config;
