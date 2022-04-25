import { StackScreenProps } from "@react-navigation/stack"
import React, { useState } from "react"
import { Text } from "react-native"
import { Appbar } from "react-native-paper"
import { TrainingModel } from "../../../../../dataDefinition/data"
import { TextInput } from "../../../reusable/TextInput"
import { RootStackParamList } from "./ModelNav"
import { TrainingModelType } from "../../../../../dataDefinition/data"
export default function CreateModel({
  route,
  navigation
}: StackScreenProps<RootStackParamList, "Model">) {
  const [model, setModel] = useState<TrainingModelType>(new TrainingModel())

  function handleChangeName(newName: string) {
    setModel((prevModel) => ({ ...prevModel, name: newName }))
  }

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={navigation.goBack}></Appbar.BackAction>
        <Appbar.Content title={model.name} />
      </Appbar>
      <TextInput
        style={{ width: "60%", marginLeft: 20 }}
        value={model.name}
        autoFocus={false}
        disabled={false}
        onChangeText={(text) => handleChangeName(text)}
      />
      <Text>{JSON.stringify(model, null, 2)}</Text>
    </>
  )
}
