import React from "react"
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { Exercise } from "../../../../dataDefinition/data"
import { ThemeContext } from "../../../App"
import LinearGrad from "../../reusable/LinearGrad"

const cardio = "../../../assets/icons/ex_categ/cardio/cardio(-xxxhdpi).png"
const plyometrics =
  "../../../assets/icons/ex_categ/plyometrics/plyometrics(-xxxhdpi).png"
const strength =
  "../../../assets/icons/ex_categ/strength/strength(-xxxhdpi).png"
const stretching =
  "../../../assets/icons/ex_categ/stretching/stretching(-xxxhdpi).png"
const weightlifting =
  "../../../assets/icons/ex_categ/weightlifting/weightlifting(-xxxhdpi).png"

export default function ExerciseDescriptor(props: {
  exercise: Exercise;
  onExClick: (ex: string) => void;
}) {
  const theme = React.useContext(ThemeContext)
  const ex = props.exercise

  const primaryMuscle =
    ex.primaryMuscles[0].charAt(0).toUpperCase() +
    ex.primaryMuscles[0].slice(1)

  const equip = `( ${
    ex.equipment.charAt(0).toUpperCase() + ex.equipment.slice(1)
  } )`

  const colorStart = theme.colors.white
  const colorEnd = theme.colors.white

  return (
    <View style={{ justifyContent: "center", flexDirection: "row" }}>
      <LinearGrad
        height={70}
        bgStart={colorStart}
        bgEnd={colorEnd}
        center={false}
        marginVertical={5}
      >
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
              color: theme.colors.main,
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
        <TouchableOpacity onPress={() => props.onExClick(ex.name)}>
          <View style={styles.helpContainer}>
            <Image
              source={require("../../../assets/icons/help/help(-xxxhdpi).png")}
              style={styles.help}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </LinearGrad>
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    width: "85%"
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
  },
  help: {
    width: 15,
    height: 15
  },
  helpContainer: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  }
})
