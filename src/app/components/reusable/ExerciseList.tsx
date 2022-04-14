import React, { useContext } from "react"

import ExerciseDescriptor from "./ExerciseDescriptor"
import { ExercisesContext } from "./../App"
import { Text, View } from "react-native"
import SearchBar from "./SearchBar"

export default function ExerciseList() {
  const exContext = useContext(ExercisesContext)

  console.log(exContext[0])

  const renderExercise = (ex: any) => (
    <ExerciseDescriptor
      exercise={{
        id: 0,
        name: ex.name,
        category: ex.category,
        description: ex.instructions,
        equipment: ex.equipment,
        primaryMuscles: ex.primaryMuscles,
        secondaryMuscles: ex.secondaryMuscles
      }}
    />
  )
  return (
    <View>
      <SearchBar />
    </View>
  )
}
