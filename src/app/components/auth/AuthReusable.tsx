/* eslint-disable react/prop-types */
import React from "react"
import { Button, TextInput } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import { useTheme } from "../../providers/Theme"

export const AuthTextInput = ({
  style,
  ...props
}: React.ComponentProps<typeof TextInput>) => {
  const theme = useTheme()
  return (
    <TextInput
      style={[
        {
          borderBottomColor: theme.colors.primary,
          marginTop: theme.margins.m,
          paddingHorizontal: theme.paddings.l,
          height: 50,
          borderBottomWidth: 2,
          width: "80%",
          fontSize: RFValue(16)
        },
        style
      ]}
      theme={{
        fonts: { regular: { fontFamily: "Lato", fontWeight: "normal" } }
      }}
      placeholderTextColor={theme.colors.placeholder}
      {...props}
    />
  )
}

export const AuthButton = ({
  style,
  labelStyle,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const theme = useTheme()
  return (
    <Button
      labelStyle={[
        {
          paddingVertical: theme.paddings.s,
          color: theme.colors.text,
          fontSize: RFValue(16),
          fontFamily: "Lato"
        },
        labelStyle
      ]}
      style={[
        {
          width: "80%",
          borderRadius: 50,
          marginTop: theme.margins.s
        },
        style
      ]}
      mode="contained"
      uppercase={false}
      {...props}
    />
  )
}
