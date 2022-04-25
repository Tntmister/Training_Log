import { StackScreenProps } from "@react-navigation/stack"
import React from "react"
import { StyleSheet, Text } from "react-native"
import { useTheme } from "../../../../providers/Theme"
import { RFValue } from "react-native-responsive-fontsize"
import { RootStackParamList } from "./ModelNav"
import { Appbar } from "react-native-paper"

export default function Model({
  route,
  navigation
}: StackScreenProps<RootStackParamList, "Model">) {
  const { model } = route.params
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
      <Text>Model</Text>
    </>
  )
}
