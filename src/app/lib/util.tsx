import { exercises } from "../../dataDefinition/exercises.json"
import ExerciseDescriptor from "../components/screens/Exercises/ExerciseDescriptor"
import React, { ReactNode } from "react"
import { useTheme } from "../providers/Theme"
import { RFValue } from "react-native-responsive-fontsize"
import { Text } from "../components/reusable/Text"

export function getExercises(
  query: string,
  onExClick: (ex: string) => void
): ReactNode[] {
  //const theme = useTheme()
  if (query.trim().length < 2)
    return [
      <Text
        key={0}
        style={{
          fontSize: RFValue(12)
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
