import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Checkbox, IconButton } from "react-native-paper"
import { CardioSetClass } from "../../../../../../dataDefinition/data"
import { images } from "../../../../../lib/extra"
import { useTheme } from "../../../../../providers/Theme"
import InlineContainer from "../../../../reusable/InlineView"
import { Text } from "../../../../reusable/Text"
import { modelModes } from "../../Models/Model"
import SetFieldInput from "./SetFieldInput"

export default function CardioSet({
  mode,
  set,
  index,
  onSetDelete
}: {
  mode: modelModes;
  set: CardioSetClass;
  index: number;
  onSetDelete: (setIndex: number) => void;
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
    index: {
      width: "5%",
      marginRight: theme.margins.s
    },
    input: {
      width: "20%",
      marginRight: theme.margins.s
    },
    button_checkbox: {
      width: "10%"
    },
    button: {
      backgroundColor: theme.colors.primary,
      borderRadius: 5,
      margin: 0,
      padding: 0
    }
  })
  const [set_state, setSet] = useState(set)

  function onChangeWeight(weight: string) {
    setSet((prevSet) => ({ ...prevSet, weight: parseFloat(weight) || 0 }))
  }

  function onChangeDistance(dist: string) {
    setSet((prevSet) => ({ ...prevSet, distance: parseFloat(dist) || 0 }))
  }

  function onChangeDuration(dur: string) {
    setSet((prevSet) => ({ ...prevSet, duration: dur }))
  }

  function onCheckBoxPress() {
    setSet((prevSet) => ({ ...prevSet, done: !prevSet.done }))
  }

  useEffect(() => {
    set = set_state
  }, [set_state])

  const [timerActive, setTimerActive] = useState(false)

  return (
    <InlineContainer style={styles.container}>
      <Text style={[styles.index, styles.box]}>{index + 1}</Text>
      <SetFieldInput
        style={styles.input}
        inputMode={mode}
        value={set_state.weight.toString()}
        onChangeText={onChangeWeight}
      />
      <SetFieldInput
        style={styles.input}
        inputMode={mode}
        value={set_state.distance.toString()}
        onChangeText={onChangeDistance}
      />
      <SetFieldInput
        style={[styles.input]}
        inputMode={mode}
        value={set_state.duration}
        onChangeText={onChangeDuration}
      />

      {mode == modelModes.Session && (
        <IconButton
          icon={"play"}
          style={[styles.button, { marginRight: theme.margins.s }]}
          onPress={() => {
            console.log(timerActive ? "stop timer" : "start timer")
            setTimerActive(!timerActive)
          }}
        />
      )}
      {mode != modelModes.View && (
        <View style={styles.button_checkbox}>
          {mode == modelModes.Edit ? (
            <IconButton
              style={styles.button}
              icon={images.Trash}
              onPress={() => onSetDelete(index)}
            />
          ) : (
            <Checkbox
              status={set_state.done ? "checked" : "unchecked"}
              onPress={onCheckBoxPress}
            />
          )}
        </View>
      )}
    </InlineContainer>
  )
}
