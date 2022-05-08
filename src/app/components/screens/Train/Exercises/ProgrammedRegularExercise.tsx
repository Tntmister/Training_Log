import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, View } from "react-native"
import { IconButton } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import { RegularSetClass, Exercise } from "../../../../../dataDefinition/data"
import { useTheme } from "../../../../providers/Theme"
import InlineContainer from "../../../reusable/InlineView"
import { Text } from "../../../reusable/Text"
import { modelModes } from "../Models/Model"
import RegularSet from "./Sets/RegularSet"

export default function ProgrammedCardioExercise({
  exercise,
  mode
}: {
  exercise: Exercise;
  mode: modelModes;
}) {
  const theme = useTheme()
  const styles = useRef(
    StyleSheet.create({
      subtitleContainer: {
        justifyContent: "space-between"
      },
      subtitle: {
        textAlign: "center",
        fontSize: RFValue(16)
      },
      index: { width: "10%" },
      weight: { width: "20%" },
      distance: { width: "25%" },
      time: { width: "20%" },
      del: { width: "10%" }
    })
  ).current
  const [sets, setSets] = useState<RegularSetClass[]>(
    exercise.sets as RegularSetClass[]
  )

  function onSetDelete(index: number) {
    setSets((prevSets) => prevSets.filter((_, i) => i != index))
  }

  function addSet() {
    setSets((prevSets) => [...prevSets, new RegularSetClass()])
  }

  useEffect(() => {
    exercise.sets = sets
  }, [sets])

  return (
    <>
      <InlineContainer
        style={{ ...styles.subtitleContainer, marginTop: theme.margins.xs }}
      >
        <View
          style={{
            ...styles.index,
            ...styles.subtitle
          }}
        />
        <Text
          style={{
            ...styles.weight,
            ...styles.subtitle,
            color: theme.colors.text
          }}
        >
          Weight
        </Text>
        <Text
          style={{
            ...styles.distance,
            ...styles.subtitle,
            color: theme.colors.text
          }}
        >
          Reps
        </Text>
        {mode != modelModes.View && (
          <View
            style={{
              ...styles.del,
              ...styles.subtitle
            }}
          />
        )}
      </InlineContainer>

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
