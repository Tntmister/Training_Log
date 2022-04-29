import React from "react"
import { StyleSheet, View } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import {
  DESetType,
  Exercise,
  WESetType
} from "../../../../../dataDefinition/data"
import { Theme } from "../../../../providers/Theme"
import { Text } from "../../../reusable/Text"
import ProgrammedCardioExercise from "./ProgrammedCardioExercise"
import ProgrammedRegularExercise from "./ProgrammedRegularExercise"
import ProgrammedStretchingExercise from "./ProgrammedStretchingExercise"

export default function ProgrammedExercise({
  exercise,
  theme,
  exNum,
  onSetChange
}: {
  exercise: Exercise;
  theme: Theme;
  exNum: number;
  onSetChange: (exNum: number, sets: WESetType[] | DESetType[]) => void;
}) {
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
        <ProgrammedCardioExercise theme={theme} />
      ) : exercise.category == "Stretching" ? (
        <ProgrammedStretchingExercise theme={theme} />
      ) : (
        <ProgrammedRegularExercise
          theme={theme}
          exNum={exNum}
          onSetChange={onSetChange}
        />
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
  }
})
