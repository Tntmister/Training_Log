/* eslint-disable react/prop-types */
import React from "react"
import { TextInput as PaperTextInput } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import { useTheme } from "../../providers/Theme"

export function TextInput({
  style,
  ...props
}: React.ComponentProps<typeof PaperTextInput>) {
  const theme = useTheme()
  return (
    <PaperTextInput
      underlineColor={theme.colors.primary}
      style={{
        borderBottomColor: theme.colors.primary,
        marginTop: theme.margins.m,
        paddingHorizontal: theme.paddings.l,
        height: 50,
        borderBottomWidth: 2,
        fontSize: RFValue(16),
        ...(typeof style === "object" ? style : {})
      }}
      placeholderTextColor={theme.colors.placeholder}
      {...props}
    />
  )
}
