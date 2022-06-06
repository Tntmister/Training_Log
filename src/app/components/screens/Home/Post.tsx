import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { StackScreenProps } from "@react-navigation/stack"
import React, { useEffect, useState } from "react"
import { Dimensions } from "react-native"
import { getUser } from "../../../lib/firebase/user"
import { TrainingModel, TrainingSession } from "../../../lib/types/train"
import { User } from "../../../lib/types/user"
import { useTheme } from "../../../providers/Theme"
import { Text } from "../../reusable/Text"
import Session from "../History/Session"
import Model, { modelModes } from "../Train/Models/Model"
import { RootStackParamHomeNav } from "./HomeNav"
import PostComments from "./PostComments"

export type RootStackParamPostNav = {
  Session: TrainingSession;
  Model: {
    model?: TrainingModel;
    id?: string;
    mode: modelModes;
  };
  PostComments: { postId: string };
};

export default function Post({
  route,
  navigation
}: StackScreenProps<RootStackParamHomeNav, "Post">) {
  const Tab = createMaterialTopTabNavigator<RootStackParamPostNav>()
  const theme = useTheme()

  const post = route.params.post
  const postId = route.params.postId
  const content = post.post
  const session = "model" in content
  const [userAuthor, setUserAuthor] = useState<User | undefined>(undefined)
  useEffect(() => {
    getUser(post.author).then((user) => setUserAuthor(user))
  }, [])
  return (
    <Tab.Navigator
      initialLayout={{ width: Dimensions.get("window").width }}
      screenOptions={{
        tabBarLabelStyle: { ...theme.text.body_m },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text
      }}
      initialRouteName={session ? "Session" : "Model"}
    >
      {session ? (
        <Tab.Screen
          component={Session}
          name={"Session"}
          initialParams={content}
        />
      ) : (
        <Tab.Screen
          component={Model}
          name={"Model"}
          initialParams={{ mode: modelModes.View, model: content }}
        />
      )}
      <Tab.Screen
        component={PostComments}
        name={"PostComments"}
        options={{ tabBarLabel: "Comments" }}
      />
    </Tab.Navigator>
  )
}
