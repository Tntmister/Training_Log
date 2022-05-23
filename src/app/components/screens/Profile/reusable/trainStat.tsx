import React, { useContext } from "react"
import { StyleSheet } from "react-native"
import {
  ThemeContext,
  langStrings,
  langs,
  useTheme
} from "../../../../providers/Theme"
import { Text } from "../../../reusable/Text"

export default function TrainStat({
  name,
  value
}: {
  name: string;
  value: number;
}) {
  const theme = useTheme()
  const styles = StyleSheet.create({})
  console.log(name)
  return <Text>{`${name} : ${value}`}</Text>
}
