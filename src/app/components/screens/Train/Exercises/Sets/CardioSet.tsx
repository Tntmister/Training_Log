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

export default function CardioSet({
  mode,
  setNum,
  weight,
  duration,
  distance,
  done,
  onChangeWeight,
  onChangeDuration,
  onChangeDistance,
  onDeletePress,
  onSetCheckbox
}: {
  mode: modelModes;
  setNum: number;
  weight: number;
  duration: string;
  distance: number;
  done: boolean;
  onChangeWeight: (setIndex: number, weight: number) => void;
  onChangeDuration: (setIndex: number, dur: string) => void;
  onChangeDistance: (setIndex: number, dist: number) => void;
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
      fontSize: RFValue(18),
      borderRadius: 5,
      paddingHorizontal: 0,
      height: 30,
      marginTop: 0,
      color: theme.colors.primary,
      paddingVertical: theme.margins.xs
    },
    setNum: { width: "10%" },
    weight: { width: "20%" },
    distance: { width: "25%" },
    time: { width: "25%" },
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
        style={styles.distance}
        value={isNaN(distance) ? "0" : distance.toString()}
        onChangeText={(dist) => onChangeDistance(setNum, parseFloat(dist))}
      />
      <SetFieldInput
        inputMode={mode}
        style={styles.time}
        value={duration}
        onChangeText={(time) => onChangeDuration(setNum, time)}
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
