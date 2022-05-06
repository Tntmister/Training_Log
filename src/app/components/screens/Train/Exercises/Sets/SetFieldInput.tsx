/* eslint-disable react/prop-types */
import React from "react"
import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { Theme, useTheme } from "../../../../../providers/Theme"
import { Text } from "../../../../reusable/Text"
import { TextInput } from "../../../../reusable/TextInput"
import { modelModes } from "../../Models/Model"

const styles = (theme: Theme) =>
  StyleSheet.create({
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

export default function SetFieldInput({
  inputMode,
  style,
  ...props
}: { inputMode: modelModes } & React.ComponentProps<typeof TextInput>) {
  const theme = useTheme()
  const style_hook = styles(theme)

  if (inputMode != modelModes.View)
    return (
      <TextInput
        style={{
          ...theme.text.header,
          ...style_hook.box,
          backgroundColor: props.disabled
            ? theme.colors.backdrop
            : theme.colors.background,
          ...(typeof style === "object" ? style : {})
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
          ...style_hook.box,
          ...(typeof style === "object" ? style : {})
        }}
      >
        {props.value}
      </Text>
    )
}
