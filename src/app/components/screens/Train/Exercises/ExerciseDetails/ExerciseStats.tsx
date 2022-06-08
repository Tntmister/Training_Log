import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import {
  getExercise1RMs,
  getExerciseDurations,
  getExerciseHistory,
  getExercisePaces,
  isCardioExercise,
  isStretchingExercise,
  isStrOrWLExercise
} from "../../../../../lib/firebase/exercises"
import { ExerciseHistory } from "../../../../../lib/types/train"
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
  const [exerciseDurations, setExerciseDurations] = useState<
  {
    date: number;
    duration: number;
  }[]
  >([])
  const [exercisePaces, setExercisePaces] = useState<
  {
    date: number;
    pace: number;
  }[]
  >([])
  useEffect(() => {
    getExerciseHistory(exercise.name, user.uid, (data) => {
      setData(data)
    })
  }, [])

  useEffect(() => {
    setTimesDone(data.length)
    if (isStrOrWLExercise(exercise)) {
      setExercise1RMs(getExercise1RMs(data).sort((a, b) => b.date - a.date))
    }
    if (isCardioExercise(exercise)) {
      setExercisePaces(getExercisePaces(data).sort((a, b) => b.date - a.date))
      setExerciseDurations(
        getExerciseDurations(data).sort((a, b) => b.date - a.date)
      )
    }
    if (isStretchingExercise(exercise)) {
      setExerciseDurations(
        getExerciseDurations(data).sort((a, b) => b.date - a.date)
      )
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
        data={
          isCardioExercise(exercise)
            ? exercisePaces
            : isStretchingExercise(exercise)
              ? exerciseDurations
              : exercise1RMs
        }
      />
      {isCardioExercise(exercise) && <ProgressGraph data={exerciseDurations} />}
    </View>
  )
}
