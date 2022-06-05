import { StackScreenProps } from "@react-navigation/stack"
import React from "react"
import ProgressGraph from "../../../../reusable/ProgressGraph"
import { Text } from "../../../../reusable/Text"
import { ExDetailStackParamList } from "./ExerciseDetailsNav"

export default function ExerciseStats({
  route
}: StackScreenProps<ExDetailStackParamList, "ExerciseInfo">) {
  const exercise = route.params.exercise
  console.log("ExerciseInfo -> " + exercise.name)
  return (
    <>
      <Text>{exercise.name + " stats"}</Text>
      <ProgressGraph />
    </>
  )
}
