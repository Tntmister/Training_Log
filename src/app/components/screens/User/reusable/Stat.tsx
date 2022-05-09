import { Text } from "../../../reusable/Text"
import React from "react"
import { StyleSheet, View } from "react-native"
import { useTheme } from "../../../../providers/Theme"

export default function Stat({ name, value }: { name: string; value: number }) {
  const theme = useTheme()
  const styles = StyleSheet.create({
    container: {
      //backgroundColor: "red",
      marginHorizontal: theme.margins.s
    },
    name: {
      textAlign: "center",
      ...theme.text.body_s,
      color: theme.colors.primary
    },
    value: {
      textAlign: "center",
      ...theme.text.body_s,
      fontWeight: "bold",
      color: theme.colors.text
    }
  })
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.name}>{name}</Text>
    </View>
  )
}
