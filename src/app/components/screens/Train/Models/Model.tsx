import { StackScreenProps } from "@react-navigation/stack"
import React, { useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { useTheme } from "../../../../providers/Theme"
import { RootStackParamListModelNav } from "./ModelNav"
import { Appbar, Menu } from "react-native-paper"
import { Text } from "../../../reusable/Text"
import MediaCarousel from "../../../reusable/MediaCarousel"

import ExerciseDescriptor from "../Exercises/ExerciseDescriptor"
import { Button } from "../../../reusable/Button"

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
              navigation.navigate("EditModel", { ...model, isTS: false })
              setMenuVisible(false)
            }}
            title={"Edit Model"}
          />
        </Menu>
      </Appbar>
      <View style={{ ...styles.container, marginTop: theme.margins.m }}>
        <Text style={styles.text}>Author: {model.author}</Text>
        {model.description.length > 0 && (
          <Text
            style={{
              marginTop: theme.margins.m,
              padding: theme.margins.s,
              borderColor: theme.colors.primary,
              ...styles.text,
              ...styles.description
            }}
          >
            {model.description}
          </Text>
        )}
      </View>

      <ScrollView
        style={{
          //...styles.container,
          marginTop: theme.margins.m
        }}
        contentContainerStyle={{ ...styles.container }}
      >
        {model.mediaContent.length > 0 && (
          <MediaCarousel assets={model.mediaContent} />
        )}
        {model.exercises.map((ex, key) => {
          return (
            <ExerciseDescriptor
              key={key}
              exercise={ex}
              navigation={navigation}
              theme={theme}
              onPress={() => navigation.navigate("Exercise", { exercise: ex })}
              checked={undefined}
              setNum={ex.sets.length}
            />
          )
        })}
        <Button
          style={{
            marginTop: theme.margins.s
          }}
          onPress={() => {
            navigation.navigate("EditModel", {
              model: { ...route.params.model },
              isTS: true
            })
            setMenuVisible(false)
          }}
        >
          Start Training Session
        </Button>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  text: {
    width: "95%"
    //backgroundColor: "red"
  },
  description: {
    borderWidth: 2,
    borderRadius: 10
  }
})
