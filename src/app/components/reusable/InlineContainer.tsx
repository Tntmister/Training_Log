/* eslint-disable react/prop-types */
import React from "react"
import { View, ViewComponent } from "react-native"

export default function InlineContainer({
  children,
  style
}: React.ComponentProps<typeof ViewComponent>) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        ...(typeof style === "object" ? style : {})
      }}
    >
      {children}
    </View>
  )
}
