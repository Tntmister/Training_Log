import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { TrainingSession } from "../../../../dataDefinition/data"
import { getDate, images } from "../../../lib/extra"
import { useTheme } from "../../../providers/Theme"
import InlineView from "../../reusable/InlineView"
import { Text } from "../../reusable/Text"
import { RootStackParamHistoryNav } from "./HistoryNav"

export default function SessionDescriptor({
  session,
  navigation
}: {
  session: TrainingSession;
  navigation: StackNavigationProp<RootStackParamHistoryNav, "SessionList">;
}) {
  const theme = useTheme()

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backdrop,
      marginBottom: theme.margins.s,
      alignSelf: "center",
      padding: theme.paddings.l,
      width: "95%",
      borderRadius: 10,
      elevation: 6
    },
    nameContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginBottom: theme.margins.s
    },
    name: {
      ...theme.text.body_l,
      marginRight: theme.margins.m
    },
    dateContainer: {
      justifyContent: "flex-start",
      marginLeft: theme.margins.s
    },
    icon: {
      tintColor: theme.colors.text,
      width: 20,
      height: 20,
      marginRight: theme.margins.xs
    },
    exercise: {
      ...theme.text.body_s
    },
    image: {
      borderRadius: 10,
      width: 80,
      height: 80,
      marginLeft: "auto",
      marginRight: theme.margins.m
    }
  })

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Session", session)
      }}
      style={styles.container}
    >
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{session.name}</Text>
        <InlineView style={styles.dateContainer}>
          <Image source={images.Calendar} style={styles.icon}></Image>
          <Text>{getDate(session.date)}</Text>
        </InlineView>
      </View>

      <View>
        <>
          {session.exercises.map((ex, key) => (
            <Text style={styles.exercise} key={key}>
              {ex.sets.length} x {ex.name}
            </Text>
          ))}
        </>
        <Image
          style={styles.image}
          source={{ uri: session.mediaContent[0]?.uri }}
        />
      </View>
    </TouchableOpacity>
  )
}
