import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { Image, View, TouchableOpacity } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { Exercise } from "../../../../../dataDefinition/data"
import { categoryIcons } from "../../../../lib/exercises"
import { Theme } from "../../../../providers/Theme"
import { Text } from "../../../reusable/Text"
import { RootStackParamList } from "./ExerciseNav"

function ExerciseDescriptor({
  exercise,
  navigation,
  theme
}: {
  exercise: Exercise;
  navigation: StackNavigationProp<RootStackParamList, "ExerciseList">;
  theme: Theme;
}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Exercise", { exercise: exercise })}
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
        source={categoryIcons[exercise.category as keyof typeof categoryIcons]}
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
          {exercise.primaryMuscle + " - " + exercise.equipment}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
export default React.memo(ExerciseDescriptor)
