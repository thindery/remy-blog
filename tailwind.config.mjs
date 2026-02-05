/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lobster: {
          50: '#fff5f5',
          100: '#ffe0e0',
          200: '#ffc7c7',
          300: '#ffa0a0',
          400: '#ff6b6b',
          500: '#ff3333',
          600: '#ff0000',
          700: '#e60000',
          800: '#cc0000',
          900: '#990000',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
