import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import {
  getExercise1RMs,
  getExerciseHistory,
  isStrOrWLExercise
} from "../../../../../lib/firebase/exercises"
import {
  ExerciseHistory,
  SessionExercise
} from "../../../../../lib/types/train"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../../../../providers/Theme"
import { UserContext } from "../../../../../providers/User"
import ProgressGraph from "../../../../reusable/ProgressGraph"
import { Text } from "../../../../reusable/Text"
import { ExDetailStackParamList } from "./Exercise"

export default function ExerciseStats({
  route
}: StackScreenProps<ExDetailStackParamList, "ExerciseInfo">) {
  const exercise = route.params.exercise
  const theme = useTheme()
  const user = useContext(UserContext)!
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)
  const [timesDone, setTimesDone] = useState(0)
  const [data, setData] = useState<ExerciseHistory[]>([])
  const [exercise1RMs, setExercise1RMs] = useState<
  {
    date: number;
    ONE_RM: number;
  }[]
  >([])
  useEffect(() => {
    /*setData([
      100, 102.5, 105, 107.5, 105, 100, 102.5, 105, 107.5, 105, 120, 122.5, 125,
      122.5, 125, 127.5, 130, 132.5, 132.5, 132.5, 135
    ])*/
    getExerciseHistory(exercise.name, user.uid, (data) => {
      setData(data)
    })
  }, [])

  useEffect(() => {
    setTimesDone(data.length)
    if (
      exercise.category == "Strength" ||
      exercise.category == "Weightlifting"
    ) {
      setExercise1RMs(getExercise1RMs(data))
    }
  }, [data])

  console.log(exercise1RMs)
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: theme.paddings.m
    },
    headerInfo: {
      marginVertical: theme.margins.xl,
      ...theme.text.body_l
    }
  })
  return (
    <View style={styles.container}>
      <Text style={styles.headerInfo}>
        {STRS.train.exercises.performedEx} {timesDone} {STRS.timesSoFar}.
      </Text>
      <ProgressGraph
        data={isStrOrWLExercise(exercise) ? exercise1RMs : exercise1RMs}
      />
    </View>
  )
}
