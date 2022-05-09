import { StackScreenProps } from "@react-navigation/stack"
import React, { useRef, useState } from "react"
import { Alert, ScrollView, Text, View } from "react-native"
import { Appbar, IconButton, Menu } from "react-native-paper"
import { RFValue } from "react-native-responsive-fontsize"
import { TrainingSession } from "../../../../../dataDefinition/data"
import { useTheme } from "../../../../providers/Theme"
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
  const [model, setModel] = useState(new TrainingSession(route.params.model))
  async function onSessionFinished() {
    navigation.navigate("ModelList")
    console.log("Trainig Session Finished")
  }

  const [menuVisible, setMenuVisible] = useState(false)

  const [timerActive, setTimerActive] = useState(false)
  const interval = useRef<NodeJS.Timer>()
  function onTimerToggle() {
    if (timerActive) {
      clearInterval(interval.current!)
    } else {
      interval.current = setInterval(() => {
        setModel(model.withIncrementDuration())
      }, 1000)
    }
    setTimerActive(!timerActive)
  }
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
          {new Date(model.duration! * 1000).toISOString().substring(11, 11 + 8)}
        </Text>
        <IconButton
          size={RFValue(36)}
          icon={timerActive ? "pause" : "play"}
          onPress={onTimerToggle}
        />
      </View>
      <ScrollView>
        {model.mediaContent.length > 0 && (
          <MediaCarousel assets={model.mediaContent} />
        )}
        {model.exercises.map((ex, index) => (
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