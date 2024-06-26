/** @type {import('tailwindcss').Config} */
module.exports = {
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
      screens: {
        "2xl": "1920px",
      },
    },
    extend: {
      colors: {
        "health-blue-thin": "#76A6D7",
        "health-blue-light": "#9CCBFB",
        "health-blue-reguler": "#286DA8",
        "health-blue-medium": "#1F4E78",
        "health-blue-dark": "#004878",
        "health-red-light": "#A82828",
        "health-red-dark": "#6F1C1C",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
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
          DEFAULT: "hsl(var(--accent))",
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
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // fontFamily: {
      //   regular: ['Poppins-Regular'],
      //   medium: ['Poppins-Medium'],
      //   italic_medium: ['Poppins-Medium-Italic'],
      //   semibold: ['Poppins-Semibold'],
      //   bold: ['Poppins-Bold'],
      //   lato_regular: ['Lato-Regular'],
      //   lato_black: ['Lato-Black'],
      //   lato_bold: ['Lato-Bold'],
      //   lato_italic: ['Lato-Italic'],
      // },
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
      backgroundImage: {
        "landing-half":
          "linear-gradient(to right, rgba(0,0,0,0.5), rgba(255,255,255,1) 75%), url(/images/background-1.png)",
        "landing-full":
          "linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.5) 75%), url(/images/background-1.png)",
      },
      dropShadow: {
        text: "0 0.75px 0.75px rgba(255,255,255,1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
