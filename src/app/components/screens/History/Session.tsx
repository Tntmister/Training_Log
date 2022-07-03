import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useEffect, useState } from "react"
import { Image, ScrollView, StyleSheet } from "react-native"
import { Appbar } from "react-native-paper"
import { TrainingSession } from "../../../lib/types/train"
import {
  getDate,
  getDuration,
  getTotalWeight,
  images
} from "../../../lib/extra"
import { ThemeContext, useTheme } from "../../../providers/Theme"
import InlineView from "../../reusable/InlineView"
import MediaCarousel from "../../reusable/MediaCarousel"
import { Text } from "../../reusable/Text"
import ProgrammedExercise from "../Train/Exercises/ProgrammedExercise"
import { modelModes } from "../Train/Models/Model"
import { RootStackParamHistoryNav } from "./HistoryNav"
import {
  available_units,
  convertImperialToMetric,
  convertMetricToImperial
} from "../../../lib/units"

export default function Session({
  route,
  navigation
}: StackScreenProps<RootStackParamHistoryNav, "Session">) {
  const theme = useTheme()
  const { unit } = useContext(ThemeContext)
  const current_units = theme.units[unit as available_units]
  const [session, setSession] = useState(route.params as TrainingSession)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    setSession((prevSession) => {
      if (unit == "imperial") {
        return convertMetricToImperial(prevSession) as TrainingSession
      } else {
        if (counter == 0) {
          setCounter((prevCounter) => prevCounter + 1)
          return prevSession
        } else {
          return convertImperialToMetric(prevSession) as TrainingSession
        }
      }
    })
  }, [unit])

  const styles = StyleSheet.create({
    header: {
      marginVertical: theme.margins.m,
      justifyContent: "flex-start",
      width: "95%",
      alignSelf: "center"
    },
    headerContainer: {
      width: "32%"
    },
    name: {
      width: "60%",
      marginTop: theme.margins.m,
      marginLeft: theme.margins.m,
      ...theme.text.header
    },
    description: {
      width: "80%",
      marginLeft: theme.margins.m
    },
    icon: {
      tintColor: theme.colors.primary,
      width: 20,
      height: 20,
      marginRight: theme.margins.xs
    },
    info: {
      color: theme.colors.text
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
            <Text style={styles.info}>{getDate(session.date)}</Text>
          </InlineView>
          <InlineView style={styles.headerContainer}>
            <Image source={images.History} style={styles.icon}></Image>
            <Text style={styles.info}>{getDuration(session.duration)}</Text>
          </InlineView>
          <InlineView style={styles.headerContainer}>
            <Image source={images.Weight} style={styles.icon}></Image>
            <Text style={styles.info}>
              {`${getTotalWeight(session)} (${current_units.mass})`}
            </Text>
          </InlineView>
        </InlineView>

        <Text style={styles.description}>{session.description}</Text>

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
