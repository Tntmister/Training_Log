import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { StackScreenProps } from "@react-navigation/stack"
import React from "react"
import { Dimensions } from "react-native"
import { TrainingModel, TrainingSession } from "../../../lib/types/train"
import { useTheme } from "../../../providers/Theme"
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
  route
}: StackScreenProps<RootStackParamHomeNav, "Post">) {
  const Tab = createMaterialTopTabNavigator<RootStackParamPostNav>()
  const theme = useTheme()

  const post = route.params.post
  const postId = route.params.postId
  const content = post.post
  const session = "model" in content
  return (
    <Tab.Navigator
      backBehavior="none"
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
        initialParams={{ postId: postId }}
      />
    </Tab.Navigator>
  )
}
