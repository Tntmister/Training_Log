import React, { ReactNode, useCallback, useMemo, useState } from "react"
import {
  configureFonts,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider
} from "react-native-paper"
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
  Theme as NavigationTheme
} from "@react-navigation/native"
import {
  Fonts,
  Theme as PaperTheme
} from "react-native-paper/lib/typescript/types"

const fonts: Fonts = {
  regular: {
    fontFamily: "Lato",
    fontWeight: "normal"
  },
  medium: {
    fontFamily: "Lato",
    fontWeight: "500"
  },
  light: {
    fontFamily: "Lato-Light",
    fontWeight: "normal"
  },
  thin: {
    fontFamily: "Lato-Thin",
    fontWeight: "normal"
  }
}

const fontConfig = configureFonts({
  ios: fonts,
  android: fonts
})

type Theme = NavigationTheme & PaperTheme;

const defaultTheme: Theme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  fonts: fontConfig,
  dark: false,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    background: "#FFFFFF",
    disabled: "#FFFFFF",
    surface: "#FFFFFF",
    notification: "#FFFFFF",
    onSurface: "#FFFFFF",
    backdrop: "#FFFFFF",
    primary: "#FFFFFF",
    accent: "#FFFFFF",
    text: "#FFFFFF",
    error: "#FFFFFF",
    placeholder: "#FFFFFF"
  }
}

const darkTheme: Theme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  fonts: fontConfig,
  mode: "exact",
  dark: true,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    background: "#1B1A21",
    disabled: "#1B1A21",
    surface: "#2F2C3B",
    primary: "#FE6751",
    accent: "#FE6751",
    text: "#FFFFFF",
    error: "#FF0000",
    placeholder: "#424242"
  }
}

export const ThemeContext = React.createContext({
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
