import { StackScreenProps } from "@react-navigation/stack"
import React, { useEffect, useRef, useState } from "react"
import { FlatList } from "react-native"
import Loading from "../../reusable/Loading"
import { RootStackParamUserNav } from "./ProfileNav"
import ReportDescriptor from "./ReportDescriptor"
import firestore from "@react-native-firebase/firestore"
import { Post } from "../../../lib/types/user"

export default function ReportedPosts({
  navigation
}: StackScreenProps<RootStackParamUserNav, "ReportedPosts">) {
  const [reports, setReports] = useState<string[]>([])
  const newest = useRef(0)

  useEffect(() => {
    listReports()
  }, [])

  // redirecionar para o post
  async function onReportPress(postId: string) {
    const post = (
      await firestore().doc(`posts/${postId}`).get()
    ).data() as Post
    navigation.navigate("Post", { post: post, postId: postId })
  }

  // se o report for eliminado por outro administrador
  function onReportExpired(reportId: string) {
    setReports((prevReports) =>
      prevReports.filter((report) => report != reportId)
    )
  }

  async function listReports() {
    setLoading(true)
    firestore()
      .collection("reports")
      .orderBy("reportTime")
      .startAt(newest.current)
      .limit(10)
      .get()
      .then((querySnapshot) => {
        setReports((olderReports) => [
          ...olderReports,
          ...querySnapshot.docs.map((doc) => doc.id)
        ])
      })
      .finally(() => setLoading(false))
  }

  const [loading, setLoading] = useState(false)
  const [scrollEnd, setScrollEnd] = useState(false)
  return (
    <FlatList
      data={reports}
      renderItem={({ item }) => (
        <ReportDescriptor
          onExpire={onReportExpired}
          onPress={onReportPress}
          id={item}
        />
      )}
      ListFooterComponent={loading ? <Loading /> : null}
      onEndReached={() => setScrollEnd(true)}
      onMomentumScrollEnd={() => {
        scrollEnd && listReports()
        setScrollEnd(false)
      }}
      onEndReachedThreshold={0}
    />
  )
}
