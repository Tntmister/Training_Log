import { StackScreenProps } from "@react-navigation/stack"
import React from "react"
import { Text } from "../../reusable/Text"
import { RootStackParamHomeNav } from "./HomeNav"

export default function Post({
  route,
  navigation
}: StackScreenProps<RootStackParamHomeNav, "Post">) {
  // sessão realizada (caso contrário é um modelo publicado)
  const session = "model" in route.params.post

  return <Text>Post</Text>
}
