import React from "react"
import { Text, StyleSheet, Pressable, View } from "react-native"
import { ThemeContext } from "./../App"

import { exercises } from "../../../dataDefinition/exercises.json"
import ExerciseDescriptor from "./ExerciseDescriptor"

export default function ExerciseList() {
  const exArray = exercises.map((ex, index) => {
    <ExerciseDescriptor
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
  })

  return (
    <View>
      <Text>{JSON.stringify(exercises[0])}</Text>
    </View>
  )
}
