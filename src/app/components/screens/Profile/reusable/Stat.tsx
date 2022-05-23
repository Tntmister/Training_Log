import { Text } from "../../../reusable/Text"
import React from "react"
import { StyleSheet, View } from "react-native"
import { useTheme } from "../../../../providers/Theme"

function Stat({
  title,
  stat = 0
}: {
  title: string;
  stat?: number;
  plural?: boolean;
}) {
  const theme = useTheme()

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: theme.paddings.m,
      paddingVertical: theme.paddings.m,
      borderRadius: 15,
      borderWidth: 2,
      borderColor: theme.colors.primary
    },
    name: {
      textAlign: "center",
      ...theme.text.body_m,
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
      <Text style={styles.value}>{stat}</Text>
      <Text style={styles.name}>{title}</Text>
    </View>
  )
}

export default React.memo(Stat)
