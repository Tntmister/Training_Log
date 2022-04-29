import React from "react"
import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { Theme } from "../../../../../providers/Theme"
import InlineContainer from "../../../../reusable/InlineContainer"
import { Text } from "../../../../reusable/Text"
import SetFieldInput from "./SetFieldInput"

export default function WESet({
  theme,
  model,
  setNum
}: {
  theme: Theme;
  model: boolean;
  setNum: number;
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
        {setNum}
      </Text>
      <SetFieldInput style={styles.weight} />
      <SetFieldInput style={styles.repRange} />
      <SetFieldInput style={styles.repRange} />
      <SetFieldInput style={styles.reps} disabled={model} />
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
    width: "15%"
  },
  weight: {
    //backgroundColor: "purple",
    width: "20%"
  },
  repRange: {
    //backgroundColor: "green",
    width: "20%"
  },
  reps: {
    //backgroundColor: "purple",
    width: "20%"
  }
})
