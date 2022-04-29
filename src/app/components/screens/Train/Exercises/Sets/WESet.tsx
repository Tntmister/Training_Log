import React from "react"
import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { images } from "../../../../../lib/extra"
import { Theme } from "../../../../../providers/Theme"
import { Button } from "../../../../reusable/Button"
import InlineContainer from "../../../../reusable/InlineContainer"
import { Text } from "../../../../reusable/Text"
import SetFieldInput from "./SetFieldInput"

export default function WESet({
  theme,
  model,
  setNum,
  weight,
  min,
  max,
  onChangeWeight,
  onChangeRepMin,
  onChangeRepMax,
  onDeletePress
}: {
  theme: Theme;
  model: boolean;
  setNum: number;
  weight: number;
  min: number;
  max: number;
  onChangeWeight: (setIndex: number, weight: number) => void;
  onChangeRepMin: (setIndex: number, amount: number) => void;
  onChangeRepMax: (setIndex: number, amount: number) => void;
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
        style={styles.repRange}
        value={isNaN(min) ? "0" : min.toString()}
        onChangeText={(n) => onChangeRepMin(setNum, parseInt(n))}
      />
      <SetFieldInput
        style={styles.repRange}
        value={isNaN(max) ? "0" : max.toString()}
        onChangeText={(n) => onChangeRepMax(setNum, parseInt(n))}
      />
      <SetFieldInput style={styles.reps} disabled={model} />
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
  repRange: {
    //backgroundColor: "green",
    width: "17.5%"
  },
  reps: {
    //backgroundColor: "purple",
    width: "15%"
  },
  del: {
    //backgroundColor: "green",
    width: "15%"
  }
})
