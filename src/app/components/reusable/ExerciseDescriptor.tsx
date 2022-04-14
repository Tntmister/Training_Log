import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { Exercise } from "../../../dataDefinition/data"
import { ThemeContext } from "../App"

export default function ExerciseDescriptor(props: { exercise: Exercise }) {
  const exercise = props.exercise
  const theme = React.useContext(ThemeContext)
  const path =
    "../../assets/icons/ex_categ/" +
    exercise.category +
    "/" +
    exercise.category +
    "(-xxxhdpi).png"
  return (
    <View
      style={{
        ...styles.container
      }}
    >
      <Text
        style={{
          ...styles.text,
          color: theme.colors.foreground,
          fontSize: theme.text.fontSizeSmall
        }}
      >
        {exercise.name}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10
  },
  text: {
    fontWeight: "bold"
  }
})
