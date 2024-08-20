import tailwindcssAnimate from "tailwindcss-animate"

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "grade-1": "hsl(var(--chart-1))",
        "grade-2": "hsl(var(--chart-2))",
        "grade-3": "hsl(var(--chart-3))",
        "grade-4": "hsl(var(--chart-4))",
        "grade-5": "hsl(var(--chart-5))",
        "border": "hsl(var(--border))",
        "input": "hsl(var(--input))",
        "ring": "hsl(var(--ring))",
        "background": "hsl(var(--background))",
        "foreground": "hsl(var(--foreground))",
        "primary": {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        "secondary": {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        "tertiary": {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--tertiary-foreground))",
        },
        "current": {
          DEFAULT: "hsl(var(--current))",
          foreground: "hsl(var(--current-foreground))",
        },
        "live": {
          DEFAULT: "hsl(var(--live))",
          foreground: "hsl(var(--live-foreground))",
        },
        "destructive": {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        "danger-team": {
          DEFAULT: "hsl(var(--danger-team))",
          foreground: "hsl(var(--danger-team-foreground))",
        },
        "danger-item": {
          DEFAULT: "hsl(var(--danger-item))",
          foreground: "hsl(var(--danger-item-foreground))",
        },
        "danger-detail-class": {
          DEFAULT: "hsl(var(--danger-detail-class))",
          foreground: "hsl(var(--danger-detail-class-foreground))",
        },
        "danger-new-category": {
          DEFAULT: "hsl(var(--danger-new-category))",
          foreground: "hsl(var(--danger-new-category-foreground))",
        },
        "muted": {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        "accent": {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        "popover": {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        "card": {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        DEFAULT: "var(--shadow-custom)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
