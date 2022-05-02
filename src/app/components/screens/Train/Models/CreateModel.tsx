/* eslint-disable @typescript-eslint/no-var-requires */
import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useState } from "react"
import { Image, ScrollView, View } from "react-native"
import { Appbar, IconButton, Menu } from "react-native-paper"
import {
  CardioSet,
  CardioSetType,
  StretchingSet,
  StretchingSetType,
  WESetType,
  WESet
} from "../../../../../dataDefinition/data"
import { TextInput } from "../../../reusable/TextInput"
import { RootStackParamListModelNav } from "./ModelNav"
import { TrainingModel } from "../../../../../dataDefinition/data"
import { UserContext } from "../../../../providers/User"
import { useTheme } from "../../../../providers/Theme"
import InlineContainer from "../../../reusable/InlineContainer"
import { Button } from "../../../reusable/Button"
import ProgrammedExercise from "../Exercises/ProgrammedExercise"
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse
} from "react-native-image-picker"
import { deleteModel, saveModel } from "../../../../lib/firebaseFS"

export default function CreateModel({
  route,
  navigation
}: StackScreenProps<RootStackParamListModelNav, "CreateModel">) {
  const user = useContext(UserContext)
  const theme = useTheme()

  const id = route.params.model?.id
  const [model, setModel] = useState<TrainingModel>(
    route.params.model
      ? route.params.model.model
      : {
        name: "New Training Model",
        author: user!.displayName!,
        exercises: [],
        mediaContent: [],
        description: ""
      }
  )

  function onNameChange(newName: string) {
    setModel((prevModel) => ({ ...prevModel, name: newName }))
  }

  function onAnnotationChange(newDescription: string) {
    setModel((prevModel) => ({ ...prevModel, description: newDescription }))
  }

  function onSetChange(
    exNum: number,
    sets: WESetType[] | StretchingSetType[] | CardioSetType[]
  ) {
    setModel((prevModel) => ({
      ...prevModel,
      exercises: prevModel.exercises.map((ex, index) =>
        index == exNum ? { ...ex, sets: sets } : ex
      )
    }))
  }

  function onCameraExit(response: ImagePickerResponse) {
    if (response.assets !== undefined) {
      setModel((prevModel) => ({
        ...prevModel,
        mediaContent: [...prevModel.mediaContent, ...response.assets!]
      }))
    }
  }

  function onExerciseDelete(exNum: number) {
    setModel((prevModel) => ({
      ...prevModel,
      exercises: prevModel.exercises.filter((ex, index) => exNum != index)
    }))
  }

  function handleSaveModel() {
    saveModel(user!.uid, model)

    async function onModelSave() {
      await saveModel(user!.uid, model, id)
      navigation.navigate("ModelList")
    }

    async function onModelDelete() {
      await deleteModel(user!.uid, id!, model.mediaContent.length > 0)
      navigation.navigate("ModelList")
    }

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
            <Menu.Item title={"Placeholder"} />
            {id && <Menu.Item onPress={onModelDelete} title={"Delete Model"} />}
          </Menu>
        </Appbar>
        <ScrollView>
          <TextInput
            style={{ width: "60%", marginLeft: theme.margins.m }}
            value={model.name}
            onChangeText={onNameChange}
          />
          <TextInput
            style={{
              width: "80%",
              marginLeft: theme.margins.m,
              height: "",
              maxHeight: 120
            }}
            textAlignVertical={"top"}
            value={model.description}
            placeholder={"Training Annotation"}
            multiline={true}
            numberOfLines={5}
            maxLength={150}
            onChangeText={onAnnotationChange}
          />
          <InlineContainer
            style={{
              marginVertical: theme.margins.s
            }}
          >
            <IconButton
              size={30}
              icon="file-upload"
              onPress={() => {
                launchImageLibrary({
                  mediaType: "mixed",
                  videoQuality: "high",
                  selectionLimit: 5,
                  quality: 0.2
                }).then(onCameraExit)
              }}
            />
            <IconButton
              size={30}
              icon="video"
              onPress={() => {
                launchCamera({
                  mediaType: "video",
                  videoQuality: "high"
                }).then(onCameraExit)
              }}
            />
            <IconButton
              size={30}
              icon="video-image"
              onPress={() => {
                launchCamera({
                  mediaType: "photo",
                  quality: 0.2
                }).then(onCameraExit)
              }}
            />
          </InlineContainer>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{
              paddingHorizontal: theme.margins.m,
              paddingBottom: theme.paddings.m
            }}
          >
            {model.mediaContent.map((asset) => (
              <Image
                key={asset.uri}
                resizeMode="contain"
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: theme.colors.primary,
                  marginRight: theme.margins.s,
                  width: 100,
                  height: undefined,
                  aspectRatio: 1
                }}
                source={{
                  uri: asset.uri
                }}
              />
            ))}
          </ScrollView>
          <View>
            {model.exercises.map((ex, index) => (
              <ProgrammedExercise
                exercise={ex}
                key={index}
                theme={theme}
                exNum={index}
                onSetChange={onSetChange}
                onExerciseDel={onExerciseDelete}
              />
            ))}
          </View>
          <Button
            style={{
              marginTop: theme.margins.m,
              marginBottom: theme.margins.s
            }}
            onPress={() => {
              console.log("Add a new exercise")
              navigation.navigate("ExerciseSelector", {
                onSubmit: (exercises) => {
                  setModel((prevModel) => ({
                    ...prevModel,
                    exercises: {
                      ...prevModel.exercises,
                      ...exercises.map((ex) => ({
                        ...ex,
                        sets:
                          ex.category == "Cardio"
                            ? [new CardioSet()]
                            : ex.category == "Stretching"
                              ? [new StretchingSet()]
                              : [new WESet()]
                      }))
                    }
                  }))
                }
              })
            }}
          >
            Add an Exercise
          </Button>
          <Button
            style={{
              marginTop: theme.margins.m,
              marginBottom: theme.margins.s
            }}
            onPress={onModelSave}
          >
            Save Training Model
          </Button>
        </ScrollView>
      </>
    )
  }
}
