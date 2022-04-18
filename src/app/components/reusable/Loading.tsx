import React from "react"
import { ActivityIndicator } from "react-native-paper"

export default function Loading(props: {
  color: string;
  marginVertical?: number;
}) {
  return (
    <ActivityIndicator
      size="large"
      color={props.color}
      style={{ marginVertical: props.marginVertical }}
    />
  )
}
