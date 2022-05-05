import React from "react"
import { StyleSheet, View } from "react-native"
import { Checkbox, IconButton } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import { images } from "../../../../../lib/extra"
import { useTheme } from "../../../../../providers/Theme"
import InlineContainer from "../../../../reusable/InlineContainer"
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
  return (
    <InlineContainer
      style={{
        ...styles.container,
        paddingVertical: theme.margins.xs
      }}
    >
      <Text
        style={{
          ...styles.setNum,
          ...styles.box,
          color: theme.colors.primary,
          paddingVertical: theme.margins.xs
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
      <View style={{ width: "10%", alignItems: "center" }}>
        {mode == modelModes.Edit ? (
          <IconButton
            style={{ backgroundColor: theme.colors.primary, borderRadius: 5 }}
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

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between"
  },
  box: {
    textAlign: "center",
    fontSize: RFValue(18),
    borderRadius: 5,
    paddingHorizontal: 0,
    height: 30,
    marginTop: 0
  },
  setNum: {
    //backgroundColor: "green",
    width: "10%"
  },
  weight: {
    //backgroundColor: "purple",
    width: "20%"
  },
  repRange: {
    //backgroundColor: "green",
    width: "17.5%"
  },
  reps: {
    //backgroundColor: "purple",
    width: "15%"
  }
})
