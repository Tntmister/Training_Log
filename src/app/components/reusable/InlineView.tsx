/* eslint-disable react/prop-types */
import React from "react"
import { View, ViewProps } from "react-native"

export default function InlineView({ style, ...props }: ViewProps) {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        },
        style
      ]}
      {...props}
    />
  )
}
