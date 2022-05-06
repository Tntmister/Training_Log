/* eslint-disable react/prop-types */
import React, { useRef } from "react"
import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { useTheme } from "../../../../../providers/Theme"
import { Text } from "../../../../reusable/Text"
import { TextInput } from "../../../../reusable/TextInput"
import { modelModes } from "../../Models/Model"

export default function SetFieldInput({
  inputMode,
  style,
  ...props
}: { inputMode: modelModes } & React.ComponentProps<typeof TextInput>) {
  const theme = useTheme()
  const styles = useRef(
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
  ).current

  if (inputMode != modelModes.View)
    return (
      <TextInput
        style={[
          {
            ...theme.text.header,
            ...styles.box,
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
  else
    return (
      <Text
        style={[
          {
            ...styles.box
          },
          style
        ]}
      >
        {props.value}
      </Text>
    )
}
