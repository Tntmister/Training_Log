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
  const theme = useTheme()
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backdrop,
      marginBottom: theme.margins.s,
      paddingVertical: theme.paddings.s,
      paddingHorizontal: theme.paddings.m,
      flexDirection: "row",
      alignItems: "center",
      width: "95%",
      borderRadius: theme.borders.borderRadius_m,
      height: 70,
      elevation: 6
    },
    image: {
      height: "75%",
      width: undefined,
      aspectRatio: 1,
      marginRight: theme.margins.s,
      tintColor: theme.colors.text
    },
    textContainer: {
      flex: 1,
      justifyContent: "space-evenly",
      paddingVertical: theme.paddings.s
    },
    name: {
      flexWrap: "wrap",
      fontSize: RFValue(16),
      color: theme.colors.primary
    }
  })
  const [checked, setChecked] = useState(false)
  const toggleCheck = useCallback(() => setChecked(!checked), [checked])
  return (
    <TouchableOpacity
      onPress={() => onPress(exercise, checked, toggleCheck)}
      style={styles.container}
    >
      <Image
        style={styles.image}
        source={
          checked
            ? images.Checked
            : categoryIcons[exercise.category as keyof typeof categoryIcons]
        }
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>
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
