import { StackScreenProps } from "@react-navigation/stack"
import React, { useEffect, useRef, useState } from "react"
import { FlatList, StyleSheet } from "react-native"
import { Searchbar } from "react-native-paper"
import { useTheme } from "../../../providers/Theme"
import { RootStackParamSearchNav } from "./SearchNav"
import firestore, {
  FirebaseFirestoreTypes
} from "@react-native-firebase/firestore"
import { User } from "../../../lib/types/user"
import Loading from "../../reusable/Loading"
import UserDescriptor from "./UserDescriptor"

export default function ProfileSearch({
  navigation
}: StackScreenProps<RootStackParamSearchNav, "ProfileSearch">) {
  const theme = useTheme()
  const styles = StyleSheet.create({
    search: {
      width: "95%",
      alignSelf: "center",
      height: 40,
      borderRadius: 10,
      marginTop: theme.margins.s,
      backgroundColor: theme.colors.surface
    },
    searchInput: {
      ...theme.text.body_l,
      paddingVertical: 0
    }
  })
  function onUserPress(uid: string) {
    navigation.navigate("Profile", { uid: uid })
  }

  const [users, setUsers] = useState<{ user: User; uid: string }[]>([])
  const last = useRef<FirebaseFirestoreTypes.DocumentData | null>(null)
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  function retrieveData() {
    let query = firestore()
      .collection("users")
      .orderBy("username")
      .orderBy("followers", "desc")
    if (last.current) query = query.startAfter(last.current)
    query
      .where("username", ">=", username)
      .where("username", "<=", username + "~")
      .limit(10)
      .get()
      .then(
        (querySnapshot) => {
          if (!querySnapshot.empty) {
            const usersAfter = querySnapshot.docs.map((document) => ({
              user: document.data() as User,
              uid: document.id
            }))
            setUsers((usersBefore) => [...usersBefore, ...usersAfter])
            last.current = querySnapshot.docs[usersAfter.length - 1].data()!
          }
        },
        (reason) => {
          console.error(reason)
        }
      )
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    setLoading(true)
    setUsers([])
    const timeout = setTimeout(() => {
      retrieveData()
    }, 250)
    return () => clearTimeout(timeout)
  }, [username])

  const [scrollEnd, setScrollEnd] = useState(false)
  return (
    <>
      <Searchbar
        value={username}
        onChangeText={setUsername}
        placeholder="Enter Username"
        placeholderTextColor={theme.colors.placeholder}
        selectionColor={theme.colors.primary}
        style={styles.search}
        inputStyle={styles.searchInput}
      />
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <UserDescriptor
            uid={item.uid}
            onUserPress={onUserPress}
            user={item.user}
          />
        )}
        ListFooterComponent={loading ? <Loading /> : null}
        onEndReached={() => setScrollEnd(true)}
        onMomentumScrollEnd={() => {
          scrollEnd && retrieveData()
          setScrollEnd(false)
        }}
        onEndReachedThreshold={0}
      />
    </>
  )
}
