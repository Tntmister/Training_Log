/* eslint-disable react/prop-types */
import React from "react"
import { Text as PaperText } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"

export function Text({
  style,
  children,
  ...props
}: React.ComponentProps<typeof PaperText>) {
  return (
    <PaperText
      style={[
        {
          fontFamily: "Lato",
          fontSize: RFValue(16)
        },
        style
      ]}
      {...props}
    >
      {children}
    </PaperText>
  )
}
