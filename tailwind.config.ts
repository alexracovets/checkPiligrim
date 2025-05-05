import tailwindcssAnimate from "tailwindcss-animate";
import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		screens: {
			'tablet': '1030px',
			'mobile': '540px',
		},
		extend: {
			fontFamily: {
				'oswald': ["var(--font-oswald)"],
				'imb': ["var(--font-imb)"]
			},
			colors: {
				'regal-black': '#000000',
				'regal-white': '#FFFFFF',
				'regal-orange': '#FF6328',
				'regal-gray': '#E9E9E9',
				'opacity-orange': '#ff632800'
			},
			objectPosition: {
				'afon': '-13rem -16rem',
			},
			boxShadow: {
				'card': '0 0 .5rem .1rem #3e3d3a59',
				'cardHover': '0 0 1rem 0.5rem #3e3d3a3d'
			}
		}
	},
	plugins: [tailwindcssAnimate],
};
export default config;
