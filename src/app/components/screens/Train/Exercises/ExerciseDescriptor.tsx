import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { Image, View, TouchableOpacity, StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { Exercise } from "../../../../../dataDefinition/data"
import { categoryIcons } from "../../../../lib/exercises"
import { Theme } from "../../../../providers/Theme"
import { Text } from "../../../reusable/Text"
import { RootStackParamListModelNav } from "../Models/ModelNav"
import { RootStackParamList } from "./ExerciseNav"
import { images } from "../../../../lib/extra"

function ExerciseDescriptor({
  exercise,
  navigation,
  theme,
  onPress,
  checked,
  setNum
}: {
  exercise: Exercise;
  navigation:
  | StackNavigationProp<RootStackParamList, "ExerciseList">
  | StackNavigationProp<RootStackParamListModelNav, "ExerciseSelector">
  | StackNavigationProp<RootStackParamListModelNav, "Model">;
  theme: Theme;
  onPress: () => void;
  checked: boolean | null | undefined;
  setNum?: number;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.container,
        backgroundColor: theme.colors.backdrop,
        marginBottom: theme.margins.s,
        paddingVertical: theme.paddings.s,
        paddingHorizontal: theme.paddings.m
      }}
    >
      <Image
        style={{
          ...styles.image,
          marginRight: theme.margins.s,
          tintColor: theme.colors.text
        }}
        source={
          checked
            ? images.Checked
            : categoryIcons[exercise.category as keyof typeof categoryIcons]
        }
      />
      <View
        style={{
          ...styles.txtContainer,
          paddingVertical: theme.paddings.s
        }}
      >
        <Text
          style={{
            ...styles.name,
            color: theme.colors.primary
          }}
        >
          {exercise.name}
          {setNum ? ` x ${setNum}` : ""}
        </Text>
        <Text style={{ color: theme.colors.text, fontSize: RFValue(14) }}>
          {exercise.primaryMuscle + " - " + exercise.equipment}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
export default React.memo(ExerciseDescriptor)

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    borderRadius: 10,
    height: 70,
    elevation: 6
  },
  image: {
    height: "75%",
    width: undefined,
    aspectRatio: 1
  },
  txtContainer: {
    flex: 1,
    justifyContent: "space-evenly"
  },
  name: {
    flexWrap: "wrap",
    fontSize: RFValue(16)
  }
})
