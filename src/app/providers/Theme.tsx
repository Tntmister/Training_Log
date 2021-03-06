/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { TextStyle } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import {
  strings,
  strings_en,
  strings_global,
  strings_global_lang,
  strings_pt
} from "../assets/strings"

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
  text: {
    header: TextStyle;
    subHeader: TextStyle;
    body_l: TextStyle;
    body_m: TextStyle;
    body_s: TextStyle;
  };
  global_strings: strings_global_lang;
  strings: { en: strings; pt: strings };
} & NavigationTheme &
PaperTheme;

const defaultTheme: Theme = {
  text: {
    header: {
      fontSize: RFValue(28),
      fontWeight: "400",
      fontFamily: "Lato"
    },
    subHeader: {
      fontSize: RFValue(20),
      fontWeight: "bold",
      fontFamily: "Lato"
    },
    body_l: {
      fontSize: RFValue(18),
      fontWeight: "400",
      fontFamily: "Lato"
    },
    body_m: {
      fontSize: RFValue(16),
      fontWeight: "400",
      fontFamily: "Lato"
    },
    body_s: {
      fontSize: RFValue(14),
      fontWeight: "400",
      fontFamily: "Lato"
    }
  },
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  fonts: {
    medium: {
      fontFamily: "Lato",
      fontWeight: "400"
    },
    regular: {
      fontFamily: "Lato",
      fontWeight: "400"
    },
    light: {
      fontFamily: "Lato",
      fontWeight: "400"
    },
    thin: {
      fontFamily: "Lato",
      fontWeight: "400"
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
  },
  global_strings: strings_global,
  strings: {
    en: {
      ...strings_en
    },
    pt: {
      ...strings_pt
    }
  }
}

const darkTheme: Theme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  ...defaultTheme,
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
    placeholder: "#d0d0d0"
  }
}

export const useTheme = () => {
  return useThemePaper() as Theme
}

export const ThemeContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  switchLang: (lang: langs) => {},
  lang: "pt",
  dark: true
})

export function PaperNavigationProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(true)
  const [lang, setLang] = useState("pt")

  const toggleTheme = useCallback(() => {
    return setDark(!dark)
  }, [dark])

  const switchLang = useCallback(
    (lang: langs) => {
      return setLang(lang)
    },
    [lang]
  )

  const theme = dark ? darkTheme : defaultTheme

  const theming = useMemo(
    () => ({ toggleTheme, switchLang, dark, lang }),
    [toggleTheme, switchLang, dark, lang]
  )

  return (
    <ThemeContext.Provider value={theming}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>{children}</NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  )
}
export type langs = "en" | "pt";
export function langStrings(theme: Theme, lang: langs) {
  console.log("LANG ->", lang)
  return theme.strings[lang]
}
