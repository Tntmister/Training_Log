import React from "react"
import { StyleSheet, View } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { Exercise } from "../../../../../dataDefinition/data"
import { Theme } from "../../../../providers/Theme"
import InlineContainer from "../../../reusable/InlineContainer"
import { Text } from "../../../reusable/Text"
import ProgrammedCardioExercise from "./ProgrammedCardioExercise"
import ProgrammedRegularExercise from "./ProgrammedRegularExercise"
import ProgrammedStretchingExercise from "./ProgrammedStretchingExercise"

export default function ProgrammedExercise({
  exercise,
  theme
}: {
  exercise: Exercise;
  theme: Theme;
}) {
  console.log(exercise.category)
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.backdrop,
        marginBottom: theme.margins.s,
        paddingVertical: theme.paddings.m,
        paddingHorizontal: theme.paddings.m
      }}
    >
      <Text
        style={{
          ...styles.title,
          color: theme.colors.primary
        }}
      >
        {exercise.name}
      </Text>
      {exercise.category == "Cardio" ? (
        <ProgrammedCardioExercise exercise={exercise} theme={theme} />
      ) : exercise.category == "Stretching" ? (
        <ProgrammedStretchingExercise exercise={exercise} theme={theme} />
      ) : (
        <ProgrammedRegularExercise exercise={exercise} theme={theme} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "98%",
    borderRadius: 10,
    alignSelf: "center"
  },
  title: {
    flexWrap: "wrap",
    fontSize: RFValue(18)
  },
  subtitleContainer: {
    justifyContent: "space-between"
  },
  subtitle: {
    textAlign: "center"
  },
  setNum: {
    //backgroundColor: "green",
    width: "15%"
  },
  weight: {
    //backgroundColor: "purple",
    width: "20%"
  },
  repRange: {
    //backgroundColor: "green",
    width: "45%"
  },
  reps: {
    //backgroundColor: "purple",
    width: "20%"
  }
})
