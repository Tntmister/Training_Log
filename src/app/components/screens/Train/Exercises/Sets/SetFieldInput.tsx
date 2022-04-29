/* eslint-disable react/prop-types */
import React from "react"
import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { useTheme } from "../../../../../providers/Theme"
import { TextInput } from "../../../../reusable/TextInput"

export default function SetFieldInput({
  style,
  ...props
}: React.ComponentProps<typeof TextInput>) {
  const theme = useTheme()

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
}

const styles = StyleSheet.create({
  box: {
    textAlign: "center",
    fontSize: RFValue(18),
    borderRadius: 5,
    paddingHorizontal: 0,
    height: 40,
    marginTop: 0
  }
})
