import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { Appbar } from "react-native-paper"
import { TrainingModel } from "../../../../../dataDefinition/data"
import { TextInput } from "../../../reusable/TextInput"
import { RootStackParamList } from "./ModelNav"
import { TrainingModelType } from "../../../../../dataDefinition/data"
import { UserContext } from "../../../../providers/User"
import { useTheme } from "../../../../providers/Theme"
import { RFValue } from "react-native-responsive-fontsize"
import InlineContainer from "../../../reusable/InlineContainer"
import { Button } from "../../../reusable/Button"
export default function CreateModel({
  route,
  navigation
}: StackScreenProps<RootStackParamList, "Model">) {
  const [model, setModel] = useState<TrainingModelType>(new TrainingModel())
  const user = useContext(UserContext)
  const theme = useTheme()
  const styles = StyleSheet.create({
    text: {
      marginBottom: theme.margins.s,
      marginHorizontal: theme.margins.l,
      fontSize: RFValue(20)
    }
  })

  useEffect(() => {
    setModel((prevModel) => ({
      ...prevModel,
      author: user?.displayName
    }))
  }, [])

  function handleChangeName(newName: string) {
    setModel((prevModel) => ({ ...prevModel, name: newName }))
  }

  function handleChangeAnotation(newAnotation: string) {
    setModel((prevModel) => ({ ...prevModel, annotation: newAnotation }))
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
          value={model.annotation}
          placeholder={"Training Annotation"}
          multiline={true}
          numberOfLines={5}
          maxLength={150}
          onChangeText={(text) => handleChangeAnotation(text)}
        />
        <InlineContainer
          style={{
            marginVertical: theme.margins.s,
            marginHorizontal: theme.margins.s
          }}
        >
          <Button
            style={{
              width: 60,
              height: 60,
              marginTop: 0,
              borderRadius: 10
            }}
            labelStyle={{
              fontSize: RFValue(26)
            }}
            onPress={() => console.log("Add media")}
            icon={require("../../../../assets/icons/camera/camera(-xxxhdpi).png")}
            compact={true}
          >
            {}
          </Button>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            style={{
              paddingVertical: theme.margins.s
            }}
          >
            {/*dummy views*/}
            <View
              style={{
                width: 60,
                height: 60,
                marginHorizontal: theme.margins.xs,
                borderWidth: 2,
                borderRadius: 10,
                backgroundColor: "white",
                borderColor: "white"
              }}
            ></View>
            <View
              style={{
                width: 60,
                height: 60,
                marginHorizontal: theme.margins.xs,
                borderWidth: 2,
                borderRadius: 10,
                backgroundColor: "white",
                borderColor: "white"
              }}
            ></View>
            <View
              style={{
                width: 60,
                height: 60,
                marginHorizontal: theme.margins.xs,
                borderWidth: 2,
                borderRadius: 10,
                backgroundColor: "white",
                borderColor: "white"
              }}
            ></View>
            <View
              style={{
                width: 60,
                height: 60,
                marginHorizontal: theme.margins.xs,
                borderWidth: 2,
                borderRadius: 10,
                backgroundColor: "white",
                borderColor: "white"
              }}
            ></View>
          </ScrollView>
          {/*dummy views*/}
        </InlineContainer>

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
