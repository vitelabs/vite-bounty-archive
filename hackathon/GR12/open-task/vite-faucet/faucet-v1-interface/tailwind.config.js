module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['"Montserrat"', 'sans-serif'],
      },
      colors: {
        'vite-primary': '#007aff',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
