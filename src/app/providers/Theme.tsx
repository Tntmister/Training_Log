import React, { ReactNode, useCallback, useMemo, useState } from "react"
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  useTheme as useThemePaper
} from "react-native-paper"
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
  Theme as NavigationTheme
} from "@react-navigation/native"
import { Theme as PaperTheme } from "react-native-paper/lib/typescript/types"

export type Theme = {
  margins: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
  };
  paddings: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
  };
  colors: {
    white: string;
  };
} & NavigationTheme &
PaperTheme;

const defaultTheme: Theme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  fonts: {
    medium: {
      fontFamily: "Lato",
      fontWeight: "normal"
    },
    regular: {
      fontFamily: "Lato",
      fontWeight: "normal"
    },
    light: {
      fontFamily: "Lato",
      fontWeight: "normal"
    },
    thin: {
      fontFamily: "Lato",
      fontWeight: "normal"
    }
  },
  margins: {
    xs: 6,
    s: 8,
    m: 16,
    l: 24,
    xl: 36
  },
  paddings: {
    xs: 2,
    s: 4,
    m: 8,
    l: 16,
    xl: 24
  },
  colors: {
    background: "#EEEEEE",
    disabled: "#E9E9E9",
    card: "#EEEEEE",
    surface: "#FFFFFF",
    notification: "#FFFFFF",
    backdrop: "#FFFFFF",
    onSurface: "#FFFFFF",
    primary: "#FE6751",
    border: "#FE6751",
    accent: "#FE6751",
    text: "#000000",
    error: "#FF0000",
    placeholder: "#424242",
    white: "#FFFFFF"
  }
}

const darkTheme: Theme = {
  ...defaultTheme,
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  mode: "exact",
  dark: true,
  colors: {
    ...defaultTheme.colors,
    background: "#2F2C3B",
    card: "#2F2C3B",
    surface: "#1B1A21",
    notification: "#1B1A21",
    backdrop: "#1B1A21",
    onSurface: "#1B1A21",
    primary: "#FE6751",
    border: "#FE6751",
    accent: "#FE6751",
    text: "#FFFFFF",
    placeholder: "#d9d9d9"
  }
}

export const useTheme = () => {
  return useThemePaper() as Theme
}

export const ThemeContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
  dark: true
})

export function PaperNavigationProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(true)

  const toggleTheme = useCallback(() => {
    return setDark(!dark)
  }, [dark])

  const theme = dark ? darkTheme : defaultTheme

  const theming = useMemo(() => ({ toggleTheme, dark }), [toggleTheme, dark])

  return (
    <ThemeContext.Provider value={theming}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>{children}</NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  )
}
