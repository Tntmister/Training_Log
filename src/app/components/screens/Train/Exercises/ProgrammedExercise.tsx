import React from "react"
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
import InlineContainer from "../../../reusable/InlineContainer"
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
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.backdrop,
        marginBottom: theme.margins.s,
        paddingVertical: theme.paddings.m,
        paddingHorizontal: theme.paddings.l
      }}
    >
      <InlineContainer
        style={{
          justifyContent: "space-between",
          marginTop: theme.margins.s
        }}
      >
        <Image
          style={{
            height: 40,
            width: 40,
            marginRight: theme.margins.s,
            tintColor: theme.colors.text
          }}
          source={
            categoryIcons[exercise.category as keyof typeof categoryIcons]
          }
        />
        <Text
          style={{
            ...styles.title,
            flexGrow: 1,
            textAlign: "left",
            paddingLeft: theme.paddings.xl,
            color: theme.colors.primary,
            fontSize: RFValue(20)
          }}
        >
          {exercise.name}
        </Text>
        {mode == modelModes.Edit && (
          <IconButton
            style={{
              ...styles.del,
              backgroundColor: theme.colors.primary,
              height: 40,
              margin: 0
            }}
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "98%",
    borderRadius: 10,
    alignSelf: "center"
  },
  title: {
    textAlign: "center",
    fontSize: RFValue(18)
  },
  del: {
    borderRadius: 5,
    width: "15%"
  }
})
