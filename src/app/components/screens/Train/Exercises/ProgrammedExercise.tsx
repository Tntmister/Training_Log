import React, { useRef } from "react"
import { Image, StyleSheet, View } from "react-native"
import { IconButton } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import {
  CardioSetClass,
  Exercise,
  StretchingSetClass,
  WESetClass
} from "../../../../../dataDefinition/data"
import { categoryIcons } from "../../../../lib/exercises"
import { images } from "../../../../lib/extra"
import { Theme } from "../../../../providers/Theme"
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
  theme,
  exNum,
  mode,
  onSetChange,
  onExerciseDel,
  onExerciseAnnotationChange
}: {
  exercise: Exercise;
  theme: Theme;
  exNum: number;
  mode: modelModes;
  onSetChange: (
    exNum: number,
    sets: WESetClass[] | StretchingSetClass[] | CardioSetClass[]
  ) => void;
  onExerciseDel: (exNum: number) => void;
  onExerciseAnnotationChange: (exNum: number, txt: string) => void;
}) {
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
            onPress={() => onExerciseDel(exNum)}
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
          onChangeText={(txt) => onExerciseAnnotationChange(exNum, txt)}
        />
      ) : (
        exercise.annotation.length > 0 && (
          <Text
            style={{
              borderRadius: 5,
              borderColor: theme.colors.background,
              borderWidth: 1
            }}
          >
            {exercise.annotation}
          </Text>
        )
      )}
      {exercise.category == "Cardio" ? (
        <ProgrammedCardioExercise
          exNum={exNum}
          exercise={exercise}
          onSetChange={onSetChange}
          mode={mode}
        />
      ) : exercise.category == "Stretching" ? (
        <ProgrammedStretchingExercise
          exNum={exNum}
          exercise={exercise}
          onSetChange={onSetChange}
          mode={mode}
        />
      ) : (
        <ProgrammedRegularExercise
          exNum={exNum}
          exercise={exercise}
          onSetChange={onSetChange}
          mode={mode}
        />
      )}
      {mode == modelModes.Session && (
        <MediaSelector assets={exercise.userMediaContent!} />
      )}
    </View>
  )
}
