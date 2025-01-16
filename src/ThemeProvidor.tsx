import { createTheme, responsiveFontSizes, CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import createPalette from "@mui/material/styles/createPalette";
import { useAtomValue } from "jotai";
import { PropsWithChildren, useMemo } from "react";

import darkModeAtom from "./atoms/darkmode";

type CustomThemeVariables = {
  navigation: {
    drawerWidth: number;
    drawerWidthCollapsed: number;
    toolbarHeight: number;
  };
  border: {
    default: string;
  };
  borderRadius: {
    default: number;
  };
};

declare module "@mui/material/styles" {
  interface Theme {
    variables: CustomThemeVariables;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    variables: CustomThemeVariables;
  }
  // custom palette color
  interface TypeBackground {
    header: string;
    subHeader: string;
    accordion: string;
  }
}

const darkPalette = createPalette({
  mode: "dark",
  primary: {
    light: "rgba(255, 255, 255, 0.3)",
    main: "#1d94d3",
    dark: "rgba(255, 255, 255, 0.1)",
    contrastText: "rgba(255, 255, 255, 0.7)",
  },
  secondary: {
    main: "#1d94d3",
  },
  success: {
    main: "#14e59a",
  },
  error: {
    main: "#e31b17",
  },
  text: {
    primary: "rgba(255, 255, 255, 0.7)",
    secondary: "rgba(255, 255, 255, 0.5)",
    disabled: "rgba(255, 255, 255, 0.3)",
  },
  action: {
    active: "#fff",
    hover: "rgba(255, 255, 255, 0.08)",
    selected: "rgba(255, 255, 255, 0.16)",
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
  },
  background: {
    default: "#1c2128",
    paper: "#20262e",
    header: "#373b40",
    subHeader: "#2f363e",
    accordion: "#3a4049",
  },
  divider: "rgba(255, 255, 255, 0.12)",
});

const lightPalette = createPalette({
  mode: "light",
  primary: {
    light: "#5e5e5e",
    main: "#373737",
    dark: "#1c1c1c",
    contrastText: "#fff",
  },
  secondary: {
    light: "#76fdc4",
    main: "#1d94d3",
    dark: "#0da565",
    contrastText: "#fff",
  },
  success: {
    main: "#8ec14e",
  },
  error: {
    main: "#e31b17",
  },
  text: {
    primary: "#263238",
    secondary: "#546e7a",
    disabled: "rgba(0, 0, 0, 0.38)",
  },
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(0, 0, 0, 0.1)",
    selected: "rgba(0, 0, 0, 0.1)",
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
  },
  background: {
    paper: "#fff",
    default: "#f7f7f7",
    header: "#eee",
    subHeader: "#f7f7f7",
    accordion: "#f3f3f3",
  },
  divider: "rgba(0, 0, 0, 0.12)",
});

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const darkMode = useAtomValue(darkModeAtom);

  const palette = darkMode ? darkPalette : lightPalette;
  const spacingRatio = 8;
  const spacing = (x: number) => spacingRatio * x;

  const MuiDefaultValue = undefined;

  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          spacing: 8,
          typography: {
            fontFamily: "Roboto, Arial",
            fontSize: 14,

            h1: {
              fontSize: "3rem", // 48px
              fontWeight: "700",
            },
            h2: {
              fontSize: "2.5rem", // 40px
              fontWeight: "700",
            },
            h3: {
              fontSize: "2rem", // 32px => 30.8
              fontWeight: "700",
            },
            h4: {
              fontSize: "1.5rem", // 24px => 22.6
              fontWeight: "700",
            },
            h5: {
              fontSize: "1.375rem", // 22px => 21
              fontWeight: "700",
            },
            h6: {
              fontSize: "1.20rem", // 20px
              fontWeight: "700",
            },
            body1: {
              fontSize: "0.875rem", // 14px
              fontWeight: "500",
            },
            body2: {
              fontSize: "0.75rem", // 12px
              fontWeight: "500",
            },
          },
          palette,
          components: {
            MuiDialog: {
              defaultProps: {
                fullWidth: true,
              },
            },
            MuiDialogContent: {
              styleOverrides: {
                root: {
                  paddingTop: `${spacing(3)}px !important`,
                },
              },
            },
            MuiCssBaseline: {
              // All @global styling are now here
              styleOverrides: {
                a: {
                  color: palette.mode === "dark" ? palette.secondary.main : palette.primary.main,
                  "&:hover": {
                    cursor: "pointer",
                    textDecoration: "none",
                  },
                },
                img: {
                  maxWidth: "100%",
                },
              },
            },
            MuiCard: {
              defaultProps: {
                elevation: 0,
              },
            },
            MuiCardHeader: {
              styleOverrides: {
                root: {
                  padding: spacing(2),
                  backgroundColor: palette.background.header,
                  "& span": {
                    lineHeight: 1.25,
                  },
                },
              },
            },
            MuiCardContent: {
              styleOverrides: {
                root: {
                  padding: spacing(4),
                  "&:last-child": {
                    paddingBottom: spacing(4),
                  },
                },
              },
            },
            MuiPaper: {
              defaultProps: {
                elevation: 0,
              },
              styleOverrides: {
                root: {
                  backgroundImage: "none",
                },
              },
            },
            MuiButton: {
              defaultProps: {
                disableElevation: true,
                size: "medium",
                variant: "contained",
              },
              styleOverrides: {
                root: {
                  textTransform: "none",
                  backgroundColor: palette.mode === "dark" ? palette.primary.dark : palette.primary.main,
                  color: palette.secondary.main,
                  "&:hover": {
                    backgroundColor: palette.primary.light,
                  },
                },
              },
            },
            // @ts-ignore
            MuiLoadingButton: {
              defaultProps: {
                disableElevation: true,
                size: "medium",
                variant: "contained",
              },
            },
            MuiButtonGroup: {
              defaultProps: {
                disableElevation: true,
              },
            },
            MuiFab: {
              defaultProps: {
                size: "medium",
              },
              styleOverrides: {
                root: {
                  boxShadow: "none",
                },
              },
            },
            // MuiInputBase: {
            //   defaultProps: {
            //     margin: "dense",
            //     size: "medium",
            //   },
            //   styleOverrides: {
            //     root: {
            //       fontSize: 12,
            //     },
            //   },
            // },
            // MuiFormLabel: {
            //   styleOverrides: {
            //     root: {
            //       fontSize: 12,
            //     },
            //   },
            // },
            // MuiSelect: {
            //   styleOverrides: {
            //     select: {
            //       fontSize: 12,
            //       paddingTop: 6,
            //       paddingBottom: 6,

            //       "& label": {
            //         fontSize: 12,
            //       },
            //     },
            //   },
            // },
            // MuiFormControl: {
            //   defaultProps: {
            //     variant: "outlined",
            //     fullWidth: true,
            //     size: "medium",
            //   },
            //   styleOverrides: {
            //     root: {
            //       "& svg": {
            //         marginTop: 2,
            //         maxWidth: 18,
            //         maxHeight: 18,
            //       },
            //       "& input": {
            //         fontSize: 12,
            //         paddingTop: 8,
            //         paddingBottom: 8,
            //       },
            //       "& label": {
            //         marginTop: -2,
            //         fontSize: 12,
            //       },
            //       "& textarea": {
            //         fontSize: 12,
            //         marginTop: -3,
            //         marginBottom: -3,
            //       },
            //     },
            //   },
            // },
            // MuiFormControlLabel: {
            //   styleOverrides: {
            //     root: {
            //       "& span": {
            //         fontSize: 12,
            //       },
            //     },
            //     label: {
            //       fontSize: 12,
            //     },
            //   },
            // },
            MuiAutocomplete: {
              defaultProps: {
                size: "medium",
              },
              styleOverrides: {
                root: {
                  "& label": {
                    fontSize: 12,
                  },
                },
                input: {
                  paddingTop: "0px !important",
                  paddingBottom: "0px !important",
                },
              },
            },
            MuiTextField: {
              defaultProps: {
                variant: "outlined",
                fullWidth: true,
                size: "small",
              },
            },
            MuiSwitch: {
              defaultProps: {
                color: "primary",
              },
            },
            MuiCheckbox: {
              defaultProps: {
                color: "primary",
              },
              styleOverrides: {
                root: {
                  // vertical center for hover/focus effect
                  marginTop: "-4.5px",
                  marginBottom: "-4.5px",
                },
              },
            },
            MuiRadio: {
              defaultProps: {
                color: "primary",
                size: "medium",
              },
            },
            MuiTabs: {
              defaultProps: {
                indicatorColor: "secondary",
                textColor: "primary",
              },
              styleOverrides: {
                root: {
                  minHeight: 36,
                  backgroundColor: palette.background.default,
                  paddingBottom: 8,
                },
              },
            },
            MuiTab: {
              defaultProps: {
                iconPosition: "start",
              },
              styleOverrides: {
                root: {
                  minHeight: 36,
                  justifyContent: "flex-start",
                },
                textColorInherit: {
                  opacity: 1,
                  color: palette.text.secondary,
                },
                labelIcon: {
                  minHeight: "none",
                },
                wrapped: {
                  flexDirection: "row",
                  "& svg": {
                    marginRight: 16,
                  },
                },
              },
            },
            MuiTabScrollButton: {
              styleOverrides: {
                root: {
                  color: palette.text.secondary,
                  width: 20,
                  opacity: 1,
                  borderRadius: 4,
                  backgroundColor: palette.background.paper,

                  "&:first-child": {
                    marginRight: 16,
                  },
                  "&:last-child": {
                    marginLeft: 16,
                  },
                  "& svg": {
                    fontSize: "1.28rem !important",
                  },
                },
              },
            },
            MuiTableCell: {
              styleOverrides: {
                root: {
                  padding: MuiDefaultValue,
                  height: 29, // acts as min height, still scalable

                  "& button": {
                    marginRight: spacing(1),
                  },
                },
              },
            },
            MuiAppBar: {
              styleOverrides: {
                root: {
                  boxShadow: (palette.mode === "light" && "none") || MuiDefaultValue,
                },
              },
            },
            MuiSvgIcon: {
              styleOverrides: {
                root: {
                  maxWidth: MuiDefaultValue,
                  maxHeight: MuiDefaultValue,
                },
              },
            },
            MuiListItemText: {
              styleOverrides: {
                root: {
                  margin: MuiDefaultValue,
                },
                primary: {
                  fontSize: MuiDefaultValue,
                  fontWeight: 400,
                },
              },
            },
            MuiListItemIcon: {
              styleOverrides: {
                root: {
                  minWidth: MuiDefaultValue,
                },
              },
            },
          },

          variables: {
            navigation: {
              drawerWidth: 230,
              drawerWidthCollapsed: 50,
              toolbarHeight: 54,
            },
            border: {
              default: "1px solid rgba(0, 0, 0, 0.23)",
            },
            borderRadius: {
              default: 4,
            },
          },
        }),
      ),
    [palette],
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
