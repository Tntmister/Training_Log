import React from "react"
import { Text } from "react-native"
import { Exercise } from "../../../../../dataDefinition/data"

export default function ProgrammedExercise({
  exercise
}: {
  exercise: Exercise;
}) {
  return <Text>{exercise.name}</Text>
}
