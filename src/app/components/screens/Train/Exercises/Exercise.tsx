import React from "react"
import type { StackScreenProps } from "@react-navigation/stack"
import type { RootStackParamList } from "./ExerciseNav"
import { Appbar } from "react-native-paper"
import { Text } from "../../../reusable/Text"
import { ScrollView } from "react-native-gesture-handler"
import { StyleSheet } from "react-native"
import { useTheme } from "../../../../providers/Theme"
import { RFValue } from "react-native-responsive-fontsize"

export default function Exercise({
  route,
  navigation
}: StackScreenProps<RootStackParamList, "Exercise">) {
  const { exercise } = route.params
  const theme = useTheme()
  const styles = StyleSheet.create({
    text: {
      marginBottom: theme.margins.s,
      marginHorizontal: theme.margins.l,
      fontSize: RFValue(20)
    }
  })
  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={navigation.goBack}></Appbar.BackAction>
        <Appbar.Content title={exercise.name} />
      </Appbar>
      <ScrollView style={{ marginTop: theme.margins.m }}>
        <Text style={styles.text}>
          Primary Muscle: {exercise.primaryMuscles[0]}
        </Text>
        {exercise.secondaryMuscles.length > 0 && (
          <Text style={styles.text}>
            Secondary Muscles:{" "}
            {exercise.secondaryMuscles[0] +
              exercise.secondaryMuscles.slice(1).map((value) => {
                return `, ${value}`
              })}
          </Text>
        )}
        <Text style={{ ...styles.text, marginBottom: theme.margins.l }}>
          Category: {exercise.category}
        </Text>
        {exercise.instructions.map((value, key) => {
          return (
            <Text style={{ ...styles.text, fontSize: RFValue(16) }} key={key}>
              {value}
            </Text>
          )
        })}
      </ScrollView>
    </>
  )
}
