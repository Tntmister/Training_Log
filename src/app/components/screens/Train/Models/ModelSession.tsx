import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useState } from "react"
import { Alert, ScrollView } from "react-native"
import prompt from "react-native-prompt-android"
import { Appbar, Menu } from "react-native-paper"
import { TrainingSession } from "../../../../lib/types/train"
import { finishSession } from "../../../../lib/firebase/models"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../../../providers/Theme"
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
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)

  const user = useContext(UserContext)!
  const model = route.params.model

  const [session, setSession] = useState<TrainingSession>({
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
    prompt(
      STRS.train.finishTS,
      STRS.train.confirmShare,
      [
        { text: STRS.cancel, style: "cancel" },
        {
          text: STRS.no,
          onPress: () => {
            finishSession(user.uid, session)
            navigation.navigate("ModelList")
          }
        },
        {
          text: STRS.yes,
          onPress: (comment) => {
            console.log(comment)
            finishSession(user.uid, session, {
              comment: comment
            })
            navigation.navigate("ModelList")
          }
        }
      ],
      { placeholder: STRS.comment }
    )
  }

  const [menuVisible, setMenuVisible] = useState(false)
  return (
    <>
      <Appbar>
        <Appbar.BackAction
          onPress={() =>
            Alert.alert(
              STRS.train.cancelTS,
              STRS.train.models.confirmCancelTS,
              [
                { text: STRS.yes, onPress: navigation.goBack },
                { text: STRS.no }
              ]
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
            onChange={setSession}
          />
        ))}
      </ScrollView>
      <Button
        disabled={
          !session.exercises.every((value) =>
            value.sets.every((set) => set.done)
          )
        }
        style={{
          marginTop: theme.margins.s
        }}
        onPress={onSessionFinished}
      >
        {STRS.train.finishTS}
      </Button>
    </>
  )
}
