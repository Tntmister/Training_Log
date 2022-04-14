import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { Exercise } from "../../../dataDefinition/data"
import { ThemeContext } from "../App"

export default function ExerciseDescriptor(props: { exercise: Exercise }) {
  const theme = React.useContext(ThemeContext)
  const path = `../../assets/icons/ex_categ/${props.exercise.category}/${props.exercise.category}(-xxxhdpi).png`
  console.log(path)
  return (
    <View
      style={{
        ...styles.container
      }}
    >
      {
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require("../../assets/icons/ex_categ/weightlifting/weightlifting(-xxxhdpi).png")}
        />
      }
      <Text
        style={{
          ...styles.text,
          color: theme.colors.foreground,
          fontSize: theme.text.fontSizeSmall
        }}
      >
        {props.exercise.name}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flex: 1,
    justifyContent: "center"
  },
  text: {
    fontWeight: "bold"
  },
  image: {
    width: 40,
    height: 40
  }
})
