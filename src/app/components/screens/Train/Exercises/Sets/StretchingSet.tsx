import React from "react"
import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { images } from "../../../../../lib/extra"
import { Theme } from "../../../../../providers/Theme"
import { Button } from "../../../../reusable/Button"
import InlineContainer from "../../../../reusable/InlineContainer"
import { Text } from "../../../../reusable/Text"
import SetFieldInput from "./SetFieldInput"

export default function StretchingSet({
  theme,
  model,
  setNum,
  weight,
  wantedDuration,
  duration,
  onChangeWeight,
  onChangeWDuration,
  onDeletePress
}: {
  theme: Theme;
  model: boolean;
  setNum: number;
  weight: number;
  wantedDuration?: string;
  duration: string;
  distance?: number;
  onChangeWeight: (setIndex: number, weight: number) => void;
  onChangeWDuration: (setIndex: number, dur: string) => void;
  onChangeDuration: (setIndex: number, dur: string) => void;
  onDeletePress: (setIndex: number) => void;
}) {
  return (
    <InlineContainer
      style={{
        ...styles.container,

        paddingVertical: theme.margins.s
      }}
    >
      <Text
        style={{
          ...styles.setNum,
          ...styles.box,
          color: theme.colors.text,
          paddingVertical: theme.margins.xs
        }}
      >
        {setNum + 1}
      </Text>

      <SetFieldInput
        style={styles.weight}
        value={isNaN(weight) ? "0" : weight.toString()}
        onChangeText={(w) => onChangeWeight(setNum, parseFloat(w))}
      />
      <SetFieldInput
        style={styles.goalTime}
        value={wantedDuration}
        onChangeText={(time) => onChangeWDuration(setNum, time)}
      />

      <SetFieldInput style={styles.time} value={duration} disabled={model} />
      <Button
        style={{
          ...styles.del,
          height: 40,
          marginTop: 0,
          borderRadius: 5
        }}
        labelStyle={{
          fontSize: RFValue(26)
        }}
        onPress={() => onDeletePress(setNum)}
        icon={images.Trash}
        compact={true}
      >
        {}
      </Button>
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
  },
  del: {
    //backgroundColor: "green",
    width: "15%"
  }
})
