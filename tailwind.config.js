/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],

  darkMode: ["selector", "[data-web-theme=dark]"],

  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },

    extend: {
      fontFamily: {
        heading: ["Sora", "sans-serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },

      colors: {
        primary: {
          DEFAULT: "#ff4b89",
          color: "#ffffff",

          light: {
            1: "#fff8fa",
            2: "#fff0f4",
            3: "#ffe4ec",
            4: "#ffd5e2",
            5: "#ffc3d5",
            6: "#ffacc5",
            7: "#ff8fb2",
            8: "#ff6a9a",
            9: "#ff4b89",
            10: "#e63e78",
            11: "#bb0058",
            12: "#66002c",
          },

          dark: {
            1: "#1a1014",
            2: "#221118",
            3: "#33111f",
            4: "#471322",
            5: "#591527",
            6: "#6d1830",
            7: "#8f2040",
            8: "#bb0058",
            9: "#ff4b89",
            10: "#ff6a9a",
            11: "#ffb1c3",
            12: "#ffd9e0",
          },
        },

        secondary: {
          DEFAULT: "#9d05ff",
        },

        tertiary: {
          DEFAULT: "#00dbe9",
        },

        body: {
          light: {
            1: "#fafafa",
            2: "#f5f5f5",
            3: "#ededed",
            4: "#e0e0e0",
            5: "#d4d4d4",
            6: "#c8c8c8",
            7: "#b0b0b0",
            8: "#909090",
            9: "#737373",
            10: "#606060",
            11: "#404040",
            12: "#202020",
          },

          dark: {
            1: "#131313",
            2: "#1c1b1b",
            3: "#201f1f",
            4: "#2a2a2a",
            5: "#353534",
            6: "#404040",
            7: "#525252",
            8: "#707070",
            9: "#909090",
            10: "#b0b0b0",
            11: "#d0d0d0",
            12: "#e5e2e1",
          },
        },
      },

      borderColor: {
        alpha: {
          light: "rgba(0,0,0,0.08)",
          dark: "rgba(255,255,255,0.10)",
        },
      },

      backgroundColor: {
        body: {
          striped: {
            light: "#fafafa",
            dark: "#181818",
          },
        },
      },

      boxShadow: {
        "glass":
          "0 8px 32px rgba(0,0,0,0.35)",

        "neon-pink":
          "0 0 10px rgba(255,75,137,.5), 0 0 20px rgba(255,75,137,.3)",

        "neon-purple":
          "0 0 10px rgba(157,5,255,.5), 0 0 20px rgba(157,5,255,.3)",

        "card-1":
          "0px 0px 40px rgba(255,75,137,.08)",

        "card-2":
          "0px 10px 20px rgba(0,0,0,.25)",
      },

      borderRadius: {
        xl: "1.5rem",
        "2xl": "1.75rem",
      },

      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg,#ff4b89 0%,#9d05ff 60%,#00dbe9 100%)",

        "glass-gradient":
          "linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.02))",
      },
    },
  },

  plugins: [],
};