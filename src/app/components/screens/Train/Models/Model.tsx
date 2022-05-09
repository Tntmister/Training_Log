import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useState } from "react"
import { Alert, ScrollView, StyleSheet } from "react-native"
import { Appbar, Checkbox, Menu } from "react-native-paper"
import { ExerciseModel } from "../../../../../dataDefinition/data"
import { TextInput } from "../../../reusable/TextInput"
import { RootStackParamListModelNav } from "./ModelNav"
import { TrainingModel } from "../../../../../dataDefinition/data"
import { UserContext } from "../../../../providers/User"
import { useTheme } from "../../../../providers/Theme"
import InlineContainer from "../../../reusable/InlineView"
import { Button } from "../../../reusable/Button"
import ProgrammedExercise from "../Exercises/ProgrammedExercise"
import { Asset } from "react-native-image-picker"
import { deleteModel, saveModel } from "../../../../lib/firebaseFS"
import { VariableHeightTextInput } from "../../../reusable/VariableHeightTextInput"
import { Text } from "../../../reusable/Text"
import MediaCarousel from "../../../reusable/MediaCarousel"
import MediaSelector from "../../../reusable/MediaSelector"

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

  const id = route.params.model?.id
  const mode = route.params.mode
  const [model, setModel] = useState<TrainingModel>(
    id ? route.params.model.model : new TrainingModel(user.displayName!)
  )
  const [deletedAssets] = useState<Asset[]>([])

  function onNameChange(newName: string) {
    setModel(model.withName(newName))
  }

  function onDescriptionChange(newDescription: string) {
    setModel(model.withDescription(newDescription))
  }

  function onExerciseDelete(exercise: ExerciseModel) {
    setModel(model.withoutExercise(exercise))
  }

  async function onModelSave() {
    await saveModel(user.uid, model, deletedAssets, id)
    navigation.navigate("ModelList")
  }

  async function onModelDelete() {
    await deleteModel(user.uid, id!, model.mediaContent.length > 0)
    navigation.navigate("ModelList")
    setMenuVisible(false)
  }

  function onModelAddEx() {
    navigation.navigate("ExerciseSelector", {
      onSubmit: (exercises) => {
        setModel(model.withExercises(exercises))
      }
    })
  }

  function onModelEdit() {
    navigation.setParams({ mode: modelModes.Edit })
    setMenuVisible(false)
  }
  const [onetime, setOneTime] = useState(false)

  const [menuVisible, setMenuVisible] = useState(false)

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title={onetime ? "Training Session" : model.name} />
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
        {mode == modelModes.Edit && (
          <InlineContainer style={{ marginTop: theme.margins.s }}>
            <Checkbox
              status={onetime ? "checked" : "unchecked"}
              onPress={() => setOneTime(!onetime)}
            />
            <Text>One time session?</Text>
          </InlineContainer>
        )}
        {mode == modelModes.Edit && !onetime && (
          <TextInput
            style={{ ...styles.name, marginLeft: theme.margins.m }}
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
            placeholder={"Description"}
            onChangeText={onDescriptionChange}
          />
        ) : (
          !onetime && <Text>{model.description}</Text>
        )}
        {!onetime &&
          (mode == modelModes.Edit ? (
            <MediaSelector
              assets={model.mediaContent}
              deletedAssets={deletedAssets}
            />
          ) : (
            model.mediaContent.length > 0 && (
              <MediaCarousel assets={model.mediaContent} />
            )
          ))}
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
          onPress={() => navigation.navigate("Session", { model: model })}
        >
          Start Training Session
        </Button>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  name: {
    width: "60%"
  },
  description: {
    width: "80%"
  }
})
