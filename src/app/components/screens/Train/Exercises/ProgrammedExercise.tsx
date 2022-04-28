import React from "react"
import { StyleSheet, View } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { Exercise } from "../../../../../dataDefinition/data"
import { Theme } from "../../../../providers/Theme"
import InlineContainer from "../../../reusable/InlineContainer"
import { Text } from "../../../reusable/Text"

export default function ProgrammedExercise({
  exercise,
  theme
}: {
  exercise: Exercise;
  theme: Theme;
}) {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.backdrop,
        marginBottom: theme.margins.s,
        paddingVertical: theme.paddings.s,
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
      <InlineContainer
        style={{ ...styles.subtitleContainer, marginTop: theme.margins.xs }}
      >
        <Text
          style={{
            ...styles.setNum,
            ...styles.subtitle,
            color: theme.colors.primary
          }}
        >
          Set
        </Text>
        <Text
          style={{
            ...styles.weight,
            ...styles.subtitle,
            color: theme.colors.primary
          }}
        >
          Weight
        </Text>
        <Text
          style={{
            ...styles.repRange,
            ...styles.subtitle,
            color: theme.colors.primary
          }}
        >
          Rep. Range
        </Text>
        <Text
          style={{
            ...styles.reps,
            ...styles.subtitle,
            color: theme.colors.primary
          }}
        >
          Reps
        </Text>
      </InlineContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
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
