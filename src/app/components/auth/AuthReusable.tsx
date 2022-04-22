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
      style={{
        width: "80%",
        ...(typeof style === "object" ? style : {})
      }}
      {...props}
    />
  )
}

export function AuthButton({
  style,
  labelStyle,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      labelStyle={{
        ...(typeof labelStyle === "object" ? labelStyle : {})
      }}
      style={{
        width: "80%",
        borderRadius: 50,
        ...(typeof style === "object" ? style : {})
      }}
      mode="contained"
      uppercase={false}
      {...props}
    />
  )
}
