import { StackScreenProps } from "@react-navigation/stack"
import React from "react"
import { Image, ScrollView, StyleSheet } from "react-native"
import { Appbar } from "react-native-paper"
import { TrainingSession } from "../../../../dataDefinition/data"
import { getDate, images } from "../../../lib/extra"
import { useTheme } from "../../../providers/Theme"
import InlineView from "../../reusable/InlineView"
import MediaCarousel from "../../reusable/MediaCarousel"
import { Text } from "../../reusable/Text"
import ProgrammedExercise from "../Train/Exercises/ProgrammedExercise"
import { modelModes } from "../Train/Models/Model"
import { RootStackParamHistoryNav } from "./HistoryNav"

export default function Session({
  route,
  navigation
}: StackScreenProps<RootStackParamHistoryNav, "Session">) {
  const theme = useTheme()
  const session = route.params as TrainingSession
  console.log(route.params)

  const styles = StyleSheet.create({
    header: {
      marginVertical: theme.margins.m,
      justifyContent: "space-around"
    },
    headerContainer: {
      width: "30%",
      backgroundColor: "red"
    },
    name: {
      width: "60%",
      marginTop: theme.margins.m,
      marginLeft: theme.margins.m,
      ...theme.text.header
    },
    description: {
      width: "80%"
    },
    icon: {
      tintColor: theme.colors.text,
      width: 20,
      height: 20,
      marginRight: theme.margins.xs
    }
  })

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={session.name} />
      </Appbar>
      <ScrollView>
        <Text style={styles.name}>{session.name}</Text>
        <InlineView style={styles.header}>
          <InlineView style={styles.headerContainer}>
            <Image source={images.Calendar} style={styles.icon}></Image>
            <Text>{getDate(session.date)}</Text>
          </InlineView>
          <InlineView style={styles.headerContainer}>
            <Image source={images.History} style={styles.icon}></Image>
            <Text>{session.duration}</Text>
          </InlineView>
          <InlineView style={styles.headerContainer}>
            <Image source={images.Weight} style={styles.icon}></Image>
            <Text>{session.duration}</Text>
          </InlineView>
        </InlineView>

        <Text>{session.description}</Text>

        {session.mediaContent.length > 0 && (
          <MediaCarousel assets={session.mediaContent} />
        )}
        {session.exercises.map((ex, index) => (
          <ProgrammedExercise
            key={index}
            exercise={ex}
            mode={modelModes.View}
          />
        ))}
      </ScrollView>
    </>
  )
}
