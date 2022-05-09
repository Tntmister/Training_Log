import React, { useEffect, useRef, useState } from "react"
import { Alert, StyleSheet, View } from "react-native"
import { Checkbox, IconButton } from "react-native-paper"
import { StretchingSetClass } from "../../../../../../dataDefinition/data"
import { images } from "../../../../../lib/extra"
import { useTheme } from "../../../../../providers/Theme"
import InlineContainer from "../../../../reusable/InlineView"
import { Text } from "../../../../reusable/Text"
import { modelModes } from "../../Models/Model"
import SetFieldInput from "./SetFieldInput"

export default function StretchingSet({
  mode,
  set,
  index,
  onSetDelete
}: {
  mode: modelModes;
  set: StretchingSetClass;
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
      margin: 0,
      padding: 0
    }
  })
  const [set_state, setSet] = useState(set)

  function onChangeWeight(weight: string) {
    setSet(set_state.withWeight(parseFloat(weight) || 0) as StretchingSetClass)
  }

  function onCheckBoxPress() {
    setSet(set_state.withToggledDone() as StretchingSetClass)
  }

  useEffect(() => {
    set = set_state
  }, [set_state])

  const [timerActive, setTimerActive] = useState(false)

  const interval = useRef<NodeJS.Timer>()

  function onTimerToggle() {
    if (timerActive) {
      clearInterval(interval.current!)
    } else {
      interval.current = setInterval(() => {
        setSet(set_state.withDuration(set_state.duration + 1))
      }, 1000)
    }
    setTimerActive(!timerActive)
  }

  function onTimerReset() {
    Alert.alert(
      "Reset Timer",
      `Are you sure you want to reset the timer for set ${index}?`,
      [
        {
          text: "Yes",
          onPress: () => {
            setSet(set_state.withDuration(0))
            clearInterval(interval.current!)
            setTimerActive(false)
          }
        },
        { text: "No" }
      ]
    )
  }
  return (
    <InlineContainer style={styles.container}>
      <Text style={[styles.index, styles.box]}>{index + 1}</Text>

      <SetFieldInput
        inputMode={mode}
        style={styles.input}
        value={set_state.weight.toString()}
        onChangeText={onChangeWeight}
      />
      <SetFieldInput
        style={styles.input}
        inputMode={modelModes.View}
        value={set_state.duration.toString()}
      />

      {mode == modelModes.Session && (
        <IconButton
          rippleColor={theme.colors.primary}
          icon={"play"}
          style={[styles.button, { marginRight: theme.margins.s }]}
          onPress={onTimerToggle}
          onLongPress={onTimerReset}
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
