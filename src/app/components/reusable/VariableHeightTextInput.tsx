/* eslint-disable react/prop-types */
import React from "react"
import { TextInput } from "./TextInput"
import { TextInput as PaperTextInput } from "react-native-paper"

export function VariableHeightTextInput({
  style,
  ...props
}: React.ComponentProps<typeof PaperTextInput>) {
  return (
    <TextInput
      multiline={true}
      textAlignVertical={"top"}
      numberOfLines={props.value!.split("\n").length + 1}
      style={[
        {
          height: ""
        },
        style
      ]}
      maxLength={150}
      {...props}
    />
  )
}
