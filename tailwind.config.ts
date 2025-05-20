import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				neon: {
					red: '#D4095D',
					darkred: '#A30747',
					pink: '#FF3884',
					purple: '#9A1F7A',
					darkpurple: '#6A1253',
					dark: '#1A1F2C'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-neon': {
					'0%, 100%': { textShadow: '0 0 5px #D4095D, 0 0 10px #D4095D, 0 0 15px #D4095D' },
					'50%': { textShadow: '0 0 20px #FF3884, 0 0 30px #FF3884, 0 0 40px #FF3884' }
				},
				'pulse-soft': {
					'0%': { opacity: '0.8', boxShadow: '0 0 5px rgba(212, 9, 93, 0.7)' },
					'50%': { opacity: '1', boxShadow: '0 0 15px rgba(212, 9, 93, 0.9)' },
					'100%': { opacity: '0.8', boxShadow: '0 0 5px rgba(212, 9, 93, 0.7)' }
				},
				'pulse-medium': {
					'0%': { opacity: '0.8', boxShadow: '0 0 5px rgba(129, 9, 212, 0.7)' },
					'50%': { opacity: '1', boxShadow: '0 0 15px rgba(129, 9, 212, 0.9)' },
					'100%': { opacity: '0.8', boxShadow: '0 0 5px rgba(129, 9, 212, 0.7)' }
				},
				'pulse-slow': {
					'0%': { opacity: '0.8', boxShadow: '0 0 5px rgba(9, 132, 212, 0.7)' },
					'50%': { opacity: '1', boxShadow: '0 0 15px rgba(9, 132, 212, 0.9)' },
					'100%': { opacity: '0.8', boxShadow: '0 0 5px rgba(9, 132, 212, 0.7)' }
				},
				'character-move': {
					'0%': { transform: 'translate(-100%, -50%) rotate(0deg)', opacity: '0' },
					'10%': { transform: 'translate(0%, -50%) rotate(10deg)', opacity: '1' },
					'90%': { transform: 'translate(calc(100vw - 100px), -50%) rotate(-10deg)', opacity: '1' },
					'100%': { transform: 'translate(100vw, -50%) rotate(0deg)', opacity: '0' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'slide-in-wave': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 5s ease-in-out infinite',
				'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
				'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
				'pulse-medium': 'pulse-medium 2.5s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
				'character-move': 'character-move 10s linear forwards',
				'fade-out': 'fade-out 1s ease-out forwards',
				'slide-in-wave': 'slide-in-wave 0.6s ease-out forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
