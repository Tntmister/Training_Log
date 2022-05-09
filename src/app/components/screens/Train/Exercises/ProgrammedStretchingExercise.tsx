import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { IconButton } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import {
  StretchingSetClass,
  ExerciseModel
} from "../../../../../dataDefinition/data"
import { useTheme } from "../../../../providers/Theme"
import InlineContainer from "../../../reusable/InlineView"
import { Text } from "../../../reusable/Text"
import { modelModes } from "../Models/Model"
import StretchingSet from "./Sets/StretchingSet"

export default function ProgrammedStretchingExercise({
  exercise,
  mode
}: {
  exercise: ExerciseModel;
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
  const [sets, setSets] = useState<StretchingSetClass[]>(
    exercise.sets as StretchingSetClass[]
  )

  function onSetDelete(index: number) {
    setSets((prevSets) => prevSets.filter((_, i) => i != index))
  }

  function addSet() {
    setSets((prevSets) => [...prevSets, new StretchingSetClass()])
  }

  useEffect(() => {
    exercise.sets = sets
  }, [sets])

  return (
    <>
      <InlineContainer style={styles.subtitleContainer}>
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
            ...styles.subtitle
          }}
        >
          Duration
        </Text>
        {mode == modelModes.Session && (
          <Text
            style={{
              ...styles.subtitle,
              width: "10%"
            }}
          >
            {" "}
          </Text>
        )}
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
      </InlineContainer>

      {sets.map((set, index) => (
        <StretchingSet
          mode={mode}
          set={set}
          index={index}
          key={index}
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
