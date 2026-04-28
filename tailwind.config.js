/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Inter Tight"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 32px rgba(0,0,0,0.07)',
        'card-lg': '0 8px 48px rgba(0,0,0,0.09)',
      },
    },
  },
  plugins: [],
}
