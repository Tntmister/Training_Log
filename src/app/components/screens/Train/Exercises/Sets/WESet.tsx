import React from "react"
import { StyleSheet, View } from "react-native"
import { Checkbox, IconButton } from "react-native-paper"
import { images } from "../../../../../lib/extra"
import { useTheme } from "../../../../../providers/Theme"
import InlineContainer from "../../../../reusable/InlineView"
import { Text } from "../../../../reusable/Text"
import { modelModes } from "../../Models/Model"
import SetFieldInput from "./SetFieldInput"

export default function WESet({
  mode,
  setNum,
  weight,
  min,
  max,
  done,
  onChangeWeight,
  onChangeRepMin,
  onChangeRepMax,
  onDeletePress,
  onSetCheckbox
}: {
  mode: modelModes;
  setNum: number;
  weight: number;
  min: number;
  max: number;
  done: boolean;
  onChangeWeight: (setIndex: number, weight: number) => void;
  onChangeRepMin: (setIndex: number, amount: number) => void;
  onChangeRepMax: (setIndex: number, amount: number) => void;
  onDeletePress: (setIndex: number) => void;
  onSetCheckbox: (setIndex: number) => void;
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
  return (
    <InlineContainer style={styles.container}>
      <Text
        style={{
          ...styles.setNum,
          ...styles.box
        }}
      >
        {setNum + 1}
      </Text>
      <SetFieldInput
        inputMode={mode}
        style={styles.weight}
        value={isNaN(weight) ? "0" : weight.toString()}
        onChangeText={(w) => onChangeWeight(setNum, parseFloat(w))}
      />
      <SetFieldInput
        inputMode={mode}
        style={styles.repRange}
        value={isNaN(min) ? "0" : min.toString()}
        onChangeText={(n) => onChangeRepMin(setNum, parseInt(n))}
      />
      <SetFieldInput
        inputMode={mode}
        style={styles.repRange}
        value={isNaN(max) ? "0" : max.toString()}
        onChangeText={(n) => onChangeRepMax(setNum, parseInt(n))}
      />
      <SetFieldInput
        inputMode={mode == modelModes.Session ? mode : modelModes.View}
        style={styles.reps}
        value={"0"}
      />
      <View style={styles.thrashContainer}>
        {mode == modelModes.Edit ? (
          <IconButton
            style={styles.iconBtn}
            icon={images.Trash}
            onPress={() => onDeletePress(setNum)}
          />
        ) : (
          mode == modelModes.Session && (
            <Checkbox
              status={done ? "checked" : "unchecked"}
              onPress={() => onSetCheckbox(setNum)}
            />
          )
        )}
      </View>
    </InlineContainer>
  )
}
