import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { IconButton } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import {
  RegularSetClass,
  ModelExercise
} from "../../../../../dataDefinition/data"
import { useTheme } from "../../../../providers/Theme"
import InlineView from "../../../reusable/InlineView"
import { Text } from "../../../reusable/Text"
import { modelModes } from "../Models/Model"
import RegularSet from "./Sets/RegularSet"

export default function ProgrammedCardioExercise({
  exercise,
  mode
}: {
  exercise: ModelExercise;
  mode: modelModes;
}) {
  const theme = useTheme()
  const styles = StyleSheet.create({
    subtitleContainer: {
      justifyContent: "space-between",
      marginTop: theme.margins.s
    },
    subtitle: {
      width: "20%",
      marginRight: theme.margins.s,
      textAlign: "center",
      fontSize: RFValue(16)
    }
  })
  const [sets, setSets] = useState<RegularSetClass[]>(
    exercise.sets as RegularSetClass[]
  )

  function onSetDelete(index: number) {
    setSets((prevSets) => prevSets.filter((_, i) => i != index))
  }

  function addSet() {
    setSets((prevSets) => [...prevSets, { done: false, reps: 1, weight: 0 }])
  }

  useEffect(() => {
    exercise.sets = sets
  }, [sets])

  return (
    <>
      <InlineView style={styles.subtitleContainer}>
        <Text
          style={{
            ...styles.subtitle,
            width: "5%"
          }}
        >
          {" "}
        </Text>
        <Text
          style={{
            ...styles.subtitle
          }}
        >
          Weight
        </Text>
        <Text
          style={{
            ...styles.subtitle,
            width: mode == modelModes.View ? "20%" : "50%"
          }}
        >
          Reps
        </Text>
        {mode != modelModes.View && (
          <Text
            style={{
              ...styles.subtitle,
              marginRight: 0,
              width: "10%"
            }}
          >
            {" "}
          </Text>
        )}
      </InlineView>

      {sets.map((set, index) => (
        <RegularSet
          key={index}
          mode={mode}
          set={set}
          index={index}
          onSetDelete={onSetDelete}
        />
      ))}

      {mode == modelModes.Edit && (
        <IconButton
          color={theme.colors.primary}
          size={30}
          style={{
            width: "100%",
            alignSelf: "center"
          }}
          onPress={addSet}
          icon={"plus"}
        />
      )}
    </>
  )
}
