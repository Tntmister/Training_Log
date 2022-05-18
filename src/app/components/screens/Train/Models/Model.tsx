/* eslint-disable @typescript-eslint/no-var-requires */
import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useEffect, useState } from "react"
import { Alert, ScrollView, StyleSheet } from "react-native"
import { Appbar, Checkbox, Menu } from "react-native-paper"
import {
  CardioSetClass,
  Exercise,
  StretchingSetClass,
  RegularSetClass
} from "../../../../lib/types/train"
import { TextInput } from "../../../reusable/TextInput"
import { RootStackParamListModelNav } from "./ModelNav"
import { TrainingModel } from "../../../../lib/types/train"
import { UserContext } from "../../../../providers/User"
import { useTheme } from "../../../../providers/Theme"
import InlineView from "../../../reusable/InlineView"
import { Button } from "../../../reusable/Button"
import ProgrammedExercise from "../Exercises/ProgrammedExercise"
import { Asset } from "react-native-image-picker"
import { VariableHeightTextInput } from "../../../reusable/VariableHeightTextInput"
import { Text } from "../../../reusable/Text"
import MediaCarousel from "../../../reusable/MediaCarousel"
import MediaSelector from "../../../reusable/MediaSelector"
import { getUsername } from "../../../../lib/firebase/auth"
import { deleteModel, saveModel } from "../../../../lib/firebase/models"

export enum modelModes {
  Edit = "edit",
  View = "view",
  Session = "session"
}

export default function Model({
  route,
  navigation
}: StackScreenProps<RootStackParamListModelNav, "Model">) {
  const user = useContext(UserContext)!
  const theme = useTheme()

  const id = route.params.id
  const mode = route.params.mode

  const [model, setModel] = useState<TrainingModel>(
    route.params.model === undefined
      ? {
        name: "",
        author: user.uid,
        exercises: [],
        mediaContent: [],
        description: "",
        date: 0
      }
      : route.params.model!
  )
  const [deletedAssets] = useState<Asset[]>([])

  function onNameChange(newName: string) {
    setModel((prevModel) => ({ ...prevModel, name: newName }))
  }

  function onDescriptionChange(newDescription: string) {
    setModel((prevModel) => ({ ...prevModel, description: newDescription }))
  }

  function onExerciseDelete(exercise: Exercise) {
    setModel((prevModel) => ({
      ...prevModel,
      exercises: prevModel.exercises.filter((ex) => ex.name != exercise.name)
    }))
  }

  async function onModelSave() {
    model.date = Date.now()
    await saveModel(user.uid, model, deletedAssets, id)
    navigation.navigate("ModelList")
  }

  async function onModelDelete() {
    await deleteModel(user.uid, id!)
    navigation.navigate("ModelList")
    setMenuVisible(false)
  }

  function onModelAddEx() {
    navigation.navigate("ExerciseSelector", {
      onSubmit: (exercises) => {
        setModel((prevModel) => ({
          ...prevModel,
          exercises: [
            ...prevModel.exercises,
            ...exercises.map((ex) => ({
              ...ex,
              annotation: "",
              sets:
                ex.category == "Cardio"
                  ? [
                    {
                      distance: 0,
                      done: false,
                      duration: 0,
                      weight: 0
                    } as CardioSetClass
                  ]
                  : ex.category == "Stretching"
                    ? [
                      {
                        done: false,
                        duration: 0,
                        weight: 0
                      } as StretchingSetClass
                    ]
                    : [{ done: false, weight: 0, reps: 0 } as RegularSetClass]
            }))
          ]
        }))
      }
    })
  }

  function onModelEdit() {
    navigation.setParams({ mode: modelModes.Edit })
    setMenuVisible(false)
  }
  const [onetime, setOneTime] = useState(false)

  const [menuVisible, setMenuVisible] = useState(false)

  const [authorName, setAuthorName] = useState("")

  useEffect(() => {
    const init = async () => {
      setAuthorName(await getUsername(model.author))
    }
    init()
  }, [model.author])

  const styles = StyleSheet.create({
    name: {
      width: "60%"
    },
    description: {
      width: "80%"
    },
    author: {
      marginLeft: theme.margins.m,
      marginTop: theme.margins.m
    },
    viewDesc: {
      marginLeft: theme.margins.m,
      marginTop: theme.margins.s
    }
  })

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content
          title={onetime || model.name === "" ? "Training Session" : model.name}
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
          {id && mode == modelModes.Edit && (
            <Menu.Item
              onPress={() =>
                Alert.alert("Delete Model", "Delete the model?", [
                  { text: "Yes", onPress: onModelDelete },
                  { text: "No" }
                ])
              }
              title={"Delete Model"}
            />
          )}
          {mode == modelModes.View && (
            <Menu.Item onPress={onModelEdit} title={"Edit Model"} />
          )}
        </Menu>
      </Appbar>
      <ScrollView>
        {mode == modelModes.View && (
          <Text style={styles.author}>Author: {authorName}</Text>
        )}
        {mode == modelModes.Edit && (
          <InlineView style={{ marginTop: theme.margins.s }}>
            <Checkbox
              status={onetime ? "checked" : "unchecked"}
              onPress={() => setOneTime(!onetime)}
            />
            <Text>One time session?</Text>
          </InlineView>
        )}
        {mode == modelModes.Edit && !onetime && (
          <TextInput
            style={{ ...styles.name, marginLeft: theme.margins.m }}
            placeholder={"New Training Model"}
            value={model.name}
            onChangeText={onNameChange}
          />
        )}
        {mode == modelModes.Edit && !onetime ? (
          <VariableHeightTextInput
            style={{
              ...styles.description,
              marginLeft: theme.margins.m
            }}
            value={model.description}
            placeholder={"Training Description"}
            onChangeText={onDescriptionChange}
          />
        ) : (
          !onetime && <Text style={styles.viewDesc}>{model.description}</Text>
        )}
        {mode == modelModes.Edit && !onetime ? (
          <MediaSelector
            assets={model.mediaContent}
            deletedAssets={deletedAssets}
          />
        ) : (
          model.mediaContent.length > 0 && (
            <MediaCarousel assets={model.mediaContent} />
          )
        )}
        {model.exercises.map((ex, index) => (
          <ProgrammedExercise
            key={index}
            exercise={ex}
            mode={mode}
            onExerciseDel={onExerciseDelete}
          />
        ))}
        {mode == modelModes.Edit && (
          <Button
            style={{
              marginTop: theme.margins.s,
              marginBottom: theme.margins.s
            }}
            onPress={onModelAddEx}
          >
            Add Exercise
          </Button>
        )}
      </ScrollView>
      {mode == modelModes.Edit && !onetime ? (
        <Button
          disabled={model.exercises.length == 0}
          style={{
            marginTop: theme.margins.s
          }}
          onPress={onModelSave}
        >
          Save Training Model
        </Button>
      ) : (
        <Button
          disabled={model.exercises.length == 0}
          style={{
            marginTop: theme.margins.s
          }}
          onPress={() =>
            navigation.navigate("Session", { model: model, id: id })
          }
        >
          Start Training Session
        </Button>
      )}
    </>
  )
}
