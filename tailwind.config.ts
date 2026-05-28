import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        page: {
          start: "#EEEEEE",
          end: "#DADADA"
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F0F0F0",
          glass: "rgba(255,255,255,0.75)"
        },
        text: {
          primary: "#2B2B2B",
          secondary: "#7B7B7B",
          muted: "#A4A4A4",
          inverse: "#FFFFFF"
        },
        brand: {
          dark: "#1A1A1A",
          darker: "#111111",
          accent: "#FF704D",
          orange: "#F57A21",
          red: "#A21D1D",
          ink: "#061826"
        },
        chrome: {
          dark: "#303234",
          bar: "#666B72"
        },
        navigation: {
          dark: "#121212"
        },
        icon: {
          default: "#2B2B2B",
          muted: "#8A8A8A",
          soft: "#C8C8C8",
          blue: "#3B7EA8",
          lavender: "#C7BEDD",
          danger: "#FF3838"
        }
      },
      backgroundImage: {
        "gradient-page": "linear-gradient(180deg, theme(colors.page.start) 0%, theme(colors.page.end) 100%)",
        "gradient-logo": "linear-gradient(135deg, theme(colors.brand.orange) 0%, theme(colors.brand.red) 100%)",
        "gradient-button": "linear-gradient(180deg, theme(colors.brand.dark) 0%, theme(colors.brand.darker) 100%)"
      },
      boxShadow: {
        sidebar: "0px 32px 48px rgba(0,0,0,0.20)",
        button: "inset 0 1px 0 rgba(255,255,255,0.18), 0 10px 18px rgba(0,0,0,0.18)",
        soft: "0 16px 48px rgba(0,0,0,0.10)"
      },
      borderRadius: {
        panel: "16px",
        pill: "999px"
      },
      spacing: {
        sidebar: "304px",
        "sidebar-panel": "756px",
        navbar: "56px"
      },
      maxHeight: {
        "sidebar-panel": "756px"
      },
      backdropBlur: {
        nav: "4px",
        mobile: "24px"
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        sans: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        secondary: ["var(--font-inter)", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
