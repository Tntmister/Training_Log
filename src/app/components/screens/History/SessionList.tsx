import { StackNavigationProp } from "@react-navigation/stack"
import React, { useContext, useEffect, useState } from "react"
import { FlatList, StyleSheet } from "react-native"
import { TrainingSession } from "../../../../dataDefinition/data"
import { getSessions } from "../../../lib/firebaseFS"
import { useTheme } from "../../../providers/Theme"
import { UserContext } from "../../../providers/User"
import InlineView from "../../reusable/InlineView"
import Loading from "../../reusable/Loading"
import { Text } from "../../reusable/Text"
import { TrainingModelDoc } from "../Train/Models/ModelList"
import { RootStackParamHistoryNav } from "./HistoryNav"
import SessionDescriptor from "./SessionDescriptor"

export default function SessionList({
  navigation
}: {
  navigation: StackNavigationProp<RootStackParamHistoryNav, "SessionList">;
}) {
  const theme = useTheme()
  const user = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [sessions, setSessions] = useState<TrainingModelDoc[]>([])

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

  return (
    <>
      <InlineView style={styles.titleContainer}>
        <Text style={styles.title}>Your Training History</Text>
      </InlineView>
      {loading ? (
        <Loading />
      ) : sessions.length > 0 ? (
        <FlatList
          data={sessions}
          initialNumToRender={8}
          renderItem={({ item, index }) => (
            <SessionDescriptor
              session={item.model as TrainingSession}
              navigation={navigation}
              key={index}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>You have no Training Models!</Text>
          }
          style={styles.list}
        />
      ) : (
        <InlineView>
          <Text style={styles.noTS}>
            {
              "You haven't concluded any Training Sessions. Start Training and check your Training History here!"
            }
          </Text>
        </InlineView>
      )}
    </>
  )
}
