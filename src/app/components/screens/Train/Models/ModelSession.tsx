import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useEffect, useRef, useState } from "react"
import { Alert, ScrollView, View } from "react-native"
import { Appbar, IconButton, Menu } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import { TrainingSession } from "../../../../../dataDefinition/data"
import { finishSession } from "../../../../lib/firebaseFS"
import { useTheme } from "../../../../providers/Theme"
import { UserContext } from "../../../../providers/User"
import { Button } from "../../../reusable/Button"
import MediaCarousel from "../../../reusable/MediaCarousel"
import { Text } from "../../../reusable/Text"
import ProgrammedExercise from "../Exercises/ProgrammedExercise"
import { modelModes } from "../Models/Model"
import { RootStackParamListModelNav } from "../Models/ModelNav"

export default function Session({
  route,
  navigation
}: StackScreenProps<RootStackParamListModelNav, "Session">) {
  const theme = useTheme()
  const user = useContext(UserContext)!
  const model = route.params.model

  const [session, setSession] = useState<TrainingSession>({
    ...model,
    exercises: model.exercises.map((ex) => ({ ...ex, userMediaContent: [] })),
    date: Date.now(),
    duration: 0,
    model: route.params.id && `users/${model.author}/models/${route.params.id}`
  })

  function onSessionFinished() {
    Alert.alert(
      "Finish Session",
      "Do you want to share this training session publicly?",
      [
        {
          text: "Yes",
          onPress: async () => {
            await finishSession(user.uid, session, true)
            navigation.navigate("ModelList")
          }
        },
        {
          text: "No",
          onPress: async () => {
            await finishSession(user.uid, session, false)
            navigation.navigate("ModelList")
          }
        },
        { text: "Cancel" }
      ]
    )
  }

  const [menuVisible, setMenuVisible] = useState(false)

  const [timerActive, setTimerActive] = useState(false)
  const interval = useRef<NodeJS.Timer>()
  function onTimerToggle() {
    if (timerActive) {
      clearInterval(interval.current!)
    } else {
      interval.current = setInterval(() => {
        setSession({ ...session, duration: session.duration + 1 })
      }, 1000)
    }
    setTimerActive(!timerActive)
  }

  useEffect(() => {
    setTimerActive(true)
  }, [])

  return (
    <>
      <Appbar>
        <Appbar.BackAction
          onPress={() =>
            Alert.alert(
              "Cancel Training Session",
              "Are you sure you want to cancel the training session?\nYour progress will not be saved.",
              [{ text: "Yes", onPress: navigation.goBack }, { text: "No" }]
            )
          }
        />
        <Appbar.Content title={session.name} />
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
          <Menu.Item title={"Placeholder"} />
        </Menu>
      </Appbar>
      <View
        style={{
          width: "100%",
          height: "10%",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "row",
          alignSelf: "center"
        }}
      >
        <IconButton size={RFValue(30)} icon={"clock"} />
        <Text style={theme.text.header}>
          {new Date(session.duration! * 1000)
            .toISOString()
            .substring(11, 11 + 8)}
        </Text>
        <IconButton
          size={RFValue(36)}
          icon={timerActive ? "pause" : "play"}
          onPress={onTimerToggle}
        />
      </View>
      <ScrollView>
        {session.mediaContent.length > 0 && (
          <MediaCarousel assets={session.mediaContent} />
        )}
        {session.exercises.map((ex, index) => (
          <ProgrammedExercise
            key={index}
            exercise={ex}
            mode={modelModes.Session}
          />
        ))}
      </ScrollView>
      <Button
        style={{
          marginTop: theme.margins.s
        }}
        onPress={onSessionFinished}
      >
        Finish Training Session
      </Button>
    </>
  )
}
