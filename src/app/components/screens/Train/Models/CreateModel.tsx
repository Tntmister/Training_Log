/* eslint-disable @typescript-eslint/no-var-requires */
import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useEffect, useState } from "react"
import { Image, ScrollView, Text, View } from "react-native"
import { Appbar, IconButton } from "react-native-paper"
import {
  CardioSetType,
  StretchingSetType,
  WESetType
} from "../../../../../dataDefinition/data"
import { TextInput } from "../../../reusable/TextInput"
import { RootStackParamListModelNav } from "./ModelNav"
import { TrainingModel } from "../../../../../dataDefinition/data"
import { UserContext } from "../../../../providers/User"
import { useTheme } from "../../../../providers/Theme"
import { RFValue } from "react-native-responsive-fontsize"
import InlineContainer from "../../../reusable/InlineContainer"
import { Button } from "../../../reusable/Button"
import ProgrammedExercise from "../Exercises/ProgrammedExercise"
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse
} from "react-native-image-picker"

export default function CreateModel({
  route,
  navigation
}: StackScreenProps<RootStackParamListModelNav, "CreateModel">) {
  const user = useContext(UserContext)
  const theme = useTheme()

  const [model, setModel] = useState<TrainingModel>({
    name: "New Training Model",
    author: user!.displayName!,
    exercises: [],
    mediaContent: [],
    description: ""
  })

  useEffect(() => {
    console.log("Exercicios -> " + JSON.stringify(model.exercises))
    console.log("Params -> " + JSON.stringify(route.params))
    //console.log(model.exercises.map((ex) => ex.name))
  }, [])

  useEffect(() => {
    setModel((prevModel) =>
      route.params
        ? {
          ...prevModel,
          exercises: [...prevModel.exercises, ...route.params.exercises]
        }
        : { ...prevModel }
    )
  }, [route.params])

  function handleChangeName(newName: string) {
    setModel((prevModel) => ({ ...prevModel, name: newName }))
  }

  function handleChangeAnotation(newAnotation: string) {
    setModel((prevModel) => ({ ...prevModel, annotation: newAnotation }))
  }

  function handleSetChange(
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
        mediaContent: { ...prevModel.mediaContent, ...response.assets }
      }))
    }
  }

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={navigation.goBack}></Appbar.BackAction>
        <Appbar.Content title={model.name} />
      </Appbar>
      <ScrollView>
        <TextInput
          style={{ width: "60%", marginLeft: theme.margins.m }}
          value={model.name}
          onChangeText={(text) => handleChangeName(text)}
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
          onChangeText={(text) => handleChangeAnotation(text)}
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
              onSetChange={handleSetChange}
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
            navigation.navigate("ExerciseSelector")
          }}
        >
          Add an Exercise
        </Button>
        <Button
          style={{
            marginTop: theme.margins.m,
            marginBottom: theme.margins.s
          }}
          onPress={() => console.log("Save the Training Model")}
        >
          Save Training Model
        </Button>

        <Text style={{ color: "white" }}>{JSON.stringify(model, null, 2)}</Text>
      </ScrollView>
    </>
  )
}
