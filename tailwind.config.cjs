/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'primary-red': 'hsl(10, 79%, 65%)',
      'primary-cyan': 'hsl(186, 34%, 60%)'
    }
  },
  plugins: [],
}