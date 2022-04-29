import React from "react"
import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { Exercise } from "../../../../../dataDefinition/data"
import { Theme } from "../../../../providers/Theme"
import InlineContainer from "../../../reusable/InlineContainer"
import { Text } from "../../../reusable/Text"

export default function ProgrammedStretchingExercise({
  exercise,
  theme
}: {
  exercise: Exercise;
  theme: Theme;
}) {
  return (
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
          ...styles.time,
          ...styles.subtitle,
          color: theme.colors.primary
        }}
      >
        Time
      </Text>
    </InlineContainer>
  )
}

const styles = StyleSheet.create({
  subtitleContainer: {
    justifyContent: "space-between"
  },
  subtitle: {
    textAlign: "center",
    fontSize: RFValue(18)
  },
  setNum: {
    //backgroundColor: "green",
    width: "15%"
  },
  weight: {
    //backgroundColor: "purple",
    width: "20%"
  },
  time: {
    //backgroundColor: "green",
    width: "25%"
  }
})
