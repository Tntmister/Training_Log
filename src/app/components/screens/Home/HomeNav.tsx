import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { TrainingModel, TrainingSession } from "../../../lib/types/train"
import Session from "../History/Session"
import Profile from "../Profile/Profile"
import Model, { modelModes } from "../Train/Models/Model"
import Posts from "./Posts"

export type RootStackParamHomeNav = {
  Posts: { uid: string } | undefined;
  Session: TrainingSession;
  Model: { model: TrainingModel; mode: modelModes };
  Profile: { uid: string } | undefined;
};

export default function HomeNav() {
  const Stack = createStackNavigator<RootStackParamHomeNav>()

  return (
    <Stack.Navigator
      initialRouteName="Posts"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Posts" component={Posts} />
      <Stack.Screen name="Session" component={Session} />
      <Stack.Screen name="Model" component={Model} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  )
}
