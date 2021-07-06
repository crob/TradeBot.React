import { extendTheme } from '@chakra-ui/react';
import { mode } from "@chakra-ui/theme-tools";

const inputLGStyle = {
  h: 20,
  minW: 12,
  fontSize: "lg",
  p: 5,
  borderRadius: 'none'
};


const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fonts: {
    body: "Roboto, arial",
    heading: "inherit",
    mono: "inherit"
  },
  colors: {
    whiteAlpha: {
      50: "rgba(255, 255, 255, 0.04)",
      100: "rgba(255, 255, 255, 0.06)",
      200: "rgba(255, 255, 255, 0.06)",
      300: "rgba(255, 255, 255, 0.06)",
      400: "rgba(255, 255, 255, 0.06)",
      500: "rgba(255, 255, 255, 0.06)",
      600: "rgba(255, 255, 255, 0.06)",
      700: "rgba(255, 255, 255, 0.06)",
      800: "rgba(255, 255, 255, 0.06)",
      900: "rgba(255, 255, 255, 0.96)"
    }
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
  components: {
    Link: {
      baseStyle: {
        color: 'cyan.400',
        fontSize: 'lg',
        _hover: {
          color: 'cyan.200',
        },
      }
    },
    FormLabel: {
      baseStyle: {
        fontSize: 'lg'
      }
    },
    Input: {
      sizes: {
        lg: {
          field: inputLGStyle,
          addon: inputLGStyle
        }
      },
      defaultProps: {
        size: 'lg',
        variant: "outline"
      }
    },
    Select: {
      sizes: {
        lg: {
          field: inputLGStyle,
          addon: inputLGStyle
        }
      },
      defaultProps: {
        size: 'lg',
        variant: "outline"
      }
    },
    Button: {
      baseStyle: {
        borderRadius: 'none',
        color: "#ffffff"
      },
      sizes: {
        lg: {
          h: 20,
          minW: 12,
          fontSize: "lg",
          p: 10
        }
      },
      defaultProps: {
        size: "lg",
        colorScheme: "green",
        // variant: 'outline'
      }
    },
  },
});

export default theme;
