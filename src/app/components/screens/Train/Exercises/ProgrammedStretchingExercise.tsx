import React, { useContext } from "react"
import { StyleSheet } from "react-native"
import { IconButton } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import {
  StretchingSetClass,
  ModelExercise,
  SessionExercise,
  ExerciseSet
} from "../../../../lib/types/train"
import { available_units } from "../../../../lib/units"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../../../providers/Theme"
import InlineView from "../../../reusable/InlineView"
import { Text } from "../../../reusable/Text"
import { modelModes } from "../Models/Model"
import StretchingSet from "./Sets/StretchingSet"

export default function ProgrammedStretchingExercise({
  exercise,
  mode,
  onChange
}: {
  exercise: ModelExercise;
  mode: modelModes;
  onChange: (
    callback: (
      exercise: ModelExercise | SessionExercise
    ) => ModelExercise | SessionExercise
  ) => void;
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
  const { lang, unit } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)
  const current_units = theme.units[unit as available_units]
  function setSets(callback: (sets: ExerciseSet[]) => ExerciseSet[]) {
    onChange((exercise) => ({ ...exercise, sets: callback(exercise.sets) }))
  }

  function addSet() {
    setSets((prevSets) => {
      const numOfSets = prevSets.length
      if (numOfSets == 0) {
        return [...prevSets, { done: false, duration: 0, weight: 0 }]
      } else {
        return [...prevSets, prevSets[numOfSets - 1]]
      }
    })
  }

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
          {`${STRS.train.exercises.weight} (${current_units.mass})`}
        </Text>
        <Text
          style={{
            ...styles.subtitle
          }}
        >
          {`${STRS.train.exercises.duration} (${STRS.train.timeFormat})`}
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

      {exercise.sets.map((set, index) => (
        <StretchingSet
          mode={mode}
          set={set as StretchingSetClass}
          index={index}
          key={index}
          setSets={setSets}
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
