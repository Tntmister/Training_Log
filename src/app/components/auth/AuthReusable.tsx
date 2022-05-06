/* eslint-disable react/prop-types */
import React from "react"
import { Button } from "../reusable/Button"
import { TextInput } from "../reusable/TextInput"

export function AuthTextInput({
  style,
  ...props
}: React.ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      style={[
        {
          width: "80%"
        },
        style
      ]}
      {...props}
    />
  )
}

export function AuthButton({
  style,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      style={[
        {
          width: "80%",
          borderRadius: 50
        },
        style
      ]}
      mode="contained"
      uppercase={false}
      {...props}
    />
  )
}
