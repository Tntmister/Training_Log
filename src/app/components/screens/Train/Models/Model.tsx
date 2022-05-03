import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext } from "react"
import { View } from "react-native"
import { useTheme } from "../../../../providers/Theme"
import { RFValue } from "react-native-responsive-fontsize"
import { RootStackParamListModelNav } from "./ModelNav"
import { Appbar } from "react-native-paper"
import { Text } from "../../../reusable/Text"
import CardioSet from "../Exercises/Sets/CardioSet"
import StretchingSet from "../Exercises/Sets/StretchingSet"
import { CardioSetType } from "../../../../../dataDefinition/data"
import ImageCarousel from "../../../reusable/ImageCarousel"
import { CachedImage } from "@georstat/react-native-image-cache"
import Loading from "../../../reusable/Loading"

export default function Model({
  route,
  navigation
}: StackScreenProps<RootStackParamListModelNav, "Model">) {
  const { model } = route.params.model
  const theme = useTheme()
  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={navigation.goBack}></Appbar.BackAction>
        <Appbar.Content title={model.name} />
        <Appbar.Action
          icon={"dots-vertical"}
          onPress={() => navigation.navigate("CreateModel", route.params)}
        />
      </Appbar>
      <View style={{ alignItems: "center", marginTop: theme.margins.m }}>
        <Text style={{ width: "90%" }}>Author: {model.author}</Text>
        <Text style={{ marginTop: theme.margins.s, width: "90%" }}>
          {model.description}a
        </Text>
      </View>
      <ImageCarousel URLs={model.mediaContent.map((asset) => asset.uri!)} />
      {model.exercises.map((ex, key) => {
        return <Text key={key}>{ex.name}</Text>
      })}
    </>
  )
}
