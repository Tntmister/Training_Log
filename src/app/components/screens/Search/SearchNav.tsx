import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Profile from "../Profile/Profile"
import ProfileSearch from "./ProfileSearch"

export type RootStackParamSearchNav = {
  ProfileFromSearch: { uid: string };
  ProfileSearch: { uid: string; mode: "followers" | "following" } | undefined;
};

export default function ProfileNav() {
  const Stack = createStackNavigator<RootStackParamSearchNav>()

  return (
    <Stack.Navigator
      initialRouteName="ProfileSearch"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ProfileSearch" component={ProfileSearch} />
      <Stack.Screen name="ProfileFromSearch" component={Profile} />
    </Stack.Navigator>
  )
}
