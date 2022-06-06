/* eslint-disable @typescript-eslint/no-unused-vars */
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
import BackgroundFetch from "react-native-background-fetch"
import notifee, { AuthorizationStatus, EventType } from "@notifee/react-native"

export default function Posts({
  navigation,
  route
}: StackScreenProps<RootStackParamHomeNav, "Posts">) {
  const user = useContext(UserContext)!
  const userid = route.params?.uid
  const [posts, setPosts] = useState<{ post: Post; postId: string }[]>([])

  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const oldest = useRef(Date.now())
  const newest = useRef(Date.now())

  // firebase query por array-contains está limitado a blocos de 10 ids
  const followingChunks = useRef<string[][]>([])

  function subscribeFollowing() {
    return firestore()
      .collection(`users/${user.uid}/following`)
      .onSnapshot((querySnapshot) => {
        const ids = querySnapshot.docs.map((docs) => docs.id)
        const following = [[user.uid]]
        for (let i = 0; i < ids.length; i += 10) {
          following.push(ids.slice(i, i + 10))
        }
        followingChunks.current = following
        oldest.current = Date.now()
        newest.current = Date.now()
        setPosts([])
        retrieveData()
      })
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
        const olderPosts = querySnapshot.docs.map((document) => ({
          post: document.data() as Post,
          postId: document.id
        }))
        setPosts((newerPosts) => [...newerPosts, ...olderPosts])
        oldest.current = olderPosts[olderPosts.length - 1].post.post.date
      }
    }
    setLoading(false)
  }
  async function refreshData() {
    setRefreshing(true)
    setPosts([])
    oldest.current = Date.now()
    newest.current = Date.now()
    retrieveData()
    setRefreshing(false)
  }

  useEffect(() => {
    if (userid == undefined) return subscribeFollowing()
    else {
      retrieveData()
    }
  }, [])

  async function initBackgroundFetch() {
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY
      },
      async (taskId) => {
        let numPosts = 0
        for (const followingChunk of followingChunks.current) {
          numPosts += (
            await firestore()
              .collection("posts")
              .where("author", "in", followingChunk)
              .orderBy("post.date", "desc")
              .endBefore(newest.current)
              .limit(10)
              .get()
          ).size
          if (numPosts >= 10) break
        }
        if (numPosts > 0) {
          notifee.displayNotification({
            title: "New Training Posts From From Users You Follow!",
            body: `You have ${
              numPosts > 10 ? "10+" : numPosts
            } new unseen posts from users you follow!`,
            android: {
              channelId: await notifee.createChannel({
                id: "default",
                name: "New Posts"
              })
            }
          })
        }
        BackgroundFetch.finish(taskId)
      },
      (taskId) => {
        console.warn(`background-fetch timeout: ${taskId}`)
        BackgroundFetch.finish(taskId)
      }
    )
  }

  useEffect(() => {
    notifee.requestPermission().then((value) => {
      if (value.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
        if (followingChunks.current.length > 1 && !loading) {
          initBackgroundFetch()
        }
      }
    })
    return notifee.onBackgroundEvent(async ({ type, detail }) => {
      console.log(type)
      console.log(detail)
    })
  }, [loading, followingChunks.current])

  const [scrollEnd, setScrollEnd] = useState(false)

  function onPostPress(postId: string, post: Post) {
    navigation.navigate("Post", { postId: postId, post: post })
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
          onPostPress={onPostPress}
          post={item.post}
          postId={item.postId}
        />
      )}
      ListFooterComponent={loading ? <Loading /> : null}
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
