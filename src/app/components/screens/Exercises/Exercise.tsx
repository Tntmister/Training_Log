import React from "react"
import { Button, Text } from "react-native"

export default function Exercise({ route, navigation }) {
  const { name, bla } = route.params
  console.log("INSIDE EXERCISE -> EX NAME -> " + name)
  return (
    <>
      <Text>{name}</Text>
      <Text>{bla}</Text>
      <Button onPress={() => navigation.goBack()} title="Back"></Button>
    </>
  )
}
