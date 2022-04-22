import React from "react"
import { Button } from "react-native"
import type { StackScreenProps } from "@react-navigation/stack"
import type { RootStackParamList } from "./ExerciseNav"
import { Text } from "../../reusable/Text"

export default function Exercise({
  route,
  navigation
}: StackScreenProps<RootStackParamList, "Exercise">) {
  const { name } = route.params
  console.log("INSIDE EXERCISE -> EX NAME -> " + name)
  return (
    <>
      <Text>{name}</Text>
      <Button onPress={() => navigation.goBack()} title="Back"></Button>
    </>
  )
}
