/* eslint-disable react/prop-types */
import React from "react"
import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { useTheme } from "../../../../../providers/Theme"
import { Text } from "../../../../reusable/Text"
import { TextInput } from "../../../../reusable/TextInput"
import { modelModes } from "../../Models/EditModel"

export default function SetFieldInput({
  inputMode,
  style,
  ...props
}: { inputMode: modelModes } & React.ComponentProps<typeof TextInput>) {
  const theme = useTheme()

  if (inputMode != modelModes.View)
    return (
      <TextInput
        style={{
          ...styles.box,
          ...(typeof style === "object" ? style : {}),
          backgroundColor: props.disabled
            ? theme.colors.backdrop
            : theme.colors.background
        }}
        {...props}
        keyboardType="number-pad"
        defaultValue="0"
      />
    )
  else
    return (
      <Text
        style={{
          ...styles.box,
          ...(typeof style === "object" ? style : {})
        }}
      >
        {props.value}
      </Text>
    )
}

const styles = StyleSheet.create({
  box: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: RFValue(18),
    borderRadius: 5,
    paddingHorizontal: 0,
    height: 40,
    marginTop: 0
  }
})
