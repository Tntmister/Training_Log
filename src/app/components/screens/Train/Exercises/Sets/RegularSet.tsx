import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Checkbox, IconButton } from "react-native-paper"
import { RegularSetClass } from "../../../../../../dataDefinition/data"
import { images } from "../../../../../lib/extra"
import { useTheme } from "../../../../../providers/Theme"
import InlineContainer from "../../../../reusable/InlineView"
import { Text } from "../../../../reusable/Text"
import { modelModes } from "../../Models/Model"
import SetFieldInput from "./SetFieldInput"

export default function RegularSet({
  mode,
  set,
  index,
  done,
  onSetDelete
}: {
  mode: modelModes;
  set: RegularSetClass;
  index: number;
  done: boolean;
  onSetDelete: (setIndex: number) => void;
}) {
  const theme = useTheme()
  const styles = StyleSheet.create({
    container: {
      justifyContent: "space-between",
      paddingVertical: theme.margins.xs
    },
    box: {
      textAlign: "center",
      fontSize: theme.text.body_l.fontSize,
      borderRadius: 5,
      paddingHorizontal: 0,
      height: 30,
      marginTop: 0,
      color: theme.colors.primary,
      paddingVertical: theme.margins.xs
    },
    setNum: { width: "10%" },
    weight: { width: "20%" },
    repRange: { width: "17.5%" },
    reps: { width: "15%" },
    thrashContainer: {
      width: "10%",
      alignItems: "center"
    },
    iconBtn: {
      backgroundColor: theme.colors.primary,
      borderRadius: 5
    }
  })
  const [set_state, setSet] = useState(set)

  function onChangeWeight(weight: string) {
    setSet((prevSet) => ({ ...prevSet, weight: parseFloat(weight) || 0 }))
  }

  function onChangeReps(reps: string) {
    setSet((prevSet) => ({ ...prevSet, reps: parseFloat(reps) || 0 }))
  }

  function onCheckBoxPress() {
    setSet((prevSet) => ({ ...prevSet, done: !prevSet.done }))
  }

  useEffect(() => {
    set = set_state
  }, [set_state])

  return (
    <InlineContainer style={styles.container}>
      <Text
        style={{
          ...styles.setNum,
          ...styles.box
        }}
      >
        {index + 1}
      </Text>
      <SetFieldInput
        inputMode={mode}
        style={styles.weight}
        value={set_state.weight.toString()}
        onChangeText={onChangeWeight}
      />
      <SetFieldInput
        inputMode={mode}
        style={styles.repRange}
        value={set_state.reps.toString()}
        onChangeText={onChangeReps}
      />
      {mode != modelModes.View && (
        <View style={styles.thrashContainer}>
          {mode == modelModes.Edit ? (
            <IconButton
              style={styles.iconBtn}
              icon={images.Trash}
              onPress={() => onSetDelete(index)}
            />
          ) : (
            <Checkbox
              status={done ? "checked" : "unchecked"}
              onPress={onCheckBoxPress}
            />
          )}
        </View>
      )}
    </InlineContainer>
  )
}
