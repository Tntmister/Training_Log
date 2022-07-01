/* eslint-disable @typescript-eslint/no-var-requires */
import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useEffect, useState } from "react"
import { Alert, ScrollView, StyleSheet } from "react-native"
import { Appbar, Checkbox, Menu } from "react-native-paper"
import {
  CardioSetClass,
  StretchingSetClass,
  RegularSetClass
} from "../../../../lib/types/train"
import { TextInput } from "../../../reusable/TextInput"
import { RootStackParamListModelNav } from "./ModelNav"
import { TrainingModel } from "../../../../lib/types/train"
import { UserContext } from "../../../../providers/User"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../../../providers/Theme"
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
import { convertImperialToMetric } from "../../../../lib/units"

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

  const { lang, unit } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)
  const id = route.params.id
  const mode = route.params.mode

  const [model, setModel] = useState<TrainingModel>(
    route.params.model === undefined
      ? {
        name: STRS.train.models.defaultName,
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

  async function onModelSave() {
    model.date = Date.now()
    const modelToSave =
      unit == "imperial" ? convertImperialToMetric(model) : model
    console.log(JSON.stringify(modelToSave, null, 2))
    await saveModel(modelToSave, deletedAssets, id)
    navigation.navigate("ModelList")
  }

  async function onModelDelete() {
    await deleteModel(id!)
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
  async function onModelFromUserSave() {
    const newModel = { ...model, author: user.uid, date: Date.now() }
    await saveModel(newModel, deletedAssets, id)
    setMenuVisible(false)
    navigation.navigate("ModelList")
  }
  const [onetime, setOneTime] = useState(false)

  const [menuVisible, setMenuVisible] = useState(false)

  const [authorName, setAuthorName] = useState("")
  const [userIsAuthor, setUserIsAuthor] = useState(false)

  useEffect(() => {
    const init = async () => {
      setAuthorName(await getUsername(model.author))
      setUserIsAuthor(model.author === user.uid)
    }
    init()
  }, [model.author])

  const styles = StyleSheet.create({
    name: {
      width: "60%",
      marginLeft: theme.margins.m
    },
    description: {
      width: "80%",
      marginLeft: theme.margins.m
    },
    author: {
      marginLeft: theme.margins.m,
      marginTop: theme.margins.m
    },
    viewDesc: {
      marginHorizontal: theme.margins.m,
      marginTop: theme.margins.s,
      borderRadius: 10,
      borderColor: theme.colors.primary,
      borderWidth: 2,
      paddingHorizontal: theme.paddings.m,
      paddingVertical: theme.paddings.m
    },
    oneTimeContainer: {
      marginTop: theme.margins.s
    },
    addBtn: {
      marginTop: theme.margins.s,
      marginBottom: theme.margins.s
    },
    saveStartBtn: {
      marginTop: theme.margins.s
    }
  })

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content
          title={
            onetime || model.name === ""
              ? STRS.train.models.defaultName
              : model.name
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
          {id && mode == modelModes.Edit && (
            <Menu.Item
              onPress={() =>
                Alert.alert(
                  STRS.train.models.deleteModel,
                  STRS.train.models.confirmDelete,
                  [
                    { text: STRS.yes, onPress: onModelDelete },
                    { text: STRS.no }
                  ]
                )
              }
              title={STRS.train.models.deleteModel}
            />
          )}
          {mode == modelModes.View && userIsAuthor && (
            <Menu.Item onPress={onModelEdit} title={STRS.edit} />
          )}
          {mode == modelModes.View && !userIsAuthor && (
            <Menu.Item onPress={onModelFromUserSave} title={STRS.save} />
          )}
        </Menu>
      </Appbar>
      <ScrollView>
        {mode == modelModes.View && (
          <Text
            style={styles.author}
          >{`${STRS.train.models.author}: ${authorName}`}</Text>
        )}
        {mode == modelModes.Edit && (
          <InlineView style={styles.oneTimeContainer}>
            <Checkbox
              status={onetime ? "checked" : "unchecked"}
              onPress={() => setOneTime(!onetime)}
            />
            <Text>{STRS.train.models.oneTimeSession}</Text>
          </InlineView>
        )}
        {mode == modelModes.Edit && !onetime && (
          <TextInput
            style={styles.name}
            placeholder={STRS.train.models.newModel}
            value={model.name}
            onChangeText={onNameChange}
          />
        )}
        {mode == modelModes.Edit && !onetime ? (
          <VariableHeightTextInput
            style={styles.description}
            value={model.description}
            placeholder={STRS.train.models.trainingAnnotation}
            onChangeText={onDescriptionChange}
          />
        ) : (
          !onetime &&
          model.description.length > 0 && (
            <Text style={styles.viewDesc}>{model.description}</Text>
          )
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
            onChange={setModel}
          />
        ))}
        {mode == modelModes.Edit && (
          <Button style={styles.addBtn} onPress={onModelAddEx}>
            {STRS.train.models.addExercise}
          </Button>
        )}
      </ScrollView>
      {mode == modelModes.Edit && !onetime ? (
        <Button
          disabled={model.exercises.length == 0}
          style={styles.saveStartBtn}
          onPress={onModelSave}
        >
          {STRS.train.models.saveModel}
        </Button>
      ) : (
        <Button
          disabled={model.exercises.length == 0}
          style={styles.saveStartBtn}
          onPress={() =>
            navigation.navigate("Session", { model: model, id: id })
          }
        >
          {STRS.train.models.startTS}
        </Button>
      )}
    </>
  )
}
