/* eslint-disable react/prop-types */
import React from "react"
import { Button as PaperButton } from "react-native-paper"
import { useTheme } from "../../providers/Theme"

export function Button({
  style,
  labelStyle,
  ...props
}: React.ComponentProps<typeof PaperButton>) {
  const theme = useTheme()
  return (
    <PaperButton
      labelStyle={[
        {
          ...theme.text.body_l,
          textAlign: "center",
          textAlignVertical: "center",
          color: theme.colors.white
        },
        labelStyle
      ]}
      style={[
        {
          alignSelf: "center"
        },
        style
      ]}
      mode="contained"
      uppercase={false}
      {...props}
    />
  )
}
