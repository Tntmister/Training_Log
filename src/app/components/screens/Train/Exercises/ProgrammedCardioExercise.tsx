import React, { useContext, useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { IconButton } from "react-native-paper"
import { CardioSetClass, ModelExercise } from "../../../../lib/types/train"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../../../providers/Theme"
import InlineView from "../../../reusable/InlineView"
import { Text } from "../../../reusable/Text"
import { modelModes } from "../Models/Model"
import CardioSet from "./Sets/CardioSet"

export default function ProgrammedCardioExercise({
  exercise,
  mode
}: {
  exercise: ModelExercise;
  mode: modelModes;
}) {
  const theme = useTheme()
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)

  const [sets, setSets] = useState<CardioSetClass[]>(
    exercise.sets as CardioSetClass[]
  )

  function onSetDelete(index: number) {
    setSets((prevSets) => prevSets.filter((_, i) => i != index))
  }

  function addSet() {
    setSets((prevSets) => [
      ...prevSets,
      { distance: 0, done: false, duration: 0, weight: 0 }
    ])
  }

  useEffect(() => {
    exercise.sets = sets
  }, [sets])

  const styles = StyleSheet.create({
    subtitleContainer: {
      justifyContent: "space-between",
      marginTop: theme.margins.s
    },
    subtitle: {
      width: "20%",
      marginRight: theme.margins.s,
      textAlign: "center",
      ...theme.text.body_m
    }
  })

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
          {STRS.train.exercises.weight}
        </Text>
        <Text
          style={{
            ...styles.subtitle
          }}
        >
          {STRS.train.exercises.distance}
        </Text>
        <Text
          style={{
            ...styles.subtitle
          }}
        >
          {STRS.train.exercises.duration}
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
      </InlineView>

      {sets.map((set, index) => (
        <CardioSet
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
