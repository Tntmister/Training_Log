import React, { useContext } from "react"
import { StyleSheet } from "react-native"
import { IconButton } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import {
  ModelExercise,
  ExerciseSet,
  SessionExercise,
  RegularSetClass
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
import RegularSet from "./Sets/RegularSet"

export default function ProgrammedCardioExercise({
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
  const { lang, unit } = useContext(ThemeContext)
  const current_units = theme.units[unit as available_units]
  const STRS = langStrings(theme, lang as langs)
  const styles = StyleSheet.create({
    subtitleContainer: {
      justifyContent: "space-between",
      marginTop: theme.margins.s
    },
    subtitle: {
      width: "20%",
      textAlign: "center",
      fontSize: RFValue(16)
    }
  })
  function setSets(callback: (sets: ExerciseSet[]) => ExerciseSet[]) {
    onChange((exercise) => ({ ...exercise, sets: callback(exercise.sets) }))
  }

  function addSet() {
    setSets((prevSets) => [...prevSets, { done: false, reps: 1, weight: 0 }])
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
            ...styles.subtitle,
            width: mode == modelModes.View ? "20%" : "50%"
          }}
        >
          {STRS.train.exercises.reps}
        </Text>
        {mode != modelModes.View && (
          <Text
            style={{
              ...styles.subtitle,
              width: "10%"
            }}
          >
            {" "}
          </Text>
        )}
      </InlineView>

      {exercise.sets.map((set, index) => (
        <RegularSet
          key={index}
          mode={mode}
          set={set as RegularSetClass}
          index={index}
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
