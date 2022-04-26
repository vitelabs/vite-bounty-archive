module.exports = {
  mode: 'jit', // doesn't work yet cuz CRA doesn't work with PostCSS 8 yet (https://tailwindcss.com/docs/guides/create-react-app)
  purge: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
