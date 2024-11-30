/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust the path as per your project
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: '#f9f8f1',
        foreground: "hsl(var(--foreground))",
        text: '#111007',
        primary: {
          DEFAULT: '#d6d3a2',
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: '#b6e4b6',
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: '#3c704e',
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        prociono: ['Prociono', 'serif'],
      },
      fontSize: {
        base: '1rem', // 16px
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}