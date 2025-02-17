/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        softGreen: '#58D68D',  // Soft green (defined)
        charcoalGray: '#2C3E50', // Charcoal gray (defined)
        slateBlue: '#5D6D7E',  // Slate blue (defined)
        green: {
          100: '#D5F5E3',  // Light green
          200: '#A9DFBF',  // Mid-light green
          300: '#58D68D',  // Soft green
        },
        blue: {
          900: '#1A5276', // Dark blue for contrasting text or borders
        },
        white: '#FFFFFF', // For any pure white elements
        gray: {
          300: '#D5D8DC', // Soft gray for light elements
          700: '#7B7D7D', // Gray text
          800: '#585858', // Dark gray for text
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
