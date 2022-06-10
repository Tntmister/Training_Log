import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useEffect, useRef, useState } from "react"
import { Alert, ScrollView, View } from "react-native"
import prompt from "react-native-prompt-android"
import { Appbar, IconButton, Menu } from "react-native-paper"
import { TrainingSession } from "../../../../lib/types/train"
import { finishSession } from "../../../../lib/firebase/models"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../../../providers/Theme"
import { Button } from "../../../reusable/Button"
import MediaCarousel from "../../../reusable/MediaCarousel"
import ProgrammedExercise from "../Exercises/ProgrammedExercise"
import { modelModes } from "../Models/Model"
import { RootStackParamListModelNav } from "../Models/ModelNav"
import { Text } from "../../../reusable/Text"
import { RFValue } from "react-native-responsive-fontsize"

export default function Session({
  route,
  navigation
}: StackScreenProps<RootStackParamListModelNav, "Session">) {
  const theme = useTheme()
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)
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
            finishSession(session)
            navigation.navigate("ModelList")
          }
        },
        {
          text: STRS.yes,
          onPress: (comment) => {
            console.log(comment)
            finishSession(session, {
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

  const prevNow = useRef(0)
  const interval = useRef<NodeJS.Timer>()

  useEffect(() => {
    interval.current = setInterval(() => {
      if (Date.now() - prevNow.current > 1000) {
        setSession((session) => ({
          ...session,
          duration: session.duration + 1
        }))
        prevNow.current = Date.now()
      }
    }, 50)
    return () => {
      clearInterval(interval.current!)
    }
  }, [session.duration])
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
      <View
        style={{
          width: "100%",
          height: "10%",
          alignItems: "center",
          justifyContent: "center",
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
