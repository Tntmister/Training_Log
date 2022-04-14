import React, { useContext } from "react"
import Nav from "./Nav"
import AuthNav from "./AuthNav"
import { UserContext } from "../User"
import { theme1 } from "../styles/styles"
import { exercises } from "../../dataDefinition/exercises.json"
import ExerciseDescriptor from "./reusable/ExerciseDescriptor"

export const ThemeContext = React.createContext(theme1)

const arr = exercises.map((ex: any, index: number) => {
  return (
    <ExerciseDescriptor
      key={index}
      exercise={{
        id: index,
        name: ex.name,
        category: ex.category,
        description: ex.instructions,
        equipment: ex.equipment,
        primaryMuscles: ex.primaryMuscles,
        secondaryMuscles: ex.secondaryMuscles
      }}
    />
  )
})

export const ExercisesContext = React.createContext(exercises)

export default function App() {
  const DEBUG = false
  const user = useContext(UserContext)

  return (
    <ThemeContext.Provider value={theme1}>
      {user?.emailVerified || DEBUG ? <Nav /> : <AuthNav />}
    </ThemeContext.Provider>
  )
}
