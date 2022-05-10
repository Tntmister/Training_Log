import { Text } from "../../../reusable/Text"
import React from "react"
import { StyleSheet, View } from "react-native"
import { useTheme } from "../../../../providers/Theme"

export default function Stat({ name, value }: { name: string; value: number }) {
  const theme = useTheme()
  const styles = StyleSheet.create({
    container: {
      //backgroundColor: "red",
      borderRadius: 15,
      borderWidth: 2,
      borderColor: theme.colors.primary,
      marginHorizontal: theme.margins.s,
      paddingVertical: theme.margins.xs,
      width: "30%"
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
