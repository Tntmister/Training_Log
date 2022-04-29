import React, { useState } from "react"
import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import {
  Exercise,
  WESet as Set,
  WESetType
} from "../../../../../dataDefinition/data"
import { Theme } from "../../../../providers/Theme"
import { Button } from "../../../reusable/Button"
import InlineContainer from "../../../reusable/InlineContainer"
import { Text } from "../../../reusable/Text"
import WESet from "./Sets/WESet"

export default function ProgrammedRegularExercise({
  exercise,
  theme
}: {
  exercise: Exercise;
  theme: Theme;
}) {
  const [sets, setSets] = useState<WESetType[]>([new Set(), new Set()])
  console.log(sets)
  const setElements = sets.map((set, index) => (
    <WESet theme={theme} model={true} setNum={index + 1} key={index} />
  ))
  return (
    <>
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

      {setElements}
      <Button
        style={{
          marginTop: theme.margins.m,
          marginBottom: theme.margins.s
        }}
        onPress={() => console.log("Add a Set")}
      >
        Add Set
      </Button>
    </>
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
  repRange: {
    //backgroundColor: "green",
    width: "40%"
  },
  reps: {
    //backgroundColor: "purple",
    width: "20%"
  }
})
