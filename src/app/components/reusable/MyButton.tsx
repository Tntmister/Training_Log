import React from "react"
import { Text, StyleSheet, Pressable } from "react-native"
import Style from "../../styles/styles"

export default function Button(props: any) {
  const { onPress, title } = props
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: Style.background[1]
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: Style.text[1]
  }
})
