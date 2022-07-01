// const plugin = require('tailwindcss/plugin');

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', '*.html'],
	darkMode: 'class',
	plugins: [],
	theme: {
		extend: {
			fontFamily: {
				// sans: ['arial', 'sans-serif'],
			},
			colors: {
				skin: {
					highlight: 'var(--highlight-color)',
					medlight: 'var(--medlight-color)',
					lowlight: 'var(--lowlight-color)',
					alt: 'var(--alt-color)',
					'bg-base': 'var(--bg-base-color)',
					'text-muted-background': 'var(--text-muted-background)',
					'text-muted': 'var(--text-muted-color)',
				},
			},
			textColor: {
				skin: {
					primary: 'var(--text-primary-color)',
					secondary: 'var(--text-secondary-color)',
					blue: 'var(--text-blue)',
					muted: 'var(--text-muted-color)',
					// highlight: 'var(--highlight-color)',
				},
			},
			backgroundColor: {
				skin: {
					base: 'var(--bg-base-color)',
					middleground: 'var(--bg-middleground-color)',
					foreground: 'var(--bg-foreground-color)',
					'line-divider': 'var(--bg-line-divider-color)',
				},
			},
			borderColor: {
				skin: {
					foreground: 'var(--bg-foreground-color)',
				},
			},
		},
	},
};
