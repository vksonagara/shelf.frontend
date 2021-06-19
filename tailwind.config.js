module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#310b2be0",
          base: "#3c2539",
          dark: "#242023",
          darker: "#1d1f1d",
        },
        secondary: {
          base: "#b59427",
          dark: "hsl(308deg 45% 13%)",
        },
        tertiary: {
          base: "#454545",
        },
        info: {
          base: "#ef9c00",
        },
        black: {
          light: "#2c3338",
        },
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled", "hover"],
      cursor: ["disabled", "hover"],
      backgroundOpacity: ["hover"],
    },
  },
  plugins: [],
};
