import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Profile from "./Profile"
import EditProfile from "./EditProfile"

export type RootStackParamUserNav = {
  Profile: undefined;
  EditProfile: undefined;
};

export default function UserNav() {
  const Stack = createStackNavigator<RootStackParamUserNav>()

  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  )
}
