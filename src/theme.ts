import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  fonts: {
    body: "Roboto, arial",
    heading: "inherit",
    mono: "inherit"
  },
  fontSizes: {
    xs: "1rem",
    sm: "1.3rem",
    md: "1.6rem",
    lg: "1.8rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
    "4xl": "5rem",
    "5xl": "6rem",
    "6xl": "7rem"
  },
});

export default theme;
