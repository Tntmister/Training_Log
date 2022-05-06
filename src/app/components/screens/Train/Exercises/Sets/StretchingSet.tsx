import React from "react"
import { StyleSheet, View } from "react-native"
import { Checkbox, IconButton } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import { images } from "../../../../../lib/extra"
import { useTheme } from "../../../../../providers/Theme"
import InlineContainer from "../../../../reusable/InlineView"
import { Text } from "../../../../reusable/Text"
import { modelModes } from "../../Models/Model"
import SetFieldInput from "./SetFieldInput"

export default function StretchingSet({
  mode,
  setNum,
  weight,
  duration,
  wantedDuration,
  done,
  onChangeWeight,
  onChangeWDuration,
  onChangeDuration,
  onDeletePress,
  onSetCheckbox
}: {
  mode: modelModes;
  setNum: number;
  weight: number;
  wantedDuration?: string;
  duration: string;
  distance?: number;
  done: boolean;
  onChangeWeight: (setIndex: number, weight: number) => void;
  onChangeWDuration: (setIndex: number, dur: string) => void;
  onChangeDuration: (setIndex: number, dur: string) => void;
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
        style={styles.goalTime}
        value={duration}
        onChangeText={(time) => onChangeDuration(setNum, time)}
      />
      <SetFieldInput
        inputMode={mode}
        style={styles.goalTime}
        value={wantedDuration}
        onChangeText={(time) => onChangeWDuration(setNum, time)}
        disabled={mode != modelModes.Edit}
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
  goalTime: {
    //backgroundColor: "green",
    width: "30%"
  },
  time: {
    //backgroundColor: "purple",
    width: "20%"
  }
})
