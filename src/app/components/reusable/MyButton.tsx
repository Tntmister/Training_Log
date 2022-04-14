import React from "react"
import { Text, StyleSheet, Pressable } from "react-native"
import { ThemeContext } from "./../App"

interface IButton {
  onPress: () => void;
  title: string;
}

export default function Button(props: IButton) {
  const theme = React.useContext(ThemeContext)

  return (
    <Pressable
      style={{ ...styles.button, backgroundColor: theme.colors.background }}
      onPress={props.onPress}
    >
      <Text style={{ ...styles.text, color: theme.colors.foreground }}>
        {props.title}
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
