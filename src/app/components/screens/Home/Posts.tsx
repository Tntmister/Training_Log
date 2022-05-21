import { StackScreenProps } from "@react-navigation/stack"
import React, { useContext, useEffect, useRef, useState } from "react"
import { TrainingModel, TrainingSession } from "../../../lib/types/train"
import { RootStackParamHomeNav } from "./HomeNav"
import firestore from "@react-native-firebase/firestore"
import Loading from "../../reusable/Loading"
import { FlatList } from "react-native"
import { UserContext } from "../../../providers/User"
import PostDescriptor from "./PostDescriptor"
import { modelModes } from "../Train/Models/Model"
import { Post } from "../../../lib/types/user"

export default function Posts({
  navigation
}: StackScreenProps<RootStackParamHomeNav, "Posts">) {
  const user = useContext(UserContext)!
  const [posts, setPosts] = useState<Post[]>([])

  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const oldest = useRef(Date.now())
  const newest = useRef(Date.now())

  // firebase query por conter em lista está limitado a blocos de 10 ids
  const followingChunks = useRef<string[][]>([])

  async function initFollowing() {
    followingChunks.current = []
    const following = (
      await firestore()
        .collection("users")
        .doc(user.uid)
        .collection("following")
        .get()
    ).docs.map((queryDocumentSnapshot) => queryDocumentSnapshot.id)
    for (let i = 0; i < following.length; i += 10) {
      followingChunks.current.push(following.slice(i, i + 10))
    }
  }

  async function retrieveData() {
    setLoading(true)
    for (const querySnapshot of await Promise.all(
      followingChunks.current.map(
        async (followingChunk) =>
          await firestore()
            .collection("posts")
            .where("author", "in", followingChunk)
            .orderBy("post.date", "desc")
            .startAfter(oldest.current)
            .limit(10)
            .get()
      )
    )) {
      if (!querySnapshot.empty) {
        const olderPosts = querySnapshot.docs.map(
          (document) => document.data() as Post
        )
        setPosts((newerPosts) => [...newerPosts, ...olderPosts])
        oldest.current = olderPosts[olderPosts.length - 1].post.date
      }
    }
    setLoading(false)
  }
  async function refreshData() {
    setRefreshing(true)
    for (const querySnapshot of await Promise.all(
      followingChunks.current.map(async (followingChunk) =>
        firestore()
          .collection("posts")
          .where("author", "in", followingChunk)
          .orderBy("post.date", "desc")
          .endBefore(newest.current)
          .limit(10)
          .get()
      )
    )) {
      if (!querySnapshot.empty) {
        const newerPosts = querySnapshot.docs.map(
          (document) => document.data() as Post
        )
        setPosts((olderPosts) => [...newerPosts, ...olderPosts])
        newest.current = newerPosts[0].post.date
      }
    }
    setRefreshing(false)
  }

  useEffect(() => {
    (async () => {
      await initFollowing()
      retrieveData()
    })()
  }, [])

  const postsFooter = () => (loading ? <Loading /> : null)

  const [scrollEnd, setScrollEnd] = useState(false)

  function onSessionPress(session: TrainingSession) {
    navigation.navigate("SessionSummary", { session: session })
  }
  function onModelPress(model: TrainingModel) {
    navigation.navigate("Model", { model: model, mode: modelModes.View })
  }
  function onUserPress(user: string) {
    navigation.navigate("Profile", { uid: user })
  }

  return (
    <FlatList
      onRefresh={refreshData}
      data={posts}
      renderItem={({ item }) => (
        <PostDescriptor
          onUserPress={onUserPress}
          onModelPress={onModelPress}
          onSessionPress={onSessionPress}
          post={item}
        />
      )}
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
