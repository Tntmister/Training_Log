import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
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
    goalTime: { width: "30%" },
    time: { width: "20%" },
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

  function onChangeDuration(dur: string) {
    setSet((prevSet) => ({ ...prevSet, duration: dur }))
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
        style={styles.goalTime}
        value={set_state.duration}
        onChangeText={onChangeDuration}
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
              status={set_state.done ? "checked" : "unchecked"}
              onPress={onCheckBoxPress}
            />
          )}
        </View>
      )}
    </InlineContainer>
  )
}
