import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/app/**/*.{ts,tsx}",
		"./src/components/**/*.{ts,tsx}",
		"./src/lib/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: [
					'var(--font-inter)',
					...fontFamily.sans
				],
				archivo: [
					'var(--font-archivo)',
					'sans-serif'
				]
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// RADIX Scales
				green: {
					1: 'var(--green-1)',
					2: 'var(--green-2)',
					3: 'var(--green-3)',
					4: 'var(--green-4)',
					5: 'var(--green-5)',
					6: 'var(--green-6)',
					7: 'var(--green-7)',
					8: 'var(--green-8)',
					9: 'var(--green-9)',
					10: 'var(--green-10)',
					11: 'var(--green-11)',
					12: 'var(--green-12)',
					a1: 'var(--green-a1)',
					a9: 'var(--green-a9)',
				},
				gray: {
					1: 'var(--gray-1)',
					2: 'var(--gray-2)',
					3: 'var(--gray-3)',
					4: 'var(--gray-4)',
					5: 'var(--gray-5)',
					6: 'var(--gray-6)',
					7: 'var(--gray-7)',
					8: 'var(--gray-8)',
					9: 'var(--gray-9)',
					10: 'var(--gray-10)',
					11: 'var(--gray-11)',
					12: 'var(--gray-12)',
					a1: 'var(--gray-a1)',
					a9: 'var(--gray-a9)',
				},
				// Brand Specific Aliases (from Brand Kit)
				'brand-yellow': '#ffd23f',
				'brand-cream': '#f7eacb',
				'brand-green': '#2f6b3f',
				'brand-green-light': '#008c4c',
				'brand-green-dark': '#1b231d',

				// Legacy/Semantic mapping adjustments if needed
				'surface': 'var(--gray-1)',
				'surface-2': 'var(--gray-2)',
				// 'green-1': 'var(--green-9)', // override old green-1 with new primary
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
