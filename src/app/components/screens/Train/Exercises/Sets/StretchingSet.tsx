import React, { useEffect, useRef, useState } from "react"
import { Alert, StyleSheet, View } from "react-native"
import { Checkbox, IconButton } from "react-native-paper"
import {
  ExerciseSet,
  StretchingSetClass
} from "../../../../../lib/types/train"
import { images } from "../../../../../lib/extra"
import { useTheme } from "../../../../../providers/Theme"
import InlineView from "../../../../reusable/InlineView"
import { Text } from "../../../../reusable/Text"
import { modelModes } from "../../Models/Model"
import SetFieldInput from "./SetFieldInput"

export default function StretchingSet({
  mode,
  set,
  index,
  setSets
}: {
  mode: modelModes;
  set: StretchingSetClass;
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

  function onSetDelete(index: number) {
    setSets((prevSets) => prevSets.filter((_, i) => i != index))
  }

  function setSet(callback: (set: StretchingSetClass) => StretchingSetClass) {
    setSets((sets) =>
      sets.map((value, index) =>
        index != sets.indexOf(set) ? value : callback(set)
      )
    )
  }

  function onChangeWeight(weight: string) {
    setSet((prevSet) => ({ ...prevSet, weight: parseFloat(weight) || 0 }))
  }

  function onCheckBoxPress() {
    setSet((prevSet) => ({ ...prevSet, done: !prevSet.done }))
  }

  const [timerActive, setTimerActive] = useState(false)
  const toggleTimer = () => {
    prevNow.current = Date.now()
    setTimerActive((prevState) => !prevState)
  }
  const prevNow = useRef(0)
  const interval = useRef<NodeJS.Timer>()

  useEffect(() => {
    if (timerActive) {
      interval.current = setInterval(() => {
        if (Date.now() - prevNow.current > 1000) {
          setSet((prevSet) => ({ ...prevSet, duration: prevSet.duration + 1 }))
          prevNow.current = Date.now()
        }
      }, 50)
      return () => {
        clearInterval(interval.current!)
      }
    }
  }, [timerActive, set.duration])

  function onTimerReset() {
    Alert.alert(
      "Reset Timer",
      `Are you sure you want to reset the timer for set ${index}?`,
      [
        {
          text: "Yes",
          onPress: () => {
            setSet((prevSet) => ({ ...prevSet, duration: 0 }))
            clearInterval(interval.current!)
            setTimerActive(false)
          }
        },
        { text: "No" }
      ]
    )
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
      <SetFieldInput
        style={styles.input}
        inputMode={modelModes.View}
        value={new Date(set.duration * 1000).toISOString().substring(14, 19)}
      />

      {mode == modelModes.Session && (
        <IconButton
          rippleColor={theme.colors.primary}
          icon={timerActive ? "pause" : "play"}
          style={[styles.button, { marginRight: theme.margins.s }]}
          onPress={toggleTimer}
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
              status={set.done ? "checked" : "unchecked"}
              onPress={onCheckBoxPress}
            />
          )}
        </View>
      )}
    </InlineView>
  )
}
