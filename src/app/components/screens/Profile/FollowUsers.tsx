import { StackScreenProps } from "@react-navigation/stack"
import React, { useEffect, useRef, useState } from "react"
import { RootStackParamUserNav } from "./ProfileNav"
import firestore from "@react-native-firebase/firestore"
import { FlatList } from "react-native"
import { Follow, User } from "../../../lib/types/user"
import UserDescriptor from "../Search/UserDescriptor"
import Loading from "../../reusable/Loading"

export default function FollowUsers({
  route,
  navigation
}: StackScreenProps<RootStackParamUserNav, "FollowUsers">) {
  const [users, setUsers] = useState<{ user: User; uid: string }[]>([])
  const oldest = useRef(Date.now())
  async function getUserDocs() {
    let docs = []
    if (route.params?.type == "followers") {
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
    navigation.navigate("Profile", { uid: uid })
  }
  useEffect(() => {
    listUsers()
  }, [])
  return (
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
        scrollEnd && listUsers()
        setScrollEnd(false)
      }}
      onEndReachedThreshold={0}
    />
  )
}
