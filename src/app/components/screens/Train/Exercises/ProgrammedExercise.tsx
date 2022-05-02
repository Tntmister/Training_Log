import React from "react"
import { StyleSheet, View } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import {
  CardioSetType,
  Exercise,
  StretchingSetType,
  WESetType
} from "../../../../../dataDefinition/data"
import { images } from "../../../../lib/extra"
import { Theme } from "../../../../providers/Theme"
import { Button } from "../../../reusable/Button"
import InlineContainer from "../../../reusable/InlineContainer"
import { Text } from "../../../reusable/Text"
import ProgrammedCardioExercise from "./ProgrammedCardioExercise"
import ProgrammedRegularExercise from "./ProgrammedRegularExercise"
import ProgrammedStretchingExercise from "./ProgrammedStretchingExercise"

export default function ProgrammedExercise({
  exercise,
  theme,
  exNum,
  onSetChange,
  onExerciseDel
}: {
  exercise: Exercise;
  theme: Theme;
  exNum: number;
  onSetChange: (
    exNum: number,
    sets: WESetType[] | StretchingSetType[] | CardioSetType[]
  ) => void;
  onExerciseDel: (exNum: number) => void;
}) {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.backdrop,
        marginBottom: theme.margins.s,
        paddingVertical: theme.paddings.m,
        paddingHorizontal: theme.paddings.m
      }}
    >
      <InlineContainer style={{ justifyContent: "space-between" }}>
        <Text
          style={{
            ...styles.title,
            color: theme.colors.primary
          }}
        >
          {exNum + " " + exercise.name}
        </Text>
        <Button
          style={{
            ...styles.del,
            height: 40,
            marginTop: 0,
            borderRadius: 5
          }}
          labelStyle={{
            fontSize: RFValue(26)
          }}
          onPress={() => onExerciseDel(exNum)}
          icon={images.Trash}
          compact={true}
        >
          {}
        </Button>
      </InlineContainer>

      {exercise.category == "Cardio" ? (
        <ProgrammedCardioExercise
          theme={theme}
          exNum={exNum}
          exercise={exercise}
          onSetChange={onSetChange}
        />
      ) : exercise.category == "Stretching" ? (
        <ProgrammedStretchingExercise
          theme={theme}
          exNum={exNum}
          exercise={exercise}
          onSetChange={onSetChange}
        />
      ) : (
        <ProgrammedRegularExercise
          theme={theme}
          exNum={exNum}
          exercise={exercise}
          onSetChange={onSetChange}
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
    width: "15%"
  }
})
