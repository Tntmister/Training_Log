/* eslint-disable react/prop-types */
import React from "react"
import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { useTheme } from "../../../../../providers/Theme"
import { TextInput } from "../../../../reusable/TextInput"
import { modelModes } from "../../Models/Model"

export default function SetFieldInput({
  inputMode,
  style,
  ...props
}: { inputMode: modelModes } & React.ComponentProps<typeof TextInput>) {
  const theme = useTheme()
  const styles = StyleSheet.create({
    box: {
      textAlign: "center",
      textAlignVertical: "center",
      fontSize: RFValue(18),
      paddingHorizontal: 0,
      height: 40,
      marginTop: 0
    }
  })

  return (
    <TextInput
      editable={inputMode != modelModes.View}
      style={[
        styles.box,
        {
          backgroundColor: props.disabled
            ? theme.colors.backdrop
            : theme.colors.background
        },
        style
      ]}
      {...props}
      keyboardType="number-pad"
      defaultValue="0"
    />
  )
}
