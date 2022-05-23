import React from "react"
import { StyleSheet, View } from "react-native"
import { useTheme } from "../../../../providers/Theme"
import { Text } from "../../../reusable/Text"

export default function TrainStat({
  name,
  value
}: {
  name: string;
  value: number;
}) {
  const theme = useTheme()
  const styles = StyleSheet.create({
    container: {
      width: "45%",
      backgroundColor: "red",
      paddingVertical: theme.paddings.l,
      borderRadius: theme.borders.borderRadius_m,
      marginVertical: theme.margins.xs,
      alignItems: "center"
    }
  })
  console.log(name)
  return (
    <View style={styles.container}>
      <Text>{`${name} : ${value}`}</Text>
    </View>
  )
}
