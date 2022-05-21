import React from "react"
import { View, ViewProps } from "react-native"
import { useTheme } from "../../providers/Theme"

function Divider({ style, ...props }: ViewProps) {
  const theme = useTheme()
  return (
    <View
      style={[
        {
          alignSelf: "center",
          height: 0,
          borderTopColor: theme.colors.primary,
          borderTopWidth: theme.borders.borderWidth_m,
          width: "90%",
          marginTop: theme.margins.m
        },
        style
      ]}
      {...props}
    />
  )
}

export default React.memo(Divider)
