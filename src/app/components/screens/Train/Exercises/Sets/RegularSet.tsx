import React from "react"
import { StyleSheet, View } from "react-native"
import { Checkbox, IconButton } from "react-native-paper"
import { ExerciseSet, RegularSetClass } from "../../../../../lib/types/train"
import { images } from "../../../../../lib/extra"
import { useTheme } from "../../../../../providers/Theme"
import { Button } from "../../../../reusable/Button"
import InlineView from "../../../../reusable/InlineView"
import { Text } from "../../../../reusable/Text"
import { modelModes } from "../../Models/Model"
import SetFieldInput from "./SetFieldInput"

export default function RegularSet({
  mode,
  set,
  index,
  setSets
}: {
  mode: modelModes;
  set: RegularSetClass;
  index: number;
  setSets: (callback: (sets: ExerciseSet[]) => ExerciseSet[]) => void;
}) {
  const theme = useTheme()
  const styles = StyleSheet.create({
    container: {
      justifyContent: "space-between",
      paddingVertical: theme.margins.xs
    },
    box: {
      ...theme.text.body_l,
      textAlign: "center",
      textAlignVertical: "center",
      color: theme.colors.primary
    },
    index: { width: "5%" },
    input: {
      alignSelf: "stretch",
      width: "20%"
    },
    repsInput: {
      width: mode == modelModes.View ? "20%" : "50%",
      backgroundColor: theme.colors.background,
      flexDirection: "row",
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      borderBottomColor: theme.colors.primary,
      borderBottomWidth: 3
    },
    button_checkbox: {
      width: "10%"
    },
    button: {
      margin: 0,
      padding: 0
    },
    repsButton: {
      height: "90%"
    },
    repsButtonLabel: {
      color: theme.colors.primary
    }
  })

  function onSetDelete(index: number) {
    setSets((prevSets) => prevSets.filter((_, i) => i != index))
  }

  function setSet(callback: (set: RegularSetClass) => RegularSetClass) {
    setSets((sets) =>
      sets.map((value, index) =>
        index != sets.indexOf(set) ? value : callback(set)
      )
    )
  }

  function onChangeWeight(weight: string) {
    setSet((prevSet) => ({ ...prevSet, weight: parseFloat(weight) || 0 }))
  }

  function onRepsPlus() {
    setSet((prevSet) => ({ ...prevSet, reps: prevSet.reps + 1 }))
  }

  function onRepsMinus() {
    setSet((prevSet) => ({ ...prevSet, reps: Math.max(1, prevSet.reps - 1) }))
  }

  function onCheckBoxPress() {
    setSet((prevSet) => ({ ...prevSet, done: !prevSet.done }))
  }

  return (
    <InlineView style={styles.container}>
      <Text style={[styles.index, styles.box]}>{index + 1}</Text>
      <SetFieldInput
        inputMode={mode}
        style={styles.input}
        value={set.weight.toString()}
        onChangeText={onChangeWeight}
      />
      <View style={[styles.input, styles.repsInput]}>
        {mode != modelModes.View && (
          <Button
            mode="text"
            style={[styles.button, styles.repsButton]}
            labelStyle={styles.repsButtonLabel}
            onPress={onRepsMinus}
          >
            -
          </Button>
        )}
        <Text style={[styles.box, { flexGrow: 1, color: theme.colors.text }]}>
          {set.reps}
        </Text>
        {mode != modelModes.View && (
          <Button
            mode="text"
            style={[styles.button, styles.repsButton]}
            labelStyle={styles.repsButtonLabel}
            onPress={onRepsPlus}
          >
            +
          </Button>
        )}
      </View>
      {mode != modelModes.View && (
        <View style={styles.button_checkbox}>
          {mode == modelModes.Edit ? (
            <IconButton
              borderless={false}
              style={styles.button}
              icon={images.Trash}
              onPress={() => onSetDelete(index)}
            />
          ) : (
            <Checkbox
              status={set.done ? "checked" : "unchecked"}
              onPress={onCheckBoxPress}
            />
          )}
        </View>
      )}
    </InlineView>
  )
}
