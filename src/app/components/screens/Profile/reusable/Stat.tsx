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
      marginHorizontal: theme.margins.s,
      paddingVertical: theme.margins.xs,
      width: "33%"
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
      <Text style={styles.value}>{stat}</Text>
      <Text style={styles.name}>{title}</Text>
    </View>
  )
}

export default React.memo(Stat)
