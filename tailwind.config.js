/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ade: ['Ade', 'sans-serif'],
        mori: ['PP Mori', 'sans-serif'],
        oskari: ['Oskari G2', 'sans-serif'],
      },
    },
  },
  plugins: [],
}