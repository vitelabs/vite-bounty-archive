module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    boxShadow: {
      select:
        '0px 0px 4px rgba(71, 73, 79, 0.1), 0px 1px 2px rgba(71, 73, 79, 0.25);'
    },
    extend: {}
  },
  variants: {
    extend: {
      backgroundColor: ['active']
    }
  },
  plugins: [require('@tailwindcss/forms', '@tailwindcss/custom-forms')]
}
