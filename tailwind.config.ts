import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		darkMode: 'selector',

		extend: {
			colors: {
				neutral: {
					50: '#ececec',
					100: '#e0e0e0',
					200: '#c2c2c2',
					300: '#8c8c8c',
					400: '#666060',
					500: '#4d4949',
					600: '#3a3333',
					700: '#2a2525',
					800: '#1c1818',
					900: '#121010',
					950: '#0a0808',
				},
			},
			fontFamily: {
				sans: ['Raleway'],
				body: ['Open Sans'],
			},
			container: {
				center: true,
				padding: '1rem',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [],
};
export default config;
