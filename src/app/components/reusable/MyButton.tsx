import React from "react"
import { Text, StyleSheet, Pressable } from "react-native"
import { ThemeContext } from "./../App"

export default function Button(props: any) {
  const { onPress, title } = props
  const theme = React.useContext(ThemeContext)

  return (
    <Pressable
      style={{ ...styles.button, backgroundColor: theme.colors.background }}
      onPress={onPress}
    >
      <Text style={{ ...styles.text, color: theme.colors.foreground }}>
        {title}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5
    //backgroundColor: Style.background[1]
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold"
    //color: Style.text[1]
  }
})
