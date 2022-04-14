import { exercises } from "../../dataDefinition/exercises.json"
import ExerciseDescriptor from "../components/reusable/ExerciseDescriptor"
import React, { ReactNode } from "react"
import { Text } from "react-native"

export function getExercises(query: string): ReactNode[] {
  if (query.trim().length === 0)
    return [<Text key={0}>Search for an Exercise</Text>]
  const filteredExercises = exercises.filter((ex) =>
    ex.name.toLowerCase().includes(query.toLowerCase())
  )
  console.log(filteredExercises.map((ex) => ex.name))
  return filteredExercises.map((ex, index) => {
    return (
      <ExerciseDescriptor
        key={ex.name}
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
}
