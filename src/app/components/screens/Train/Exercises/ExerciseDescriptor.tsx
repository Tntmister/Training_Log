import React, { useCallback, useState } from "react"
import { Image, View, TouchableOpacity, StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { Exercise } from "../../../../lib/types/train"
import { categoryIcons } from "../../../../lib/firebase/exercises"
import { useTheme } from "../../../../providers/Theme"
import { Text } from "../../../reusable/Text"
import { images } from "../../../../lib/extra"

function ExerciseDescriptor({
  exercise,
  onPress,
  setNum = 1
}: {
  exercise: Exercise;
  onPress: (
    exercise: Exercise,
    checked: boolean,
    toggleCheck: () => void
  ) => void;
  setNum?: number;
}) {
  const [checked, setChecked] = useState(false)
  const toggleCheck = useCallback(() => setChecked(!checked), [checked])
  const theme = useTheme()
  return (
    <TouchableOpacity
      onPress={() => onPress(exercise, checked, toggleCheck)}
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
          {setNum > 1 && ` x ${setNum}`}
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
