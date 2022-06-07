import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { getExerciseHistory } from "../../../../../lib/firebase/exercises"
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

  useEffect(() => {
    /*setData([
      100, 102.5, 105, 107.5, 105, 100, 102.5, 105, 107.5, 105, 120, 122.5, 125,
      122.5, 125, 127.5, 130, 132.5, 132.5, 132.5, 135
    ])*/
    getExerciseHistory(exercise.name, user.uid, (ex) => {
      setData(ex)
    })
  }, [])

  useEffect(() => {
    setTimesDone(data.length)
  }, [data])

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
        data={[
          100, 102.5, 105, 107.5, 105, 100, 102.5, 105, 107.5, 105, 120, 122.5,
          125, 122.5, 125, 127.5, 130, 132.5, 132.5, 132.5, 135
        ]}
      />
    </View>
  )
}
