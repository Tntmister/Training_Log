import React, { useContext } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Profile from "./Profile"
import FollowUsers from "./FollowUsers"
import EditProfile from "./EditProfile"
import { User } from "../../../lib/types/user"
import { UserContext } from "../../../providers/User"
import SessionSummary from "../History/SessionSummary"
import Model, { modelModes } from "../Train/Models/Model"
import { TrainingSession, TrainingModel } from "../../../lib/types/train"

export type RootStackParamUserNav = {
  Self: { uid: string };
  EditProfile: { user: User };
  SessionSummary: { session: TrainingSession };
  Model: { model: TrainingModel; mode: modelModes };
  FollowUsers: { uid: string; type: "followers" | "following" };
};

export default function ProfileNav() {
  const user = useContext(UserContext)!
  const Stack = createStackNavigator<RootStackParamUserNav>()

  return (
    <Stack.Navigator
      initialRouteName="Self"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Self"
        component={Profile}
        initialParams={{ uid: user.uid }}
      />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="SessionSummary" component={SessionSummary} />
      <Stack.Screen name="Model" component={Model} />
      <Stack.Screen name="FollowUsers" component={FollowUsers} />
    </Stack.Navigator>
  )
}
