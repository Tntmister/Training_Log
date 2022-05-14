/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-var-requires */
import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { Image, ScrollView, StyleSheet } from "react-native"
import { Appbar, IconButton } from "react-native-paper"
import { TrainingSession } from "../../../../dataDefinition/data"
import { getDate, images } from "../../../lib/extra"
import { useTheme } from "../../../providers/Theme"
import InlineContainer from "../../reusable/InlineView"
import MediaCarousel from "../../reusable/MediaCarousel"
import { Text } from "../../reusable/Text"
import { TextInput } from "../../reusable/TextInput"
import { VariableHeightTextInput } from "../../reusable/VariableHeightTextInput"
import ProgrammedExercise from "../Train/Exercises/ProgrammedExercise"
import { modelModes } from "../Train/Models/Model"
import { RootStackParamHistoryNav } from "./HistoryNav"

export default function Session({
  route,
  navigation
}: {
  navigation: StackNavigationProp<RootStackParamHistoryNav, "Session">;
}) {
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
      marginRight: 5
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
        <InlineContainer style={styles.header}>
          <InlineContainer style={styles.headerContainer}>
            <Image source={images.Calendar} style={styles.icon}></Image>
            <Text>{getDate(session.date)}</Text>
          </InlineContainer>
          <InlineContainer style={styles.headerContainer}>
            <Image source={images.History} style={styles.icon}></Image>
            <Text>{session.duration}</Text>
          </InlineContainer>
          <InlineContainer style={styles.headerContainer}>
            <Image source={images.Weight} style={styles.icon}></Image>
            <Text>{session.duration}</Text>
          </InlineContainer>
        </InlineContainer>

        <VariableHeightTextInput
          style={{
            ...styles.description,
            marginLeft: theme.margins.m
          }}
          value={session.description}
          placeholder={"Training Description"}
          disabled={true}
        />
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
