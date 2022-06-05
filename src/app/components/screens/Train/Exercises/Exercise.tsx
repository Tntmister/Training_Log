import React, { useEffect, useState } from "react"
import type { StackScreenProps } from "@react-navigation/stack"
import type { RootStackParamList } from "./ExerciseNav"
import { Appbar } from "react-native-paper"
import { getImages } from "../../../../lib/firebase/exercises"
import MediaCarousel from "../../../reusable/MediaCarousel"
import { Asset } from "react-native-image-picker"
import ExerciseDetailNav from "./ExerciseDetails/ExerciseDetailsNav"

export function Exercise({
  route,
  navigation
}: StackScreenProps<RootStackParamList, "Exercise">) {
  const { exercise } = route.params

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
      <MediaCarousel assets={images} />
      <ExerciseDetailNav exercise={exercise} />
    </>
  )
}
