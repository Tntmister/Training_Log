import React, { useContext } from "react"
import Nav from "./components/Nav"
import AuthNav from "./components/auth/AuthNav"
import { UserContext } from "./providers/User"
import { theme1 } from "./styles/styles"
import { exercises } from "../dataDefinition/exercises.json"
import { DEBUG_NoLogin } from "./debug"

export const ThemeContext = React.createContext(theme1)

export const ExercisesContext = React.createContext(exercises)

export default function App() {
  const user = useContext(UserContext)

  return (
    <ThemeContext.Provider value={theme1}>
      {user?.emailVerified || DEBUG_NoLogin ? <Nav /> : <AuthNav />}
    </ThemeContext.Provider>
  )
}
