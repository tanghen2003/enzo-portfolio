/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'matrix': {
          DEFAULT: '#00ffaa',
          dark: '#00aa77',
          light: '#00ffcc',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'bounce-slow': 'bounce 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
