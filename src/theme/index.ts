import { Theme, responsiveFontSizes } from "@mui/material";
import { createTheme, ComponentsOverrides } from "@mui/material/styles";
import shadows from "./shadows";
import { light, dark } from "./palette";
import { ruRU } from "@mui/material/locale";

const getTheme = (mode: string): Theme =>
  responsiveFontSizes(
    createTheme(
      {
        palette: mode === "light" ? light : dark,
        shadows: shadows(mode),
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                fontSize: "1rem",
                fontWeight: 400,
                borderRadius: 5,
                paddingTop: 10,
                paddingBottom: 10,
              },
              containedSecondary: mode === "light" ? { color: "white" } : {},
            } as ComponentsOverrides["MuiButton"],
          },
          MuiInputBase: {
            styleOverrides: {
              root: {
                borderRadius: 5,
              },
            } as ComponentsOverrides["MuiInputBase"],
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: 5,
              },
              input: {
                borderRadius: 5,
              },
            } as ComponentsOverrides["MuiOutlinedInput"],
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            } as ComponentsOverrides["MuiCard"],
          },
          MuiCardContent: {
            styleOverrides: {
              root: {
                padding: 32,
              },
            } as ComponentsOverrides["MuiCardContent"],
          },

          MuiListItemText: {
            styleOverrides: {
              secondary: {
                fontStyle: "italic",
              },
            } as ComponentsOverrides["MuiListItemText"],
          },
        },
      },
      ruRU
    )
  );

export default getTheme;
