import React, { useContext, useState } from "react"
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { IconButton, Menu } from "react-native-paper"
import { TrainingSession } from "../../../lib/types/train"
import { getDate, images } from "../../../lib/extra"
import { deleteSession } from "../../../lib/firebase/models"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../../providers/Theme"
import { UserContext } from "../../../providers/User"
import InlineView from "../../reusable/InlineView"
import { Text } from "../../reusable/Text"

export default function SessionDescriptor({
  session,
  sessionId,
  onPost,
  onSessionPress
}: {
  session: TrainingSession;
  sessionId: string;
  onPost: boolean;
  onSessionPress?: (session: TrainingSession) => void;
}) {
  const theme = useTheme()
  const { lang } = useContext(ThemeContext)
  const STRS = langStrings(theme, lang as langs)
  const user = useContext(UserContext)!

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backdrop,
      marginBottom: theme.margins.s,
      alignSelf: "center",
      paddingBottom: theme.paddings.l,
      width: "95%",
      borderRadius: 10,
      elevation: 6
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: theme.paddings.m
    },
    nameContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginLeft: theme.margins.m
    },
    name: {
      ...theme.text.body_l,
      marginRight: theme.margins.m
    },
    dateContainer: {
      justifyContent: "flex-start",
      alignItems: "center",
      marginLeft: theme.margins.s
    },
    icon: {
      tintColor: theme.colors.text,
      width: 20,
      height: 20,
      marginRight: theme.margins.xs
    },
    exercise: {
      ...theme.text.body_s,
      paddingLeft: theme.paddings.l
    },
    image: {
      borderRadius: 10,
      width: 80,
      height: 80,
      marginLeft: "auto",
      marginRight: theme.margins.m
    }
  })

  const [menuVisible, setMenuVisible] = useState(false)
  return (
    <TouchableOpacity
      onPress={onSessionPress?.bind(null, session)}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{session.name}</Text>
          <InlineView style={styles.dateContainer}>
            <Image source={images.Calendar} style={styles.icon}></Image>
            <Text>{getDate(session.date)}</Text>
          </InlineView>
        </View>
        {!onPost && session.author === user.uid && (
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <IconButton
                onPress={() => setMenuVisible(true)}
                icon={"dots-vertical"}
              />
            }
          >
            <Menu.Item
              onPress={() =>
                Alert.alert(
                  STRS.history.deleteSession,
                  STRS.history.confirmDeleteSession,
                  [
                    {
                      text: STRS.yes,
                      onPress: async () => {
                        await deleteSession(user!.uid, sessionId)
                        setMenuVisible(false)
                      }
                    },
                    {
                      text: STRS.no,
                      onPress: async () => {
                        setMenuVisible(false)
                      }
                    }
                  ]
                )
              }
              title={STRS.history.deleteSession}
            />
          </Menu>
        )}
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
