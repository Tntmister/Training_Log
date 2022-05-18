import { StackNavigationProp } from "@react-navigation/stack"
import React, { useContext, useEffect, useState } from "react"
import { FlatList, StyleSheet } from "react-native"
import { TrainingSession } from "../../../lib/types/train"
import { getSessions } from "../../../lib/firebase/models"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../../providers/Theme"
import { UserContext } from "../../../providers/User"
import InlineView from "../../reusable/InlineView"
import Loading from "../../reusable/Loading"
import { Text } from "../../reusable/Text"
import { RootStackParamHistoryNav } from "./HistoryNav"
import SessionDescriptor from "./SessionDescriptor"

export default function SessionList({
  navigation
}: {
  navigation: StackNavigationProp<RootStackParamHistoryNav, "SessionList">;
}) {
  const theme = useTheme()
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)
  const user = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [sessions, setSessions] = useState<
  { session: TrainingSession; id: string }[]
  >([])

  const styles = StyleSheet.create({
    titleContainer: {
      marginVertical: theme.margins.l
    },
    title: {
      ...theme.text.header
    },
    noTS: {
      marginTop: theme.margins.xl,
      width: "80%",
      textAlign: "center"
    },
    empty: {
      alignSelf: "center",
      marginTop: theme.margins.s
    },
    list: {
      marginTop: theme.margins.s,
      flex: 1
    }
  })

  useEffect(() => {
    const subscriber = getSessions(user!.uid, (sessions) => {
      setSessions(sessions)
      setLoading(false)
    })
    return () => subscriber()
  }, [])

  function onSessionPress(session: TrainingSession) {
    navigation.navigate("Session", session)
  }
  return (
    <>
      <InlineView style={styles.titleContainer}>
        <Text style={styles.title}>{STRS.history.yourTH}</Text>
      </InlineView>
      {loading ? (
        <Loading />
      ) : sessions.length > 0 ? (
        <FlatList
          data={sessions}
          initialNumToRender={8}
          renderItem={({ item, index }) => (
            <SessionDescriptor
              session={item.session}
              sessionId={item.id}
              onSessionPress={onSessionPress}
              key={index}
            />
          )}
          ListEmptyComponent={<></>}
          style={styles.list}
        />
      ) : (
        <InlineView>
          <Text style={styles.noTS}>{STRS.history.noTS}</Text>
        </InlineView>
      )}
    </>
  )
}
