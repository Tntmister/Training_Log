import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import {
  TrainingModel,
  TrainingSession
} from "../../../../dataDefinition/data"
import SessionSummary from "../History/SessionSummary"
import Model, { modelModes } from "../Train/Models/Model"
import Post from "./Post"
import Posts from "./Posts"

export type RootStackParamHomeNav = {
  Posts: undefined;
  Post: { post: TrainingSession | TrainingModel };
  SessionSummary: { session: TrainingSession };
  Model: { model: TrainingModel; mode: modelModes };
};

export default function HomeNav() {
  const Stack = createStackNavigator<RootStackParamHomeNav>()

  return (
    <Stack.Navigator
      initialRouteName="Posts"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Posts" component={Posts} />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="SessionSummary" component={SessionSummary} />
      <Stack.Screen name="Model" component={Model} />
    </Stack.Navigator>
  )
}
