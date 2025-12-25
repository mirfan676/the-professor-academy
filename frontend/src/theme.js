// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#0056B3",
      light: "#4C8DFF",
      dark: "#003C80",
    },

    secondary: {
      main: "#D4AF37", // Gold
    },

    background: {
      default: "#0A0A0A",
      paper: "#121212",
    },

    text: {
      primary: "#FFFFFF",
      secondary: "#BDBDBD",
    },

    divider: "rgba(255,255,255,0.08)",
  },

  typography: {
    fontFamily: "Poppins, Roboto, Helvetica, Arial, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: ".3px",
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#0A0A0A",
        },
      },
    },

    // GLOBAL BUTTON STYLE
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          padding: "10px 20px",
          fontWeight: 600,
          transition: "0.3s",
        },
        containedPrimary: {
          background:
            "linear-gradient(135deg, #0056B3, #4C8DFF)",
          boxShadow: "0 8px 20px rgba(0,0,0,.4)",
          "&:hover": {
            background:
              "linear-gradient(135deg, #4C8DFF, #0056B3)",
            transform: "translateY(-2px)",
            boxShadow: "0 12px 30px rgba(0,0,0,.6)",
          },
        },
        outlinedPrimary: {
          borderColor: "#4C8DFF",
          "&:hover": {
            borderColor: "#FFFFFF",
            backgroundColor: "rgba(76,141,255,0.1)",
          },
        },
      },
    },

    // Links hover consistent
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
          opacity: 0.85,
          transition: "0.3s",
          "&:hover": {
            opacity: 1,
            color: "#4C8DFF",
          },
        },
      },
    },

    // Cards
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#121212",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.06)",
        },
      },
    },
  },
});

export default theme;
