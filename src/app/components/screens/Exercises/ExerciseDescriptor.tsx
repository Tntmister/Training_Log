import React from "react"
import { Image, View, TouchableOpacity } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { Exercise } from "../../../../dataDefinition/data"
import { useTheme } from "../../../providers/Theme"
import { Text } from "../../reusable/Text"

const icons = {
  cardio: require("../../../assets/icons/ex_categ/cardio/cardio(-xxxhdpi).png"),
  plyometrics: require("../../../assets/icons/ex_categ/plyometrics/plyometrics(-xxxhdpi).png"),
  strength: require("../../../assets/icons/ex_categ/strength/strength(-xxxhdpi).png"),
  stretching: require("../../../assets/icons/ex_categ/stretching/stretching(-xxxhdpi).png"),
  weightlifting: require("../../../assets/icons/ex_categ/weightlifting/weightlifting(-xxxhdpi).png")
}

export default function ExerciseDescriptor({
  exercise,
  onPress
}: {
  exercise: Exercise;
  onPress: () => void;
}) {
  const theme = useTheme()

  const primaryMuscle =
    exercise.primaryMuscles[0].charAt(0).toUpperCase() +
    exercise.primaryMuscles[0].slice(1)

  const equip = `(${
    exercise.equipment.charAt(0).toUpperCase() + exercise.equipment.slice(1)
  })`

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.backdrop,
        marginBottom: theme.margins.s,
        width: "95%",
        paddingVertical: theme.paddings.s,
        paddingHorizontal: theme.paddings.m,
        borderRadius: 10,
        height: 70,
        elevation: 6
      }}
    >
      <Image
        style={{
          marginRight: theme.margins.s,
          height: "75%",
          width: undefined,
          aspectRatio: 1,
          tintColor: theme.colors.text
        }}
        source={icons[exercise.category as keyof typeof icons]}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          paddingVertical: theme.paddings.s
        }}
      >
        <Text
          style={{
            flexWrap: "wrap",
            color: theme.colors.primary,
            fontSize: RFValue(16)
          }}
        >
          {exercise.name}
        </Text>
        <Text style={{ color: theme.colors.text, fontSize: RFValue(14) }}>
          {
            primaryMuscle + " " + equip
            /*+ " " + ex.id*/
          }
        </Text>
      </View>
    </TouchableOpacity>
  )
}
