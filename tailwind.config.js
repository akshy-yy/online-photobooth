/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vintage: {
          bg: '#F5F2EB', // Creamy beige background
          brown: '#6B4423', // Dark brown for text and buttons
          border: '#D9C5B2',
          black: '#1A1A1A',
          white: '#FFFFFF',
          strip1: '#FAF8F5',
          strip2: '#FDEAEB',
          strip3: '#E3F2F2',
          strip4: '#F5E6D3',
        }
      },
      fontFamily: {
        cursive: ['"Great Vibes"', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
