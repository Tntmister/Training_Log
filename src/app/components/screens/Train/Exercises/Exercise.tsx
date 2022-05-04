import React, { useEffect, useState } from "react"
import type { StackScreenProps } from "@react-navigation/stack"
import type { RootStackParamList } from "./ExerciseNav"
import { Appbar } from "react-native-paper"
import { Text } from "../../../reusable/Text"
import { ScrollView } from "react-native-gesture-handler"
import { StyleSheet } from "react-native"
import { useTheme } from "../../../../providers/Theme"
import { RFValue } from "react-native-responsive-fontsize"
import { getImages } from "../../../../lib/exercises"
import MediaCarousel from "../../../reusable/MediaCarousel"
import { Asset } from "react-native-image-picker"

export function Exercise({
  route,
  navigation
}: StackScreenProps<RootStackParamList, "Exercise">) {
  const { exercise } = route.params
  const theme = useTheme()
  const styles = StyleSheet.create({
    text: {
      width: "90%",
      marginBottom: theme.margins.s,
      marginHorizontal: theme.margins.l,
      fontSize: RFValue(20)
    }
  })
  const [images, setImages] = useState<Asset[]>([])
  useEffect(() => {
    const initImages = async () => {
      setImages(await getImages(exercise.name))
    }
    initImages()
  }, [])

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={navigation.goBack}></Appbar.BackAction>
        <Appbar.Content title={exercise.name} />
      </Appbar>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <MediaCarousel assets={images} />
        <Text style={styles.text}>
          Primary Muscle: {exercise.primaryMuscle}
        </Text>
        {exercise.secondaryMuscles.length > 0 && (
          <Text style={styles.text}>
            Secondary Muscles:{" "}
            {exercise.secondaryMuscles[0] +
              exercise.secondaryMuscles.slice(1).map((value) => {
                return `, ${value}`
              })}
          </Text>
        )}
        <Text style={{ ...styles.text, marginBottom: theme.margins.l }}>
          Category: {exercise.category}
        </Text>
        {exercise.instructions.map((value, key) => {
          return (
            <Text style={{ ...styles.text, fontSize: RFValue(16) }} key={key}>
              {value}
            </Text>
          )
        })}
      </ScrollView>
    </>
  )
}
