import { StackScreenProps } from "@react-navigation/stack"
import React, { useState } from "react"
import { Text } from "react-native"
import { Appbar } from "react-native-paper"
import { useTheme } from "../../../../providers/Theme"
import { RootStackParamList } from "../Models/ModelNav"
import ExerciseList from "./ExerciseList"

export default function ExerciseSelector({
  route,
  navigation
}: StackScreenProps<RootStackParamList, "ExerciseSelector">) {
  const theme = useTheme()
  const [selectedExercises, setSelectedExercises] = useState([])
  // fatorizar o conjunto ExerciseSearch e ExerciseList
  // passar a funcao a aplicar ao onPress de cada descriptor
  // neste caso, ao clicar num exercicio, o objetivo é adiciona lo
  // ao array de exercicios selecionados

  function handleExercisePress() {
    return
  }

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={navigation.goBack}></Appbar.BackAction>
        <Appbar.Content title="Exercise Selector" />
      </Appbar>
      <Text>Exercise Selector</Text>
      {/*<ExerciseList navigation={undefined} route={undefined}/>*/}
    </>
  )
}
