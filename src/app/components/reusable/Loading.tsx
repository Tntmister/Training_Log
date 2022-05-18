/* eslint-disable react/prop-types */
import React from "react"
import { ActivityIndicator } from "react-native-paper"
import { useTheme } from "../../providers/Theme"

export default function Loading({
  style,
  ...props
}: React.ComponentProps<typeof ActivityIndicator>) {
  const theme = useTheme()
  return (
    <ActivityIndicator
      size="large"
      style={[
        {
          alignSelf: "center",
          marginVertical: theme.margins.xl
        },
        style
      ]}
      {...props}
    />
  )
}
