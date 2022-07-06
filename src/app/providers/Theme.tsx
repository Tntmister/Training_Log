/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"
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
import { StatusBarStyle, TextStyle } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import {
  strings,
  strings_en,
  strings_global,
  strings_global_lang,
  strings_pt
} from "../assets/strings"
import { available_units, units, units_global } from "../lib/units"
import { setSTRS as setAuthSTRS } from "../lib/firebase/auth"
import { setSTRS as setPostsSTRS } from "../lib/firebase/posts"

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
    body_xs: TextStyle;
  };
  borders: {
    borderRadius_s: number;
    borderRadius_m: number;
    borderWidth_s: number;
    borderWidth_m: number;
  };
  media: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
  };
  icons: {
    s: number;
    m: number;
  };
  graphs: {
    height: number;
    min_number_executions: number;
    xlabelLimit: number;
    dims: {
      font: number;
      contentInsetTop: number;
      contentInsetBottom: number;
      xAxisHeight: number;
    };
  };
  statusBar: {
    lightContent: StatusBarStyle;
    darkContent: StatusBarStyle;
  };
  global_strings: strings_global_lang;
  strings: { en: strings; pt: strings };
  units: units;
} & NavigationTheme &
PaperTheme;

const defaultTheme: Theme = {
  text: {
    header: {
      fontSize: RFValue(24),
      fontWeight: "400",
      fontFamily: "Lato"
    },
    subHeader: {
      fontSize: RFValue(20),
      fontWeight: "400",
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
    },
    body_xs: {
      fontSize: RFValue(12),
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
    text: "#2F2C3B",
    error: "#FF0000",
    placeholder: "#424242",
    white: "#FFFFFF"
  },
  borders: {
    borderRadius_s: 5,
    borderRadius_m: 10,
    borderWidth_s: 1,
    borderWidth_m: 2
  },
  media: {
    xs: 50,
    s: 60,
    m: 80,
    l: 120,
    xl: 400
  },
  icons: {
    s: 30,
    m: 50
  },
  graphs: {
    height: 250,
    min_number_executions: 2,
    xlabelLimit: 15,
    dims: {
      font: 10,
      contentInsetTop: 10,
      contentInsetBottom: 20,
      xAxisHeight: 10
    }
  },
  statusBar: {
    lightContent: "light-content",
    darkContent: "dark-content"
  },
  global_strings: strings_global,
  strings: {
    en: {
      ...strings_en
    },
    pt: {
      ...strings_pt
    }
  },
  units: units_global
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

export type langs = "en" | "pt";

export const ThemeContext = React.createContext({
  toggleTheme: () => {},
  switchLang: (lang: langs) => {},
  switchUnit: (unit: available_units) => {},
  lang: "en" as langs,
  unit: "metric",
  dark: true
})

const initial_params = {
  lang: "en" as langs,
  unit: "metric",
  dark: true
}
export function PaperNavigationProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(initial_params.dark)
  const [lang, setLang] = useState(initial_params.lang)
  const [unit, setUnit] = useState(initial_params.unit)

  const toggleTheme = useCallback(() => {
    return setDark(!dark)
  }, [dark])

  const switchLang = useCallback(
    (lang: langs) => {
      setAuthSTRS(langStrings(theme, lang))
      setPostsSTRS(langStrings(theme, lang))
      return setLang(lang)
    },
    [lang]
  )
  const switchUnit = useCallback(
    (unit: available_units) => {
      console.log("Unit changed to", unit)
      return setUnit(unit)
    },
    [unit]
  )

  useEffect(() => {
    setAuthSTRS(langStrings(theme, initial_params.lang as langs))
  }, [])

  const theme = dark ? darkTheme : defaultTheme

  const theming = useMemo(
    () => ({ toggleTheme, switchLang, switchUnit, dark, lang, unit }),
    [toggleTheme, switchLang, switchUnit, dark, lang]
  )

  return (
    <ThemeContext.Provider value={theming}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>{children}</NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  )
}

export function langStrings(theme: Theme, lang: langs) {
  return theme.strings[lang]
}
