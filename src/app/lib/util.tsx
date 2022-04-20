import { exercises } from "../../dataDefinition/exercises.json"
import ExerciseDescriptor from "../components/screens/Exercises/ExerciseDescriptor"
import React, { ReactNode } from "react"
import { Text } from "react-native"
import { theme1 } from "../styles/styles"

export function getExercises(
  query: string,
  onExClick: (ex: string) => void
): ReactNode[] {
  if (query.trim().length < 2)
    return [
      <Text
        key={0}
        style={{
          color: theme1.colors.foreground,
          fontSize: theme1.text.fontSizeXS,
          fontWeight: "bold"
        }}
      >
        No current exercises...
      </Text>
    ]
  const filteredExercises = exercises.filter((ex) =>
    ex.name.toLowerCase().includes(query.toLowerCase())
  )
  //console.log(filteredExercises.length)
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
        onExClick={() => onExClick(ex.name)}
      />
    )
  })
}
