/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Newsreader', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 18px 48px rgba(26, 32, 40, 0.09)',
        'card-lg': '0 28px 88px rgba(24, 30, 38, 0.14)',
      },
    },
  },
  plugins: [],
}
