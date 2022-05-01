import { StackScreenProps } from "@react-navigation/stack"
import React from "react"
import { StyleSheet, Text } from "react-native"
import { useTheme } from "../../../../providers/Theme"
import { RFValue } from "react-native-responsive-fontsize"
import { RootStackParamListModelNav } from "./ModelNav"
import { Appbar } from "react-native-paper"
import { Button } from "../../../reusable/Button"

export default function Model({
  route,
  navigation
}: StackScreenProps<RootStackParamListModelNav, "Model">) {
  const { model, id } = route.params
  const theme = useTheme()
  const styles = StyleSheet.create({
    text: {
      marginBottom: theme.margins.s,
      marginHorizontal: theme.margins.l,
      fontSize: RFValue(20)
    }
  })
  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={navigation.goBack}></Appbar.BackAction>
        <Appbar.Content title={model.name} />
      </Appbar>
      <Button
        onPress={() =>
          navigation.navigate("CreateModel", {
            exercises: model.exercises,
            id: id
          })
        }
      >
        Edit Model
      </Button>
      <Text>Model</Text>
    </>
  )
}
