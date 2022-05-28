import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { getModels, getSessions } from "../../../lib/firebase/models"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../../providers/Theme"
import { UserContext } from "../../../providers/User"
import { RootStackProfileList } from "./Profile"
import TrainStat from "./reusable/trainStat"

export default function UserStats({
  navigation,
  route
}: StackScreenProps<RootStackProfileList, "Posts">) {
  const theme = useTheme()
  const user = useContext(UserContext)!
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)

  const [stats, setStats] = useState([0, 0, 0])
  const [statElements, setStatElements] = useState<JSX.Element[]>([])
  useEffect(() => {
    return getSessions(route.params!.uid, (sessions) => {
      setStats((prevStats) =>
        prevStats.map((_, index) =>
          index == 0 ? sessions.length : prevStats[index]
        )
      )
    })
  }, [])
  useEffect(() => {
    return getModels(route.params!.uid, (models) => {
      setStats((prevStats) =>
        prevStats.map((_, index) =>
          index == 1 ? models.length : prevStats[index]
        )
      )
    })
    // TODO get number of saved models
  }, [])

  useEffect(() => {
    setStatElements(
      STRS.user.trainStats.map((stat, index) => {
        console.log(stat)
        return (
          <TrainStat
            key={index}
            name={stat}
            index={index}
            value={stats[index]}
          />
        )
      })
    )
  }, [stats])

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      marginTop: theme.margins.m
    }
  })

  return <View style={styles.container}>{statElements}</View>
}
