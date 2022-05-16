import { StackScreenProps } from "@react-navigation/stack"
import React, { useEffect, useRef, useState } from "react"
import {
  TrainingModel,
  TrainingSession
} from "../../../../dataDefinition/data"
import { Text } from "../../reusable/Text"
import { RootStackParamHomeNav } from "./HomeNav"
import firestore from "@react-native-firebase/firestore"
import Loading from "../../reusable/Loading"
import { FlatList } from "react-native"

export default function Posts({
  navigation
}: StackScreenProps<RootStackParamHomeNav, "Posts">) {
  const [posts, setPosts] = useState<(TrainingSession | TrainingModel)[]>([])

  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const oldest = useRef(Date.now())
  const newest = useRef(Date.now())

  const retrieveData = async () => {
    setLoading(true)
    const querySnapshot = await firestore()
      .collection("posts")
      .orderBy("date", "desc")
      .startAfter(oldest.current)
      .limit(10)
      .get()
    if (!querySnapshot.empty) {
      const olderPosts = querySnapshot.docs.map(
        (document) => document.data() as TrainingModel | TrainingSession
      )
      setPosts((newerPosts) => [...newerPosts, ...olderPosts])
      oldest.current = olderPosts[olderPosts.length - 1].date
    }
    setLoading(false)
  }

  useEffect(() => {
    retrieveData()
  }, [])

  const refreshData = async () => {
    setRefreshing(true)

    const querySnapshot = await firestore()
      .collection("posts")
      .orderBy("date", "desc")
      .endBefore(newest.current)
      .get()
    if (!querySnapshot.empty) {
      const newerPosts = querySnapshot.docs.map(
        (document) => document.data() as TrainingModel | TrainingSession
      )
      setPosts((olderPosts) => [...newerPosts, ...olderPosts])
      newest.current = newerPosts[0].date
    }
    setRefreshing(false)
  }

  const postsFooter = () => {
    return loading ? <Loading /> : null
  }

  const [scrollEnd, setScrollEnd] = useState(false)

  return (
    <FlatList
      style={{ borderWidth: 1, borderColor: "#ffffff" }}
      onRefresh={refreshData}
      data={posts}
      renderItem={({ item }) => <Text>{item.name}</Text>}
      ListFooterComponent={postsFooter}
      onEndReached={() => setScrollEnd(true)}
      onMomentumScrollEnd={() => {
        scrollEnd && retrieveData()
        setScrollEnd(false)
      }}
      onEndReachedThreshold={0}
      refreshing={refreshing}
    />
  )
}
