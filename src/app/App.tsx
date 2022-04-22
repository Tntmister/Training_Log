import React, { useContext } from "react"
import Nav from "./components/Nav"
import AuthNav from "./components/auth/AuthNav"
import { UserContext } from "./providers/User"
import { DEBUG_NoLogin } from "./debug"
import { StatusBar } from "react-native"
import { ThemeContext, useTheme } from "./providers/Theme"

export default function App() {
  const user = useContext(UserContext)
  const { dark } = useContext(ThemeContext)
  const theme = useTheme()

  return (
    <>
      <StatusBar
        barStyle={dark ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.background}
      />
      {user?.emailVerified || DEBUG_NoLogin ? <Nav /> : <AuthNav />}
    </>
  )
}
