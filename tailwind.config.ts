
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
				cyber: {
					dark: '#0a192f',
					light: '#172a45',
					highlight: '#64ffda',
					text: '#8892b0',
					alert: '#ff5555'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"pulse-glow": {
					"0%, 100%": { 
						boxShadow: "0 0 5px 0 rgba(100, 255, 218, 0.4)" 
					},
					"50%": { 
						boxShadow: "0 0 20px 5px rgba(100, 255, 218, 0.7)" 
					},
				},
				typing: {
					"0%": { width: "0" },
					"100%": { width: "100%" }
				},
				"blink-caret": {
					"from, to": { borderColor: "transparent" },
					"50%": { borderColor: "rgba(100, 255, 218, 0.7)" }
				},
				matrix: {
					"0%": { transform: "translateY(-100%)" },
					"100%": { transform: "translateY(100vh)" }
				},
				flip: {
					"0%": { transform: "rotateY(0deg)" },
					"100%": { transform: "rotateY(180deg)" }
				},
				flipBack: {
					"0%": { transform: "rotateY(180deg)" },
					"100%": { transform: "rotateY(0deg)" }
				},
				fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"pulse-glow": "pulse-glow 2s infinite",
				"typing": "typing 3.5s steps(40, end)",
				"blink-caret": "blink-caret .75s step-end infinite",
				"matrix": "matrix 20s linear infinite",
				"flip": "flip 0.6s ease-in-out forwards",
				"flip-back": "flipBack 0.6s ease-in-out forwards",
				"fade-in": "fadeIn 0.5s ease-in"
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
