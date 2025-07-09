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
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
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
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
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
				// Industry-specific color schemes
				tech: {
					primary: 'hsl(var(--tech-primary))',
					secondary: 'hsl(var(--tech-secondary))',
					accent: 'hsl(var(--tech-accent))',
					bg: 'hsl(var(--tech-bg))',
					surface: 'hsl(var(--tech-surface))',
					text: 'hsl(var(--tech-text))',
					border: 'hsl(var(--tech-border))'
				},
				creative: {
					primary: 'hsl(var(--creative-primary))',
					secondary: 'hsl(var(--creative-secondary))',
					accent: 'hsl(var(--creative-accent))',
					bg: 'hsl(var(--creative-bg))',
					surface: 'hsl(var(--creative-surface))',
					text: 'hsl(var(--creative-text))',
					border: 'hsl(var(--creative-border))'
				},
				finance: {
					primary: 'hsl(var(--finance-primary))',
					secondary: 'hsl(var(--finance-secondary))',
					accent: 'hsl(var(--finance-accent))',
					bg: 'hsl(var(--finance-bg))',
					surface: 'hsl(var(--finance-surface))',
					text: 'hsl(var(--finance-text))',
					border: 'hsl(var(--finance-border))'
				},
				healthcare: {
					primary: 'hsl(var(--healthcare-primary))',
					secondary: 'hsl(var(--healthcare-secondary))',
					accent: 'hsl(var(--healthcare-accent))',
					bg: 'hsl(var(--healthcare-bg))',
					surface: 'hsl(var(--healthcare-surface))',
					text: 'hsl(var(--healthcare-text))',
					border: 'hsl(var(--healthcare-border))'
				},
				business: {
					primary: 'hsl(var(--business-primary))',
					secondary: 'hsl(var(--business-secondary))',
					accent: 'hsl(var(--business-accent))',
					bg: 'hsl(var(--business-bg))',
					surface: 'hsl(var(--business-surface))',
					text: 'hsl(var(--business-text))',
					border: 'hsl(var(--business-border))'
				}
			},
			backgroundImage: {
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-button': 'var(--gradient-button)',
				'gradient-card': 'var(--gradient-card)',
				// Industry-specific gradients
				'gradient-tech': 'linear-gradient(135deg, hsl(var(--tech-primary)), hsl(var(--tech-secondary)))',
				'gradient-creative': 'linear-gradient(135deg, hsl(var(--creative-primary)), hsl(var(--creative-secondary)), hsl(var(--creative-accent)))',
				'gradient-finance': 'linear-gradient(135deg, hsl(var(--finance-bg)), hsl(var(--finance-surface)))',
				'gradient-healthcare': 'linear-gradient(135deg, hsl(var(--healthcare-bg)), hsl(var(--healthcare-surface)))',
				'gradient-business': 'linear-gradient(135deg, hsl(var(--business-bg)), hsl(var(--business-surface)))',
				// Circuit pattern for tech
				'circuit-pattern': 'radial-gradient(circle at 20% 20%, hsl(var(--tech-primary) / 0.1) 0%, transparent 20%), radial-gradient(circle at 80% 80%, hsl(var(--tech-secondary) / 0.1) 0%, transparent 20%)'
			},
			boxShadow: {
				'glass': 'var(--shadow-glass)',
				'glow': 'var(--shadow-glow)',
				'card': 'var(--shadow-card)'
			},
			backdropBlur: {
				'glass': '20px'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				body: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
				serif: ['Playfair Display', 'Georgia', 'serif'],
				mono: ['ui-monospace', 'SFMono-Regular', 'monospace']
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1rem' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem' }],
				'base': ['1rem', { lineHeight: '1.5rem' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'5xl': ['3rem', { lineHeight: '1.2' }],
				'6xl': ['3.75rem', { lineHeight: '1.2' }],
				'7xl': ['4.5rem', { lineHeight: '1.1' }],
				'8xl': ['6rem', { lineHeight: '1' }],
				'9xl': ['8rem', { lineHeight: '1' }]
			},
			letterSpacing: {
				tighter: '-0.05em',
				tight: '-0.025em',
				normal: '0em',
				wide: '0.025em',
				wider: '0.05em',
				widest: '0.1em'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'slide-up': 'slide-up 0.4s ease-out forwards',
				'scale-in': 'scale-in 0.3s ease-out forwards',
				'bounce-subtle': 'bounce-subtle 0.6s ease-out forwards',
				'float': 'float 3s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite'
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
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'bounce-subtle': {
					'0%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
					'100%': { transform: 'translateY(0)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				}
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
