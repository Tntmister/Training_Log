import React, { useContext } from "react"

import ExerciseDescriptor from "./ExerciseDescriptor"
import { ExercisesContext } from "./../App"
import { FlatList } from "react-native-gesture-handler"
import { Text } from "react-native"

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
    /*<FlatList
      data={exContext}
      renderItem={renderExercise}
      keyExtractor={(ex) => ex.name}
    />*/
    <Text>Hello</Text>
  )
}
