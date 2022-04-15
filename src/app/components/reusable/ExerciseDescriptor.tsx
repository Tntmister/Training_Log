import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { Exercise } from "../../../dataDefinition/data"
import { ThemeContext } from "../App"
import LinearGrad from "./LinearGrad"

const cardio = "../../assets/icons/ex_categ/cardio/cardio(-xxxhdpi).png"
const plyometrics =
  "../../assets/icons/ex_categ/plyometrics/plyometrics(-xxxhdpi).png"
const strength = "../../assets/icons/ex_categ/strength/strength(-xxxhdpi).png"
const stretching =
  "../../assets/icons/ex_categ/stretching/stretching(-xxxhdpi).png"
const weightlifting =
  "../../assets/icons/ex_categ/weightlifting/weightlifting(-xxxhdpi).png"

export default function ExerciseDescriptor(props: { exercise: Exercise }) {
  const theme = React.useContext(ThemeContext)
  const ex = props.exercise
  const primaryMuscle =
    ex.primaryMuscles[0].charAt(0).toUpperCase() +
    ex.primaryMuscles[0].slice(1)
  const equip = `( ${
    ex.equipment.charAt(0).toUpperCase() + ex.equipment.slice(1)
  } )`
  return (
    <View style={{ justifyContent: "center", flexDirection: "row" }}>
      <LinearGrad height={80}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={
            ex.category === "cardio"
              ? require(cardio)
              : ex.category === "plyometrics"
                ? require(plyometrics)
                : ex.category === "strength"
                  ? require(strength)
                  : ex.category === "stretching"
                    ? require(stretching)
                    : ex.category === "weightlifting"
                      ? require(weightlifting)
                      : ""
          }
        />
        <View style={styles.textContainer}>
          <Text
            style={{
              ...styles.text,
              color: theme.colors.foreground,
              fontSize: theme.text.fontSizeSmall
            }}
          >
            {ex.name}
          </Text>
          <Text style={{ ...styles.smallText, color: theme.colors.background }}>
            {
              primaryMuscle + " " + equip
              /*+ " " + ex.id*/
            }
          </Text>
        </View>
      </LinearGrad>
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    width: "90%"
  },

  text: {
    fontWeight: "bold",
    paddingHorizontal: 10
    //backgroundColor: "red"
  },
  smallText: {
    paddingHorizontal: 15
    //backgroundColor: "blue"
  },
  image: {
    width: 30,
    height: 30
    //backgroundColor: "white"
  }
})
