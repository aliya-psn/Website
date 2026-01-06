/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['OPPO Sans', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'song': ['SimSun', 'STSong', '宋体', 'serif'],
      },
      screens: {
        'md': '900px',
        'lg': '1200px',
        'xl': '1600px',
        '2xl': '2000px',
        '3xl': '2560px',
      },
    },
  },
  plugins: [],
}

