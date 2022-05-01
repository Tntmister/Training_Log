/* eslint-disable @typescript-eslint/no-var-requires */
import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useEffect, useState } from "react"
import { Image, ScrollView, Text, View } from "react-native"
import { Appbar, IconButton } from "react-native-paper"
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
  Asset
} from "react-native-image-picker"
import { saveModel } from "../../../../lib/firebaseFS"

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
  // TODO: incorporar lista de conteudos multimedia no modelo em si
  const [assets, setAssets] = useState<Asset[]>([])

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
          exercises: [
            ...prevModel.exercises,
            ...route.params.exercises.map((ex) => ({
              ...ex,
              sets:
                  ex.category == "Cardio"
                    ? [new CardioSet()]
                    : ex.category == "Stretching"
                      ? [new StretchingSet()]
                      : [new WESet()]
            }))
          ]
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

  function handleExerciseDelete(exNum: number) {
    setModel((prevModel) => ({
      ...prevModel,
      exercises: prevModel.exercises.filter((ex, index) => exNum != index)
    }))
  }

  function handleSaveModel() {
    if (user?.displayName != null) saveModel(user?.displayName, model)
    navigation.navigate("ModelList")
  }

  console.log(
    `EXERCISES -> ${model.exercises.map(
      (ex) => ex.name + " " + ex.sets.length
    )}`
  )
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
              }).then((response) => {
                if (response.assets !== undefined) {
                  setAssets([...assets, ...response.assets])
                }
              })
            }}
          />
          <IconButton
            size={30}
            icon="video"
            onPress={() => {
              launchCamera({
                mediaType: "video",
                videoQuality: "high",
                presentationStyle: "currentContext"
              }).then((response) => {
                if (response.assets !== undefined) {
                  setAssets([...assets, ...response.assets])
                }
              })
            }}
          />
          <IconButton
            size={30}
            icon="video-image"
            onPress={() => {
              launchCamera({
                mediaType: "photo",
                quality: 0.2
              }).then((response) => {
                if (response.assets !== undefined) {
                  setAssets([...assets, ...response.assets])
                }
              })
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
          {assets.map((asset) => (
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
              onExerciseDel={handleExerciseDelete}
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
          onPress={() => handleSaveModel()}
        >
          Save Training Model
        </Button>

        <Text style={{ color: "white" }}>{JSON.stringify(model, null, 2)}</Text>
      </ScrollView>
    </>
  )
}
