import React, { useRef, useState } from "react"
import { Image, StyleSheet, View } from "react-native"
import { IconButton } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import { Exercise } from "../../../../../dataDefinition/data"
import { categoryIcons } from "../../../../lib/exercises"
import { images } from "../../../../lib/extra"
import { useTheme } from "../../../../providers/Theme"
import InlineContainer from "../../../reusable/InlineView"
import MediaSelector from "../../../reusable/MediaSelector"
import { Text } from "../../../reusable/Text"
import { VariableHeightTextInput } from "../../../reusable/VariableHeightTextInput"
import { modelModes } from "../Models/Model"
import ProgrammedCardioExercise from "./ProgrammedCardioExercise"
import ProgrammedRegularExercise from "./ProgrammedRegularExercise"
import ProgrammedStretchingExercise from "./ProgrammedStretchingExercise"

export default function ProgrammedExercise({
  exercise,
  mode,
  onExerciseDel
}: {
  exercise: Exercise;
  mode: modelModes;
  onExerciseDel: (exercise: Exercise) => void;
}) {
  const theme = useTheme()
  const styles = useRef(
    StyleSheet.create({
      container: {
        width: "95%",
        borderRadius: 10,
        alignSelf: "center",
        backgroundColor: theme.colors.backdrop,
        marginTop: theme.margins.m,
        paddingVertical: theme.margins.m,
        paddingHorizontal: theme.paddings.l
      },
      headerContainer: {
        justifyContent: "space-between",
        marginTop: theme.margins.s
      },
      title: {
        flexGrow: 1,
        textAlign: "left",
        paddingLeft: theme.paddings.s,
        color: theme.colors.primary,
        fontSize: theme.text.body_l.fontSize,
        maxWidth: "70%"
      },
      categ: {
        height: 40,
        width: 40,
        marginRight: theme.margins.xs,
        tintColor: theme.colors.text
      },
      del: {
        marginLeft: theme.margins.xs,
        borderRadius: 5,
        width: "15%",
        backgroundColor: theme.colors.primary,
        height: 40
      }
    })
  ).current

  const [exercise_state, setExercise] = useState(exercise)

  function onAnnotationChange(text: string) {
    exercise.annotation = text
    setExercise((prevEx) => ({
      ...prevEx,
      annotation: text
    }))
  }

  return (
    <View style={styles.container}>
      <InlineContainer style={styles.headerContainer}>
        <Image
          style={styles.categ}
          source={
            categoryIcons[exercise.category as keyof typeof categoryIcons]
          }
        />
        <Text style={styles.title}>{exercise.name}</Text>
        {mode == modelModes.Edit && (
          <IconButton
            style={styles.del}
            size={RFValue(26)}
            onPress={() => onExerciseDel(exercise)}
            icon={images.Trash}
          />
        )}
      </InlineContainer>
      {mode == modelModes.Edit ? (
        <VariableHeightTextInput
          value={exercise.annotation}
          placeholder={
            exercise.annotation.length > 0 ? "" : "Exercise Annotation"
          }
          onChangeText={onAnnotationChange}
        />
      ) : (
        exercise_state.annotation.length > 0 && (
          <Text
            style={{
              borderRadius: 5,
              borderColor: theme.colors.background,
              borderWidth: 1
            }}
          >
            {exercise_state.annotation}
          </Text>
        )
      )}
      {exercise.category == "Cardio" ? (
        <ProgrammedCardioExercise exercise={exercise} mode={mode} />
      ) : exercise.category == "Stretching" ? (
        <ProgrammedStretchingExercise exercise={exercise} mode={mode} />
      ) : (
        <ProgrammedRegularExercise exercise={exercise} mode={mode} />
      )}
      {mode == modelModes.Session && (
        <MediaSelector assets={exercise.userMediaContent!} />
      )}
    </View>
  )
}
