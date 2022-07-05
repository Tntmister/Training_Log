import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useEffect, useRef, useState } from "react"
import { RootStackParamUserNav } from "./ProfileNav"
import firestore from "@react-native-firebase/firestore"
import { FlatList } from "react-native"
import { Follow, User } from "../../../lib/types/user"
import UserDescriptor from "../Search/UserDescriptor"
import Loading from "../../reusable/Loading"
import { Appbar } from "react-native-paper"
import {
  langs,
  langStrings,
  ThemeContext,
  useTheme
} from "../../../providers/Theme"

export default function FollowUsers({
  route,
  navigation
}: StackScreenProps<RootStackParamUserNav, "FollowUsers">) {
  const { lang } = useContext(ThemeContext)
  const theme = useTheme()
  const STRS = langStrings(theme, lang as langs)

  const [users, setUsers] = useState<{ user: User; uid: string }[]>([])
  const oldest = useRef(Date.now())
  const followers = route.params?.type == "followers"
  async function getUserDocs() {
    let docs = []
    if (followers) {
      const querySnapshot = await firestore()
        .collectionGroup("following")
        .orderBy("dateFollowed", "desc")
        .startAfter(oldest.current)
        .where("id", "==", route.params.uid)
        .get()
      docs = await Promise.all(
        querySnapshot.docs.map(
          async (doc) => await doc.ref.parent.parent!.get()
        )
      )
      oldest.current = (docs[docs.length - 1].data() as Follow).dateFollowed
    } else {
      const querySnapshot = await firestore()
        .collection(`users/${route.params.uid}/following`)
        .orderBy("dateFollowed", "desc")
        .startAfter(oldest.current)
        .get()
      docs = await Promise.all(
        querySnapshot.docs.map(
          async (doc) => await firestore().doc(`users/${doc.id}`).get()
        )
      )
      oldest.current = (docs[docs.length - 1].data() as Follow).dateFollowed
    }
    return docs
  }

  function listUsers() {
    setLoading(true)
    getUserDocs()
      .then((documentSnapshot) => {
        const usersAfter = documentSnapshot.map((doc) => ({
          user: doc.data() as User,
          uid: doc.id
        }))
        setUsers((usersBefore) => [...usersBefore, ...usersAfter])
      })
      .finally(() => setLoading(false))
  }

  const [loading, setLoading] = useState(false)
  const [scrollEnd, setScrollEnd] = useState(false)
  function onUserPress(uid: string) {
    navigation.navigate("ProfileFromSearch", { uid: uid })
  }
  useEffect(() => {
    listUsers()
  }, [])
  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content
          title={followers ? STRS.user.followers : STRS.user.following}
        />
      </Appbar>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <UserDescriptor
            uid={item.uid}
            onUserPress={() => onUserPress(item.uid)}
            user={item.user}
          />
        )}
        ListFooterComponent={loading ? <Loading /> : null}
        onEndReached={() => setScrollEnd(true)}
        onMomentumScrollEnd={() => {
          scrollEnd && listUsers()
          setScrollEnd(false)
        }}
        onEndReachedThreshold={0}
      />
    </>
  )
}
