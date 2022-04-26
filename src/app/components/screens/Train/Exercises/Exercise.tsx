import React, { useEffect, useState } from "react"
import type { StackScreenProps } from "@react-navigation/stack"
import type { RootStackParamList } from "./ExerciseNav"
import { Appbar } from "react-native-paper"
import { Text } from "../../../reusable/Text"
import { ScrollView } from "react-native-gesture-handler"
import { Dimensions, Image, StyleSheet, View } from "react-native"
import { useTheme } from "../../../../providers/Theme"
import { RFValue } from "react-native-responsive-fontsize"
import { getImages } from "../../../../lib/exercises"
import PagerView from "react-native-pager-view"
import Dots from "react-native-dots-pagination"

export default function Exercise({
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
  const [imageURLs, setImageURLs] = useState<string[]>([])
  useEffect(() => {
    const initImages = async () => {
      setImageURLs(await getImages(exercise.name))
    }
    initImages()
  }, [])

  const [activeImage, setActiveImage] = useState(0)

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={navigation.goBack}></Appbar.BackAction>
        <Appbar.Content title={exercise.name} />
      </Appbar>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View
          style={{
            width: "100%",
            marginBottom: theme.margins.m
          }}
        >
          <PagerView
            orientation="horizontal"
            onPageScroll={(event) => {
              if (event.nativeEvent.offset === 0)
                setActiveImage(event.nativeEvent.position)
            }}
            style={{
              height: Dimensions.get("screen").width / (3 / 2)
            }}
            showPageIndicator={true}
          >
            {imageURLs.map((url, key) => {
              return (
                <Image
                  key={key}
                  style={{
                    width: "100%",
                    height: undefined,
                    aspectRatio: 3 / 2
                  }}
                  source={{ uri: url }}
                />
              )
            })}
          </PagerView>
          <Dots
            activeColor={theme.colors.primary}
            length={imageURLs.length}
            active={activeImage}
          />
        </View>
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
