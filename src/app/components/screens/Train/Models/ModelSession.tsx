import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useState } from "react"
import { Alert, ScrollView } from "react-native"
import { Appbar, Menu } from "react-native-paper"
import { TrainingSession } from "../../../../lib/types/train"
import { finishSession } from "../../../../lib/firebase/models"
import { useTheme } from "../../../../providers/Theme"
import { UserContext } from "../../../../providers/User"
import { Button } from "../../../reusable/Button"
import MediaCarousel from "../../../reusable/MediaCarousel"
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

  const [session] = useState<TrainingSession>({
    ...model,
    exercises: model.exercises.map((ex) => ({ ...ex, userMediaContent: [] })),
    date: Date.now(),
    duration: 0,
    model: route.params.id
      ? `users/${model.author}/models/${route.params.id}`
      : null
  })

  function onSessionFinished() {
    session.duration = Date.now() - session.date
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
