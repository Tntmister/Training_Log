import React from "react"
import type { StackScreenProps } from "@react-navigation/stack"
import type { RootStackParamList } from "./ExerciseNav"
import { Appbar } from "react-native-paper"
import ExerciseDetailNav from "./ExerciseDetails/ExerciseDetailsNav"

export function Exercise({
  route,
  navigation
}: StackScreenProps<RootStackParamList, "Exercise">) {
  const { exercise } = route.params

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={navigation.goBack}></Appbar.BackAction>
        <Appbar.Content title={exercise.name} />
      </Appbar>
      <ExerciseDetailNav exercise={exercise} />
    </>
  )
}
