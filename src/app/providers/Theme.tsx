import React, { ReactNode } from "react"
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider
} from "react-native-paper"
import { Fonts, Theme } from "react-native-paper/lib/typescript/types"

const _fontConfig: Fonts = {
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

const fontConfig = {
  ios: _fontConfig,
  android: _fontConfig
}

const theme: Theme = {
  ...DefaultTheme,
  dark: true,
  mode: "exact",
  fonts: configureFonts(fontConfig),
  colors: {
    background: "#1B1A21",
    disabled: "#1B1A21",
    surface: "#2F2C3B",
    notification: "#FFFFFF",
    onSurface: "#FFFFFF",
    backdrop: "#FFFFFF",
    primary: "#FE6751",
    accent: "#FE6751",
    text: "#FFFFFF",
    error: "#FF0000",
    placeholder: "#424242"
  }
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return <PaperProvider theme={theme}>{children}</PaperProvider>
}
