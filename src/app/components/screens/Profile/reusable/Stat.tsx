import { Text } from "../../../reusable/Text"
import React from "react"
import { StyleSheet, View } from "react-native"
import { useTheme } from "../../../../providers/Theme"

function Stat({
  title,
  stat = 0,
  plural
}: {
  title: string;
  stat?: number;
  plural?: boolean;
}) {
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
      <Text style={styles.value}>{stat}</Text>
      <Text style={styles.name}>
        {title.substring(
          0,
          plural && stat && stat == 1 ? title.length - 1 : title.length
        )}
      </Text>
    </View>
  )
}

export default React.memo(Stat)
