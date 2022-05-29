import React, { useContext } from "react"
import { Image, StyleSheet, View } from "react-native"
import { IconButton } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import {
  ModelExercise,
  SessionExercise,
  TrainingModel,
  TrainingSession
} from "../../../../lib/types/train"
import { categoryIcons } from "../../../../lib/firebase/exercises"
import { images } from "../../../../lib/extra"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../../../providers/Theme"
import InlineView from "../../../reusable/InlineView"
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
  onChange
}: {
  exercise: ModelExercise | SessionExercise;
  mode: modelModes;
  onChange?:
  | React.Dispatch<React.SetStateAction<TrainingModel>>
  | React.Dispatch<React.SetStateAction<TrainingSession>>;
}) {
  const theme = useTheme()
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)
  const styles = StyleSheet.create({
    container: {
      width: "95%",
      borderRadius: theme.borders.borderRadius_m,
      alignSelf: "center",
      backgroundColor: theme.colors.backdrop,
      marginTop: theme.margins.m,
      paddingVertical: theme.margins.m,
      paddingHorizontal: theme.paddings.l
    },
    headerContainer: {
      justifyContent: "space-between"
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
      borderRadius: theme.borders.borderRadius_s,
      width: "15%",
      backgroundColor: theme.colors.primary,
      height: 40
    },
    annotation: {
      borderRadius: theme.borders.borderRadius_m,
      borderColor: theme.colors.primary,
      borderWidth: theme.borders.borderWidth_m,
      marginTop: theme.margins.s,
      paddingHorizontal: theme.paddings.m,
      paddingVertical: theme.paddings.m
    }
  })

  function onExerciseDel() {
    (onChange as React.Dispatch<React.SetStateAction<TrainingModel>>)(
      (prevModel) => ({
        ...prevModel,
        exercises: prevModel.exercises.filter((ex) => ex.name != exercise.name)
      })
    )
  }

  function setExercise(
    callback: (
      exercise: ModelExercise | SessionExercise
    ) => ModelExercise | SessionExercise
  ) {
    (onChange as React.Dispatch<React.SetStateAction<TrainingModel>>)(
      (prevTrain) => ({
        ...prevTrain,
        exercises: prevTrain.exercises.map((value, index) =>
          index != prevTrain.exercises.indexOf(exercise)
            ? value
            : callback(exercise)
        )
      })
    )
  }

  function onAnnotationChange(text: string) {
    setExercise((prevExercise) => ({ ...prevExercise, annotation: text }))
  }

  return (
    <View style={styles.container}>
      <InlineView style={styles.headerContainer}>
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
            onPress={onExerciseDel}
            icon={images.Trash}
          />
        )}
      </InlineView>
      {mode == modelModes.Edit ? (
        <VariableHeightTextInput
          value={exercise.annotation}
          placeholder={
            exercise.annotation.length > 0
              ? ""
              : STRS.train.exercises.exerciseAnnotation
          }
          onChangeText={onAnnotationChange}
        />
      ) : (
        exercise.annotation.length > 0 && (
          <Text style={styles.annotation}>{exercise.annotation}</Text>
        )
      )}
      {exercise.category == "Cardio" ? (
        <ProgrammedCardioExercise
          exercise={exercise}
          mode={mode}
          onChange={setExercise}
        />
      ) : exercise.category == "Stretching" ? (
        <ProgrammedStretchingExercise
          exercise={exercise}
          mode={mode}
          onChange={setExercise}
        />
      ) : (
        <ProgrammedRegularExercise
          exercise={exercise}
          mode={mode}
          onChange={setExercise}
        />
      )}
      {mode == modelModes.Session && (
        <MediaSelector
          assets={(exercise as SessionExercise).userMediaContent!}
        />
      )}
    </View>
  )
}
