import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { IconButton } from "react-native-paper"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../../../providers/Theme"
import { Text } from "../../../reusable/Text"

export default function TrainStat({
  name,
  value,
  index
}: {
  name: string;
  value: number;
  index: number;
}) {
  const theme = useTheme()
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)
  const styles = StyleSheet.create({
    container: {
      elevation: 6,
      width: "45%",
      backgroundColor: theme.colors.backdrop,
      paddingVertical: theme.paddings.l,
      borderRadius: theme.borders.borderRadius_m,
      marginVertical: theme.margins.xs,
      marginHorizontal: theme.margins.s,
      justifyContent: "center"
    },
    text: {
      width: "80%",
      alignSelf: "center"
    },
    icon: {
      marginLeft: theme.margins.m,
      backgroundColor: theme.colors.primary
    }
  })
  console.log(index)
  const [icon, setIcon] = useState("pending")

  useEffect(() => {
    setIcon(STRS.user.trainStatsIcons[index])
  }, [])
  return (
    <View style={styles.container}>
      <IconButton icon={icon} style={styles.icon} />
      <Text style={styles.text}>{`${name} : ${value}`}</Text>
    </View>
  )
}
