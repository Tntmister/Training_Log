import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useState } from "react"
import { View } from "react-native"
import { useTheme } from "../../../../providers/Theme"
import { RFValue } from "react-native-responsive-fontsize"
import { RootStackParamListModelNav } from "./ModelNav"
import { Appbar, Menu } from "react-native-paper"
import { Text } from "../../../reusable/Text"
import CardioSet from "../Exercises/Sets/CardioSet"
import StretchingSet from "../Exercises/Sets/StretchingSet"
import { CardioSetType } from "../../../../../dataDefinition/data"
import MediaCarousel from "../../../reusable/MediaCarousel"
import { CachedImage } from "@georstat/react-native-image-cache"
import Loading from "../../../reusable/Loading"

export default function Model({
  route,
  navigation
}: StackScreenProps<RootStackParamListModelNav, "Model">) {
  const { model } = route.params.model
  const theme = useTheme()

  const [menuVisible, setMenuVisible] = useState(false)

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={navigation.goBack}></Appbar.BackAction>
        <Appbar.Content title={model.name} />
        <Menu
          anchor={
            <Appbar.Action
              onPress={() => setMenuVisible(true)}
              icon={"dots-vertical"}
            />
          }
          onDismiss={() => setMenuVisible(false)}
          visible={menuVisible}
        >
          <Menu.Item
            onPress={() => {
              navigation.navigate("CreateModel", route.params)
              setMenuVisible(false)
            }}
            title={"Edit Model"}
          />
        </Menu>
      </Appbar>
      <View style={{ alignItems: "center", marginTop: theme.margins.m }}>
        <Text style={{ width: "90%" }}>Author: {model.author}</Text>
        <Text style={{ marginTop: theme.margins.s, width: "90%" }}>
          {model.description}a
        </Text>
      </View>
      <MediaCarousel assets={model.mediaContent} />
      {model.exercises.map((ex, key) => {
        return <Text key={key}>{ex.name}</Text>
      })}
    </>
  )
}
