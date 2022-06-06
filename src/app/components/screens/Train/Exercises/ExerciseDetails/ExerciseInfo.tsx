import React, { useContext, useEffect, useState } from "react"
import { Text } from "../../../../reusable/Text"
import { ScrollView, StyleSheet, TextStyle } from "react-native"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../../../../providers/Theme"
import { ExDetailStackParamList } from "./ExerciseDetailsNav"
import { StackScreenProps } from "@react-navigation/stack"
import MediaCarousel from "../../../../reusable/MediaCarousel"
import { getImages } from "../../../../../lib/firebase/exercises"
import { Asset } from "react-native-image-picker"
export default function ExerciseInfo({
  route
}: StackScreenProps<ExDetailStackParamList, "ExerciseInfo">) {
  const theme = useTheme()
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)
  const exercise = route.params.exercise
  const textStyle: TextStyle = {
    width: "90%",
    marginBottom: theme.margins.s,
    marginHorizontal: theme.margins.l,
    fontSize: theme.text.subHeader.fontSize
  }
  const styles = StyleSheet.create({
    scrollContainer: {
      alignItems: "center"
    },
    text: {
      ...textStyle
    },
    categoryText: {
      ...textStyle,
      marginBottom: theme.margins.l
    },
    instructionsText: {
      ...textStyle,
      ...theme.text.body_m
    }
  })
  const hasSecondary = exercise.secondaryMuscles.length > 1

  const [images, setImages] = useState<Asset[]>([])
  useEffect(() => {
    (async () => {
      setImages(await getImages(exercise.name))
    })()
  }, [])
  return (
    <ScrollView>
      <MediaCarousel assets={images} />
      <Text style={styles.text}>
        {STRS.train.exercises.primaryMuscle}: {exercise.primaryMuscle}
      </Text>
      {exercise.secondaryMuscles.length > 0 && (
        <Text style={styles.text}>
          {STRS.train.exercises.secondaryMuscles}:{" "}
          {exercise.secondaryMuscles[0].charAt(0).toUpperCase() +
            exercise.secondaryMuscles[0].slice(1) +
            (hasSecondary ? "," : "") +
            exercise.secondaryMuscles.slice(1).map((value) => {
              return ` ${value.charAt(0).toUpperCase() + value.slice(1)}`
            })}
        </Text>
      )}
      <Text style={styles.categoryText}>
        {`${STRS.train.exercises.category}: ${exercise.category}`}
      </Text>
      {exercise.instructions.map((value, key) => {
        return (
          <Text style={styles.instructionsText} key={key}>
            {value}
          </Text>
        )
      })}
    </ScrollView>
  )
}
