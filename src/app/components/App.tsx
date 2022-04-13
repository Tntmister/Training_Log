import React, { useContext } from "react"
import Nav from "./Nav"
import AuthNav from "./AuthNav"
import { UserContext } from "../User"
import { theme1 } from "../styles/styles"

export const ThemeContext = React.createContext(theme1)

export default function App() {
  const DEBUG = false
  const user = useContext(UserContext)

  return (
    <ThemeContext.Provider value={theme1}>
      {user?.emailVerified || DEBUG ? <Nav /> : <AuthNav />}
    </ThemeContext.Provider>
  )
}
