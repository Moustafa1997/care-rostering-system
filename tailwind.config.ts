import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '1rem',
  		screens: {
  			'2xl': '1400px',
  			xl: '1200px',
  			lg: '1024px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			inter: [
  				'Inter',
  				'sans-serif;'
  			]
  		},
  		screens: {
  			fluid: '100%',
  			xl: '1280px',
  			lg: '1024px',
  			md: '768px',
  			sm: '640px',
  			'4xl': '2560px',
  			'3xl': '1800px',
  			'2xl': '1400px',
  			'ex-sm': '350px'
  		},
  		minHeight: {
  			'screen-minus-210': 'calc(100vh - 210px)'
  		},
  		backgroundSize: {
  			auto: 'auto',
  			cover: 'cover',
  			contain: 'contain',
  			'50%': '50%',
  			'100%': '100%'
  		},
      colors: {
        primaryColors: {
          default: "#FF8912",
		  default2: "#FFA245",
          dark: "#DE6F00",
          blue: "#1A4B8A",
          navy: "#0B3061",
          disabled: "#E5E7EB",
        },
        blue: {
          dark1: "#253BAA",
          dark2: "#1A2D8A",
          dark3: "#2e45af",
          bright: "#0087E1",
          medium: "#236AC8",
          soft: "#4989C5",
          light: "#D9EDFB",
          light2: "#435AD0",
          pale: "#F0F6FA",
        },
        white: "#FFFFFF",
        black: "#000000",
        gray: {
          100: "#F0F6FA",
          200: "#D9EDFB",
          300: "#939393",
          400: "#676767",
          500: "#303030",
          600: "#E6E5E5",
        },

        red: "#FF0000",
        cyan: "#0AD6E4",
		    lightgray: '#f4f4f4',
        darkBlueGray: "#2F3E53",
        purple:"#D0D8FF",
        green: "#A3D6CB",
        cream:"#E5C7C7",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))"
        }
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
  plugins: [require("tailwindcss-animate")]
};
export default config;
