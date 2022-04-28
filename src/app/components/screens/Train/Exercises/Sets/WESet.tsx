import React from "react"
import { StyleSheet } from "react-native"
import { Theme } from "../../../../../providers/Theme"
import InlineContainer from "../../../../reusable/InlineContainer"
import { Text } from "../../../../reusable/Text"

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
    <InlineContainer>
      <Text
        style={{
          ...styles.setNum,
          color: theme.colors.primary
        }}
      >
        {setNum}
      </Text>
    </InlineContainer>
  )
}

const styles = StyleSheet.create({
  setNum: {
    width: "10%",
    backgroundColor: "green"
  }
})
