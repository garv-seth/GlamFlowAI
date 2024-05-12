import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#C17E76",
    secondary: "#FFE0D1",
    background: "#f4f4f9",
    text: "#2a3353",
    button: {
      bg: "#F19E93",
      text: "#f4f4f9",
      hoverBg: "#d98872",
      disabledBg: "#EEE0E0",
      disabledText: "#7f8c8d",
    },
  },
  // fonts: {
  //   body: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  //   heading: "Georgia, serif",
  // },
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    heading: "Georgia, serif",
  },
});

export default theme;
