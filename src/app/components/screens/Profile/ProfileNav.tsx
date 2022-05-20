import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Profile from "./Profile"
import EditProfile from "./EditProfile"
import { User } from "../../../lib/types/user"
import SessionSummary from "../History/SessionSummary"
import Model, { modelModes } from "../Train/Models/Model"
import { TrainingSession, TrainingModel } from "../../../lib/types/train"

export type RootStackParamUserNav = {
  Profile: { uid: string } | undefined;
  EditProfile: { user: User };
  SessionSummary: { session: TrainingSession };
  Model: { model: TrainingModel; mode: modelModes };
};

export default function ProfileNav() {
  const Stack = createStackNavigator<RootStackParamUserNav>()

  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="SessionSummary" component={SessionSummary} />
      <Stack.Screen name="Model" component={Model} />
    </Stack.Navigator>
  )
}
