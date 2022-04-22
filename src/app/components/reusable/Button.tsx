/* eslint-disable react/prop-types */
import React from "react"
import { Button as PaperButton } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import { useTheme } from "../../providers/Theme"

export function Button({
  style,
  labelStyle,
  children,
  ...props
}: React.ComponentProps<typeof PaperButton>) {
  const theme = useTheme()
  return (
    <PaperButton
      labelStyle={{
        paddingVertical: theme.paddings.s,
        color: theme.colors.white,
        fontSize: RFValue(16),
        fontFamily: "Lato",
        ...(typeof labelStyle === "object" ? labelStyle : {})
      }}
      style={{
        marginTop: theme.margins.l,
        alignSelf: "center",
        ...(typeof style === "object" ? style : {})
      }}
      mode="contained"
      uppercase={false}
      {...props}
    >
      {children}
    </PaperButton>
  )
}
