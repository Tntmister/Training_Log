import React, { useContext } from "react"
import Nav from "./Nav"
import Auth from "./Auth"
import { UserContext } from "../User"
import { theme1 } from "../styles/styles"
import { exercises } from "../../dataDefinition/exercises.json"

export const ThemeContext = React.createContext(theme1)

export const ExercisesContext = React.createContext(exercises)

export default function App() {
  const DEBUG = false
  const user = useContext(UserContext)

  return (
    <ThemeContext.Provider value={theme1}>
      {user?.emailVerified || DEBUG ? <Nav /> : <Auth />}
    </ThemeContext.Provider>
  )
}
